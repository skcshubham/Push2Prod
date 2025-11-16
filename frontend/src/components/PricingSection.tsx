import {
  Badge,
  Box,
  Button,
  Container,
  HStack,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  FaCheckCircle,
  FaCode,
  FaComments,
  FaGithub,
  FaHeart,
  FaInfinity,
  FaPaperPlane,
  FaRocket,
  FaShieldAlt,
  FaStar,
  FaUsers,
} from "react-icons/fa";

import { LANDING_PAGE_CONSTANTS } from "../constants/landingPage";
import React from "react";
import { THEME_CONSTANTS } from "../theme/constants";

export default function PricingSection() {
  const sectionPadding = useBreakpointValue({ base: 12, md: 20 });

  const iconMap = {
    FaCode,
    FaGithub,
    FaHeart,
    FaRocket,
    FaUsers,
    FaComments,
    FaInfinity,
    FaPaperPlane,
    FaShieldAlt,
    FaCheckCircle,
    FaStar,
  };

  const plans = Object.values(LANDING_PAGE_CONSTANTS.PRICING.PLANS);

  return (
    <Box
      id="pricing"
      py={sectionPadding}
      bg={THEME_CONSTANTS.COLORS.BACKGROUND_LIGHT}
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top="10%"
        right="5%"
        w="200px"
        h="200px"
        bg="purple.100"
        borderRadius="full"
        opacity={0.3}
        filter="blur(60px)"
      />
      <Box
        position="absolute"
        bottom="20%"
        left="5%"
        w="150px"
        h="150px"
        bg="blue.100"
        borderRadius="full"
        opacity={0.3}
        filter="blur(60px)"
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
            >
              {LANDING_PAGE_CONSTANTS.PRICING.BADGE}
            </Badge>
            <Heading size={{ base: "lg", md: "xl" }} mb={THEME_CONSTANTS.SPACING.SM}>
              {LANDING_PAGE_CONSTANTS.PRICING.TITLE}
            </Heading>
            <Text
              fontSize={{ base: "md", md: "lg" }}
              color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}
              maxW="2xl"
            >
              {LANDING_PAGE_CONSTANTS.PRICING.DESCRIPTION}
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: plans.length }} gap={{ base: 6, md: 8 }}>
            {plans.map((plan) => {
              const isFeatured = Boolean(plan.BADGE);

              return (
                <Box
                  key={plan.NAME}
                  bg={THEME_CONSTANTS.COLORS.WHITE}
                  borderRadius={THEME_CONSTANTS.RADIUS.LG}
                  boxShadow={isFeatured ? THEME_CONSTANTS.SHADOWS.LG : THEME_CONSTANTS.SHADOWS.SM}
                  border={isFeatured ? "2px solid" : "1px solid"}
                  borderColor={isFeatured ? THEME_CONSTANTS.COLORS.PRIMARY : "gray.200"}
                  p={6}
                  position="relative"
                  transform={isFeatured ? { base: "none", md: "scale(1.05)" } : "none"}
                  h="100%"
                  display="flex"
                  flexDirection="column"
                  _hover={{
                    transform: isFeatured
                      ? { base: "translateY(-4px)", md: "translateY(-4px) scale(1.05)" }
                      : "translateY(-4px)",
                    boxShadow: isFeatured ? "2xl" : "xl",
                    borderColor: isFeatured ? "purple.500" : "purple.300",
                  }}
                  transition="all 0.3s ease"
                  _before={
                    isFeatured
                      ? {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          height: "4px",
                          background: "linear-gradient(90deg, purple.500, blue.500)",
                          borderRadius: "lg lg 0 0",
                        }
                      : undefined
                  }
                >
                  {plan.BADGE && (
                    <Badge
                      position="absolute"
                      top={-2}
                      left="50%"
                      transform="translateX(-50%)"
                      colorScheme="purple"
                      borderRadius="full"
                      px={3}
                      py={1}
                    >
                      {plan.BADGE}
                    </Badge>
                  )}

                  <VStack gap={4} align="stretch">
                    <Box>
                      <Heading size="md" color={THEME_CONSTANTS.COLORS.TEXT_PRIMARY}>
                        {plan.NAME}
                      </Heading>
                      <Text color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY} fontSize="sm">
                        {plan.DESCRIPTION}
                      </Text>
                    </Box>

                    <Box>
                      <Text fontSize="3xl" fontWeight="bold" color={THEME_CONSTANTS.COLORS.PRIMARY}>
                        {plan.PRICE}
                      </Text>
                      <Text color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY} fontSize="sm">
                        {plan.PERIOD}
                      </Text>
                    </Box>

                    <VStack gap={3} align="stretch" flex={1}>
                      {plan.FEATURES.map((feature, idx) => (
                        <HStack key={idx} gap={2}>
                          {React.createElement(iconMap[feature.icon as keyof typeof iconMap], {
                            color: "green",
                            style: { width: "16px", height: "16px" },
                          })}
                          <Text fontSize="sm" color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}>
                            {feature.text}
                          </Text>
                        </HStack>
                      ))}
                    </VStack>

                    <Button colorScheme="purple" w="full" mt="auto" variant={isFeatured ? "solid" : "outline"}>
                      {plan.CTA}
                    </Button>
                  </VStack>
                </Box>
              );
            })}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}
