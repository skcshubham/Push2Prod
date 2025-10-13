import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";

import { LANDING_PAGE_CONSTANTS } from "../constants/landingPage";
import { THEME_CONSTANTS } from "../theme/constants";

export default function TechStackSection() {
  const sectionPadding = useBreakpointValue({ base: 12, md: 16 });

  return (
    <Box
      py={sectionPadding}
      bg={THEME_CONSTANTS.COLORS.PRIMARY}
      color={THEME_CONSTANTS.COLORS.WHITE}
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.1}
        backgroundImage="linear-gradient(45deg, transparent 25%, rgba(255,255,255,.1) 25%, rgba(255,255,255,.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,.1) 75%)"
        backgroundSize="20px 20px"
        animation="float 30s linear infinite"
      />

      <Box
        position="absolute"
        top="20%"
        left="10%"
        w="80px"
        h="80px"
        bg="white"
        borderRadius="full"
        opacity={0.05}
        animation="float 8s ease-in-out infinite"
      />
      <Box
        position="absolute"
        top="60%"
        right="15%"
        w="60px"
        h="60px"
        bg="white"
        borderRadius="full"
        opacity={0.05}
        animation="float 12s ease-in-out infinite reverse"
      />

      <Container maxW="container.xl" px={{ base: 4, md: 6 }} position="relative">
        <VStack gap={{ base: 8, md: 12 }} align="center">
          <Box textAlign="center">
            <Heading size={{ base: "lg", md: "xl" }} mb={4}>
              {LANDING_PAGE_CONSTANTS.TECH_STACK.TITLE}
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }} opacity={0.9}>
              {LANDING_PAGE_CONSTANTS.TECH_STACK.DESCRIPTION}
            </Text>
          </Box>

          <SimpleGrid
            columns={{ base: 2, md: 4 }}
            gap={{ base: 6, md: 8 }}
            textAlign="center"
            justifyItems="center"
            mx="auto"
          >
            {LANDING_PAGE_CONSTANTS.TECH_STACK.TECHNOLOGIES.map((tech, index) => (
              <VStack key={index} gap={2}>
                <Heading size={{ base: "2xl", md: "3xl" }} color={THEME_CONSTANTS.COLORS.WHITE}>
                  {tech.name}
                </Heading>
                <Text fontSize={{ base: "sm", md: "md" }} opacity={0.9}>
                  {tech.description}
                </Text>
                <Text fontSize="xs" opacity={0.7}>
                  {tech.details}
                </Text>
              </VStack>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}
