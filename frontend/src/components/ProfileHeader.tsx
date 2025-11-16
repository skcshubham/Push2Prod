import { Box, Heading, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import MembershipBadge from "./MembershipBadge";

import { THEME_CONSTANTS } from "../theme/constants";
import type { User } from "../types/user.types";

interface ProfileHeaderProps {
  user: User | undefined;
  isEditing: boolean;
  formData: {
    firstName: string;
    lastName: string;
  };
  onInputChange: (field: string, value: string) => void;
}

export default function ProfileHeader({
  user,
  isEditing,
  formData,
  onInputChange,
}: ProfileHeaderProps) {
  const { membershipType } = useSelector((state: RootState) => state.premium);

  return (
    <Box
      bg={THEME_CONSTANTS.GRADIENTS.PRIMARY}
      p={THEME_CONSTANTS.SPACING.MD}
      textAlign="center"
      borderBottom="1px solid"
      borderColor="purple.100"
    >
      <Box
        width={{ base: "80px", md: "100px" }}
        height={{ base: "80px", md: "100px" }}
        borderRadius={THEME_CONSTANTS.RADIUS.FULL}
        bgImage={
          user?.photoUrl
            ? `url(${user.photoUrl})`
            : THEME_CONSTANTS.GRADIENTS.SECONDARY
        }
        bgSize="cover"
        bgPos="center"
        mb={THEME_CONSTANTS.SPACING.MD}
        border="3px solid"
        borderColor="white"
        boxShadow={THEME_CONSTANTS.SHADOWS.SM}
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize={{
          base: THEME_CONSTANTS.FONT_SIZES["2XL"],
          md: THEME_CONSTANTS.FONT_SIZES["3XL"],
        }}
        color={THEME_CONSTANTS.COLORS.WHITE}
        fontWeight="bold"
        mx="auto"
      >
        {!user?.photoUrl && user?.firstName?.[0]?.toUpperCase()}
      </Box>

      <VStack gap={THEME_CONSTANTS.SPACING.SM}>
        {isEditing ? (
          <VStack gap={THEME_CONSTANTS.SPACING.XS} align="stretch" w="full">
            <Text color="white" fontSize="xs" fontWeight="medium">
              First Name
            </Text>
            <Input
              value={formData.firstName}
              onChange={(e) => onInputChange("firstName", e.target.value)}
              placeholder="Enter your first name"
              size="sm"
              bg="rgba(255, 255, 255, 0.95)"
              border="2px solid"
              borderColor="rgba(255, 255, 255, 0.3)"
              _focus={{
                bg: "white",
                borderColor: "white",
                boxShadow: "0 0 0 3px rgba(255, 255, 255, 0.3)",
              }}
            />
            <Text color="white" fontSize="xs" fontWeight="medium">
              Last Name
            </Text>
            <Input
              value={formData.lastName}
              onChange={(e) => onInputChange("lastName", e.target.value)}
              placeholder="Enter your last name"
              size="sm"
              bg="rgba(255, 255, 255, 0.95)"
              border="2px solid"
              borderColor="rgba(255, 255, 255, 0.3)"
              _focus={{
                bg: "white",
                borderColor: "white",
                boxShadow: "0 0 0 3px rgba(255, 255, 255, 0.3)",
              }}
            />
          </VStack>
        ) : (
          <Heading
            size={{
              base: THEME_CONSTANTS.FONT_SIZES.LG,
              md: THEME_CONSTANTS.FONT_SIZES.XL,
            }}
            color={THEME_CONSTANTS.COLORS.WHITE}
            fontWeight="bold"
          >
            <HStack justify="center" align="center">
              <Text as="span">
                {user?.firstName} {user?.lastName}
              </Text>
              {membershipType ? (
                <MembershipBadge type={membershipType} size={14} />
              ) : null}
            </HStack>
          </Heading>
        )}

        <Text
          color="purple.100"
          fontSize={{
            base: THEME_CONSTANTS.FONT_SIZES.SM,
            md: THEME_CONSTANTS.FONT_SIZES.MD,
          }}
          fontWeight="medium"
        >
          {user?.emailId}
        </Text>

        <Box
          colorScheme="purple"
          px={THEME_CONSTANTS.SPACING.SM}
          py={THEME_CONSTANTS.SPACING.XS}
          borderRadius={THEME_CONSTANTS.RADIUS.FULL}
          fontSize="xs"
          bg="rgba(255, 255, 255, 0.2)"
          color="white"
          backdropFilter="blur(10px)"
        >
          {membershipType
            ? `⭐ ${membershipType.toUpperCase()} member`
            : `💻 Developer since ${new Date(
                user?.createdAt || Date.now()
              ).getFullYear()}`}
        </Box>
      </VStack>
    </Box>
  );
}
