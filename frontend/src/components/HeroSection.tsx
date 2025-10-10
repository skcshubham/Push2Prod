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
import { THEME_CONSTANTS } from "../theme/constants";

export default function HeroSection() {
  const heroPadding = useBreakpointValue({ base: 12, md: 20 });

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
      {/* Enhanced Background Pattern */}
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

      {/* Gradient Overlays */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        background="linear-gradient(135deg, rgba(139, 69, 19, 0.1) 0%, rgba(75, 0, 130, 0.15) 25%, rgba(255, 20, 147, 0.1) 50%, rgba(0, 191, 255, 0.1) 75%, rgba(138, 43, 226, 0.1) 100%)"
        opacity={0.3}
      />

      {/* Animated Gradient Orbs */}
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

      {/* Floating Elements - Heart and Code Symbols */}
      <Box
        position="absolute"
        top="15%"
        left="8%"
        w="50px"
        h="50px"
        bg="pink.200"
        borderRadius="full"
        opacity={0.2}
        animation="float 6s ease-in-out infinite"
        _before={{
          content: '"💕"',
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "20px",
        }}
      />
      <Box
        position="absolute"
        top="70%"
        right="12%"
        w="40px"
        h="40px"
        bg="purple.200"
        borderRadius="full"
        opacity={0.2}
        animation="float 8s ease-in-out infinite reverse"
        _before={{
          content: '"💻"',
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "16px",
        }}
      />
      <Box
        position="absolute"
        bottom="25%"
        left="15%"
        w="35px"
        h="35px"
        bg="blue.200"
        borderRadius="full"
        opacity={0.2}
        animation="float 10s ease-in-out infinite"
        _before={{
          content: '"❤️"',
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "14px",
        }}
      />
      <Box
        position="absolute"
        top="40%"
        right="25%"
        w="45px"
        h="45px"
        bg="white"
        borderRadius="full"
        opacity={0.15}
        animation="float 7s ease-in-out infinite"
        _before={{
          content: '"⚡"',
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "18px",
        }}
      />

      {/* Additional Floating Elements */}
      <Box
        position="absolute"
        top="60%"
        left="5%"
        w="25px"
        h="25px"
        bg="pink.300"
        borderRadius="full"
        opacity={0.3}
        animation="float 9s ease-in-out infinite"
        _before={{
          content: '"💖"',
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "12px",
        }}
      />
      <Box
        position="absolute"
        top="20%"
        right="8%"
        w="30px"
        h="30px"
        bg="purple.300"
        borderRadius="full"
        opacity={0.25}
        animation="float 11s ease-in-out infinite reverse"
        _before={{
          content: '"👨‍💻"',
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "14px",
        }}
      />
      <Box
        position="absolute"
        bottom="40%"
        right="20%"
        w="28px"
        h="28px"
        bg="blue.300"
        borderRadius="full"
        opacity={0.2}
        animation="float 13s ease-in-out infinite"
        _before={{
          content: '"💝"',
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "13px",
        }}
      />

      {/* Subtle Grid Pattern */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.05}
        backgroundImage="linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)"
        backgroundSize="20px 20px"
      />

      {/* Particle System */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.4}
        backgroundImage="radial-gradient(circle at 20% 20%, rgba(255, 182, 193, 0.3) 1px, transparent 1px), radial-gradient(circle at 80% 80%, rgba(221, 160, 221, 0.3) 1px, transparent 1px), radial-gradient(circle at 40% 60%, rgba(135, 206, 235, 0.3) 1px, transparent 1px), radial-gradient(circle at 60% 40%, rgba(255, 192, 203, 0.3) 1px, transparent 1px), radial-gradient(circle at 10% 90%, rgba(186, 85, 211, 0.3) 1px, transparent 1px), radial-gradient(circle at 90% 10%, rgba(255, 105, 180, 0.3) 1px, transparent 1px)"
        backgroundSize="100px 100px, 80px 80px, 120px 120px, 90px 90px, 110px 110px, 70px 70px"
        animation="float 25s ease-in-out infinite"
      />

      {/* Floating Code Symbols */}
      <Box
        position="absolute"
        top="10%"
        left="20%"
        w="20px"
        h="20px"
        bg="transparent"
        opacity={0.6}
        animation="float 14s ease-in-out infinite"
        _before={{
          content: '"{ }"',
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "12px",
          color: "white",
          fontWeight: "bold",
        }}
      />
      <Box
        position="absolute"
        top="80%"
        left="30%"
        w="18px"
        h="18px"
        bg="transparent"
        opacity={0.5}
        animation="float 16s ease-in-out infinite reverse"
        _before={{
          content: '"</>"',
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "10px",
          color: "white",
          fontWeight: "bold",
        }}
      />
      <Box
        position="absolute"
        top="50%"
        left="80%"
        w="16px"
        h="16px"
        bg="transparent"
        opacity={0.4}
        animation="float 18s ease-in-out infinite"
        _before={{
          content: '"<>"',
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "9px",
          color: "white",
          fontWeight: "bold",
        }}
      />

      {/* More Romantic Elements */}
      <Box
        position="absolute"
        top="25%"
        left="70%"
        w="22px"
        h="22px"
        bg="transparent"
        opacity={0.7}
        animation="float 13s ease-in-out infinite"
        _before={{
          content: '"💘"',
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "16px",
        }}
      />
      <Box
        position="absolute"
        top="75%"
        right="30%"
        w="24px"
        h="24px"
        bg="transparent"
        opacity={0.6}
        animation="float 15s ease-in-out infinite reverse"
        _before={{
          content: '"💕"',
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "18px",
        }}
      />
      <Box
        position="absolute"
        top="35%"
        right="60%"
        w="20px"
        h="20px"
        bg="transparent"
        opacity={0.5}
        animation="float 17s ease-in-out infinite"
        _before={{
          content: '"💖"',
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "14px",
        }}
      />

      {/* Tech Icons */}
      <Box
        position="absolute"
        top="65%"
        left="25%"
        w="26px"
        h="26px"
        bg="transparent"
        opacity={0.4}
        animation="float 19s ease-in-out infinite"
        _before={{
          content: '"⚙️"',
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "16px",
        }}
      />
      <Box
        position="absolute"
        top="45%"
        right="40%"
        w="24px"
        h="24px"
        bg="transparent"
        opacity={0.3}
        animation="float 21s ease-in-out infinite reverse"
        _before={{
          content: '"🔧"',
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "15px",
        }}
      />

      {/* Additional Gradient Blobs */}
      <Box
        position="absolute"
        top="5%"
        right="30%"
        w="200px"
        h="200px"
        bg="linear-gradient(45deg, rgba(255, 182, 193, 0.1), rgba(221, 160, 221, 0.1))"
        borderRadius="full"
        opacity={0.3}
        filter="blur(40px)"
        animation="float 22s ease-in-out infinite"
      />
      <Box
        position="absolute"
        bottom="5%"
        left="30%"
        w="180px"
        h="180px"
        bg="linear-gradient(45deg, rgba(135, 206, 235, 0.1), rgba(255, 192, 203, 0.1))"
        borderRadius="full"
        opacity={0.25}
        filter="blur(35px)"
        animation="float 24s ease-in-out infinite reverse"
      />

      {/* Animated Lines */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        opacity={0.1}
        backgroundImage="linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%), linear-gradient(-45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)"
        backgroundSize="100px 100px, 100px 100px"
        animation="float 30s linear infinite"
      />

      <Container maxW="container.lg" textAlign="center" px={{ base: 4, md: 6 }} position="relative">
        <VStack gap={{ base: 1, md: 2 }}>
          {/* Enhanced Badge */}
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
              💕 Where Code Meets Romance
            </Badge>
          </Box>

          {/* Enhanced Heading Section */}
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
                Find Your Perfect
              </Box>
              <Box
                as="span"
                color="white"
                display="block"
                fontSize={{ base: "3xl", md: "5xl" }}
                fontWeight="extrabold"
                textShadow="0 2px 4px rgba(0, 0, 0, 0.5)"
              >
                Coding Partner
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
              Swipe right on developers who share your coding passion, tech stack, and dreams. Build
              meaningful connections that go beyond just code.
            </Text>
          </VStack>

          {/* Enhanced CTA Section */}
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
                Start Swiping
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
                View Code
              </Button>
            </HStack>

            {/* Trust Indicators */}
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
                  Free to join
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
                  Verified profiles
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
