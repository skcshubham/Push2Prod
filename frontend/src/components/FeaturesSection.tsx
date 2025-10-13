import {
  Badge,
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";

import FeatureCard from "./FeatureCard";
import { LANDING_PAGE_CONSTANTS } from "../constants/landingPage";
import { THEME_CONSTANTS } from "../theme/constants";

export default function FeaturesSection() {
  const sectionPadding = useBreakpointValue({ base: 12, md: 20 });

  return (
    <Box
      id="features"
      py={sectionPadding}
      bg={THEME_CONSTANTS.COLORS.BACKGROUND_LIGHT}
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top="10%"
        left="5%"
        w="300px"
        h="300px"
        bg="purple.100"
        borderRadius="full"
        opacity={0.1}
        filter="blur(80px)"
        animation="float 15s ease-in-out infinite"
      />
      <Box
        position="absolute"
        bottom="20%"
        right="5%"
        w="250px"
        h="250px"
        bg="blue.100"
        borderRadius="full"
        opacity={0.1}
        filter="blur(80px)"
        animation="float 20s ease-in-out infinite reverse"
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        w="200px"
        h="200px"
        bg="pink.100"
        borderRadius="full"
        opacity={0.05}
        filter="blur(100px)"
        animation="float 25s ease-in-out infinite"
      />

      <Container maxW="container.xl" px={{ base: 4, md: 6 }} position="relative">
        <VStack gap={{ base: 12, md: 16 }}>
          <Box textAlign="center">
            <Badge
              colorScheme="purple"
              variant="subtle"
              px={4}
              py={2}
              borderRadius="full"
              fontSize="sm"
              fontWeight="semibold"
              mb={4}
              animation="pulse 3s ease-in-out infinite"
            >
              {LANDING_PAGE_CONSTANTS.FEATURES.BADGE}
            </Badge>
            <Heading
              size={{ base: "lg", md: "xl" }}
              mb={THEME_CONSTANTS.SPACING.SM}
              bgGradient="linear(to-r, purple.600, blue.600)"
              bgClip="text"
            >
              {LANDING_PAGE_CONSTANTS.FEATURES.TITLE}
            </Heading>
            <Text
              fontSize={{ base: "md", md: "lg" }}
              color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}
              maxW="2xl"
              lineHeight="tall"
            >
              {LANDING_PAGE_CONSTANTS.FEATURES.DESCRIPTION}
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: 6, md: 8 }}>
            {LANDING_PAGE_CONSTANTS.FEATURES.ITEMS.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}
