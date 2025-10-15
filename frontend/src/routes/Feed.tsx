import { Box, Container, Heading, Text } from "@chakra-ui/react";

import AppNavigation from "../components/AppNavigation";
import { LANDING_PAGE_CONSTANTS } from "../constants/landingPage";

export default function Feed() {
  return (
    <>
      <AppNavigation />
      <Container maxW="container.lg" py={8}>
        <Box textAlign="center" py={20}>
          <Heading size="2xl" mb={4}>
            {LANDING_PAGE_CONSTANTS.APP.NAME}
          </Heading>
          <Text color="gray.600">Coming soon...</Text>
        </Box>
      </Container>
    </>
  );
}
