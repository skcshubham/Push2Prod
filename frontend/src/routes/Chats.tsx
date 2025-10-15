import { Box, Container, Heading, Text } from "@chakra-ui/react";

import AppNavigation from "../components/AppNavigation";

export default function Chats() {
  return (
    <>
      <AppNavigation />
      <Container maxW="container.lg" py={8}>
        <Box textAlign="center" py={20}>
          <Heading size="2xl" mb={4}>
            Chats 💬
          </Heading>
          <Text color="gray.600">Coming soon...</Text>
        </Box>
      </Container>
    </>
  );
}
