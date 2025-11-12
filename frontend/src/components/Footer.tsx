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
import { Link as RouterLink } from "react-router-dom";

import { LANDING_PAGE_CONSTANTS } from "../constants/landingPage";
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
                {LANDING_PAGE_CONSTANTS.APP.NAME}
              </Heading>
              <Text color={THEME_CONSTANTS.COLORS.TEXT_MUTED} fontSize={{ base: "sm", md: "md" }}>
                {LANDING_PAGE_CONSTANTS.APP.TAGLINE}
              </Text>
              <HStack gap={3}>
                <IconButton
                  aria-label={LANDING_PAGE_CONSTANTS.FOOTER.SOCIAL_MEDIA.GITHUB}
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
                  aria-label={LANDING_PAGE_CONSTANTS.FOOTER.SOCIAL_MEDIA.TWITTER}
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
                  aria-label={LANDING_PAGE_CONSTANTS.FOOTER.SOCIAL_MEDIA.LINKEDIN}
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
              <Heading size="sm">{LANDING_PAGE_CONSTANTS.FOOTER.SECTIONS.PRODUCT.TITLE}</Heading>
              {LANDING_PAGE_CONSTANTS.FOOTER.SECTIONS.PRODUCT.LINKS.map((link, idx) => (
                <Text
                  key={idx}
                  color={THEME_CONSTANTS.COLORS.TEXT_MUTED}
                  cursor="pointer"
                  _hover={{ color: THEME_CONSTANTS.COLORS.WHITE }}
                  fontSize={{ base: "sm", md: "md" }}
                >
                  {link}
                </Text>
              ))}
            </VStack>

            <VStack align="start" gap={3}>
              <Heading size="sm">{LANDING_PAGE_CONSTANTS.FOOTER.SECTIONS.COMPANY.TITLE}</Heading>
              {LANDING_PAGE_CONSTANTS.FOOTER.SECTIONS.COMPANY.LINKS.map((link, idx) => (
                <Text
                  key={idx}
                  color={THEME_CONSTANTS.COLORS.TEXT_MUTED}
                  cursor="pointer"
                  _hover={{ color: THEME_CONSTANTS.COLORS.WHITE }}
                  fontSize={{ base: "sm", md: "md" }}
                >
                  {link}
                </Text>
              ))}
            </VStack>

            <VStack align="start" gap={3}>
              <Heading size="sm">{LANDING_PAGE_CONSTANTS.FOOTER.SECTIONS.SUPPORT.TITLE}</Heading>
              {LANDING_PAGE_CONSTANTS.FOOTER.SECTIONS.SUPPORT.LINKS.map((link, idx) => (
                <Text
                  key={idx}
                  color={THEME_CONSTANTS.COLORS.TEXT_MUTED}
                  cursor="pointer"
                  _hover={{ color: THEME_CONSTANTS.COLORS.WHITE }}
                  fontSize={{ base: "sm", md: "md" }}
                >
                  {link}
                </Text>
              ))}
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
              {LANDING_PAGE_CONSTANTS.FOOTER.COPYRIGHT}
            </Text>
            <HStack gap={{ base: 4, md: 6 }}>
              {LANDING_PAGE_CONSTANTS.FOOTER.LEGAL_LINKS.map((link, idx) => (
                <Text
                  key={idx}
                  as={RouterLink}
                  to={link.PATH}
                  color={THEME_CONSTANTS.COLORS.TEXT_MUTED}
                  cursor="pointer"
                  _hover={{ color: THEME_CONSTANTS.COLORS.WHITE }}
                  textDecoration="none"
                  fontSize={{ base: "sm", md: "md" }}
                >
                  {link.LABEL}
                </Text>
              ))}
            </HStack>
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
}
