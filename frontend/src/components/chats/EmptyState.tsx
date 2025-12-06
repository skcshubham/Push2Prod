import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import AppNavigation from "../AppNavigation";

export default function EmptyState() {
  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      overflow="hidden"
    >
      <AppNavigation />
      <Box
        flex="1"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <VStack gap={6} textAlign="center" px={4}>
          <Box
            bg="purple.50"
            borderRadius="full"
            p={6}
            color="purple.500"
            fontSize="4xl"
          >
            <FaHeart />
          </Box>
          <VStack gap={3}>
            <Heading size="lg" color="gray.700">
              No Connections Yet
            </Heading>
            <Text color="gray.600" maxW="md">
              You haven't connected with anyone yet. Start swiping to find
              your perfect match!
            </Text>
          </VStack>
        </VStack>
      </Box>
    </Box>
  );
}

