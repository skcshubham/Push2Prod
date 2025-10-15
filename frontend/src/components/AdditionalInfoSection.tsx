import { Box, Heading, Input, Text, VStack } from "@chakra-ui/react";

import { THEME_CONSTANTS } from "../theme/constants";

interface AdditionalInfoSectionProps {
  formData: {
    age: string;
    gender: string;
    photoUrl: string;
  };
  onInputChange: (field: string, value: string) => void;
}

export default function AdditionalInfoSection({
  formData,
  onInputChange,
}: AdditionalInfoSectionProps) {
  return (
    <Box>
      <Heading size="md" mb={6} color="gray.700" fontWeight="600" letterSpacing="-0.025em">
        Additional Information
      </Heading>
      <VStack gap={THEME_CONSTANTS.SPACING.MD} align="stretch">
        <VStack gap={THEME_CONSTANTS.SPACING.SM} align="stretch">
          <Text fontSize="sm" color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY} fontWeight="medium">
            Age
          </Text>
          <Input
            type="number"
            value={formData.age}
            onChange={(e) => onInputChange("age", e.target.value)}
            placeholder="Enter your age"
            bg={THEME_CONSTANTS.COLORS.WHITE}
            min="0"
            max="120"
          />
        </VStack>

        <VStack gap={THEME_CONSTANTS.SPACING.SM} align="stretch">
          <Text fontSize="sm" color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY} fontWeight="medium">
            Gender
          </Text>
          <Input
            value={formData.gender}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onInputChange("gender", e.target.value)
            }
            placeholder="male, female, or other"
            bg={THEME_CONSTANTS.COLORS.WHITE}
            list="gender-options"
          />
          <datalist id="gender-options">
            <option value="male" />
            <option value="female" />
            <option value="other" />
          </datalist>
        </VStack>

        <VStack gap={THEME_CONSTANTS.SPACING.SM} align="stretch">
          <Text fontSize="sm" color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY} fontWeight="medium">
            Photo URL
          </Text>
          <Input
            value={formData.photoUrl}
            onChange={(e) => onInputChange("photoUrl", e.target.value)}
            placeholder="https://example.com/your-photo.jpg"
            bg={THEME_CONSTANTS.COLORS.WHITE}
          />
        </VStack>
      </VStack>
    </Box>
  );
}
