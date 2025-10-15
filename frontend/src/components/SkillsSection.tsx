import { Badge, Box, HStack, Heading, IconButton, Input, Text, VStack } from "@chakra-ui/react";
import { FaPlus, FaTimes } from "react-icons/fa";

import { THEME_CONSTANTS } from "../theme/constants";

interface SkillsSectionProps {
  isEditing: boolean;
  skills: string[];
  newSkill: string;
  onNewSkillChange: (value: string) => void;
  onAddSkill: () => void;
  onRemoveSkill: (skill: string) => void;
}

export default function SkillsSection({
  isEditing,
  skills,
  newSkill,
  onNewSkillChange,
  onAddSkill,
  onRemoveSkill,
}: SkillsSectionProps) {
  return (
    <Box>
      <Heading size="md" mb={6} color="gray.700" fontWeight="600" letterSpacing="-0.025em">
        Tech Stack & Skills
      </Heading>
      {isEditing ? (
        <VStack gap={THEME_CONSTANTS.SPACING.SM} align="stretch">
          <Text fontSize="sm" color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY} fontWeight="medium">
            Add Skills
          </Text>
          <HStack gap={THEME_CONSTANTS.SPACING.SM}>
            <Input
              value={newSkill}
              onChange={(e) => onNewSkillChange(e.target.value)}
              placeholder="Enter a skill"
              bg={THEME_CONSTANTS.COLORS.WHITE}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onAddSkill();
                }
              }}
            />
            <IconButton aria-label="Add skill" onClick={onAddSkill} colorScheme="purple" size="md">
              <FaPlus />
            </IconButton>
          </HStack>
          {skills.length > 0 && (
            <HStack gap={THEME_CONSTANTS.SPACING.SM} flexWrap="wrap">
              {skills.map((skill, index) => (
                <Badge
                  key={index}
                  colorScheme="purple"
                  variant="solid"
                  px={THEME_CONSTANTS.SPACING.XS}
                  borderRadius={THEME_CONSTANTS.RADIUS.FULL}
                  fontSize="10px"
                  fontWeight="medium"
                  minH="20px"
                >
                  <HStack gap={1}>
                    <Text>{skill}</Text>
                    <IconButton
                      aria-label="Remove skill"
                      size="xs"
                      variant="ghost"
                      color="white"
                      onClick={() => onRemoveSkill(skill)}
                      minW="16px"
                      minH="16px"
                      _hover={{
                        color: "red.500",
                        bg: "transparent",
                      }}
                    >
                      <FaTimes />
                    </IconButton>
                  </HStack>
                </Badge>
              ))}
            </HStack>
          )}
        </VStack>
      ) : (
        <>
          {skills && skills.length > 0 ? (
            <HStack gap={THEME_CONSTANTS.SPACING.SM} flexWrap="wrap">
              {skills.map((skill, index) => (
                <Badge
                  key={index}
                  colorScheme="purple"
                  variant="subtle"
                  px={THEME_CONSTANTS.SPACING.MD}
                  py={THEME_CONSTANTS.SPACING.SM}
                  borderRadius={THEME_CONSTANTS.RADIUS.FULL}
                  fontSize={THEME_CONSTANTS.FONT_SIZES.SM}
                  bg={THEME_CONSTANTS.COLORS.SECONDARY}
                  color={THEME_CONSTANTS.COLORS.PRIMARY}
                  fontWeight="medium"
                >
                  {skill}
                </Badge>
              ))}
            </HStack>
          ) : (
            <Box
              bg={THEME_CONSTANTS.COLORS.SECONDARY}
              p={THEME_CONSTANTS.SPACING.MD}
              borderRadius={THEME_CONSTANTS.RADIUS.MD}
              textAlign="center"
            >
              <Text color={THEME_CONSTANTS.COLORS.TEXT_MUTED} fontStyle="italic">
                No skills added yet. Complete your profile to showcase your expertise! ✨
              </Text>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
