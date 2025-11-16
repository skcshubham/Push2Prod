import {
  Badge,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  FaBolt,
  FaCheckCircle,
  FaChevronRight,
  FaChartLine,
  FaCrown,
  FaHeart,
  FaShieldAlt,
} from "react-icons/fa";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { setPremiumStatus } from "../store/slices/premiumSlice";

import AppNavigation from "../components/AppNavigation";
import Footer from "../components/Footer";
import { LANDING_PAGE_CONSTANTS } from "../constants/landingPage";
import { THEME_CONSTANTS } from "../theme/constants";
import {
  useCreateOrderMutation,
  useVerifyPremiumUserMutation,
} from "../services/api";

type MembershipPlan =
  (typeof LANDING_PAGE_CONSTANTS.PRICING.PLANS)[keyof typeof LANDING_PAGE_CONSTANTS.PRICING.PLANS];

const membershipPlans = Object.values(
  LANDING_PAGE_CONSTANTS.PRICING.PLANS
) as MembershipPlan[];
const sortedMembershipPlans = [...membershipPlans].sort((a, b) => {
  const rank = (name: string) => (name.toLowerCase() === "gold" ? 0 : 1);
  return rank(a.NAME) - rank(b.NAME);
});

const hasBadge = (
  plan: MembershipPlan
): plan is MembershipPlan & { BADGE: string } =>
  "BADGE" in plan && typeof plan.BADGE === "string";

const perkHighlights = [
  {
    icon: FaBolt,
    title: "Boosted Discovery",
    description:
      "Surface at the top of feed and get context-aware boosts every weekend.",
  },
  {
    icon: FaShieldAlt,
    title: "Verified Trust",
    description:
      "Blue tick verification and instant profile checks for every Gold member.",
  },
  {
    icon: FaHeart,
    title: "Unlimited Chemistry",
    description:
      "Skip the daily cap, send connection requests without friction, and start chats instantly.",
  },
  {
    icon: FaChartLine,
    title: "Weekly Insights",
    description:
      "See who liked your profile, connection trends, and suggestions to keep engagement high.",
  },
  {
    icon: FaCrown,
    title: "VIP Support",
    description:
      "Concierge help for collabs, hackathons, and any account adjustments you need.",
  },
];

