import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaHeart, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useLazyGetFeedQuery, useRespondToFeedRequestMutation } from "../services/api";

import AppNavigation from "../components/AppNavigation";
import type { User } from "../types/user.types";
import MembershipBadge from "../components/MembershipBadge";

export default function Feed() {
  const [limit, setLimit] = useState(5);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [noMoreUsers, setNoMoreUsers] = useState(false);
  const [getFeed, { data: users, isLoading, error }] = useLazyGetFeedQuery();
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [respondToFeedRequest, { isLoading: isResponding }] = useRespondToFeedRequestMutation();

  // Reset state when component mounts
  useEffect(() => {
    setAllUsers([]);
    setCurrentUserIndex(0);
    setLimit(5);
    setIsLoadingMore(false);
    setNoMoreUsers(false);
    // Load initial data
    getFeed({ page: 1, limit: 5 });
  }, []);

  const cardWidth = useBreakpointValue({
    base: "95vw",
    xs: "90vw",
    sm: "85vw",
    md: "400px",
    lg: "420px",
    xl: "450px",
  });
  const cardHeight = useBreakpointValue({
    base: "calc(100vh - 170px)",
    xs: "calc(100vh - 170px)",
    sm: "calc(100vh - 170px)",
    md: "calc(100vh - 170px)",
    lg: "calc(100vh - 170px)",
  });
  const buttonIconSize = useBreakpointValue({ base: 20, sm: 24 });
  const heartIconSize = useBreakpointValue({ base: 24, sm: 28 });
  const skillsLimit = useBreakpointValue({ base: 2, sm: 3, md: 3 }) || 3;
  const textClamp = useBreakpointValue({ base: 2, sm: 2, md: 2 }) || 2;

  // Update allUsers when new data comes in
  useEffect(() => {
    if (users?.data !== undefined) {
      if (limit === 5) {
        setAllUsers(users.data);
      } else {
        if (users.data.length === 0) {
          // If no more users, keep existing users but don't append empty array
          setNoMoreUsers(true);
        } else {
          // Always append new users, don't replace
          setAllUsers((prev) => {
            // Filter out users that are already in the array to avoid duplicates
            const existingIds = new Set(prev.map((user) => user._id));
            const newUsers = users.data.filter((user) => !existingIds.has(user._id));
            return [...prev, ...newUsers];
          });
          setNoMoreUsers(false);
        }
      }
      setIsLoadingMore(false);
    }
  }, [users?.data, limit]);

  const handlePass = async (currentUser: User) => {
    try {
      await respondToFeedRequest({
        status: "ignored",
        toUserId: currentUser._id.toString(),
      }).unwrap();
      setCurrentUserIndex((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to pass user:", error);
    }
  };

  const handleLike = async (currentUser: User) => {
    try {
      await respondToFeedRequest({
        status: "interested",
        toUserId: currentUser._id.toString(),
      }).unwrap();
      setCurrentUserIndex((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to like user:", error);
    }
  };

  if (isLoading && allUsers.length === 0) {
    return (
      <Box height="90vh" display="flex" flexDirection="column" overflow="hidden">
        <AppNavigation />
        <Box flex="1" display="flex" justifyContent="center" alignItems="center">
          <VStack gap={4}>
            <Box className="animate-pulse">
              <Box width="300px" height="400px" bg="gray.200" borderRadius="xl" />
            </Box>
            <Text color="gray.600">Finding your perfect matches...</Text>
          </VStack>
        </Box>
      </Box>
    );
  }

  if (error || (!isLoading && allUsers.length === 0)) {
    return (
      <Box height="100vh" display="flex" flexDirection="column" overflow="hidden">
        <AppNavigation />
        <Box flex="1" display="flex" justifyContent="center" alignItems="center">
          <VStack gap={4} textAlign="center" px={4}>
            <Heading size="lg" color="gray.700">
              No matches found
            </Heading>
            <Text color="gray.600">
              We couldn't find any matches for you right now. Please try again later.
            </Text>
          </VStack>
        </Box>
      </Box>
    );
  }

  if (currentUserIndex >= allUsers.length && !isLoading) {
    return (
      <Box height="100vh" display="flex" flexDirection="column" overflow="hidden">
        <AppNavigation />
        <Box flex="1" display="flex" justifyContent="center" alignItems="center">
          <VStack gap={4} textAlign="center" px={4}>
            <Heading size="lg" color="gray.700">
              {noMoreUsers ? "No more matches! 🎉" : "All users swiped! 🎉"}
            </Heading>
            <Text color="gray.600">
              {noMoreUsers
                ? "You've seen everyone in your area. Check back later for new people!"
                : `You've seen all ${allUsers.length} users. Load more to continue!`}
            </Text>
            {!noMoreUsers && (
              <Button
                colorScheme="purple"
                onClick={() => {
                  setIsLoadingMore(true);
                  const nextLimit = limit + 5;
                  setLimit(nextLimit);
                  getFeed({ page: 1, limit: nextLimit });
                }}
                loading={isLoadingMore}
              >
                Load More Users
              </Button>
            )}
          </VStack>
        </Box>
      </Box>
    );
  }

  const currentUser = allUsers[currentUserIndex];

  return (
    <Box height="100vh" display="flex" flexDirection="column" overflow="hidden">
      <AppNavigation />

      {/* Show loading indicator when fetching more users */}
      {isLoading && allUsers.length > 0 && (
        <Box position="absolute" top="20px" right="20px" zIndex={20}>
          <Box
            bg="white"
            px={3}
            py={2}
            borderRadius="full"
            boxShadow="0 4px 12px rgba(0,0,0,0.15)"
            fontSize="sm"
            color="gray.600"
          >
            Loading more matches...
          </Box>
        </Box>
      )}

      <Box
        flex="1"
        display="flex"
        justifyContent="center"
        alignItems="center"
        px={{ base: 2, sm: 4 }}
        py={{ base: 2, sm: 4 }}
        mt={{ base: 2, sm: 4 }} // Add margin top to account for navbar
        pb={{ base: "80px", sm: "100px" }} // Add bottom padding for action buttons
      >
        <Container
          maxW="container.md"
          display="flex"
          justifyContent="center"
          px={{ base: 0, sm: 4 }}
        >
          <Box position="relative" width={cardWidth} height={cardHeight}>
            <Card.Root
              width="100%"
              height="100%"
              overflow="hidden"
              borderRadius={{ base: "2xl", md: "3xl" }}
              boxShadow={{
                base: "0 20px 40px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.06), 0 0 0 1px rgba(255,255,255,0.05)",
                md: "0 25px 50px rgba(0,0,0,0.12), 0 12px 24px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.1)",
              }}
              bg="white"
              border="1px solid"
              borderColor="gray.100"
              position="relative"
            >
              {/* Main Image with Background Gradient */}
              <Box
                position="relative"
                height="100%"
                overflow="hidden"
                bgGradient="linear(135deg, purple.400 0%, pink.400 25%, blue.400 50%, teal.400 75%, green.400 100%)"
              >
                {/* Maximum Image Visibility */}
                <Image
                  src={
                    currentUser.photoUrl ||
                    "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?semt=ais_hybrid&w=740&q=80"
                  }
                  alt={`${currentUser.firstName}'s profile`}
                  width="100%"
                  height="100%"
                  objectFit="cover"
                  opacity="0.8"
                  position="absolute"
                  top="0"
                  left="0"
                  zIndex={1}
                />

                {/* Minimal gradient overlay for maximum image visibility */}
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  right="0"
                  bottom="0"
                  bgGradient="linear(to-b, blackAlpha.200 0%, blackAlpha.150 20%, blackAlpha.100 40%, blackAlpha.50 60%, blackAlpha.25 80%, transparent 100%)"
                  zIndex={2}
                />

                {/* Enhanced bottom gradient overlay for better text visibility */}
                <Box
                  position="absolute"
                  bottom="0"
                  left="0"
                  right="0"
                  height="50%"
                  bgGradient="linear(to-t, blackAlpha.950 0%, blackAlpha.850 15%, blackAlpha.750 30%, blackAlpha.600 45%, blackAlpha.400 60%, blackAlpha.200 75%, transparent 100%)"
                  zIndex={2}
                />

                {/* Stronger bottom gradient for text area */}
                <Box
                  position="absolute"
                  bottom="0"
                  left="0"
                  right="0"
                  height="35%"
                  bgGradient="linear(to-t, blackAlpha.950 0%, blackAlpha.900 20%, blackAlpha.800 40%, blackAlpha.700 60%, blackAlpha.500 80%, transparent 100%)"
                  zIndex={2}
                />

                {/* Compact User Info Overlay */}
                <Box
                  position="absolute"
                  bottom="0"
                  left="0"
                  right="0"
                  p={{ base: 3, sm: 4, md: 5 }}
                  zIndex={3}
                >
                  <VStack align="start" gap={0} height="100%">
                    {/* Name and Gender */}
                    <HStack gap={2} width="100%" align="center">
                      <Heading
                        size={{ base: "lg", sm: "xl", md: "xl" }}
                        color="white"
                        lineHeight="1.0"
                        fontWeight="black"
                        letterSpacing="-0.02em"
                        textShadow="0 3px 12px rgba(0,0,0,0.95), 0 2px 8px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.6)"
                        filter="drop-shadow(0 0 8px rgba(0,0,0,0.8))"
                        _hover={{ transform: "translateY(-2px)" }}
                        transition="transform 0.3s ease"
                        fontFamily="heading"
                      >
                        {currentUser.firstName} {currentUser.lastName}
                      </Heading>
                      {currentUser.membershipType ? (
                        <Box flex="0 0 auto">
                          <MembershipBadge type={currentUser.membershipType} size={16} />
                        </Box>
                      ) : null}
                      {currentUser.gender && (
                        <Badge
                          colorScheme="purple"
                          variant="solid"
                          fontSize={{ base: "2xs", sm: "xs" }}
                          px={{ base: 2, sm: 2.5 }}
                          py={{ base: 1, sm: 1 }}
                          borderRadius="full"
                          fontWeight="medium"
                        >
                          {currentUser.age}, {currentUser.gender}
                        </Badge>
                      )}
                    </HStack>

                    {/* Compact About */}
                    {currentUser.about && (
                      <Box width="100%" position="relative" mt={0} mb={0}>
                        <Text
                          color="white"
                          fontSize={{ base: "xs", sm: "sm" }}
                          lineHeight="1.4"
                          overflow="hidden"
                          display="-webkit-box"
                          fontWeight="medium"
                          textShadow="0 2px 6px rgba(0,0,0,0.9), 0 1px 3px rgba(0,0,0,0.7), 0 1px 2px rgba(0,0,0,0.5)"
                          filter="drop-shadow(0 0 4px rgba(0,0,0,0.7))"
                          letterSpacing="0.005em"
                          marginY={1}
                          fontFamily="body"
                          style={{
                            WebkitLineClamp: textClamp,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {currentUser.about}
                        </Text>
                      </Box>
                    )}

                    {/* Compact Skills/Tags */}
                    {currentUser.skills && currentUser.skills.length > 0 && (
                      <Box width="100%" mt={2}>
                        <HStack
                          gap={{ base: 1, sm: 1.5 }}
                          flexWrap="wrap"
                          maxHeight={{ base: "30px", sm: "35px" }}
                          overflow="hidden"
                        >
                          {currentUser.skills.slice(0, skillsLimit).map((skill, index) => (
                            <Badge
                              key={index}
                              colorScheme="blue"
                              variant="solid"
                              fontSize={{ base: "2xs", sm: "xs" }}
                              px={{ base: 2, sm: 2.5 }}
                              py={{ base: 1, sm: 1 }}
                              borderRadius="full"
                              fontWeight="medium"
                            >
                              {skill}
                            </Badge>
                          ))}
                          {currentUser.skills.length > skillsLimit && (
                            <Badge
                              colorScheme="gray"
                              variant="solid"
                              fontSize={{ base: "2xs", sm: "xs" }}
                              px={{ base: 2, sm: 2.5 }}
                              py={{ base: 1, sm: 1 }}
                              borderRadius="full"
                              fontWeight="medium"
                            >
                              +{currentUser.skills.length - skillsLimit} more
                            </Badge>
                          )}
                        </HStack>
                      </Box>
                    )}
                  </VStack>
                </Box>
              </Box>
            </Card.Root>

            {/* Compact Action Buttons */}
            <HStack
              position="absolute"
              bottom={{ base: "-50px", sm: "-60px" }}
              left="50%"
              transform="translateX(-50%)"
              gap={{ base: 4, sm: 6 }}
              justify="center"
              zIndex={10}
            >
              <Button
                size={{ base: "md", sm: "lg" }}
                borderRadius="full"
                colorScheme="gray"
                variant="solid"
                bg="white"
                color="gray.700"
                boxShadow={{
                  base: "0 8px 25px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.1)",
                  sm: "0 12px 30px rgba(0,0,0,0.18), 0 6px 16px rgba(0,0,0,0.12)",
                }}
                width={{ base: "50px", sm: "60px" }}
                height={{ base: "50px", sm: "60px" }}
                onClick={() => handlePass(currentUser)}
                loading={isResponding}
                loadingText=""
                disabled={isResponding}
                border="3px solid"
                borderColor="gray.200"
                _hover={{
                  bg: "gray.50",
                  transform: "scale(1.15) translateY(-4px)",
                  boxShadow: {
                    base: "0 20px 50px rgba(0,0,0,0.3), 0 8px 20px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.2)",
                    sm: "0 24px 60px rgba(0,0,0,0.35), 0 12px 24px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.25)",
                  },
                  borderColor: "gray.300",
                }}
                _active={{
                  transform: "scale(0.9)",
                  bg: "gray.100",
                }}
                transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                position="relative"
                overflow="hidden"
                _before={{
                  content: '""',
                  position: "absolute",
                  inset: "-3px",
                  borderRadius: "full",
                  padding: "3px",
                  background: "linear-gradient(135deg, #e2e8f0, #cbd5e0, #a0aec0)",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "xor",
                }}
              >
                <FaTimes size={buttonIconSize} />
              </Button>

              <Button
                size={{ base: "md", sm: "lg" }}
                borderRadius="full"
                colorScheme="pink"
                variant="solid"
                bg="linear-gradient(135deg, #ff6b6b 0%, #ee5a52 25%, #ff4757 50%, #e53e3e 75%, #c53030 100%)"
                color="white"
                boxShadow={{
                  base: "0 8px 25px rgba(255,107,107,0.4), 0 4px 12px rgba(255,107,107,0.3)",
                  sm: "0 12px 30px rgba(255,107,107,0.5), 0 6px 16px rgba(255,107,107,0.4)",
                }}
                width={{ base: "60px", sm: "70px" }}
                height={{ base: "60px", sm: "70px" }}
                onClick={() => handleLike(currentUser)}
                loading={isResponding}
                loadingText=""
                disabled={isResponding}
                border="3px solid"
                borderColor="pink.300"
                _hover={{
                  transform: "scale(1.15) translateY(-4px)",
                  boxShadow: {
                    base: "0 20px 50px rgba(255,107,107,0.7), 0 8px 20px rgba(255,107,107,0.6), 0 0 0 1px rgba(255,255,255,0.2)",
                    sm: "0 24px 60px rgba(255,107,107,0.8), 0 12px 24px rgba(255,107,107,0.7), 0 0 0 1px rgba(255,255,255,0.25)",
                  },
                  borderColor: "pink.400",
                  bg: "linear-gradient(135deg, #ff5252 0%, #e53935 25%, #f44336 50%, #d32f2f 75%, #b71c1c 100%)",
                }}
                _active={{
                  transform: "scale(0.9)",
                  bg: "linear-gradient(135deg, #e53935 0%, #d32f2f 25%, #c62828 50%, #b71c1c 75%, #a71e1e 100%)",
                }}
                transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                position="relative"
                overflow="hidden"
                _before={{
                  content: '""',
                  position: "absolute",
                  inset: "-3px",
                  borderRadius: "full",
                  padding: "3px",
                  background: "linear-gradient(135deg, #ff6b6b, #ee5a52, #ff4757, #e53e3e)",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "xor",
                }}
              >
                <FaHeart size={heartIconSize} />
              </Button>
            </HStack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
