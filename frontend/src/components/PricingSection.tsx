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

import { THEME_CONSTANTS } from "../theme/constants";

export default function PricingSection() {
  const sectionPadding = useBreakpointValue({ base: 12, md: 20 });

  return (
    <Box
      id="pricing"
      py={sectionPadding}
      bg={THEME_CONSTANTS.COLORS.BACKGROUND_LIGHT}
      position="relative"
      overflow="hidden"
    >
      {/* Background Elements */}
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
              💰 Pricing Plans
            </Badge>
            <Heading size={{ base: "lg", md: "xl" }} mb={THEME_CONSTANTS.SPACING.SM}>
              Simple, Transparent Pricing
            </Heading>
            <Text
              fontSize={{ base: "md", md: "lg" }}
              color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}
              maxW="2xl"
            >
              Choose the plan that fits your coding journey. No hidden fees, no surprises.
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: 6, md: 8 }}>
            {/* Free Plan */}
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
                    Free
                  </Heading>
                  <Text color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY} fontSize="sm">
                    Perfect for getting started
                  </Text>
                </Box>

                <Box>
                  <Text fontSize="3xl" fontWeight="bold" color={THEME_CONSTANTS.COLORS.PRIMARY}>
                    $0
                  </Text>
                  <Text color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY} fontSize="sm">
                    forever
                  </Text>
                </Box>

                <VStack gap={3} align="stretch">
                  <HStack gap={2}>
                    <Icon as={FaCode} color="green.500" boxSize={4} />
                    <Text fontSize="sm" color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}>
                      Basic profile matching
                    </Text>
                  </HStack>
                  <HStack gap={2}>
                    <Icon as={FaHeart} color="green.500" boxSize={4} />
                    <Text fontSize="sm" color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}>
                      Up to 10 matches per day
                    </Text>
                  </HStack>
                  <HStack gap={2}>
                    <Icon as={FaUsers} color="green.500" boxSize={4} />
                    <Text fontSize="sm" color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}>
                      Community access
                    </Text>
                  </HStack>
                </VStack>

                <Button variant="outline" colorScheme="purple" w="full" mt={4}>
                  Get Started Free
                </Button>
              </VStack>
            </Box>

            {/* Pro Plan */}
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
                Most Popular
              </Badge>

              <VStack gap={4} align="stretch">
                <Box>
                  <Heading size="md" color={THEME_CONSTANTS.COLORS.TEXT_PRIMARY}>
                    Pro
                  </Heading>
                  <Text color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY} fontSize="sm">
                    For serious developers
                  </Text>
                </Box>

                <Box>
                  <Text fontSize="3xl" fontWeight="bold" color={THEME_CONSTANTS.COLORS.PRIMARY}>
                    $19
                  </Text>
                  <Text color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY} fontSize="sm">
                    per month
                  </Text>
                </Box>

                <VStack gap={3} align="stretch">
                  <HStack gap={2}>
                    <Icon as={FaCode} color="green.500" boxSize={4} />
                    <Text fontSize="sm" color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}>
                      Advanced matching algorithm
                    </Text>
                  </HStack>
                  <HStack gap={2}>
                    <Icon as={FaHeart} color="green.500" boxSize={4} />
                    <Text fontSize="sm" color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}>
                      Unlimited matches
                    </Text>
                  </HStack>
                  <HStack gap={2}>
                    <Icon as={FaRocket} color="green.500" boxSize={4} />
                    <Text fontSize="sm" color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}>
                      Priority support
                    </Text>
                  </HStack>
                  <HStack gap={2}>
                    <Icon as={FaGithub} color="green.500" boxSize={4} />
                    <Text fontSize="sm" color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}>
                      GitHub integration
                    </Text>
                  </HStack>
                </VStack>

                <Button colorScheme="purple" w="full" mt={4}>
                  Start Pro Trial
                </Button>
              </VStack>
            </Box>

            {/* Enterprise Plan */}
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
                    Enterprise
                  </Heading>
                  <Text color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY} fontSize="sm">
                    For teams and companies
                  </Text>
                </Box>

                <Box>
                  <Text fontSize="3xl" fontWeight="bold" color={THEME_CONSTANTS.COLORS.PRIMARY}>
                    Custom
                  </Text>
                  <Text color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY} fontSize="sm">
                    contact us
                  </Text>
                </Box>

                <VStack gap={3} align="stretch">
                  <HStack gap={2}>
                    <Icon as={FaCode} color="green.500" boxSize={4} />
                    <Text fontSize="sm" color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}>
                      Custom matching criteria
                    </Text>
                  </HStack>
                  <HStack gap={2}>
                    <Icon as={FaUsers} color="green.500" boxSize={4} />
                    <Text fontSize="sm" color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}>
                      Team collaboration tools
                    </Text>
                  </HStack>
                  <HStack gap={2}>
                    <Icon as={FaRocket} color="green.500" boxSize={4} />
                    <Text fontSize="sm" color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}>
                      Dedicated support
                    </Text>
                  </HStack>
                  <HStack gap={2}>
                    <Icon as={FaGithub} color="green.500" boxSize={4} />
                    <Text fontSize="sm" color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}>
                      API access
                    </Text>
                  </HStack>
                </VStack>

                <Button variant="outline" colorScheme="purple" w="full" mt={4}>
                  Contact Sales
                </Button>
              </VStack>
            </Box>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}
