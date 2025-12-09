import { Box, Dialog } from "@chakra-ui/react";
import type { User } from "../../types/user.types";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { useEffect, useState, useRef } from "react";
import { createSocketConnection } from "../../config/socket";
import type { Socket } from "socket.io-client";
import { useLazyGetChatQuery } from "../../services/api";

interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: Date;
}

interface ChatDialogProps {
  isOpen: boolean;
  selectedChatUser: User | null;
  message: string;
  onClose: () => void;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  currentUserId?: string;
  currentUser?: User | null;
}

export default function ChatDialog({
  isOpen,
  selectedChatUser,
  message,
  onClose,
  onMessageChange,
  onSendMessage,
  currentUserId,
  currentUser,
}: ChatDialogProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [getChat] = useLazyGetChatQuery();

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch older messages when chat opens
  useEffect(() => {
    if (!isOpen || !selectedChatUser?._id || !currentUserId) {
      // Clear messages when dialog closes
      if (!isOpen) {
        setMessages([]);
      }
      return;
    }

    const fetchChatMessages = async () => {
      try {
        const result = await getChat(selectedChatUser._id).unwrap();
        if (result?.data?.messages) {
          // Map backend messages to frontend format and sort by timestamp
          const mappedMessages: Message[] = result.data.messages
            .map((msg) => ({
              id: msg._id,
              text: msg.text,
              senderId: typeof msg.senderId === 'object' ? msg.senderId._id : msg.senderId,
              timestamp: new Date(msg.createdAt),
            }))
            .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
          setMessages(mappedMessages);
        }
      } catch (error) {
        console.error("Failed to fetch chat messages:", error);
      }
    };

    fetchChatMessages();
  }, [isOpen, selectedChatUser?._id, currentUserId, getChat]);

  // Socket connection and message handling
  useEffect(() => {
    if (!isOpen || !currentUserId || !selectedChatUser?._id) {
      return;
    }

    const newSocket = createSocketConnection();
    setSocket(newSocket);

    // Join chat room when connected (or immediately if already connected)
    const joinChat = () => {
      console.log("Socket connected, joining chat");
      newSocket.emit("joinChat", {
        currentUserId: currentUserId,
        targetUserId: selectedChatUser._id,
      });
    };

    if (newSocket.connected) {
      joinChat();
    } else {
      newSocket.on("connect", joinChat);
    }

    // Listen for incoming messages
    newSocket.on(
      "receiveMessage",
      (data: {
        currentUserId: string;
        targetUserId: string;
        message: string;
      }) => {
        setMessages((prev) => {
          // Check if this message already exists (prevent duplicates)
          const isDuplicate = prev.some(
            (msg) =>
              msg.text === data.message &&
              msg.senderId === data.currentUserId &&
              Math.abs(new Date().getTime() - msg.timestamp.getTime()) < 1000 // Within 1 second
          );

          if (isDuplicate) {
            return prev;
          }

        const newMessage: Message = {
          id: Date.now().toString() + Math.random().toString(),
          text: data.message,
          senderId: data.currentUserId,
          timestamp: new Date(),
        };
          return [...prev, newMessage];
        });
      }
    );

    // Cleanup on unmount or when chat closes
    return () => {
      newSocket.off("receiveMessage");
      newSocket.off("connect");
      newSocket.disconnect();
      setSocket(null);
    };
  }, [isOpen, currentUserId, selectedChatUser?._id]);

  // Handle sending messages
  const handleSendMessage = () => {
    if (
      !message.trim() ||
      !socket ||
      !currentUserId ||
      !selectedChatUser?._id
    ) {
      return;
    }

    const messageText = message.trim();

    // Emit message via socket (server will broadcast it back)
    socket.emit("sendMessage", {
      currentUserId: currentUserId,
      targetUserId: selectedChatUser._id,
      message: messageText,
    });

    // Call parent's onSendMessage to clear input
    onSendMessage();
  };

  if (!selectedChatUser) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
      <Dialog.Backdrop 
        bg={{ base: "transparent", md: "rgba(0, 0, 0, 0.5)" }}
        zIndex={{ base: 1099, md: "auto" }}
      />
      <Dialog.Content
        w={{ base: "100vw", sm: "95vw", md: "500px", lg: "600px" }}
        h={{ base: "100vh", sm: "90vh", md: "600px", lg: "700px" }}
        maxW={{ base: "100vw", sm: "95vw", md: "500px", lg: "600px" }}
        maxH={{ base: "100vh", sm: "90vh", md: "600px", lg: "700px" }}
        m={{ base: 0, md: "auto" }}
        borderRadius={{ base: 0, md: "xl" }}
        display="flex"
        flexDirection="column"
        position={{ base: "fixed", md: "relative" }}
        top={{ base: 0, md: "auto" }}
        left={{ base: 0, md: "auto" }}
        right={{ base: 0, md: "auto" }}
        bottom={{ base: 0, md: "auto" }}
        zIndex={{ base: 1100, md: "auto" }}
        inset={{ base: 0, md: "auto" }}
        overflow="hidden"
      >
        <ChatHeader user={selectedChatUser} onClose={onClose} />

        <Box
          flex={1}
          overflowY="auto"
          overflowX="hidden"
          p={{ base: 3, md: 4 }}
          bg="gray.50"
          display="flex"
          flexDirection="column"
          gap={{ base: 2, md: 3 }}
          minH={0}
          flexBasis={0}
          pb={{ base: "90px", md: 4 }}
          style={{
            WebkitOverflowScrolling: "touch",
          }}
        >
          <ChatMessages
            messages={messages}
            currentUserId={currentUserId}
            currentUser={currentUser}
            selectedChatUser={selectedChatUser}
          />
          <div ref={messagesEndRef} />
        </Box>

        <Box
          position={{ base: "absolute", md: "relative" }}
          bottom={{ base: 0, md: "auto" }}
          left={{ base: 0, md: "auto" }}
          right={{ base: 0, md: "auto" }}
          width="100%"
          zIndex={30}
        >
          <ChatInput
            message={message}
            onMessageChange={onMessageChange}
            onSend={handleSendMessage}
          />
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  );
}
