import { Box, Container, VStack } from "@chakra-ui/react";
import { useState } from "react";

import { useGetConnectionsQuery } from "../services/api";
import type { User } from "../types/user.types";
import AppNavigation from "../components/AppNavigation";
import LoadingState from "../components/chats/LoadingState";
import EmptyState from "../components/chats/EmptyState";
import ChatsHeader from "../components/chats/ChatsHeader";
import ConnectionCard from "../components/chats/ConnectionCard";
import ChatDialog from "../components/chats/ChatDialog";
import { useSelector } from "react-redux";

export default function Chats() {
  const { data: connectionsData, isLoading, error } = useGetConnectionsQuery();
  const [selectedChatUser, setSelectedChatUser] = useState<User | null>(null);
  const [message, setMessage] = useState("");

  const currentUser: User | null = useSelector(
    (state: { auth: { user: User | null } }) => state.auth.user
  );
  const currentUserId: string | undefined = currentUser?._id;

  const handleOpenChat = (connection: User) => {
    setSelectedChatUser(connection);
  };

  const handleCloseChat = () => {
    setSelectedChatUser(null);
    setMessage("");
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Message is handled by ChatDialog component via socket
      setMessage("");
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (error || !connectionsData?.data || connectionsData.data.length === 0) {
    return <EmptyState />;
  }

  return (
    <Box height="100vh" display="flex" flexDirection="column" overflow="hidden">
      <AppNavigation />
      <Box flex="1" overflow="auto" bg="gray.50">
        <Container
          maxW="container.lg"
          py={{ base: 4, sm: 6, md: 8 }}
          px={{ base: 4, sm: 6 }}
        >
          <VStack gap={6} align="stretch">
            <ChatsHeader connectionCount={connectionsData.data.length} />

            {connectionsData.data.map((connection, index) => (
              <ConnectionCard
                key={index}
                connection={connection}
                onOpenChat={handleOpenChat}
              />
            ))}
          </VStack>
        </Container>
      </Box>

      <ChatDialog
        currentUser={currentUser}
        currentUserId={currentUserId ?? ""}
        isOpen={!!selectedChatUser}
        selectedChatUser={selectedChatUser}
        message={message}
        onClose={handleCloseChat}
        onMessageChange={setMessage}
        onSendMessage={handleSendMessage}
      />
    </Box>
  );
}
