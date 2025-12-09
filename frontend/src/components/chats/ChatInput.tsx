import { Box, HStack, IconButton, Input } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

interface ChatInputProps {
  message: string;
  onMessageChange: (message: string) => void;
  onSend: () => void;
}

export default function ChatInput({
  message,
  onMessageChange,
  onSend,
}: ChatInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSend();
    }
  };

  return (
    <Box
      borderTop="1px solid"
      borderColor="gray.200"
      p={{ base: 3, md: 4 }}
      bg="white"
      flexShrink={0}
      position={{ base: "sticky", md: "relative" }}
      bottom={{ base: 0, md: "auto" }}
      zIndex={10}
      pb={{ base: "max(12px, env(safe-area-inset-bottom))", md: 4 }}
      pt={{ base: 3, md: 4 }}
      width="100%"
    >
      <HStack gap={{ base: 2, md: 3 }}>
        <Input
          placeholder="Type a message..."
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          onKeyPress={handleKeyPress}
          borderRadius="full"
          size="md"
          flex={1}
          fontSize={{ base: "sm", md: "md" }}
        />
        <IconButton
          colorScheme="purple"
          borderRadius="full"
          aria-label="Send message"
          onClick={onSend}
          disabled={!message.trim()}
          size="md"
          flexShrink={0}
        >
          <FaPaperPlane style={{ fontSize: "14px" }} />
        </IconButton>
      </HStack>
    </Box>
  );
}

