import { Badge, Box, Heading, VStack } from "@chakra-ui/react";

interface ChatsHeaderProps {
  connectionCount: number;
}

export default function ChatsHeader({ connectionCount }: ChatsHeaderProps) {
  return (
    <Box textAlign="center" mb={{ base: 4, sm: 6 }}>
      <VStack gap={3}>
        <Heading
          size={{ base: "lg", sm: "xl" }}
          color="gray.800"
          fontFamily="heading"
        >
          Your Connections 💬
        </Heading>
        <Badge
          colorScheme="purple"
          variant="subtle"
          px={{ base: 3, sm: 4 }}
          py={{ base: 1, sm: 2 }}
          borderRadius="full"
          fontSize={{ base: "xs", sm: "sm" }}
          fontWeight="medium"
        >
          {connectionCount} connection{connectionCount !== 1 ? "s" : ""}
        </Badge>
      </VStack>
    </Box>
  );
}

