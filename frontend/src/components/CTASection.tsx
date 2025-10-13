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

import { LANDING_PAGE_CONSTANTS } from "../constants/landingPage";
import { THEME_CONSTANTS } from "../theme/constants";
import { useNavigate } from "react-router-dom";

export default function CTASection() {
  const sectionPadding = useBreakpointValue({ base: 12, md: 20 });
  const navigate = useNavigate();

  return (
    <Box
      py={sectionPadding}
      bg={THEME_CONSTANTS.COLORS.WHITE}
      position="relative"
      overflow="hidden"
    >
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
              {LANDING_PAGE_CONSTANTS.CTA.TITLE}
            </Heading>
            <Text
              fontSize={{ base: "md", md: "lg" }}
              color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}
              maxW="xl"
              lineHeight="tall"
            >
              {LANDING_PAGE_CONSTANTS.CTA.DESCRIPTION}
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
                onClick={() => navigate("/signup")}
                _hover={{
                  transform: "translateY(-3px) scale(1.02)",
                  boxShadow: "2xl",
                  _before: {
                    left: "100%",
                  },
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
              >
                {LANDING_PAGE_CONSTANTS.CTA.PRIMARY_CTA}
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
                {LANDING_PAGE_CONSTANTS.CTA.SECONDARY_CTA}
              </Button>
            </HStack>

            <HStack gap={8} mt={6} wrap="wrap" justify="center">
              <HStack gap={2}>
                <Icon as={FaUsers} color="green.500" />
                <Text fontSize="sm" color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}>
                  {LANDING_PAGE_CONSTANTS.CTA.TRUST_INDICATORS.FREE}
                </Text>
              </HStack>
              <HStack gap={2}>
                <Icon as={FaGithub} color="gray.600" />
                <Text fontSize="sm" color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}>
                  {LANDING_PAGE_CONSTANTS.CTA.TRUST_INDICATORS.VERIFIED}
                </Text>
              </HStack>
              <HStack gap={2}>
                <Icon as={FaHeart} color="red.500" />
                <Text fontSize="sm" color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}>
                  {LANDING_PAGE_CONSTANTS.CTA.TRUST_INDICATORS.CONNECTIONS}
                </Text>
              </HStack>
            </HStack>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
