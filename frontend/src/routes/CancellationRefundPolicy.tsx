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
import { FaUndo, FaRegClock, FaExclamationTriangle, FaClipboardCheck } from "react-icons/fa";

export default function CancellationRefundPolicy() {
  const policyPoints = [
    "Cancellation requests are accepted when raised within the stipulated time frame mentioned during purchase (currently marked as Not Applicable). Orders already sent for fulfilment may not be eligible.",
    "Perishable items such as food or flowers are ineligible for cancellation; quality-related concerns can, however, lead to a refund or replacement after verification.",
    "For damaged or defective products, notify our customer service team immediately. Claims must be evaluated and confirmed by the merchant before we can proceed.",
    "If the product received differs from what was listed or expected, contact us promptly so we can review your concern and determine the best resolution.",
    "Products covered by a manufacturer warranty should be handled directly with the manufacturer for service or replacement.",
  ];

  return (
    <Box minH="100vh" bg="gray.50">
      <AppNavigation />
      <Box as="main" py={{ base: 10, md: 16 }}>
        <Container maxW="4xl">
          <VStack
            align="start"
            gap={6}
            bg="white"
            p={{ base: 6, md: 10 }}
            borderRadius="2xl"
            boxShadow="md"
          >
            <Heading size="lg" color="gray.800">
              Cancellation &amp; Refund Policy
            </Heading>

            <Badge colorScheme="purple" borderRadius="full" px={4} py={1}>
              Effective date: 12 November 2025
            </Badge>

            <Text color="gray.600">
              SHUBHAM KUMAR believes in helping its customers as far as possible and has therefore
              implemented a liberal cancellation policy. Under this policy:
            </Text>

            <VStack align="start" gap={4} color="gray.600">
              {policyPoints.map((point) => (
                <HStack key={point} align="start" gap={3}>
                  <Icon as={FaUndo} color="purple.500" mt={1} />
                  <Text>{point}</Text>
                </HStack>
              ))}
            </VStack>

            <Separator borderColor="gray.200" />

            <Heading size="md" color="gray.800" pt={2}>
              Refund Timelines
            </Heading>
            <Text color="gray.600">
              Once a refund is approved, we initiate the process within the timeframe communicated during
              support (currently marked as Not Applicable). Refunds are credited to the original payment
              method, and processing times may vary based on the issuing bank or payment gateway.
            </Text>

            <VStack
              align="start"
              gap={3}
              bg="purple.50"
              borderRadius="lg"
              p={6}
              w="full"
              color="gray.700"
            >
              <HStack gap={3}>
                <Icon as={FaRegClock} color="purple.500" />
                <Text>
                  <Text as="span" fontWeight="semibold">
                    Processing window:
                  </Text>{" "}
                  Initiated immediately after approval; bank timelines can influence final settlement.
                </Text>
              </HStack>
              <HStack gap={3}>
                <Icon as={FaExclamationTriangle} color="purple.500" />
                <Text>
                  <Text as="span" fontWeight="semibold">
                    Important:
                  </Text>{" "}
                  To prevent delays, ensure all support tickets include your order ID, payment reference,
                  and preferred contact details.
                </Text>
              </HStack>
              <HStack gap={3}>
                <Icon as={FaClipboardCheck} color="purple.500" />
                <Text>
                  <Text as="span" fontWeight="semibold">
                    Status updates:
                  </Text>{" "}
                  We will confirm each milestone of the refund process via email.
                </Text>
              </HStack>
            </VStack>
          </VStack>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}

