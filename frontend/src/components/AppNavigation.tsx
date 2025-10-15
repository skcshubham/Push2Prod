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
import {
  FaBars,
  FaComments,
  FaHome,
  FaNewspaper,
  FaSignInAlt,
  FaUser,
  FaUserFriends,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import { LANDING_PAGE_CONSTANTS } from "../constants/landingPage";
import { THEME_CONSTANTS } from "../theme/constants";
import type { User } from "../types/user.types";
import { api } from "../services/api";
import { clearUser } from "../store/slices/authSlice";
import { useLogoutMutation } from "../services/api";
import { useNavigate } from "react-router-dom";

interface AppNavigationProps {
  scrollToSection?: (sectionId: string) => void;
}

export default function AppNavigation({ scrollToSection }: AppNavigationProps = {}) {
  const dispatch = useDispatch();
  const { open, onOpen, onClose } = useDisclosure();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const isAuthenticated = useSelector(
    (state: { auth: { isAuthenticated: boolean } }) => state.auth.isAuthenticated
  );
  const loggedInUser = useSelector((state: { auth: { user: User | null } }) => state.auth.user);

  const user = loggedInUser;
  const isLoggedIn = isAuthenticated || !!user;

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(clearUser());
      dispatch(api.util.resetApiState());
      navigate("/");
      onClose();
      setIsDropdownOpen(false);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    onClose();
    setIsDropdownOpen(false);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const menuItems = [
    { label: "Home", path: "/", icon: FaHome },
    { label: "Feed", path: "/feed", icon: FaNewspaper },
    { label: "Connections", path: "/connections", icon: FaUserFriends },
    { label: "Chats", path: "/chats", icon: FaComments },
    { label: "Profile", path: "/profile", icon: FaUser },
  ];

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
            <Heading
              size="lg"
              color={THEME_CONSTANTS.COLORS.PRIMARY}
              cursor="pointer"
              onClick={() => navigate("/feed")}
            >
              {LANDING_PAGE_CONSTANTS.APP.LOGO}
            </Heading>

            <HStack gap={THEME_CONSTANTS.SPACING.MD} display={{ base: "none", md: "flex" }}>
              {scrollToSection && (
                <>
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
                </>
              )}

              {isLoggedIn ? (
                <>
                  <HStack gap={3} align="center">
                    <Text
                      fontSize="sm"
                      fontWeight="medium"
                      color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}
                      display={{ base: "none", lg: "block" }}
                    >
                      Welcome,{" "}
                      <Text as="span" color={THEME_CONSTANTS.COLORS.PRIMARY} fontWeight="semibold">
                        {user?.firstName}
                      </Text>
                      ! 👋
                    </Text>
                    <Box position="relative" ref={dropdownRef}>
                      <Box
                        width="40px"
                        height="40px"
                        borderRadius="full"
                        bgImage={
                          user?.photoUrl
                            ? `url(${user.photoUrl})`
                            : THEME_CONSTANTS.GRADIENTS.SECONDARY
                        }
                        bgSize="cover"
                        bgPos="center"
                        border="2px solid"
                        borderColor="white"
                        boxShadow="sm"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        fontSize="sm"
                        color="white"
                        fontWeight="bold"
                        cursor="pointer"
                        onClick={() => {
                          setIsDropdownOpen(!isDropdownOpen);
                        }}
                        _hover={{ transform: "scale(1.05)", transition: "transform 0.2s" }}
                      >
                        {!user?.photoUrl && user?.firstName?.[0]?.toUpperCase()}
                      </Box>

                      {isDropdownOpen && (
                        <Box
                          position="absolute"
                          top="100%"
                          right="0"
                          mt={2}
                          minW="200px"
                          bg="white"
                          borderRadius="lg"
                          boxShadow="xl"
                          border="1px solid"
                          borderColor="gray.200"
                          zIndex={9999}
                          py={2}
                        >
                          <VStack gap={0} align="stretch">
                            <Box px={4} py={3} borderBottom="1px solid" borderColor="gray.100">
                              <Text fontWeight="semibold" fontSize="sm" color="gray.700">
                                {user?.firstName} {user?.lastName}
                              </Text>
                              <Text fontSize="xs" color="gray.500">
                                {user?.emailId}
                              </Text>
                            </Box>

                            {menuItems.map((item) => (
                              <Box
                                key={item.path}
                                px={4}
                                py={2}
                                cursor="pointer"
                                _hover={{ bg: "gray.50" }}
                                onClick={() => handleMenuItemClick(item.path)}
                              >
                                <HStack gap={2}>
                                  <item.icon size={14} />
                                  <Text fontSize="sm" color="gray.700">
                                    {item.label}
                                  </Text>
                                </HStack>
                              </Box>
                            ))}

                            <Box
                              px={4}
                              py={2}
                              cursor="pointer"
                              _hover={{ bg: "red.50" }}
                              onClick={handleLogout}
                            >
                              <HStack gap={2}>
                                <FaSignInAlt size={14} color="red" />
                                <Text fontSize="sm" color="red.600" fontWeight="medium">
                                  Logout
                                </Text>
                              </HStack>
                            </Box>
                          </VStack>
                        </Box>
                      )}
                    </Box>
                  </HStack>
                </>
              ) : (
                <>
                  <Button colorScheme="purple" size="sm" onClick={() => navigate("/signin")}>
                    Login
                  </Button>
                  <Button colorScheme="purple" size="sm" onClick={() => navigate("/signup")}>
                    Create Profile
                  </Button>
                </>
              )}
            </HStack>

            <HStack gap={2} display={{ base: "flex", md: "none" }}>
              <IconButton
                aria-label="Home"
                variant="ghost"
                size="sm"
                color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}
                _hover={{
                  color: THEME_CONSTANTS.COLORS.PRIMARY,
                  bg: "gray.50",
                }}
                onClick={() => navigate("/")}
              />

              {isLoggedIn ? (
                <IconButton onClick={onOpen} variant="outline" aria-label="Open menu">
                  <FaBars />
                </IconButton>
              ) : (
                <>
                  <Button colorScheme="purple" size="sm" onClick={() => navigate("/signin")}>
                    Login
                  </Button>
                  <Button colorScheme="purple" size="sm" onClick={() => navigate("/signup")}>
                    Create Profile
                  </Button>
                </>
              )}
            </HStack>
          </Flex>
        </Container>
      </Box>

      {isLoggedIn && (
        <Drawer.Root open={open} onOpenChange={onClose}>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.CloseTrigger />
              <Drawer.Header>Menu</Drawer.Header>
              <Drawer.Body>
                <VStack gap={4} align="stretch">
                  <Box p={4} bg="gray.50" borderRadius="lg" textAlign="center">
                    <Box
                      width="60px"
                      height="60px"
                      borderRadius="full"
                      bgImage={
                        user?.photoUrl
                          ? `url(${user.photoUrl})`
                          : THEME_CONSTANTS.GRADIENTS.SECONDARY
                      }
                      bgSize="cover"
                      bgPos="center"
                      border="3px solid"
                      borderColor="white"
                      boxShadow="md"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontSize="lg"
                      color="white"
                      fontWeight="bold"
                      mx="auto"
                      mb={3}
                    >
                      {!user?.photoUrl && user?.firstName?.[0]?.toUpperCase()}
                    </Box>
                    <Text fontWeight="semibold" color="gray.700">
                      {user?.firstName} {user?.lastName}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {user?.emailId}
                    </Text>
                  </Box>

                  {menuItems.map((item) => (
                    <Button
                      key={item.path}
                      variant="ghost"
                      justifyContent="flex-start"
                      onClick={() => {
                        navigate(item.path);
                        onClose();
                      }}
                    >
                      <HStack gap={2}>
                        <item.icon />
                        <Text>{item.label}</Text>
                      </HStack>
                    </Button>
                  ))}
                  <Button
                    colorScheme="purple"
                    variant="outline"
                    onClick={handleLogout}
                    loading={isLoggingOut}
                    loadingText="Logging out..."
                  >
                    Logout
                  </Button>
                </VStack>
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Drawer.Root>
      )}
    </>
  );
}
