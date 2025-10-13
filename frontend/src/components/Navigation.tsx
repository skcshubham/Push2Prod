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
import { LANDING_PAGE_CONSTANTS } from "../constants/landingPage";
import { THEME_CONSTANTS } from "../theme/constants";
import { useNavigate } from "react-router-dom";

interface NavigationProps {
  scrollToSection: (sectionId: string) => void;
}

export default function Navigation({ scrollToSection }: NavigationProps) {
  const { open, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  return (
    <>
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
              {LANDING_PAGE_CONSTANTS.APP.LOGO}
            </Heading>

            <HStack gap={THEME_CONSTANTS.SPACING.MD} display={{ base: "none", md: "flex" }}>
              <Text
                color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}
                cursor="pointer"
                _hover={{ color: THEME_CONSTANTS.COLORS.PRIMARY }}
                onClick={() => scrollToSection("features")}
              >
                {LANDING_PAGE_CONSTANTS.NAVIGATION.MENU_ITEMS.FEATURES}
              </Text>
              <Text
                color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}
                cursor="pointer"
                _hover={{ color: THEME_CONSTANTS.COLORS.PRIMARY }}
                onClick={() => scrollToSection("pricing")}
              >
                {LANDING_PAGE_CONSTANTS.NAVIGATION.MENU_ITEMS.PRICING}
              </Text>
              <Button
                colorScheme="purple"
                variant="outline"
                size="sm"
                onClick={() => navigate("/signin")}
              >
                {LANDING_PAGE_CONSTANTS.NAVIGATION.BUTTONS.SIGN_IN}
              </Button>
              <Button colorScheme="purple" size="sm" onClick={() => navigate("/signup")}>
                {LANDING_PAGE_CONSTANTS.NAVIGATION.BUTTONS.CREATE_PROFILE}
              </Button>
            </HStack>

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

      <Drawer.Root open={open} onOpenChange={onClose}>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.CloseTrigger />
            <Drawer.Header>{LANDING_PAGE_CONSTANTS.NAVIGATION.MOBILE_MENU_TITLE}</Drawer.Header>
            <Drawer.Body>
              <VStack gap={4} align="stretch">
                <Text
                  color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}
                  cursor="pointer"
                  _hover={{ color: THEME_CONSTANTS.COLORS.PRIMARY }}
                  onClick={() => scrollToSection("features")}
                >
                  {LANDING_PAGE_CONSTANTS.NAVIGATION.MENU_ITEMS.FEATURES}
                </Text>
                <Text
                  color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}
                  cursor="pointer"
                  _hover={{ color: THEME_CONSTANTS.COLORS.PRIMARY }}
                  onClick={() => scrollToSection("pricing")}
                >
                  {LANDING_PAGE_CONSTANTS.NAVIGATION.MENU_ITEMS.PRICING}
                </Text>
                <Button
                  colorScheme="purple"
                  variant="outline"
                  w="full"
                  onClick={() => {
                    navigate("/signin");
                    onClose();
                  }}
                >
                  {LANDING_PAGE_CONSTANTS.NAVIGATION.BUTTONS.SIGN_IN}
                </Button>
                <Button
                  colorScheme="purple"
                  w="full"
                  onClick={() => {
                    navigate("/signup");
                    onClose();
                  }}
                >
                  {LANDING_PAGE_CONSTANTS.NAVIGATION.BUTTONS.CREATE_PROFILE}
                </Button>
              </VStack>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </>
  );
}
