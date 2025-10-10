import {
  Box,
  Container,
  Flex,
  HStack,
  Heading,
  IconButton,
  Separator,
  SimpleGrid,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

import { THEME_CONSTANTS } from "../theme/constants";

export default function Footer() {
  const footerPadding = useBreakpointValue({ base: 8, md: 12 });

  return (
    <Box
      bg={THEME_CONSTANTS.COLORS.BACKGROUND_DARK}
      color={THEME_CONSTANTS.COLORS.WHITE}
      py={footerPadding}
      position="relative"
      overflow="hidden"
    >
      {/* Footer Background Pattern */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.05}
        backgroundImage="radial-gradient(circle at 20% 20%, purple.500 1px, transparent 1px), radial-gradient(circle at 80% 80%, blue.500 1px, transparent 1px)"
        backgroundSize="30px 30px"
      />

      <Container maxW="container.xl" px={{ base: 4, md: 6 }} position="relative">
        <VStack gap={{ base: 6, md: 8 }}>
          <SimpleGrid columns={{ base: 1, md: 4 }} gap={{ base: 6, md: 8 }} w="full">
            <VStack align="start" gap={4}>
              <Heading size="md" color="purple.400">
                Push2Prod
              </Heading>
              <Text color={THEME_CONSTANTS.COLORS.TEXT_MUTED} fontSize={{ base: "sm", md: "md" }}>
                Connecting developers through code, creativity, and collaboration.
              </Text>
              <HStack gap={3}>
                <IconButton
                  aria-label="GitHub"
                  size="sm"
                  variant="ghost"
                  color="gray.400"
                  _hover={{
                    color: "white",
                    transform: "translateY(-2px) scale(1.1)",
                    bg: "gray.700",
                  }}
                  transition="all 0.2s ease"
                >
                  <FaGithub />
                </IconButton>
                <IconButton
                  aria-label="Twitter"
                  size="sm"
                  variant="ghost"
                  color="gray.400"
                  _hover={{
                    color: "white",
                    transform: "translateY(-2px) scale(1.1)",
                    bg: "gray.700",
                  }}
                  transition="all 0.2s ease"
                >
                  <FaTwitter />
                </IconButton>
                <IconButton
                  aria-label="LinkedIn"
                  size="sm"
                  variant="ghost"
                  color="gray.400"
                  _hover={{
                    color: "white",
                    transform: "translateY(-2px) scale(1.1)",
                    bg: "gray.700",
                  }}
                  transition="all 0.2s ease"
                >
                  <FaLinkedin />
                </IconButton>
              </HStack>
            </VStack>

            <VStack align="start" gap={3}>
              <Heading size="sm">Product</Heading>
              <Text
                color={THEME_CONSTANTS.COLORS.TEXT_MUTED}
                cursor="pointer"
                _hover={{ color: THEME_CONSTANTS.COLORS.WHITE }}
                fontSize={{ base: "sm", md: "md" }}
              >
                Features
              </Text>
              <Text
                color={THEME_CONSTANTS.COLORS.TEXT_MUTED}
                cursor="pointer"
                _hover={{ color: THEME_CONSTANTS.COLORS.WHITE }}
                fontSize={{ base: "sm", md: "md" }}
              >
                Pricing
              </Text>
              <Text
                color={THEME_CONSTANTS.COLORS.TEXT_MUTED}
                cursor="pointer"
                _hover={{ color: THEME_CONSTANTS.COLORS.WHITE }}
                fontSize={{ base: "sm", md: "md" }}
              >
                API
              </Text>
            </VStack>

            <VStack align="start" gap={3}>
              <Heading size="sm">Company</Heading>
              <Text
                color={THEME_CONSTANTS.COLORS.TEXT_MUTED}
                cursor="pointer"
                _hover={{ color: THEME_CONSTANTS.COLORS.WHITE }}
                fontSize={{ base: "sm", md: "md" }}
              >
                About
              </Text>
              <Text
                color={THEME_CONSTANTS.COLORS.TEXT_MUTED}
                cursor="pointer"
                _hover={{ color: THEME_CONSTANTS.COLORS.WHITE }}
                fontSize={{ base: "sm", md: "md" }}
              >
                Blog
              </Text>
              <Text
                color={THEME_CONSTANTS.COLORS.TEXT_MUTED}
                cursor="pointer"
                _hover={{ color: THEME_CONSTANTS.COLORS.WHITE }}
                fontSize={{ base: "sm", md: "md" }}
              >
                Careers
              </Text>
            </VStack>

            <VStack align="start" gap={3}>
              <Heading size="sm">Support</Heading>
              <Text
                color={THEME_CONSTANTS.COLORS.TEXT_MUTED}
                cursor="pointer"
                _hover={{ color: THEME_CONSTANTS.COLORS.WHITE }}
                fontSize={{ base: "sm", md: "md" }}
              >
                Help Center
              </Text>
              <Text
                color={THEME_CONSTANTS.COLORS.TEXT_MUTED}
                cursor="pointer"
                _hover={{ color: THEME_CONSTANTS.COLORS.WHITE }}
                fontSize={{ base: "sm", md: "md" }}
              >
                Contact
              </Text>
              <Text
                color={THEME_CONSTANTS.COLORS.TEXT_MUTED}
                cursor="pointer"
                _hover={{ color: THEME_CONSTANTS.COLORS.WHITE }}
                fontSize={{ base: "sm", md: "md" }}
              >
                Privacy
              </Text>
            </VStack>
          </SimpleGrid>

          <Separator borderColor="gray.700" />

          <Flex
            justify="space-between"
            w="full"
            align="center"
            direction={{ base: "column", md: "row" }}
            gap={{ base: 4, md: 0 }}
          >
            <Text color={THEME_CONSTANTS.COLORS.TEXT_MUTED} fontSize={{ base: "sm", md: "md" }}>
              © 2024 Push2Prod. All rights reserved.
            </Text>
            <HStack gap={{ base: 4, md: 6 }}>
              <Text
                color={THEME_CONSTANTS.COLORS.TEXT_MUTED}
                cursor="pointer"
                _hover={{ color: THEME_CONSTANTS.COLORS.WHITE }}
                fontSize={{ base: "sm", md: "md" }}
              >
                Terms
              </Text>
              <Text
                color={THEME_CONSTANTS.COLORS.TEXT_MUTED}
                cursor="pointer"
                _hover={{ color: THEME_CONSTANTS.COLORS.WHITE }}
                fontSize={{ base: "sm", md: "md" }}
              >
                Privacy
              </Text>
              <Text
                color={THEME_CONSTANTS.COLORS.TEXT_MUTED}
                cursor="pointer"
                _hover={{ color: THEME_CONSTANTS.COLORS.WHITE }}
                fontSize={{ base: "sm", md: "md" }}
              >
                Cookies
              </Text>
            </HStack>
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
}
