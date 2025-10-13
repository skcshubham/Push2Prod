import {
  Badge,
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Icon,
  SimpleGrid,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaCode, FaGithub, FaHeart, FaRocket, FaUsers } from "react-icons/fa";

import { LANDING_PAGE_CONSTANTS } from "../constants/landingPage";
import { THEME_CONSTANTS } from "../theme/constants";

export default function PricingSection() {
  const sectionPadding = useBreakpointValue({ base: 12, md: 20 });

  const iconMap = {
    FaCode,
    FaGithub,
    FaHeart,
    FaRocket,
    FaUsers,
  };

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

          <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: 6, md: 8 }}>
            <Box
              bg={THEME_CONSTANTS.COLORS.WHITE}
              borderRadius={THEME_CONSTANTS.RADIUS.LG}
              boxShadow={THEME_CONSTANTS.SHADOWS.SM}
              border="1px solid"
              borderColor="gray.200"
              p={6}
              position="relative"
              _hover={{
                transform: "translateY(-4px)",
                boxShadow: "xl",
                borderColor: "green.300",
              }}
              transition="all 0.3s ease"
            >
              <VStack gap={4} align="stretch">
                <Box>
                  <Heading size="md" color={THEME_CONSTANTS.COLORS.TEXT_PRIMARY}>
                    {LANDING_PAGE_CONSTANTS.PRICING.PLANS.FREE.NAME}
                  </Heading>
                  <Text color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY} fontSize="sm">
                    {LANDING_PAGE_CONSTANTS.PRICING.PLANS.FREE.DESCRIPTION}
                  </Text>
                </Box>

                <Box>
                  <Text fontSize="3xl" fontWeight="bold" color={THEME_CONSTANTS.COLORS.PRIMARY}>
                    {LANDING_PAGE_CONSTANTS.PRICING.PLANS.FREE.PRICE}
                  </Text>
                  <Text color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY} fontSize="sm">
                    {LANDING_PAGE_CONSTANTS.PRICING.PLANS.FREE.PERIOD}
                  </Text>
                </Box>

                <VStack gap={3} align="stretch">
                  {LANDING_PAGE_CONSTANTS.PRICING.PLANS.FREE.FEATURES.map((feature, idx) => (
                    <HStack key={idx} gap={2}>
                      <Icon
                        as={iconMap[feature.icon as keyof typeof iconMap]}
                        color="green.500"
                        boxSize={4}
                      />
                      <Text fontSize="sm" color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}>
                        {feature.text}
                      </Text>
                    </HStack>
                  ))}
                </VStack>

                <Button variant="outline" colorScheme="purple" w="full" mt={4}>
                  {LANDING_PAGE_CONSTANTS.PRICING.PLANS.FREE.CTA}
                </Button>
              </VStack>
            </Box>

            <Box
              bg={THEME_CONSTANTS.COLORS.WHITE}
              borderRadius={THEME_CONSTANTS.RADIUS.LG}
              boxShadow={THEME_CONSTANTS.SHADOWS.LG}
              border="2px solid"
              borderColor={THEME_CONSTANTS.COLORS.PRIMARY}
              p={6}
              position="relative"
              transform={{ base: "none", md: "scale(1.05)" }}
              _hover={{
                transform: { base: "translateY(-4px)", md: "translateY(-4px) scale(1.05)" },
                boxShadow: "2xl",
                borderColor: "purple.500",
              }}
              transition="all 0.3s ease"
              _before={{
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(90deg, purple.500, blue.500)",
                borderRadius: "lg lg 0 0",
              }}
            >
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
                {LANDING_PAGE_CONSTANTS.PRICING.PLANS.PRO.BADGE}
              </Badge>

              <VStack gap={4} align="stretch">
                <Box>
                  <Heading size="md" color={THEME_CONSTANTS.COLORS.TEXT_PRIMARY}>
                    {LANDING_PAGE_CONSTANTS.PRICING.PLANS.PRO.NAME}
                  </Heading>
                  <Text color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY} fontSize="sm">
                    {LANDING_PAGE_CONSTANTS.PRICING.PLANS.PRO.DESCRIPTION}
                  </Text>
                </Box>

                <Box>
                  <Text fontSize="3xl" fontWeight="bold" color={THEME_CONSTANTS.COLORS.PRIMARY}>
                    {LANDING_PAGE_CONSTANTS.PRICING.PLANS.PRO.PRICE}
                  </Text>
                  <Text color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY} fontSize="sm">
                    {LANDING_PAGE_CONSTANTS.PRICING.PLANS.PRO.PERIOD}
                  </Text>
                </Box>

                <VStack gap={3} align="stretch">
                  {LANDING_PAGE_CONSTANTS.PRICING.PLANS.PRO.FEATURES.map((feature, idx) => (
                    <HStack key={idx} gap={2}>
                      <Icon
                        as={iconMap[feature.icon as keyof typeof iconMap]}
                        color="green.500"
                        boxSize={4}
                      />
                      <Text fontSize="sm" color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}>
                        {feature.text}
                      </Text>
                    </HStack>
                  ))}
                </VStack>

                <Button colorScheme="purple" w="full" mt={4}>
                  {LANDING_PAGE_CONSTANTS.PRICING.PLANS.PRO.CTA}
                </Button>
              </VStack>
            </Box>

            <Box
              bg={THEME_CONSTANTS.COLORS.WHITE}
              borderRadius={THEME_CONSTANTS.RADIUS.LG}
              boxShadow={THEME_CONSTANTS.SHADOWS.SM}
              border="1px solid"
              borderColor="gray.200"
              p={6}
              position="relative"
              _hover={{
                transform: "translateY(-4px)",
                boxShadow: "xl",
                borderColor: "orange.300",
              }}
              transition="all 0.3s ease"
            >
              <VStack gap={4} align="stretch">
                <Box>
                  <Heading size="md" color={THEME_CONSTANTS.COLORS.TEXT_PRIMARY}>
                    {LANDING_PAGE_CONSTANTS.PRICING.PLANS.ENTERPRISE.NAME}
                  </Heading>
                  <Text color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY} fontSize="sm">
                    {LANDING_PAGE_CONSTANTS.PRICING.PLANS.ENTERPRISE.DESCRIPTION}
                  </Text>
                </Box>

                <Box>
                  <Text fontSize="3xl" fontWeight="bold" color={THEME_CONSTANTS.COLORS.PRIMARY}>
                    {LANDING_PAGE_CONSTANTS.PRICING.PLANS.ENTERPRISE.PRICE}
                  </Text>
                  <Text color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY} fontSize="sm">
                    {LANDING_PAGE_CONSTANTS.PRICING.PLANS.ENTERPRISE.PERIOD}
                  </Text>
                </Box>

                <VStack gap={3} align="stretch">
                  {LANDING_PAGE_CONSTANTS.PRICING.PLANS.ENTERPRISE.FEATURES.map((feature, idx) => (
                    <HStack key={idx} gap={2}>
                      <Icon
                        as={iconMap[feature.icon as keyof typeof iconMap]}
                        color="green.500"
                        boxSize={4}
                      />
                      <Text fontSize="sm" color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}>
                        {feature.text}
                      </Text>
                    </HStack>
                  ))}
                </VStack>

                <Button variant="outline" colorScheme="purple" w="full" mt={4}>
                  {LANDING_PAGE_CONSTANTS.PRICING.PLANS.ENTERPRISE.CTA}
                </Button>
              </VStack>
            </Box>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}
