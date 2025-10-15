import { Box, Button, HStack, Heading, Text, VStack } from "@chakra-ui/react";

import { THEME_CONSTANTS } from "../theme/constants";
import type { User } from "../types/user.types";

interface ProfileInfoProps {
  user: User | undefined;
  isEditing: boolean;
  onEditClick: () => void;
}

export default function ProfileInfo({ user, isEditing, onEditClick }: ProfileInfoProps) {
  return (
    <Box p={THEME_CONSTANTS.SPACING.XL}>
      {!isEditing && (
        <Box mb={THEME_CONSTANTS.SPACING.LG} textAlign="center">
          <Button
            size="md"
            colorScheme="purple"
            variant="solid"
            onClick={onEditClick}
            px={THEME_CONSTANTS.SPACING.XL}
          >
            ✏️ Edit Profile
          </Button>
        </Box>
      )}

      <Heading
        size={THEME_CONSTANTS.FONT_SIZES.LG}
        mb={THEME_CONSTANTS.SPACING.MD}
        color={THEME_CONSTANTS.COLORS.TEXT_PRIMARY}
        fontWeight="semibold"
        textAlign="center"
      >
        📊 Profile Information
      </Heading>

      <VStack gap={THEME_CONSTANTS.SPACING.MD} align="stretch">
        {(user?.age || user?.gender) && (
          <Box
            bg={THEME_CONSTANTS.COLORS.SECONDARY}
            p={THEME_CONSTANTS.SPACING.MD}
            borderRadius={THEME_CONSTANTS.RADIUS.MD}
          >
            <HStack justify="space-between" wrap="wrap" gap={THEME_CONSTANTS.SPACING.SM}>
              {user?.age && (
                <VStack gap={1}>
                  <Text
                    fontSize="sm"
                    color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}
                    fontWeight="medium"
                  >
                    Age
                  </Text>
                  <Text fontWeight="semibold" color={THEME_CONSTANTS.COLORS.TEXT_PRIMARY}>
                    {user.age} years
                  </Text>
                </VStack>
              )}
              {user?.gender && (
                <VStack gap={1}>
                  <Text
                    fontSize="sm"
                    color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}
                    fontWeight="medium"
                  >
                    Gender
                  </Text>
                  <Text
                    fontWeight="semibold"
                    color={THEME_CONSTANTS.COLORS.TEXT_PRIMARY}
                    textTransform="capitalize"
                  >
                    {user.gender}
                  </Text>
                </VStack>
              )}
            </HStack>
          </Box>
        )}

        <Box
          bg={THEME_CONSTANTS.COLORS.SECONDARY}
          p={THEME_CONSTANTS.SPACING.MD}
          borderRadius={THEME_CONSTANTS.RADIUS.MD}
          textAlign="center"
        >
          <VStack gap={THEME_CONSTANTS.SPACING.SM}>
            <Text color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY} fontWeight="medium">
              Member Since
            </Text>
            <Text fontWeight="semibold" color={THEME_CONSTANTS.COLORS.TEXT_PRIMARY}>
              {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
            </Text>
          </VStack>
        </Box>

        <Box
          bg={THEME_CONSTANTS.COLORS.SECONDARY}
          p={THEME_CONSTANTS.SPACING.MD}
          borderRadius={THEME_CONSTANTS.RADIUS.MD}
          textAlign="center"
        >
          <VStack gap={THEME_CONSTANTS.SPACING.SM}>
            <Text color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY} fontWeight="medium">
              Last Updated
            </Text>
            <Text fontWeight="semibold" color={THEME_CONSTANTS.COLORS.TEXT_PRIMARY}>
              {new Date(user?.updatedAt || Date.now()).toLocaleDateString()}
            </Text>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
}
