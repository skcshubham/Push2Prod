import {
  Box,
  Button,
  Container,
  Drawer,
  Flex,
  HStack,
  Heading,
  IconButton,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";

import { FaBars } from "react-icons/fa";
import { THEME_CONSTANTS } from "../theme/constants";

interface NavigationProps {
  scrollToSection: (sectionId: string) => void;
}

export default function Navigation({ scrollToSection }: NavigationProps) {
  const { open, onOpen, onClose } = useDisclosure();

  return (
    <>
      {/* Navigation */}
      <Box
        bg={THEME_CONSTANTS.COLORS.WHITE}
        boxShadow={THEME_CONSTANTS.SHADOWS.SM}
        position="sticky"
        top={0}
        zIndex={1000}
      >
        <Container maxW="container.xl" py={THEME_CONSTANTS.SPACING.SM}>
          <Flex justify="space-between" align="center">
            <Heading size="lg" color={THEME_CONSTANTS.COLORS.PRIMARY}>
              🧑🏻‍💻 Push2Prod
            </Heading>

            {/* Desktop Navigation */}
            <HStack gap={THEME_CONSTANTS.SPACING.MD} display={{ base: "none", md: "flex" }}>
              <Text
                color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}
                cursor="pointer"
                _hover={{ color: THEME_CONSTANTS.COLORS.PRIMARY }}
                onClick={() => scrollToSection("features")}
              >
                Features
              </Text>
              <Text
                color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}
                cursor="pointer"
                _hover={{ color: THEME_CONSTANTS.COLORS.PRIMARY }}
                onClick={() => scrollToSection("pricing")}
              >
                Pricing
              </Text>
              <Button colorScheme="purple" variant="outline" size="sm">
                Sign In
              </Button>
              <Button colorScheme="purple" size="sm">
                Create Profile
              </Button>
            </HStack>

            {/* Mobile Menu Button */}
            <IconButton
              display={{ base: "flex", md: "none" }}
              onClick={onOpen}
              variant="outline"
              aria-label="Open menu"
            >
              <FaBars />
            </IconButton>
          </Flex>
        </Container>
      </Box>

      {/* Mobile Navigation Drawer */}
      <Drawer.Root open={open} onOpenChange={onClose}>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.CloseTrigger />
            <Drawer.Header>Menu</Drawer.Header>
            <Drawer.Body>
              <VStack gap={4} align="stretch">
                <Text
                  color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}
                  cursor="pointer"
                  _hover={{ color: THEME_CONSTANTS.COLORS.PRIMARY }}
                  onClick={() => scrollToSection("features")}
                >
                  Features
                </Text>
                <Text
                  color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}
                  cursor="pointer"
                  _hover={{ color: THEME_CONSTANTS.COLORS.PRIMARY }}
                  onClick={() => scrollToSection("pricing")}
                >
                  Pricing
                </Text>
                <Button colorScheme="purple" variant="outline" w="full">
                  Sign In
                </Button>
                <Button colorScheme="purple" w="full">
                  Create Profile
                </Button>
              </VStack>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </>
  );
}
