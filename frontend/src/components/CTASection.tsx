import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaArrowRight, FaGithub, FaHeart, FaUsers } from "react-icons/fa";

import { THEME_CONSTANTS } from "../theme/constants";

export default function CTASection() {
  const sectionPadding = useBreakpointValue({ base: 12, md: 20 });

  return (
    <Box
      py={sectionPadding}
      bg={THEME_CONSTANTS.COLORS.WHITE}
      position="relative"
      overflow="hidden"
    >
      {/* Enhanced Background Elements */}
      <Box
        position="absolute"
        top="20%"
        left="10%"
        w="120px"
        h="120px"
        bg="purple.100"
        borderRadius="full"
        opacity={0.4}
        filter="blur(50px)"
        animation="float 6s ease-in-out infinite"
      />
      <Box
        position="absolute"
        bottom="20%"
        right="10%"
        w="180px"
        h="180px"
        bg="blue.100"
        borderRadius="full"
        opacity={0.4}
        filter="blur(50px)"
        animation="float 8s ease-in-out infinite reverse"
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
        opacity={0.2}
        filter="blur(60px)"
        animation="float 10s ease-in-out infinite"
      />

      <Container maxW="container.lg" textAlign="center" px={{ base: 4, md: 6 }} position="relative">
        <VStack gap={{ base: 6, md: 8 }}>
          <VStack gap={4}>
            <Heading size={{ base: "lg", md: "xl" }} color={THEME_CONSTANTS.COLORS.TEXT_PRIMARY}>
              Ready to Swipe Right on Your Coding Soulmate?
            </Heading>
            <Text
              fontSize={{ base: "md", md: "lg" }}
              color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}
              maxW="xl"
              lineHeight="tall"
            >
              Join thousands of developers who have already found their perfect coding partners.
              Your next great collaboration is just a swipe away.
            </Text>
          </VStack>

          <VStack gap={4} w={{ base: "full", md: "auto" }}>
            <HStack gap={4} w={{ base: "full", md: "auto" }}>
              <Button
                size={{ base: "md", md: "lg" }}
                colorScheme="purple"
                w={{ base: "full", md: "auto" }}
                px={8}
                fontWeight="semibold"
                _hover={{
                  transform: "translateY(-3px) scale(1.02)",
                  boxShadow: "2xl",
                }}
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                position="relative"
                overflow="hidden"
                _before={{
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                  transition: "left 0.5s",
                }}
                _hover={{
                  _before: {
                    left: "100%",
                  },
                }}
              >
                Create Profile
                <Icon as={FaArrowRight} ml={2} />
              </Button>
              <Button
                size={{ base: "md", md: "lg" }}
                variant="outline"
                colorScheme="purple"
                w={{ base: "full", md: "auto" }}
                px={8}
                fontWeight="semibold"
                _hover={{
                  transform: "translateY(-3px) scale(1.02)",
                  boxShadow: "lg",
                  bg: "purple.50",
                }}
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              >
                Learn More
              </Button>
            </HStack>

            {/* Trust Indicators */}
            <HStack gap={8} mt={6} wrap="wrap" justify="center">
              <HStack gap={2}>
                <Icon as={FaUsers} color="green.500" />
                <Text fontSize="sm" color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}>
                  Free to swipe
                </Text>
              </HStack>
              <HStack gap={2}>
                <Icon as={FaGithub} color="gray.600" />
                <Text fontSize="sm" color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}>
                  Verified profiles
                </Text>
              </HStack>
              <HStack gap={2}>
                <Icon as={FaHeart} color="red.500" />
                <Text fontSize="sm" color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}>
                  Real connections
                </Text>
              </HStack>
            </HStack>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
