import { Box, Text, VStack, HStack, Image } from "@chakra-ui/react";
import type { User } from "../../types/user.types";

const DEFAULT_AVATAR_URL =
  "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?semt=ais_hybrid&w=740&q=80";

interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: Date;
}

interface ChatMessagesProps {
  messages?: Message[];
  currentUserId?: string;
  currentUser?: User | null;
  selectedChatUser?: User | null;
}

const formatTimestamp = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (seconds < 60) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

export default function ChatMessages({
  messages = [],
  currentUserId,
  currentUser,
  selectedChatUser,
}: ChatMessagesProps) {
  if (messages.length === 0) {
    return (
      <VStack
        align="center"
        justify="center"
        flex={1}
        w="full"
        color="gray.500"
      >
        <Text fontSize={{ base: "sm", md: "md" }}>
          No messages yet. Start the conversation! 👋
        </Text>
      </VStack>
    );
  }

  return (
    <VStack
      align="start"
      gap={{ base: 2, md: 3 }}
      flex={1}
      justify="flex-end"
      w="full"
    >
      {messages.map((message) => {
        const isOwnMessage = message.senderId === currentUserId;
        const senderPhotoUrl = isOwnMessage
          ? currentUser?.photoUrl
          : selectedChatUser?.photoUrl;
        const senderName = isOwnMessage
          ? `${currentUser?.firstName} ${currentUser?.lastName || ""}`.trim()
          : `${selectedChatUser?.firstName} ${
              selectedChatUser?.lastName || ""
            }`.trim();

        return (
          <HStack
            key={message.id}
            align="flex-end"
            gap={2}
            w="full"
            justify={isOwnMessage ? "flex-end" : "flex-start"}
          >
            {!isOwnMessage && (
              <Image
                src={senderPhotoUrl || DEFAULT_AVATAR_URL}
                alt={senderName || "User"}
                width="32px"
                height="32px"
                borderRadius="full"
                objectFit="cover"
                border="2px solid"
                borderColor="purple.200"
                boxShadow="sm"
                flexShrink={0}
              />
            )}
            <Box
              bg={isOwnMessage ? "purple.500" : "white"}
              color={isOwnMessage ? "white" : "gray.700"}
              p={{ base: 2.5, md: 3 }}
              borderRadius="lg"
              maxW={{ base: "85%", md: "80%" }}
              boxShadow="sm"
              border={isOwnMessage ? "none" : "1px solid"}
              borderColor={isOwnMessage ? "transparent" : "gray.200"}
            >
              <Text
                fontSize={{ base: "xs", md: "sm" }}
                whiteSpace="pre-wrap"
                wordBreak="break-word"
              >
                {message.text}
              </Text>
              <Text
                fontSize={{ base: "2xs", md: "xs" }}
                color={isOwnMessage ? "purple.100" : "gray.500"}
                mt={1}
              >
                {formatTimestamp(message.timestamp)}
              </Text>
            </Box>
            {isOwnMessage && (
              <Image
                src={senderPhotoUrl || DEFAULT_AVATAR_URL}
                alt={senderName || "User"}
                width="32px"
                height="32px"
                borderRadius="full"
                objectFit="cover"
                border="2px solid"
                borderColor="purple.200"
                boxShadow="sm"
                flexShrink={0}
              />
            )}
          </HStack>
        );
      })}
    </VStack>
  );
}
