import { Box, Container, Heading, Text } from "@chakra-ui/react";

function App() {
  return (
    <Container maxW="container.md" py={8}>
      <Box textAlign="center">
        <Heading as="h1" size="xl" mb={4}>
          Hello World!
        </Heading>
        <Text fontSize="lg" color="gray.600">
          Welcome to your React + Chakra UI app
        </Text>
      </Box>
    </Container>
  );
}

export default App;
