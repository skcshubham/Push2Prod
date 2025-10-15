import { Box, Heading, Text, Textarea, VStack } from "@chakra-ui/react";

import { THEME_CONSTANTS } from "../theme/constants";

interface AboutSectionProps {
  isEditing: boolean;
  about: string;
  onAboutChange: (value: string) => void;
}

export default function AboutSection({ isEditing, about, onAboutChange }: AboutSectionProps) {
  return (
    <Box>
      <Heading size="md" mb={6} color="gray.700" fontWeight="600" letterSpacing="-0.025em">
        About Me
      </Heading>
      {isEditing ? (
        <VStack gap={THEME_CONSTANTS.SPACING.SM} align="stretch">
          <Text fontSize="sm" color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY} fontWeight="medium">
            Tell us about yourself
          </Text>
          <Textarea
            value={about}
            onChange={(e) => onAboutChange(e.target.value)}
            placeholder="Share your story, interests, and what makes you unique..."
            rows={4}
            bg={THEME_CONSTANTS.COLORS.WHITE}
            resize="vertical"
          />
        </VStack>
      ) : (
        <>
          {about ? (
            <Box
              bg={THEME_CONSTANTS.COLORS.SECONDARY}
              p={THEME_CONSTANTS.SPACING.MD}
              borderRadius={THEME_CONSTANTS.RADIUS.MD}
              borderLeft="4px solid"
              borderLeftColor={THEME_CONSTANTS.COLORS.PRIMARY}
            >
              <Text
                color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}
                lineHeight="tall"
                fontSize={THEME_CONSTANTS.FONT_SIZES.MD}
              >
                {about}
              </Text>
            </Box>
          ) : (
            <Box
              bg={THEME_CONSTANTS.COLORS.SECONDARY}
              p={THEME_CONSTANTS.SPACING.MD}
              borderRadius={THEME_CONSTANTS.RADIUS.MD}
              textAlign="center"
            >
              <Text color={THEME_CONSTANTS.COLORS.TEXT_MUTED} fontStyle="italic">
                No bio added yet. Tell us about yourself! ✨
              </Text>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
