import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { FaCode, FaHeart, FaRocket } from "react-icons/fa";

import { THEME_CONSTANTS } from "../theme/constants";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  badge: string;
  color: string;
}

export default function FeatureCard({ icon, title, description, badge, color }: FeatureCardProps) {
  const iconMap = {
    FaCode,
    FaHeart,
    FaRocket,
  };

  const IconComponent = iconMap[icon as keyof typeof iconMap];

  const colorSchemes = {
    purple: {
      bg: "purple.50",
      color: "purple.500",
      borderColor: "purple.400",
      badgeBg: "purple.50",
      badgeColor: "purple.600",
      badgeBorder: "purple.100",
      gradient: "linear-gradient(90deg, purple.500, blue.500)",
      hoverBg: "linear-gradient(135deg, purple.50, blue.50)",
    },
    red: {
      bg: "red.50",
      color: "red.500",
      borderColor: "red.400",
      badgeBg: "red.50",
      badgeColor: "red.600",
      badgeBorder: "red.100",
      gradient: "linear-gradient(90deg, red.500, pink.500)",
      hoverBg: "linear-gradient(135deg, red.50, pink.50)",
    },
    blue: {
      bg: "blue.50",
      color: "blue.500",
      borderColor: "blue.400",
      badgeBg: "blue.50",
      badgeColor: "blue.600",
      badgeBorder: "blue.100",
      gradient: "linear-gradient(90deg, blue.500, cyan.500)",
      hoverBg: "linear-gradient(135deg, blue.50, cyan.50)",
    },
  };

  const scheme = colorSchemes[color as keyof typeof colorSchemes];

  return (
    <Box
      bg={THEME_CONSTANTS.COLORS.WHITE}
      borderRadius={THEME_CONSTANTS.RADIUS.LG}
      boxShadow={THEME_CONSTANTS.SHADOWS.SM}
      border="1px solid"
      borderColor="gray.100"
      _hover={{
        transform: "translateY(-12px) scale(1.03)",
        boxShadow: "2xl",
        borderColor: scheme.borderColor,
        _before: {
          transform: "scaleX(1)",
        },
        _after: {
          opacity: 1,
          transform: "scale(1)",
        },
      }}
      transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
      overflow="hidden"
      p={8}
      position="relative"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "4px",
        background: scheme.gradient,
        transform: "scaleX(0)",
        transformOrigin: "left",
        transition: "transform 0.3s ease",
      }}
      _after={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: scheme.hoverBg,
        opacity: 0,
        transform: "scale(0.8)",
        transition: "all 0.3s ease",
        zIndex: -1,
      }}
    >
      <VStack gap={6}>
        <Box
          p={6}
          bg={scheme.bg}
          borderRadius="full"
          color={scheme.color}
          _hover={{
            transform: "scale(1.15) rotate(10deg)",
            bg: `${color}.100`,
            boxShadow: "lg",
            _before: {
              opacity: 0.3,
            },
          }}
          transition="all 0.3s ease"
          position="relative"
          _before={{
            content: '""',
            position: "absolute",
            inset: 0,
            borderRadius: "full",
            background: `linear-gradient(45deg, ${color}.200, ${
              color === "purple" ? "blue" : color === "red" ? "pink" : "cyan"
            }.200)`,
            opacity: 0,
            transition: "opacity 0.3s ease",
          }}
        >
          <IconComponent style={{ width: "48px", height: "48px" }} />
        </Box>
        <VStack gap={3}>
          <Heading
            size={{ base: "md", md: "lg" }}
            textAlign="center"
            color={THEME_CONSTANTS.COLORS.TEXT_PRIMARY}
          >
            {title}
          </Heading>
          <Text
            textAlign="center"
            color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}
            fontSize={{ base: "sm", md: "md" }}
            lineHeight="tall"
          >
            {description}
          </Text>
        </VStack>
        <Box
          bg={scheme.badgeBg}
          borderRadius="md"
          p={3}
          w="full"
          border="1px solid"
          borderColor={scheme.badgeBorder}
        >
          <Text fontSize="xs" color={scheme.badgeColor} fontWeight="semibold" textAlign="center">
            {badge}
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}
