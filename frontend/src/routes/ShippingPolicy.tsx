import AppNavigation from "../components/AppNavigation";
import Footer from "../components/Footer";
import {
  Badge,
  Box,
  Container,
  Heading,
  HStack,
  Icon,
  Separator,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaShippingFast, FaEnvelope, FaPhoneAlt, FaRegClock } from "react-icons/fa";

export default function ShippingPolicy() {
  return (
    <Box minH="100vh" bg="gray.50">
      <AppNavigation />
      <Box as="main" py={{ base: 10, md: 16 }}>
        <Container maxW="4xl">
          <VStack
            align="start"
            gap={8}
            bg="white"
            p={{ base: 6, md: 10 }}
            borderRadius="2xl"
            boxShadow="md"
          >
            <Heading size="lg" color="gray.800">
              Shipping Policy
            </Heading>

            <Badge colorScheme="purple" borderRadius="full" px={4} py={1}>
              Last updated: 12 November 2025
            </Badge>

            <VStack align="start" gap={5} w="full">
              <Heading size="md" color="gray.800">
                Shipping Overview
              </Heading>
              <Text color="gray.600">
                We partner exclusively with trusted courier and postal services so your order reaches you
                safely and on time, wherever you are in the world.
              </Text>
              <VStack align="start" gap={3}>
                <HStack align="start" gap={3}>
                  <Icon as={FaShippingFast} color="purple.500" mt={1} />
                  <Text color="gray.600">
                    <Text as="span" fontWeight="semibold" color="gray.800">
                      International deliveries:
                    </Text>{" "}
                    Dispatched through registered international courier partners and/or International
                    Speed Post.
                  </Text>
                </HStack>
                <HStack align="start" gap={3}>
                  <Icon as={FaShippingFast} color="purple.500" mt={1} />
                  <Text color="gray.600">
                    <Text as="span" fontWeight="semibold" color="gray.800">
                      Domestic deliveries:
                    </Text>{" "}
                    Shipped using registered national courier networks and/or India Post Speed Post.
                  </Text>
                </HStack>
                <HStack align="start" gap={3}>
                  <Icon as={FaRegClock} color="purple.500" mt={1} />
                  <Text color="gray.600">
                    Orders are typically dispatched within{" "}
                    <Text as="span" fontWeight="semibold" color="gray.800">
                      0–7 business days
                    </Text>{" "}
                    of payment confirmation, or as mutually agreed at checkout. Transit times depend on
                    carrier norms and destination.
                  </Text>
                </HStack>
              </VStack>
            </VStack>

            <Separator borderColor="gray.200" />

            <VStack align="start" gap={5} w="full">
              <Heading size="md" color="gray.800">
                Delivery Commitments &amp; Confirmation
              </Heading>
              <Text color="gray.600">
                We guarantee timely handover of your parcel to the selected courier within the agreed
                processing window. Once dispatched, delivery timelines are governed by the courier or
                postal service. Confirmation emails—including tracking details whenever available—are sent
                to the email address provided during registration.
              </Text>
            </VStack>

            <Separator borderColor="gray.200" />

            <VStack align="start" gap={5} w="full">
              <Heading size="md" color="gray.800">
                Need Help?
              </Heading>
              <Text color="gray.600">
                If you have questions about a shipment or need assistance with delivery, our support team
                is ready to help.
              </Text>
              <VStack align="start" gap={2} bg="purple.50" borderRadius="lg" p={6} w="full">
                <HStack gap={3}>
                  <Icon as={FaPhoneAlt} color="purple.500" />
                  <Text color="gray.800" fontWeight="semibold">
                    +91 62048 72667
                  </Text>
                </HStack>
                <HStack gap={3}>
                  <Icon as={FaEnvelope} color="purple.500" />
                  <Text color="gray.800" fontWeight="semibold">
                    mazakomaviya@gmail.com
                  </Text>
                </HStack>
                <Text color="gray.600">
                  Hours: Monday to Friday, 9:00 AM – 6:00 PM IST
                </Text>
              </VStack>
            </VStack>
          </VStack>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}

