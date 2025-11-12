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
import { FaShieldAlt, FaCheckCircle, FaCookieBite } from "react-icons/fa";

export default function PrivacyPolicy() {
  const infoWeCollect = [
    "Name and contact information including email address",
    "Demographic information such as postcode, preferences, and interests (when voluntarily shared)",
    "Other information that supports customer surveys, offers, or service improvements",
  ];

  const howWeUseIt = [
    "Maintaining accurate internal records",
    "Enhancing our products, services, and user experience",
    "Sharing updates about new products, special offers, or information we believe will add value to you",
    "Inviting you to participate in surveys or market research via email, phone, or mail",
    "Personalising the website to reflect your preferences and interests",
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
              Privacy Policy
            </Heading>

            <Badge colorScheme="purple" borderRadius="full" px={4} py={1}>
              Effective date: 12 November 2025
            </Badge>

            <Text color="gray.600">
              This privacy policy sets out how SHUBHAM KUMAR uses and protects any information that you
              provide when you visit our website and/or agree to purchase from us. We are committed to
              ensuring that your privacy is protected. Should we ask you to provide certain information by
              which you can be identified when using this website, then you can be assured that it will only
              be used in accordance with this privacy statement.
            </Text>

            <Text color="gray.600">
              SHUBHAM KUMAR may change this policy from time to time by updating this page. You should check
              this page periodically to ensure that you agree with any changes.
            </Text>

            <Divider />

            <Heading size="md" color="gray.800" pt={2}>
              Information We Collect
            </Heading>
            <VStack align="start" spacing={3} color="gray.600">
              {infoWeCollect.map((item) => (
                <HStack key={item} align="start" spacing={3}>
                  <Icon as={FaCheckCircle} color="purple.500" mt={1} />
                  <Text>{item}</Text>
                </HStack>
              ))}
            </VStack>

            <Divider />

            <Heading size="md" color="gray.800" pt={2}>
              How We Use the Information We Gather
            </Heading>
            <VStack align="start" spacing={3} color="gray.600">
              {howWeUseIt.map((item) => (
                <HStack key={item} align="start" spacing={3}>
                  <Icon as={FaShieldAlt} color="purple.500" mt={1} />
                  <Text>{item}</Text>
                </HStack>
              ))}
            </VStack>

            <Divider />

            <Heading size="md" color="gray.800" pt={2}>
              Security
            </Heading>
            <Text color="gray.600">
              We are committed to ensuring that your information is secure. In order to prevent unauthorized
              access or disclosure, we have put in place suitable measures to safeguard the information we
              collect online.
            </Text>

            <Divider />

            <Heading size="md" color="gray.800" pt={2}>
              How We Use Cookies
            </Heading>
            <Text color="gray.600">
              A cookie is a small file which asks permission to be placed on your computer&apos;s hard drive.
              Once you agree, the file is added and the cookie helps analyze web traffic or lets you know when
              you visit a particular site. Cookies allow web applications to respond to you as an individual by
              tailoring operations to your needs, likes, and dislikes.
            </Text>
            <Text color="gray.600">
              We use traffic log cookies to identify which pages are being used. This helps us analyze data
              about webpage traffic and improve our website in order to tailor it to customer needs. We only use
              this information for statistical analysis purposes and then the data is removed from the system.
            </Text>
            <Text color="gray.600">
              Overall, cookies help us provide you with a better website by enabling us to monitor which pages
              you find useful and which you do not. A cookie in no way gives us access to your computer or any
              information about you, other than the data you choose to share with us. You can choose to accept or
              decline cookies. Most web browsers automatically accept cookies, but you can usually modify your
              browser setting to decline cookies if you prefer. This may prevent you from taking full advantage
              of the website.
            </Text>

            <Divider />

            <Heading size="md" color="gray.800" pt={2}>
              Controlling Your Personal Information
            </Heading>
            <Text color="gray.600">
              You may choose to restrict the collection or use of your personal information in the following
              ways:
            </Text>
            <VStack align="start" spacing={2} color="gray.600">
              <Text>
                Whenever you are asked to fill in a form on the website, look for the box that you can click to
                indicate that you do not want the information to be used by anybody for direct marketing purposes.
              </Text>
              <Text>
                If you have previously agreed to us using your personal information for direct marketing purposes,
                you may change your mind at any time by writing to or emailing us at{" "}
                <Text as="span" fontWeight="semibold" color="gray.800">
                  mazakomaviya@gmail.com
                </Text>
                .
              </Text>
            </VStack>

            <Text color="gray.600">
              We will not sell, distribute, or lease your personal information to third parties unless we have
              your permission or are required by law to do so. We may use your personal information to send you
              promotional information about third parties which we think you may find interesting if you tell us
              that you wish this to happen.
            </Text>

            <Text color="gray.600">
              If you believe that any information we are holding on you is incorrect or incomplete, please
              write to us at Electronic City Phase I, Doddathoguru, Bengaluru, Karnataka, 560100 or contact
              us at 6204872667 or{" "}
              <Text as="span" fontWeight="semibold" color="gray.800">
                mazakomaviya@gmail.com
              </Text>{" "}
              as soon as possible. We will promptly correct any information found to be incorrect.
            </Text>

            <Divider />

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
                <Icon as={FaCookieBite} color="purple.500" />
                <Text fontWeight="semibold" color="gray.800">
                  Tip: You can manage cookies through your browser settings to maintain control over your
                  browsing experience.
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

