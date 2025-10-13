import {
  Badge,
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

import { FaArrowRight } from "react-icons/fa";
import FloatingEmojis from "./FloatingEmojis";
import { LANDING_PAGE_CONSTANTS } from "../constants/landingPage";
import { THEME_CONSTANTS } from "../theme/constants";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const heroPadding = useBreakpointValue({ base: 12, md: 20 });
  const navigate = useNavigate();

  return (
    <Box
      bg={THEME_CONSTANTS.GRADIENTS.HERO}
      color={THEME_CONSTANTS.COLORS.WHITE}
      py={heroPadding}
      position="relative"
      overflow="hidden"
      minH="100vh"
      display="flex"
      alignItems="center"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.1}
        backgroundImage="radial-gradient(circle at 25% 25%, white 2px, transparent 2px), radial-gradient(circle at 75% 75%, white 2px, transparent 2px), radial-gradient(circle at 50% 50%, pink.200 1px, transparent 1px)"
        backgroundSize="50px 50px, 50px 50px, 30px 30px"
        animation="float 20s ease-in-out infinite"
      />

      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        background="linear-gradient(135deg, rgba(139, 69, 19, 0.1) 0%, rgba(75, 0, 130, 0.15) 25%, rgba(255, 20, 147, 0.1) 50%, rgba(0, 191, 255, 0.1) 75%, rgba(138, 43, 226, 0.1) 100%)"
        opacity={0.3}
      />

      <Box
        position="absolute"
        top="-20%"
        left="-10%"
        w="400px"
        h="400px"
        bg="linear-gradient(45deg, purple.400, pink.400)"
        borderRadius="full"
        opacity={0.1}
        filter="blur(60px)"
        animation="float 15s ease-in-out infinite"
      />
      <Box
        position="absolute"
        bottom="-20%"
        right="-10%"
        w="350px"
        h="350px"
        bg="linear-gradient(45deg, blue.400, cyan.400)"
        borderRadius="full"
        opacity={0.1}
        filter="blur(60px)"
        animation="float 18s ease-in-out infinite reverse"
      />
      <Box
        position="absolute"
        top="30%"
        right="-5%"
        w="300px"
        h="300px"
        bg="linear-gradient(45deg, pink.400, purple.400)"
        borderRadius="full"
        opacity={0.08}
        filter="blur(50px)"
        animation="float 12s ease-in-out infinite"
      />

      <FloatingEmojis />

      <Container maxW="container.lg" textAlign="center" px={{ base: 4, md: 6 }} position="relative">
        <VStack gap={{ base: 1, md: 2 }}>
          <Box
            position="relative"
            _before={{
              content: '""',
              position: "absolute",
              inset: "-2px",
              borderRadius: "full",
              background: "linear-gradient(45deg, purple.400, pink.400, blue.400)",
              opacity: 0.3,
              animation: "spin 3s linear infinite",
            }}
          >
            <Badge
              colorScheme="purple"
              variant="solid"
              px={{ base: 2, md: 4 }}
              py={2}
              borderRadius={THEME_CONSTANTS.RADIUS.FULL}
              fontSize={{ base: "xs", md: "xs" }}
              fontWeight="bold"
              animation="pulse 2s ease-in-out infinite"
              _hover={{ transform: "scale(1.05)" }}
              transition="all 0.3s"
              position="relative"
              bg="rgba(255, 255, 255, 0.95)"
              color="purple.600"
              backdropFilter="blur(10px)"
              boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)"
            >
              {LANDING_PAGE_CONSTANTS.HERO.BADGE}
            </Badge>
          </Box>

          <VStack gap={6}>
            <Heading
              as="h1"
              size={{ base: "4xl", md: "6xl" }}
              fontWeight="black"
              lineHeight="shorter"
              textAlign="center"
              animation="fadeInUp 1s ease-out"
              position="relative"
              _before={{
                content: '""',
                position: "absolute",
                top: "-10px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "100px",
                height: "4px",
                background: "linear-gradient(90deg, pink.400, purple.400, blue.400)",
                borderRadius: "full",
                opacity: 0.6,
              }}
            >
              <Box
                as="span"
                color="white"
                display="block"
                mb={1}
                textShadow="0 2px 4px rgba(0, 0, 0, 0.5)"
                fontWeight="black"
              >
                {LANDING_PAGE_CONSTANTS.HERO.TITLE_LINE_1}
              </Box>
              <Box
                as="span"
                color="white"
                display="block"
                fontSize={{ base: "3xl", md: "5xl" }}
                fontWeight="extrabold"
                textShadow="0 2px 4px rgba(0, 0, 0, 0.5)"
              >
                {LANDING_PAGE_CONSTANTS.HERO.TITLE_LINE_2}
              </Box>
            </Heading>

            <Text
              fontSize={{ base: "lg", md: "xl" }}
              maxW="3xl"
              opacity={0.95}
              lineHeight="tall"
              fontWeight="medium"
              animation="fadeInUp 1s ease-out 0.2s both"
              textAlign="center"
              px={4}
              position="relative"
              _before={{
                content: '""',
                position: "absolute",
                left: "50%",
                bottom: "-10px",
                transform: "translateX(-50%)",
                width: "60px",
                height: "2px",
                background: "linear-gradient(90deg, transparent, pink.300, transparent)",
                borderRadius: "full",
              }}
            >
              {LANDING_PAGE_CONSTANTS.HERO.DESCRIPTION}
            </Text>
          </VStack>

          <VStack gap={6} w={{ base: "full", md: "auto" }}>
            <HStack
              marginTop={2}
              gap={6}
              w={{ base: "full", md: "auto" }}
              flexWrap="wrap"
              justify="center"
            >
              <Button
                size={{ base: "lg", md: "xl" }}
                colorScheme="white"
                variant="solid"
                bg="rgba(255, 255, 255, 0.95)"
                color={THEME_CONSTANTS.COLORS.PRIMARY}
                w={{ base: "full", md: "auto" }}
                px={10}
                py={6}
                fontWeight="bold"
                fontSize={{ base: "md", md: "lg" }}
                animation="fadeInUp 1s ease-out 0.4s both"
                onClick={() => navigate("/signup")}
                _hover={{
                  transform: "translateY(-4px) scale(1.03)",
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
                  bg: "white",
                  _before: {
                    left: "100%",
                  },
                }}
                transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                position="relative"
                overflow="hidden"
                borderRadius="xl"
                backdropFilter="blur(10px)"
                border="1px solid rgba(255, 255, 255, 0.2)"
                _before={{
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                  transition: "left 0.6s",
                }}
              >
                {LANDING_PAGE_CONSTANTS.HERO.PRIMARY_CTA}
                <Icon as={FaArrowRight} ml={3} />
              </Button>
              <Button
                size={{ base: "lg", md: "xl" }}
                variant="outline"
                color={THEME_CONSTANTS.COLORS.WHITE}
                borderColor="rgba(255, 255, 255, 0.3)"
                borderWidth="2px"
                animation="fadeInUp 1s ease-out 0.6s both"
                _hover={{
                  bg: "rgba(255, 255, 255, 0.1)",
                  color: THEME_CONSTANTS.COLORS.WHITE,
                  transform: "translateY(-4px) scale(1.03)",
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
                  borderColor: "rgba(255, 255, 255, 0.5)",
                }}
                w={{ base: "full", md: "auto" }}
                px={10}
                py={6}
                fontWeight="bold"
                fontSize={{ base: "md", md: "lg" }}
                transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                borderRadius="xl"
                backdropFilter="blur(10px)"
              >
                {LANDING_PAGE_CONSTANTS.HERO.SECONDARY_CTA}
              </Button>
            </HStack>

            <HStack gap={8} mt={4} wrap="wrap" justify="center" opacity={0.8}>
              <HStack gap={2}>
                <Box
                  w="8px"
                  h="8px"
                  bg="green.400"
                  borderRadius="full"
                  animation="pulse 2s ease-in-out infinite"
                />
                <Text fontSize="sm" fontWeight="medium">
                  {LANDING_PAGE_CONSTANTS.HERO.TRUST_INDICATORS.FREE}
                </Text>
              </HStack>
              <HStack gap={2}>
                <Box
                  w="8px"
                  h="8px"
                  bg="blue.400"
                  borderRadius="full"
                  animation="pulse 2s ease-in-out infinite 0.5s"
                />
                <Text fontSize="sm" fontWeight="medium">
                  {LANDING_PAGE_CONSTANTS.HERO.TRUST_INDICATORS.VERIFIED}
                </Text>
              </HStack>
              <HStack gap={2}>
                <Box
                  w="8px"
                  h="8px"
                  bg="pink.400"
                  borderRadius="full"
                  animation="pulse 2s ease-in-out infinite 1s"
                />
                <Text fontSize="sm" fontWeight="medium">
                  {LANDING_PAGE_CONSTANTS.HERO.TRUST_INDICATORS.CONNECTIONS}
                </Text>
              </HStack>
            </HStack>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
