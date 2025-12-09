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
      bg="white"
      flexShrink={0}
      position="relative"
      zIndex={20}
      width="100%"
      boxShadow={{ base: "0 -2px 8px rgba(0,0,0,0.1)", md: "none" }}
      px={{ base: 3, md: 4 }}
      pt={{ base: 3, md: 4 }}
      pb={{ base: "max(16px, calc(16px + env(safe-area-inset-bottom, 0px)))", md: 4 }}
      minH={{ base: "70px", md: "auto" }}
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

