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
  FaChartLine,
  FaCrown,
  FaHeart,
  FaShieldAlt,
} from "react-icons/fa";
import React from "react";
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

  // Scroll to top on mount
  React.useEffect(() => {
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

  // Verify on mount
  React.useEffect(() => {
    void verifyPremium();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          contact: "9999999999",
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
        bgGradient="linear(to-br, purple.700, blue.600)"
        color="white"
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          top="-80px"
          right="-120px"
          width="320px"
          height="320px"
          bg="whiteAlpha.300"
          borderRadius="full"
          filter="blur(80px)"
        />
        <Container maxW="6xl" py={{ base: 16, md: 24 }} position="relative">
          <VStack gap={{ base: 6, md: 8 }}>
            <Badge
              colorScheme="blackAlpha"
              bg="whiteAlpha.200"
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
              boxShadow="0 20px 60px rgba(0, 0, 0, 0.25)"
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
              boxShadow="0 18px 50px rgba(0, 0, 0, 0.2)"
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
            >
              <Box
                w="12"
                h="12"
                borderRadius="xl"
                bgGradient="linear(to-br, purple.500, blue.500)"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={perk.icon} color="white" boxSize={5} />
              </Box>
              <Heading size="md">{perk.title}</Heading>
              <Text color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}>
                {perk.description}
              </Text>
            </Stack>
          ))}
        </SimpleGrid>
      </Container>

      <Container maxW="6xl" py={{ base: 12, md: 16 }}>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 8, md: 10 }}>
          {/* If user is already premium, show their membership summary instead of purchase options */}
          {isPremium ? (
            <Box
              bg="white"
              borderRadius={THEME_CONSTANTS.RADIUS.XL}
              boxShadow="xl"
              border="1px solid"
              borderColor="purple.200"
              p={{ base: 6, md: 8 }}
              position="relative"
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
              >
                Go to Feed
              </Button>
            </Box>
          ) : (
            membershipPlans.map((plan) => (
              <Box
                key={plan.NAME}
                bg="white"
                borderRadius={THEME_CONSTANTS.RADIUS.XL}
                boxShadow={hasBadge(plan) ? "2xl" : "xl"}
                border="1px solid"
                borderColor={hasBadge(plan) ? "purple.200" : "gray.100"}
                p={{ base: 6, md: 8 }}
                h="100%"
                display="flex"
                flexDirection="column"
                position="relative"
                color={THEME_CONSTANTS.COLORS.TEXT_PRIMARY}
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
                {hasBadge(plan) && (
                  <Badge
                    colorScheme="purple"
                    mb={4}
                    borderRadius="full"
                    px={4}
                    py={1}
                  >
                    {plan.BADGE}
                  </Badge>
                )}
                <Heading size="md" color={THEME_CONSTANTS.COLORS.TEXT_PRIMARY}>
                  {plan.NAME} Membership
                </Heading>
                <Text mt={2} color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}>
                  {plan.DESCRIPTION}
                </Text>

                <Box mt={6}>
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
                    {plan.PERIOD}
                  </Text>
                </Box>

                <VStack align="stretch" gap={3} mt={8} flex="1">
                  {plan.FEATURES.map((feature, idx) => (
                    <HStack
                      key={`${plan.NAME}-feature-${idx}`}
                      gap={3}
                      align="center"
                    >
                      <FaCheckCircle color="var(--chakra-colors-green-400)" />
                      <Text color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}>
                        {feature.text}
                      </Text>
                    </HStack>
                  ))}
                </VStack>

                <Button
                  colorScheme="purple"
                  size="lg"
                  w="full"
                  mt={8}
                  onClick={() => handlePayment(plan.NAME as "silver" | "gold")}
                >
                  {plan.CTA}
                </Button>
              </Box>
            ))
          )}
        </SimpleGrid>

        <Box
          mt={{ base: 12, md: 16 }}
          p={{ base: 8, md: 12 }}
          borderRadius={THEME_CONSTANTS.RADIUS.XL}
          bgGradient="linear(to-r, purple.500, blue.500)"
          color="white"
          textAlign="center"
          position="relative"
          overflow="hidden"
        >
          <Box
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            px={{ base: 4, md: 6 }}
            py={{ base: 2, md: 3 }}
            bg={THEME_CONSTANTS.COLORS.WHITE}
            borderRadius="full"
            boxShadow="0 10px 25px rgba(0, 0, 0, 0.15)"
            mx="auto"
            mb={4}
          >
            <Heading
              size="lg"
              m={0}
              color={THEME_CONSTANTS.COLORS.TEXT_PRIMARY}
            >
              Go premium and stay ahead of the queue
            </Heading>
          </Box>
          <Text
            maxW="3xl"
            mx="auto"
            color={THEME_CONSTANTS.COLORS.TEXT_PRIMARY}
            bg="white"
            px={{ base: 4, md: 6 }}
            py={{ base: 3, md: 4 }}
            borderRadius="lg"
            mb={6}
            boxShadow="0 12px 30px rgba(0, 0, 0, 0.15)"
            fontWeight="medium"
          >
            Silver grants you direct chats and 100 connection requests each day.
            Gold adds a blue verification tick and removes the request limit
            entirely so you can connect without friction.
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
                bg="white"
                borderRadius="full"
                px={{ base: 3, md: 4 }}
                py={{ base: 1.5, md: 2 }}
                boxShadow="0 10px 25px rgba(0,0,0,0.15)"
                border="1px solid"
                borderColor="gray.100"
                color={THEME_CONSTANTS.COLORS.TEXT_PRIMARY}
                gap={2}
              >
                <perk.icon color={THEME_CONSTANTS.COLORS.PRIMARY} />
                <Text>{perk.label}</Text>
              </HStack>
            ))}
          </HStack>
          <Button
            onClick={() => navigate("/signup")}
            size="lg"
            colorScheme="blackAlpha"
          >
            Create Premium Profile
          </Button>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}