export default function Premium() {
  const navigate = useNavigate();
  const [createOrder] = useCreateOrderMutation();
  const [verifyPremiumUser] = useVerifyPremiumUserMutation();
  const dispatch = useDispatch();
  const { isPremium, membershipType } = useSelector(
    (state: RootState) => state.premium
  );

  useEffect(() => {
    verifyPremium();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const verifyPremium = async () => {
    try {
      const response = await verifyPremiumUser().unwrap();
      if (response?.data) {
        dispatch(
          setPremiumStatus({
            isPremium: Boolean(response.data.isPremium),
            membershipType:
              (response.data.membershipType as "silver" | "gold") ?? null,
          })
        );
      }
    } catch (error) {
      console.error("Failed to verify premium user:", error);
    }
  };

  const handlePayment = async (membershipType: "silver" | "gold") => {
    try {
      const order = await createOrder({
        membershipType: membershipType.toLowerCase() as "silver" | "gold",
      }).unwrap();

      const { amount, currency, notes, orderId } = order.data;

      const options = {
        key: order.keyId,
        amount: amount,
        currency: currency,
        name: "Push2Prod",
        description: "Payment for Push2Prod",
        order_id: orderId,
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
        },
        theme: {
          color: "#a855f7",
        },
        handler: verifyPremium,
      };

      // Type assertion to avoid TypeScript error about Razorpay missing from window
      const RazorpayConstructor = (window as any).Razorpay;
      if (!RazorpayConstructor) {
        throw new Error("Razorpay SDK not loaded.");
      }
      const rzp = new RazorpayConstructor(options);
      rzp.open();
    } catch (error) {
      console.error("Failed to create order:", error);
    }
  };

  return (
    <Box bg={THEME_CONSTANTS.COLORS.BACKGROUND_LIGHT} minH="100vh">
      <AppNavigation />

      <Box
        bg="white"
        color={THEME_CONSTANTS.COLORS.TEXT_PRIMARY}
        position="relative"
        overflow="hidden"
      >
        {/* Light SaaS hero */}
        <Box
          position="absolute"
          inset={0}
          bgGradient="linear(to-br, purple.50, blue.50)"
        />
        <Container maxW="6xl" py={{ base: 16, md: 24 }} position="relative">
          <VStack gap={{ base: 6, md: 8 }}>
            <Badge
              colorScheme="purple"
              bg="purple.100"
              px={4}
              py={2}
              borderRadius="full"
            >
              Premium Access
            </Badge>
            <Box
              bg="white"
              px={{ base: 4, md: 6 }}
              py={{ base: 3, md: 4 }}
              borderRadius="3xl"
              border="1px solid"
              borderColor="gray.100"
              boxShadow="sm"
            >
              <Heading
                size={{ base: "xl", md: "3xl" }}
                textAlign="center"
                maxW="4xl"
                lineHeight="1.2"
                color={THEME_CONSTANTS.COLORS.TEXT_PRIMARY}
              >
                Upgrade to premium and match with high-intent builders faster
              </Heading>
            </Box>
            <Box
              bg="white"
              borderRadius="3xl"
              px={{ base: 4, md: 6 }}
              py={{ base: 4, md: 5 }}
              border="1px solid"
              borderColor="gray.100"
              boxShadow="sm"
            >
              <Text
                fontSize={{ base: "md", md: "lg" }}
                textAlign="center"
                color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}
                maxW="3xl"
              >
                Silver unlocks instant chat, powered boosts, and 100 daily
                connection requests. Gold layers on blue tick verification,
                unlimited outreach, and VIP support so your next collab is never
                throttled.
              </Text>
            </Box>
            <HStack
              opacity={0.9}
              gap={{ base: 4, md: 8 }}
              flexWrap="wrap"
              justify="center"
            >
              <Badge variant="subtle" colorScheme="purple" borderRadius="md">
                Trusted by developers
              </Badge>
              <Text color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}>
                7‑day money‑back guarantee
              </Text>
              <Text color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}>
                Secure payments by Razorpay
              </Text>
            </HStack>
          </VStack>
        </Container>
      </Box>

      <Container maxW="6xl" py={{ base: 10, md: 14 }}>
        <Box textAlign="center" mb={{ base: 10, md: 14 }}>
          <Badge colorScheme="purple" px={4} py={1.5} borderRadius="full">
            Why upgrade?
          </Badge>
          <Heading size={{ base: "lg", md: "xl" }} mt={3} mb={3}>
            Premium perks built from dev feedback
          </Heading>
          <Text
            color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}
            maxW="3xl"
            mx="auto"
          >
            Every membership benefit focuses on signal, trust, and collaboration
            speed so you can find your perfect pairing without wading through
            noise.
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: 6, md: 8 }}>
          {perkHighlights.map((perk) => (
            <Stack
              key={perk.title}
              bg="white"
              borderRadius="2xl"
              boxShadow="lg"
              border="1px solid"
              borderColor="gray.100"
              p={{ base: 5, md: 6 }}
              gap={4}
              color={THEME_CONSTANTS.COLORS.TEXT_PRIMARY}
              transition="all 200ms ease"
              _hover={{
                transform: "translateY(-4px)",
                boxShadow: "xl",
              }}
              position="relative"
              _before={{
                content: '""',
                position: "absolute",
                inset: 0,
                borderRadius: "inherit",
                padding: "1px",
                background:
                  "linear-gradient(120deg, rgba(168,85,247,0.35), rgba(59,130,246,0.35))",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                pointerEvents: "none",
                opacity: 0.6,
              }}
            >
              <HStack gap={3} align="center">
                <Icon as={perk.icon} color="purple.500" boxSize={5} />
                <Heading size="md">{perk.title}</Heading>
              </HStack>
              <Text color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}>
                {perk.description}
              </Text>
            </Stack>
          ))}
        </SimpleGrid>
      </Container>

      <Container maxW="6xl" py={{ base: 12, md: 16 }}>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 8, md: 10 }}>
          {isPremium ? ( // If user is already premium, show their membership summary instead of purchase options
            <Box
              bg="white"
              borderRadius={THEME_CONSTANTS.RADIUS.XL}
              boxShadow="xl"
              border="1px solid"
              borderColor="gray.100"
              p={{ base: 6, md: 8 }}
              position="relative"
              overflow="hidden"
            >
              <Badge
                colorScheme={membershipType === "gold" ? "yellow" : "purple"}
                mb={4}
                borderRadius="full"
                px={4}
                py={1}
              >
                Active: {membershipType?.toUpperCase()}
              </Badge>
              <Heading size="md" color={THEME_CONSTANTS.COLORS.TEXT_PRIMARY}>
                You already have an active {membershipType} membership
              </Heading>
              <Text mt={3} color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}>
                Enjoy your premium perks. You can upgrade anytime to explore
                more benefits.
              </Text>
              <Button
                mt={6}
                colorScheme="purple"
                variant="outline"
                onClick={() => navigate("/feed")}
                _hover={{ transform: "translateX(2px)" }}
              >
                <HStack>
                  <Text>Go to Feed</Text>
                  <Icon as={FaChevronRight} />
                </HStack>
              </Button>
            </Box>
          ) : (
            sortedMembershipPlans.map((plan) => (
              <Box
                key={plan.NAME}
                bg="white"
                borderRadius={THEME_CONSTANTS.RADIUS.XL}
                boxShadow={hasBadge(plan) ? "2xl" : "xl"}
                border="1px solid"
                borderColor={hasBadge(plan) ? "purple.200" : "gray.100"}
                p={0}
                h="100%"
                display="flex"
                flexDirection="column"
                position="relative"
                color={THEME_CONSTANTS.COLORS.TEXT_PRIMARY}
                transition="all 220ms ease"
                _hover={{
                  transform: "translateY(-6px)",
                  boxShadow: hasBadge(plan) ? "3xl" : "2xl",
                }}
                _before={{
                  content: '""',
                  position: "absolute",
                  inset: "-1px",
                  borderRadius: THEME_CONSTANTS.RADIUS.XL,
                  padding: "1px",
                  background: hasBadge(plan)
                    ? "linear-gradient(120deg, #F6D365, #FDA085)"
                    : "linear-gradient(120deg, #A18CD1, #FBC2EB)",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  pointerEvents: "none",
                  opacity: 0.5,
                }}
              >
                {/* Gold crown accent */}
                {plan.NAME.toLowerCase() === "gold" && (
                  <Icon
                    as={FaCrown}
                    color="yellow.400"
                    position="absolute"
                    top={3}
                    right={3}
                    boxSize={5}
                  />
                )}
                {/* Header band */}
                <Box
                  bgGradient={
                    plan.NAME.toLowerCase() === "gold"
                      ? "linear(to-r, yellow.200, orange.200)"
                      : "linear(to-r, purple.200, pink.200)"
                  }
                  color="blackAlpha.800"
                  borderTopRadius={THEME_CONSTANTS.RADIUS.XL}
                  px={{ base: 6, md: 8 }}
                  py={{ base: 4, md: 5 }}
                  borderBottom="1px solid"
                  borderColor="blackAlpha.200"
                >
                  <HStack justify="space-between">
                    <Heading size="md">{plan.NAME} Membership</Heading>
                    {plan.NAME.toLowerCase() === "gold" ? (
                      <Badge variant="solid" colorScheme="blackAlpha">
                        Best value
                      </Badge>
                    ) : (
                      <Badge
                        variant="solid"
                        colorScheme="blackAlpha"
                        visibility="hidden"
                      >
                        Best value
                      </Badge>
                    )}
                  </HStack>
                </Box>
                <Box
                  px={{ base: 6, md: 8 }}
                  py={{ base: 6, md: 8 }}
                  flex={1}
                  display="flex"
                  flexDirection="column"
                >
                  <Stack gap={4} flex={1}>
                    <Text color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}>
                      {plan.DESCRIPTION}
                    </Text>
                    <Box display="flex" alignItems="baseline" gap={2}>
                      <Text
                        fontSize="4xl"
                        fontWeight="bold"
                        color={THEME_CONSTANTS.COLORS.PRIMARY}
                      >
                        {plan.PRICE}
                      </Text>
                      <Text
                        fontSize="sm"
                        color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}
                      >
                        Lifetime access
                      </Text>
                    </Box>
                    <Text fontSize="xs" color="gray.500">
                      No hidden fees. Cancel anytime.
                    </Text>
                    <Box borderTop="1px solid" borderColor="gray.100" />
                    <VStack align="stretch" gap={3}>
                      {plan.FEATURES.map((feature, idx) => (
                        <HStack
                          key={`${plan.NAME}-feature-${idx}`}
                          gap={3}
                          align="center"
                          borderTop={idx === 0 ? "none" : "1px solid"}
                          borderColor={idx === 0 ? "transparent" : "gray.100"}
                          pt={idx === 0 ? 0 : 3}
                          pb={2}
                        >
                          <Icon as={FaCheckCircle} color="green.400" />
                          <Text color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}>
                            {feature.text}
                          </Text>
                        </HStack>
                      ))}
                    </VStack>
                  </Stack>

                  {/* Active plan ribbon */}
                  {isPremium &&
                    plan.NAME.toLowerCase() ===
                      (membershipType || "").toLowerCase() && (
                      <Badge
                        position="absolute"
                        top={3}
                        right={3}
                        colorScheme={
                          membershipType === "gold" ? "yellow" : "gray"
                        }
                        borderRadius="full"
                        px={3}
                        py={1}
                      >
                        Active
                      </Badge>
                    )}

                  {isPremium &&
                  plan.NAME.toLowerCase() ===
                    (membershipType || "").toLowerCase() ? (
                    <Button
                      colorScheme="gray"
                      size="lg"
                      w="full"
                      mt="auto"
                      disabled
                    >
                      Active
                    </Button>
                  ) : (
                    <Button
                      colorScheme="purple"
                      size="lg"
                      w="full"
                      mt="4"
                      _hover={{ transform: "translateX(2px)" }}
                      onClick={() =>
                        handlePayment(plan.NAME as "silver" | "gold")
                      }
                    >
                      <HStack w="full" justify="center">
                        <Text>{plan.CTA}</Text>
                        <Icon as={FaChevronRight} />
                      </HStack>
                    </Button>
                  )}
                </Box>
              </Box>
            ))
          )}
        </SimpleGrid>

        <Box
          mt={{ base: 12, md: 16 }}
          p={{ base: 8, md: 12 }}
          borderRadius={THEME_CONSTANTS.RADIUS.XL}
          bg="white"
          border="1px solid"
          borderColor="gray.100"
          boxShadow="md"
          color={THEME_CONSTANTS.COLORS.TEXT_PRIMARY}
          textAlign="center"
          position="relative"
          overflow="hidden"
        >
          <Heading size="lg" m={0}>
            Go premium and stay ahead of the queue
          </Heading>
          <Text
            maxW="3xl"
            mx="auto"
            color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}
            px={{ base: 4, md: 6 }}
            py={{ base: 3, md: 4 }}
            mb={2}
            fontWeight="medium"
          >
            Silver grants you direct chats and 100 connection requests each day.
            Gold adds a blue verification tick and removes the request limit
            entirely so you can connect without friction.
          </Text>
          <Text color="green.600" fontWeight="semibold" mb={6}>
            7‑day money‑back guarantee. Cancel anytime.
          </Text>
          <HStack
            gap={{ base: 3, md: 6 }}
            flexWrap="wrap"
            justify="center"
            fontWeight="medium"
            mb={6}
          >
            {[
              { icon: FaBolt, label: "Weekly boosts" },
              { icon: FaShieldAlt, label: "Blue tick trust" },
              { icon: FaCheckCircle, label: "Priority support" },
            ].map((perk) => (
              <HStack
                key={perk.label}
                bg="gray.50"
                borderRadius="full"
                px={{ base: 3, md: 4 }}
                py={{ base: 1.5, md: 2 }}
                border="1px solid"
                borderColor="gray.200"
                color={THEME_CONSTANTS.COLORS.TEXT_PRIMARY}
                gap={2}
                transition="all 200ms ease"
                _hover={{ transform: "translateY(-2px)", boxShadow: "xl" }}
              >
                <perk.icon color={THEME_CONSTANTS.COLORS.PRIMARY} />
                <Text>{perk.label}</Text>
              </HStack>
            ))}
          </HStack>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}
