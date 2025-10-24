import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { type FormEvent, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import FloatingEmojis from "../components/FloatingEmojis";
import { useSignupMutation } from "../services/api";
import { LANDING_PAGE_CONSTANTS } from "../constants/landingPage";
import { THEME_CONSTANTS } from "../theme/constants";

export default function SignUp() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const [signup, { isLoading, isError, error }] = useSignupMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await signup({ firstName, emailId, password }).unwrap();
      navigate("/signin");
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return (
    <Box minH="100vh" position="relative" overflow="hidden">
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg={THEME_CONSTANTS.GRADIENTS.HERO}
        opacity={0.95}
      />

      <FloatingEmojis />

      <Box position="absolute" top={6} left={6} zIndex={10}>
        <Button
          variant="ghost"
          color="white"
          onClick={() => navigate("/")}
          _hover={{
            bg: "rgba(255, 255, 255, 0.15)",
            transform: "translateX(-4px)",
            backdropFilter: "blur(10px)",
          }}
          transition="all 0.3s ease"
          backdropFilter="blur(5px)"
          borderRadius="full"
          px={6}
        >
          <FaArrowLeft style={{ marginRight: "8px" }} />
          Back to Home
        </Button>
      </Box>

      <Container
        maxW="md"
        py={20}
        display="flex"
        alignItems="center"
        justifyContent="center"
        minH="100vh"
        position="relative"
      >
        <Box
          bg="white"
          borderRadius="2xl"
          boxShadow="0 20px 60px rgba(0, 0, 0, 0.15)"
          p={{ base: 8, md: 10 }}
          w="full"
          maxW="600px"
          position="relative"
          _before={{
            content: '""',
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "120px",
            height: "4px",
            bgGradient: "linear(to-r, purple.500, pink.500, blue.500)",
            borderRadius: "0 0 full full",
          }}
        >
          <VStack gap={12} align="stretch">
            <VStack gap={3} textAlign="center" pt={6}>
              <Heading
                size={{ base: "2xl", md: "3xl" }}
                color={THEME_CONSTANTS.COLORS.TEXT_PRIMARY}
                fontWeight="bold"
                letterSpacing="tight"
                fontFamily="romantic"
              >
                {LANDING_PAGE_CONSTANTS.SIGN_UP.TITLE}
              </Heading>

              <Text color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY} fontSize="md" lineHeight="tall">
                {LANDING_PAGE_CONSTANTS.SIGN_UP.SUBTITLE}
              </Text>
            </VStack>

            <VStack gap={5} as="form" align="stretch" onSubmit={handleSubmit}>
              {isError && (
                <Box bg="red.50" borderRadius="md" p={3} border="1px solid" borderColor="red.200">
                  <Text fontSize="sm" color="red.600" fontWeight="medium">
                    {"data" in error &&
                    error.data &&
                    typeof error.data === "object" &&
                    "message" in error.data
                      ? error.data.message
                      : "Signup failed. Please try again."}
                  </Text>
                </Box>
              )}

              <Stack gap={2}>
                <Text fontSize="sm" fontWeight="medium" color={THEME_CONSTANTS.COLORS.TEXT_PRIMARY}>
                  {LANDING_PAGE_CONSTANTS.SIGN_UP.FORM.FIRST_NAME_LABEL}
                </Text>
                <Input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder={LANDING_PAGE_CONSTANTS.SIGN_UP.FORM.FIRST_NAME_PLACEHOLDER}
                  size="lg"
                  h={12}
                  borderColor="gray.200"
                  fontSize="md"
                  _hover={{
                    borderColor: "gray.300",
                  }}
                  _focus={{
                    borderColor: "purple.500",
                    boxShadow: "0 0 0 3px rgba(138, 43, 226, 0.1)",
                  }}
                  _placeholder={{
                    color: "gray.400",
                  }}
                  transition="all 0.2s ease"
                  required
                  disabled={isLoading}
                />
              </Stack>

              <Stack gap={2}>
                <Text fontSize="sm" fontWeight="medium" color={THEME_CONSTANTS.COLORS.TEXT_PRIMARY}>
                  {LANDING_PAGE_CONSTANTS.SIGN_UP.FORM.EMAIL_LABEL}
                </Text>
                <Input
                  type="email"
                  name="emailId"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                  placeholder={LANDING_PAGE_CONSTANTS.SIGN_UP.FORM.EMAIL_PLACEHOLDER}
                  size="lg"
                  h={12}
                  borderColor="gray.200"
                  fontSize="md"
                  _hover={{
                    borderColor: "gray.300",
                  }}
                  _focus={{
                    borderColor: "purple.500",
                    boxShadow: "0 0 0 3px rgba(138, 43, 226, 0.1)",
                  }}
                  _placeholder={{
                    color: "gray.400",
                  }}
                  transition="all 0.2s ease"
                  required
                  disabled={isLoading}
                />
              </Stack>

              <Stack gap={2}>
                <Text fontSize="sm" fontWeight="medium" color={THEME_CONSTANTS.COLORS.TEXT_PRIMARY}>
                  {LANDING_PAGE_CONSTANTS.SIGN_UP.FORM.PASSWORD_LABEL}
                </Text>
                <Input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={LANDING_PAGE_CONSTANTS.SIGN_UP.FORM.PASSWORD_PLACEHOLDER}
                  size="lg"
                  h={12}
                  borderColor="gray.200"
                  fontSize="md"
                  _hover={{
                    borderColor: "gray.300",
                  }}
                  _focus={{
                    borderColor: "purple.500",
                    boxShadow: "0 0 0 3px rgba(138, 43, 226, 0.1)",
                  }}
                  _placeholder={{
                    color: "gray.400",
                  }}
                  transition="all 0.2s ease"
                  required
                  disabled={isLoading}
                />
              </Stack>

              <Button
                type="submit"
                size="lg"
                w="full"
                mt={2}
                h={12}
                fontWeight="semibold"
                bgGradient="linear(to-r, purple.500, blue.500)"
                color="white"
                loading={isLoading}
                loadingText="Creating account..."
                _hover={{
                  bgGradient: "linear(to-r, purple.600, blue.600)",
                  transform: "translateY(-1px)",
                  boxShadow: "lg",
                }}
                _active={{
                  transform: "translateY(0)",
                }}
                _disabled={{
                  opacity: 0.6,
                  cursor: "not-allowed",
                }}
                transition="all 0.2s ease"
              >
                {LANDING_PAGE_CONSTANTS.SIGN_UP.FORM.SUBMIT_BUTTON}
              </Button>

              <Text
                fontSize="xs"
                color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}
                textAlign="center"
                lineHeight="tall"
              >
                {LANDING_PAGE_CONSTANTS.SIGN_UP.TERMS_TEXT}
              </Text>
            </VStack>

            <HStack justify="center" gap={1} pt={2}>
              <Text fontSize="sm" color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}>
                {LANDING_PAGE_CONSTANTS.SIGN_UP.SIGN_IN_PROMPT}
              </Text>
              <Text
                fontSize="sm"
                color="purple.600"
                fontWeight="semibold"
                cursor="pointer"
                marginLeft={1}
                onClick={() => navigate("/signin")}
                _hover={{
                  color: "purple.700",
                }}
                transition="color 0.2s"
              >
                {LANDING_PAGE_CONSTANTS.SIGN_UP.SIGN_IN_LINK}
              </Text>
            </HStack>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}
