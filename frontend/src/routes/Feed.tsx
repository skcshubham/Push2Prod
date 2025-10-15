import { Box, Button, Heading, Spinner, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import AppNavigation from "../components/AppNavigation";
import SwipeableCard from "../components/SwipeableCard";
import type { User } from "../types/user.types";
import { useGetFeedQuery } from "../services/api";

export default function Feed() {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { data: feedData, isLoading, error, refetch } = useGetFeedQuery({ page: 1, limit: 10 });

  useEffect(() => {
    if (feedData?.data) {
      setUsers(feedData.data);
      setCurrentUserIndex(0);
    }
  }, [feedData]);

  const handleSwipeLeft = () => {
    setCurrentUserIndex((prev) => prev + 1);

    if (currentUserIndex >= users.length - 1 && !isLoadingMore) {
      setIsLoadingMore(true);
      refetch().finally(() => setIsLoadingMore(false));
    }
  };

  const handleSwipeRight = () => {
    setCurrentUserIndex((prev) => prev + 1);

    if (currentUserIndex >= users.length - 1 && !isLoadingMore) {
      setIsLoadingMore(true);
      refetch().finally(() => setIsLoadingMore(false));
    }
  };

  const handleRefresh = () => {
    setUsers([]);
    setCurrentUserIndex(0);
    setIsLoadingMore(false);
    refetch();
  };

  if (error) {
    return (
      <Box height="100vh" display="flex" flexDirection="column" overflow="hidden">
        <AppNavigation />
        <Box
          flex="1"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          px={4}
        >
          <VStack gap={4} maxW="container.md" width="100%">
            <Heading size="lg" color="red.500">
              Oops! Something went wrong
            </Heading>
            <Text color="gray.600" textAlign="center">
              We couldn't load your feed. Please try again.
            </Text>
            <Button colorScheme="purple" onClick={handleRefresh}>
              Try Again
            </Button>
          </VStack>
        </Box>
      </Box>
    );
  }

  if (isLoading && users.length === 0) {
    return (
      <Box height="100vh" display="flex" flexDirection="column" overflow="hidden">
        <AppNavigation />
        <Box
          flex="1"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          px={4}
        >
          <VStack gap={4} maxW="container.md" width="100%">
            <Spinner size="xl" color="purple.500" />
            <Text color="gray.600">Finding your perfect matches...</Text>
          </VStack>
        </Box>
      </Box>
    );
  }

  if (currentUserIndex >= users.length && users.length > 0) {
    return (
      <Box height="100vh" display="flex" flexDirection="column" overflow="hidden">
        <AppNavigation />
        <Box
          flex="1"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          px={4}
        >
          <VStack gap={4} maxW="container.md" width="100%">
            <Heading size="lg" color="gray.700">
              No more matches right now! 🎉
            </Heading>
            <Text color="gray.600" textAlign="center">
              You've seen everyone in your area. Check back later for new people!
            </Text>
            <Button colorScheme="purple" onClick={handleRefresh}>
              Refresh Feed
            </Button>
          </VStack>
        </Box>
      </Box>
    );
  }

  if (users.length === 0 && isLoading) {
    return (
      <Box height="100vh" display="flex" flexDirection="column" overflow="hidden">
        <AppNavigation />
        <Box
          flex="1"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          px={4}
        >
          <VStack gap={4} maxW="container.md" width="100%">
            <Spinner size="xl" color="purple.500" />
            <Text color="gray.600">Finding your perfect matches...</Text>
          </VStack>
        </Box>
      </Box>
    );
  }

  if (users.length === 0 && !isLoading) {
    return (
      <Box height="100vh" display="flex" flexDirection="column" overflow="hidden">
        <AppNavigation />
        <Box
          flex="1"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          px={4}
        >
          <VStack gap={4} maxW="container.md" width="100%">
            <Heading size="lg" color="gray.700">
              No matches found
            </Heading>
            <Text color="gray.600" textAlign="center">
              We couldn't find any matches for you right now. Please try again later.
            </Text>
            <Button colorScheme="purple" onClick={handleRefresh}>
              Try Again
            </Button>
          </VStack>
        </Box>
      </Box>
    );
  }

  return (
    <Box height="100vh" display="flex" flexDirection="column" overflow="hidden">
      <AppNavigation />

      <Box textAlign="center" pt={6} px={4} bg="white">
        <Heading size="lg" color="gray.800">
          Discover New People 💖
        </Heading>
        <Text color="gray.500" fontSize="sm">
          Click the heart to like or X to pass
        </Text>
      </Box>

      <Box flex="1" display="flex" justifyContent="center" alignItems="center" px={4} py={4}>
        <Box
          position="relative"
          width="100%"
          maxW="container.md"
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="500px"
        >
          {users.slice(currentUserIndex, currentUserIndex + 3).map((user, index) => (
            <Box
              key={`${currentUserIndex + index}-${user.firstName}-${
                user.lastName || "no-lastname"
              }`}
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              zIndex={3 - index}
              opacity={index === 0 ? 1 : 0.95 - index * 0.05}
              scale={index === 0 ? 1 : 0.95 - index * 0.02}
              transition="all 0.3s ease-out"
              pointerEvents={index === 0 ? "auto" : "none"}
              filter={index > 0 ? "blur(0.5px)" : "none"}
            >
              <SwipeableCard
                user={user}
                onSwipeLeft={index === 0 ? handleSwipeLeft : () => {}}
                onSwipeRight={index === 0 ? handleSwipeRight : () => {}}
              />
            </Box>
          ))}
        </Box>

        {isLoadingMore && (
          <Box position="absolute" bottom={4} left="50%" transform="translateX(-50%)">
            <Spinner size="sm" color="purple.500" />
            <Text fontSize="xs" color="gray.500" mt={1}>
              Loading more matches...
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
}
