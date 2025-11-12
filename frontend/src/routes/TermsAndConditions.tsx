import AppNavigation from "../components/AppNavigation";
import Footer from "../components/Footer";
import {
  Badge,
  Box,
  Container,
  Divider,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaCheckCircle, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function TermsAndConditions() {
  const terms = [
    "The content of the pages of this website is subject to change without notice.",
    "Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness, or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors, and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.",
    "Your use of any information or materials on our website and/or product pages is entirely at your own risk, for which we shall not be liable. It is your responsibility to ensure that any products, services, or information available through our website and/or product pages meet your specific requirements.",
    "Our website contains material that is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance, and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.",
    "All trademarks reproduced on our website that are not the property of, or licensed to, the operator are acknowledged on the website.",
    "Unauthorized use of information provided by us shall give rise to a claim for damages and/or be a criminal offense.",
    "From time to time, our website may also include links to other websites. These links are provided for your convenience to provide further information.",
    "You may not create a link to our website from another website or document without SHUBHAM KUMAR's prior written consent.",
    "Any dispute arising out of the use of our website, purchase with us, or any engagement with us is subject to the laws of India.",
    "We shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any transaction on account of the cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time.",
  ];

  return (
    <Box minH="100vh" bg="gray.50">
      <AppNavigation />
      <Box as="main" py={{ base: 10, md: 16 }}>
        <Container maxW="4xl">
          <VStack
            align="start"
            spacing={6}
            bg="white"
            p={{ base: 6, md: 10 }}
            borderRadius="2xl"
            boxShadow="md"
          >
            <Heading size="lg" color="gray.800">
              Terms &amp; Conditions
            </Heading>

            <Badge colorScheme="purple" borderRadius="full" px={4} py={1}>
              Effective date: 12 November 2025
            </Badge>

            <Text color="gray.600">
              For the purpose of these Terms and Conditions, the terms “we”, “us”, and “our” refer to
              SHUBHAM KUMAR, whose registered and operational office is located in Bengaluru, Karnataka,
              560100. The terms “you”, “your”, “user”, and “visitor” refer to any natural or legal person
              who is visiting our website and/or has agreed to purchase from us.
            </Text>

            <Text color="gray.600">
              Your use of the website and/or purchase from us is governed by the following Terms and
              Conditions:
            </Text>

            <VStack align="start" spacing={4} color="gray.600">
              {terms.map((term, index) => (
                <HStack key={index} align="start" spacing={3}>
                  <Icon as={FaCheckCircle} color="purple.500" mt={1} />
                  <Text>{term}</Text>
                </HStack>
              ))}
            </VStack>

            <Divider />

            <Heading size="md" color="gray.800" pt={2}>
              Contact Us
            </Heading>

            <Text color="gray.600">
              You may contact us using the information below:
            </Text>

            <VStack
              align="start"
              spacing={3}
              bg="purple.50"
              borderRadius="lg"
              p={6}
              w="full"
              color="gray.700"
            >
              <HStack spacing={3}>
                <Icon as={FaMapMarkerAlt} color="purple.500" />
                <Text>
                  <Text as="span" fontWeight="semibold">
                    Address:
                  </Text>{" "}
                  Electronic City Phase I, Doddathoguru, Bengaluru, Karnataka, 560100
                </Text>
              </HStack>
              <HStack spacing={3}>
                <Icon as={FaPhoneAlt} color="purple.500" />
                <Text>
                  <Text as="span" fontWeight="semibold">
                    Phone:
                  </Text>{" "}
                  +91 62048 72667
                </Text>
              </HStack>
              <HStack spacing={3}>
                <Icon as={FaEnvelope} color="purple.500" />
                <Text>
                  <Text as="span" fontWeight="semibold">
                    Email:
                  </Text>{" "}
                  mazakomaviya@gmail.com
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

