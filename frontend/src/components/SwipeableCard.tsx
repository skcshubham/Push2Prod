import { Badge, Box, Flex, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { FaBirthdayCake, FaHeart, FaTimes } from "react-icons/fa";

import { THEME_CONSTANTS } from "../theme/constants";
import type { User } from "../types/user.types";
import { useState } from "react";

interface SwipeableCardProps {
  user: User;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

export default function SwipeableCard({ user, onSwipeLeft, onSwipeRight }: SwipeableCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<"left" | "right" | null>(null);

  const handleLike = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setAnimationDirection("right");
    setTimeout(() => {
      onSwipeRight();
    }, 300);
  };

  const handlePass = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setAnimationDirection("left");
    setTimeout(() => {
      onSwipeLeft();
    }, 300);
  };

  const getAge = () => {
    if (!user.age) return "";
    return `${user.age} years old`;
  };

  const getAnimationStyles = () => {
    if (!isAnimating || !animationDirection) return {};

    return {
      transform:
        animationDirection === "left"
          ? "translateX(-120%) rotate(-30deg)"
          : "translateX(120%) rotate(30deg)",
      opacity: 0,
      zIndex: 1,
    };
  };

  return (
    <Box
      position="relative"
      width={{ base: "90vw", sm: "480px" }}
      maxW={{ base: "90vw", sm: "480px" }}
      height={{ base: "75vh", sm: "70vh", md: "80vh", lg: "80vh" }}
      mx="auto"
      bg="white"
      borderRadius={{ base: "20px", sm: "24px", md: "28px" }}
      boxShadow={{ base: "0 12px 30px rgba(0,0,0,0.15)", md: "0 20px 40px rgba(0,0,0,0.18)" }}
      overflow="hidden"
      transform={isAnimating ? getAnimationStyles().transform : "translateX(0) rotate(0deg)"}
      opacity={isAnimating ? getAnimationStyles().opacity : 1}
      zIndex={isAnimating ? getAnimationStyles().zIndex : "auto"}
      transition="all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
      pointerEvents={isAnimating ? "none" : "auto"}
      flexShrink={0}
    >
      <Box
        height={{ base: "60%", sm: "62%", md: "65%", lg: "68%" }}
        position="relative"
        overflow="hidden"
      >
        <Box
          width="100%"
          height="100%"
          bg={user.photoUrl ? `url(${user.photoUrl})` : THEME_CONSTANTS.GRADIENTS.SECONDARY}
          bgSize="cover"
          bgPos="center"
          bgRepeat="no-repeat"
          bgAttachment="scroll"
        />

        <Box
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          height={{ base: "25%", sm: "28%", md: "30%", lg: "32%" }}
          bgGradient="linear(to-t, blackAlpha.800, transparent)"
        />
      </Box>

      <Box
        p={{ base: 4, sm: 5, md: 6, lg: 7 }}
        height={{ base: "40%", sm: "38%", md: "35%", lg: "32%" }}
        minHeight={{ base: "160px", sm: "180px", md: "200px", lg: "220px" }}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        overflow="hidden"
        width="100%"
      >
        <VStack
          align="start"
          gap={{ base: 1, sm: 1.5, md: 1.5, lg: 2 }}
          flex="1"
          width="100%"
          minHeight="120px"
        >
          <HStack gap={{ base: 1, sm: 1.5, md: 1.5, lg: 2 }} align="center" width="100%">
            <Text
              fontSize={{ base: "md", sm: "lg", md: "lg", lg: "xl" }}
              fontWeight="bold"
              color="gray.800"
              truncate
              flex="1"
              minWidth="0"
            >
              {user.firstName}
              {user.lastName && ` ${user.lastName}`}
            </Text>
            {user.gender && (
              <Badge
                colorScheme="purple"
                borderRadius="full"
                px={{ base: 1.5, sm: 2, md: 2, lg: 2 }}
                py={{ base: 0.5, sm: 1, md: 1, lg: 1 }}
                fontSize={{ base: "2xs", sm: "xs", md: "xs", lg: "sm" }}
              >
                {user.gender}
              </Badge>
            )}
          </HStack>

          {user.age && (
            <HStack gap={{ base: 1, sm: 1.5, md: 1.5, lg: 1.5 }} color="gray.600">
              <Box color="gray.500">
                <FaBirthdayCake size={20} />
              </Box>
              <Text fontSize={{ base: "2xs", sm: "xs", md: "xs", lg: "sm" }}>{getAge()}</Text>
            </HStack>
          )}

          {user.about && (
            <Box width="100%" maxHeight="40px" overflow="hidden">
              <Text
                fontSize={{ base: "2xs", sm: "xs", md: "xs", lg: "sm" }}
                color="gray.700"
                lineHeight="1.3"
                overflow="hidden"
                textOverflow="ellipsis"
                display="-webkit-box"
                style={{
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {user.about}
              </Text>
            </Box>
          )}

          {user.skills && user.skills.length > 0 && (
            <Box width="100%">
              <HStack
                gap={{ base: 0.5, sm: 1, md: 1, lg: 1.5 }}
                flexWrap="wrap"
                maxHeight="60px"
                overflow="hidden"
              >
                {user.skills.slice(0, 4).map((skill, index) => (
                  <Badge
                    key={index}
                    colorScheme="blue"
                    variant="subtle"
                    borderRadius="full"
                    px={{ base: 1, sm: 1.5, md: 1.5, lg: 2 }}
                    py={{ base: 0.5, sm: 0.5, md: 0.5, lg: 0.5 }}
                    fontSize={{ base: "2xs", sm: "2xs", md: "xs", lg: "xs" }}
                  >
                    {skill}
                  </Badge>
                ))}
                {user.skills.length > 4 && (
                  <Text fontSize={{ base: "2xs", sm: "2xs", md: "xs", lg: "xs" }} color="gray.500">
                    +{user.skills.length - 4} more
                  </Text>
                )}
              </HStack>
            </Box>
          )}
        </VStack>

        <Flex
          justify="space-between"
          align="center"
          pt={{ base: 2, sm: 2, md: 2.5, lg: 2.5 }}
          mt={{ base: 1, sm: 1, md: 1.5, lg: 1.5 }}
        >
          <IconButton
            aria-label="Pass"
            size={{ base: "sm", sm: "md", md: "md", lg: "md" }}
            colorScheme="gray"
            variant="solid"
            bg="gray.200"
            color="gray.600"
            borderRadius="full"
            onClick={handlePass}
            _hover={{ bg: "gray.300", transform: "scale(1.05)" }}
            transition="all 0.2s"
            minW={{ base: "40px", sm: "42px", md: "44px", lg: "46px" }}
            minH={{ base: "40px", sm: "42px", md: "44px", lg: "46px" }}
            disabled={isAnimating}
            opacity={isAnimating ? 0.5 : 1}
          >
            <FaTimes size={22} />
          </IconButton>

          <IconButton
            aria-label="Like"
            size={{ base: "sm", sm: "md", md: "md", lg: "md" }}
            colorScheme="pink"
            variant="solid"
            bg={THEME_CONSTANTS.COLORS.PRIMARY}
            color="white"
            borderRadius="full"
            onClick={handleLike}
            _hover={{ bg: "pink.600", transform: "scale(1.05)" }}
            transition="all 0.2s"
            minW={{ base: "40px", sm: "42px", md: "44px", lg: "46px" }}
            minH={{ base: "40px", sm: "42px", md: "44px", lg: "46px" }}
            disabled={isAnimating}
            opacity={isAnimating ? 0.5 : 1}
          >
            <FaHeart size={22} />
          </IconButton>
        </Flex>
      </Box>
    </Box>
  );
}
