import { Box, Spinner, Text, VStack } from "@chakra-ui/react";
import { FaComments } from "react-icons/fa";
import AppNavigation from "../AppNavigation";

export default function LoadingState() {
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
        <VStack gap={6}>
          <Box position="relative">
            <Spinner size="xl" color="purple.500" />
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              fontSize="lg"
              color="purple.500"
            >
              <FaComments />
            </Box>
          </Box>
          <VStack gap={2}>
            <Text color="gray.700" fontSize="lg" fontWeight="medium">
              Loading your connections...
            </Text>
            <Text color="gray.500" fontSize="sm">
              Finding people you've connected with
            </Text>
          </VStack>
        </VStack>
      </Box>
    </Box>
  );
}

