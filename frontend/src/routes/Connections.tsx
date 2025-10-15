import { Box, Container, Heading, Text } from "@chakra-ui/react";

import AppNavigation from "../components/AppNavigation";

export default function Connections() {
  return (
    <>
      <AppNavigation />
      <Container maxW="container.lg" py={8}>
        <Box textAlign="center" py={20}>
          <Heading size="2xl" mb={4}>
            Connections 👥
          </Heading>
          <Text color="gray.600">Coming soon...</Text>
        </Box>
      </Container>
    </>
  );
}
