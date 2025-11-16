import {
  Badge,
  Box,
  Flex,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaBirthdayCake, FaHeart, FaTimes } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

import { THEME_CONSTANTS } from "../theme/constants";
import type { User } from "../types/user.types";
import MembershipBadge from "./MembershipBadge";

interface SwipeableCardProps {
  user: User;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

export default function SwipeableCard({
  user,
  onSwipeLeft,
  onSwipeRight,
}: SwipeableCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<
    "left" | "right" | null
  >(null);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(
    null
  );
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

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

  // Touch gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isAnimating) return;
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isAnimating || !touchStart) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;

    // Only track horizontal movement for swiping
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      setDragOffset({ x: deltaX, y: 0 });
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isAnimating || !touchStart) return;
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;

    // Reset drag offset
    setDragOffset({ x: 0, y: 0 });

    // Determine if it's a swipe
    const minSwipeDistance = 50;
    const maxVerticalMovement = 100;

    if (
      Math.abs(deltaX) > minSwipeDistance &&
      Math.abs(deltaY) < maxVerticalMovement
    ) {
      if (deltaX > 0) {
        handleLike();
      } else {
        handlePass();
      }
    }

    setTouchStart(null);
  };

  // Mouse drag handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isAnimating) return;
    setTouchStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isAnimating || !touchStart) return;
    const deltaX = e.clientX - touchStart.x;
    const deltaY = e.clientY - touchStart.y;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      setDragOffset({ x: deltaX, y: 0 });
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (isAnimating || !touchStart) return;
    const deltaX = e.clientX - touchStart.x;
    const deltaY = e.clientY - touchStart.y;

    setDragOffset({ x: 0, y: 0 });

    const minSwipeDistance = 50;
    const maxVerticalMovement = 100;

    if (
      Math.abs(deltaX) > minSwipeDistance &&
      Math.abs(deltaY) < maxVerticalMovement
    ) {
      if (deltaX > 0) {
        handleLike();
      } else {
        handlePass();
      }
    }

    setTouchStart(null);
  };

  // Reset drag offset when animation starts
  useEffect(() => {
    if (isAnimating) {
      setDragOffset({ x: 0, y: 0 });
    }
  }, [isAnimating]);

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

  const getDragStyles = () => {
    if (dragOffset.x === 0) return {};

    const rotation = dragOffset.x * 0.1; // Slight rotation based on drag distance
    const opacity = Math.max(0.7, 1 - Math.abs(dragOffset.x) / 300);

    return {
      transform: `translateX(${dragOffset.x}px) rotate(${rotation}deg)`,
      opacity: opacity,
    };
  };

  return (
    <Box
      ref={cardRef}
      position="relative"
      width={{
        base: "85vw",
        sm: "400px",
        md: "450px",
        lg: "480px",
        xl: "520px",
      }}
      maxW={{
        base: "85vw",
        sm: "400px",
        md: "450px",
        lg: "480px",
        xl: "520px",
      }}
      height={{
        base: "70vh",
        sm: "75vh",
        md: "78vh",
        lg: "80vh",
        xl: "82vh",
      }}
      maxH={{
        base: "600px",
        sm: "700px",
        md: "750px",
        lg: "800px",
        xl: "850px",
      }}
      mx="auto"
      bg="white"
      borderRadius={{
        base: "16px",
        sm: "20px",
        md: "22px",
        lg: "24px",
        xl: "26px",
      }}
      boxShadow={{
        base: "0 8px 25px rgba(0,0,0,0.12)",
        sm: "0 12px 30px rgba(0,0,0,0.15)",
        md: "0 16px 35px rgba(0,0,0,0.18)",
        lg: "0 20px 40px rgba(0,0,0,0.18)",
      }}
      overflow="hidden"
      transform={
        isAnimating
          ? getAnimationStyles().transform
          : dragOffset.x !== 0
          ? getDragStyles().transform
          : "translateX(0) rotate(0deg)"
      }
      opacity={
        isAnimating
          ? getAnimationStyles().opacity
          : dragOffset.x !== 0
          ? getDragStyles().opacity
          : 1
      }
      zIndex={isAnimating ? getAnimationStyles().zIndex : "auto"}
      transition={
        isAnimating
          ? "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
          : "transform 0.1s ease-out"
      }
      pointerEvents={isAnimating ? "none" : "auto"}
      flexShrink={0}
      cursor={dragOffset.x !== 0 ? "grabbing" : "grab"}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        setDragOffset({ x: 0, y: 0 });
        setTouchStart(null);
      }}
      _hover={{
        transform:
          !isAnimating && dragOffset.x === 0 ? "translateY(-4px)" : undefined,
        boxShadow:
          !isAnimating && dragOffset.x === 0
            ? {
                base: "0 12px 35px rgba(0,0,0,0.15)",
                sm: "0 16px 40px rgba(0,0,0,0.18)",
                md: "0 20px 45px rgba(0,0,0,0.20)",
                lg: "0 24px 50px rgba(0,0,0,0.22)",
              }
            : undefined,
        transition: "all 0.2s ease-out",
      }}
    >
      <Box
        height={{
          base: "58%",
          sm: "62%",
          md: "65%",
          lg: "68%",
          xl: "70%",
        }}
        position="relative"
        overflow="hidden"
      >
        <Box
          width="100%"
          height="100%"
          bg={
            user.photoUrl
              ? `url(${user.photoUrl})`
              : THEME_CONSTANTS.GRADIENTS.SECONDARY
          }
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
          height={{
            base: "30%",
            sm: "28%",
            md: "30%",
            lg: "32%",
            xl: "35%",
          }}
          bgGradient="linear(to-t, blackAlpha.800, transparent)"
        />
      </Box>

      <Box
        p={{
          base: 3,
          sm: 4,
          md: 5,
          lg: 6,
          xl: 7,
        }}
        height={{
          base: "42%",
          sm: "38%",
          md: "35%",
          lg: "32%",
          xl: "30%",
        }}
        minHeight={{
          base: "140px",
          sm: "170px",
          md: "190px",
          lg: "210px",
          xl: "230px",
        }}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        overflow="hidden"
        width="100%"
      >
        <VStack
          align="start"
          gap={{
            base: 0.5,
            sm: 1.5,
            md: 1.5,
            lg: 2,
            xl: 2.5,
          }}
          flex="1"
          width="100%"
          minHeight={{
            base: "100px",
            sm: "120px",
            md: "130px",
            lg: "140px",
            xl: "150px",
          }}
        >
          <HStack
            gap={{
              base: 1,
              sm: 1.5,
              md: 1.5,
              lg: 2,
              xl: 2.5,
            }}
            align="center"
            width="100%"
          >
            <HStack align="center" gap={2} flex="1" minWidth="0">
              <Text
                fontSize={{
                  base: "sm",
                  sm: "lg",
                  md: "lg",
                  lg: "xl",
                  xl: "2xl",
                }}
                fontWeight="bold"
                color="gray.800"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                flex="0 1 auto"
              >
                {user.firstName}
                {user.lastName && ` ${user.lastName}`}
              </Text>
              {user.membershipType ? (
                <Box flex="0 0 auto">
                  <MembershipBadge type={user.membershipType} size={16} />
                </Box>
              ) : null}
            </HStack>
            {user.gender && (
              <Badge
                colorScheme="purple"
                borderRadius="full"
                px={{
                  base: 1,
                  sm: 2,
                  md: 2,
                  lg: 2,
                  xl: 2.5,
                }}
                py={{
                  base: 0.5,
                  sm: 1,
                  md: 1,
                  lg: 1,
                  xl: 1.5,
                }}
                fontSize={{
                  base: "2xs",
                  sm: "xs",
                  md: "xs",
                  lg: "sm",
                  xl: "sm",
                }}
              >
                {user.gender}
              </Badge>
            )}
          </HStack>

          {user.age && (
            <HStack
              gap={{
                base: 1,
                sm: 1.5,
                md: 1.5,
                lg: 1.5,
                xl: 2,
              }}
              color="gray.600"
            >
              <Box color="gray.500">
                <FaBirthdayCake size={20} />
              </Box>
              <Text
                fontSize={{
                  base: "2xs",
                  sm: "xs",
                  md: "xs",
                  lg: "sm",
                  xl: "md",
                }}
              >
                {getAge()}
              </Text>
            </HStack>
          )}

          {user.about && (
            <Box
              width="100%"
              maxHeight={{
                base: "35px",
                sm: "45px",
                md: "50px",
                lg: "55px",
                xl: "60px",
              }}
              overflow="hidden"
            >
              <Text
                fontSize={{
                  base: "2xs",
                  sm: "xs",
                  md: "xs",
                  lg: "sm",
                  xl: "md",
                }}
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
                gap={{
                  base: 0.5,
                  sm: 1,
                  md: 1,
                  lg: 1.5,
                  xl: 2,
                }}
                flexWrap="wrap"
                maxHeight={{
                  base: "50px",
                  sm: "60px",
                  md: "65px",
                  lg: "70px",
                  xl: "75px",
                }}
                overflow="hidden"
              >
                {user.skills.slice(0, 4).map((skill, index) => (
                  <Badge
                    key={index}
                    colorScheme="blue"
                    variant="subtle"
                    borderRadius="full"
                    px={{
                      base: 1,
                      sm: 1.5,
                      md: 1.5,
                      lg: 2,
                      xl: 2.5,
                    }}
                    py={{
                      base: 0.5,
                      sm: 0.5,
                      md: 0.5,
                      lg: 0.5,
                      xl: 1,
                    }}
                    fontSize={{
                      base: "2xs",
                      sm: "2xs",
                      md: "xs",
                      lg: "xs",
                      xl: "sm",
                    }}
                  >
                    {skill}
                  </Badge>
                ))}
                {user.skills.length > 4 && (
                  <Text
                    fontSize={{
                      base: "2xs",
                      sm: "2xs",
                      md: "xs",
                      lg: "xs",
                      xl: "sm",
                    }}
                    color="gray.500"
                  >
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
          pt={{
            base: 1.5,
            sm: 2,
            md: 2.5,
            lg: 2.5,
            xl: 3,
          }}
          mt={{
            base: 0.5,
            sm: 1,
            md: 1.5,
            lg: 1.5,
            xl: 2,
          }}
          gap={{
            base: 3,
            sm: 4,
            md: 5,
            lg: 6,
            xl: 8,
          }}
        >
          <IconButton
            aria-label="Pass"
            size={{
              base: "sm",
              sm: "md",
              md: "md",
              lg: "md",
              xl: "lg",
            }}
            colorScheme="gray"
            variant="solid"
            bg="gray.200"
            color="gray.600"
            borderRadius="full"
            onClick={handlePass}
            _hover={{ bg: "gray.300", transform: "scale(1.05)" }}
            _active={{ transform: "scale(0.95)" }}
            transition="all 0.2s"
            minW={{
              base: "36px",
              sm: "44px",
              md: "46px",
              lg: "48px",
              xl: "52px",
            }}
            minH={{
              base: "36px",
              sm: "44px",
              md: "46px",
              lg: "48px",
              xl: "52px",
            }}
            disabled={isAnimating}
            opacity={isAnimating ? 0.5 : 1}
          >
            <FaTimes size={22} />
          </IconButton>

          <IconButton
            aria-label="Like"
            size={{
              base: "sm",
              sm: "md",
              md: "md",
              lg: "md",
              xl: "lg",
            }}
            colorScheme="pink"
            variant="solid"
            bg={THEME_CONSTANTS.COLORS.PRIMARY}
            color="white"
            borderRadius="full"
            onClick={handleLike}
            _hover={{ bg: "pink.600", transform: "scale(1.05)" }}
            _active={{ transform: "scale(0.95)" }}
            transition="all 0.2s"
            minW={{
              base: "36px",
              sm: "44px",
              md: "46px",
              lg: "48px",
              xl: "52px",
            }}
            minH={{
              base: "36px",
              sm: "44px",
              md: "46px",
              lg: "48px",
              xl: "52px",
            }}
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
