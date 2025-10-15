import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useGetUserQuery, useUpdateUserMutation } from "../services/api";

import AboutSection from "../components/AboutSection";
import AdditionalInfoSection from "../components/AdditionalInfoSection";
import AppNavigation from "../components/AppNavigation";
import ProfileHeader from "../components/ProfileHeader";
import SkillsSection from "../components/SkillsSection";
import { THEME_CONSTANTS } from "../theme/constants";
import type { User } from "../types/user.types";
import { toaster } from "../components/ui/toaster";

export default function Profile() {
  const { data: response, isLoading, error, refetch } = useGetUserQuery();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    photoUrl: "",
    about: "",
    skills: [] as string[],
  });

  useEffect(() => {
    if (response?.data) {
      setFormData({
        firstName: response.data.firstName || "",
        lastName: response.data.lastName || "",
        age: response.data.age?.toString() || "",
        gender: response.data.gender || "",
        photoUrl: response.data.photoUrl || "",
        about: response.data.about || "",
        skills: response.data.skills || [],
      });
    }
  }, [response]);

  useEffect(() => {
    if (error) {
      const errorMessage =
        (error as { data?: { message?: string } })?.data?.message ||
        "Unable to load your profile. Please try again.";

      toaster.create({
        title: "Failed to Load Profile",
        description: errorMessage,
        type: "error",
        duration: 5000,
      });
    }
  }, [error]);

  const [newSkill, setNewSkill] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSave = async () => {
    try {
      const updateData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        age: formData.age ? parseInt(formData.age) : undefined,
        gender: formData.gender,
        photoUrl: formData.photoUrl,
        about: formData.about,
        skills: formData.skills,
      };

      const cleanedData = Object.fromEntries(
        Object.entries(updateData).filter(([, value]) => value !== undefined && value !== "")
      );

      const response = await updateUser(cleanedData as Partial<User>).unwrap();

      await refetch();

      setIsEditing(false);

      toaster.create({
        title: "Profile Updated",
        description: response.message || "Your profile has been updated successfully!",
        type: "success",
        duration: 3000,
      });
    } catch (error) {
      console.error("Failed to update profile:", error);

      const errorMessage =
        (error as { data?: { message?: string }; message?: string })?.data?.message ||
        (error as { message?: string })?.message ||
        "Failed to update profile. Please try again.";

      toaster.create({
        title: "Update Failed",
        description: errorMessage,
        type: "error",
        duration: 5000,
      });
    }
  };

  const handleCancel = () => {
    if (response?.data) {
      setFormData({
        firstName: response.data.firstName || "",
        lastName: response.data.lastName || "",
        age: response.data.age?.toString() || "",
        gender: response.data.gender || "",
        photoUrl: response.data.photoUrl || "",
        about: response.data.about || "",
        skills: response.data.skills || [],
      });
    }
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <>
        <AppNavigation />
        <Box minH="100vh" bg="gray.50" py={THEME_CONSTANTS.SPACING.SECTION}>
          <Container maxW="container.lg">
            <Box textAlign="center" py={20}>
              <Text color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}>Loading your profile...</Text>
            </Box>
          </Container>
        </Box>
      </>
    );
  }

  if (error) {
    return (
      <>
        <AppNavigation />
        <Box minH="100vh" bg="gray.50" py={THEME_CONSTANTS.SPACING.SECTION}>
          <Container maxW="container.lg">
            <Box textAlign="center" py={20}>
              <Text color="red.500">Error loading profile</Text>
            </Box>
          </Container>
        </Box>
      </>
    );
  }

  const user: User | undefined = response?.data;

  return (
    <>
      <AppNavigation />
      <Box minH="100vh" bg="gray.50" py={THEME_CONSTANTS.SPACING.SECTION}>
        <Container
          maxW="container.lg"
          px={{ base: THEME_CONSTANTS.SPACING.SM, md: THEME_CONSTANTS.SPACING.MD }}
        >
          <Stack gap={6} align="stretch" justify="center" direction={{ base: "column", md: "row" }}>
            <Box
              bg="white"
              borderRadius="xl"
              boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
              overflow="hidden"
              position="relative"
              border="1px solid"
              borderColor="gray.100"
              maxW={{ base: "100%", md: "380px" }}
              w="full"
            >
              <ProfileHeader
                user={user}
                isEditing={isEditing}
                formData={{
                  firstName: formData.firstName,
                  lastName: formData.lastName,
                }}
                onInputChange={handleInputChange}
              />

              {!isEditing && (
                <Box p={4} textAlign="center">
                  <Button
                    size="md"
                    colorScheme="purple"
                    variant="solid"
                    onClick={() => setIsEditing(true)}
                    px={8}
                    py={3}
                    borderRadius="lg"
                    fontWeight="600"
                    _hover={{
                      transform: "translateY(-1px)",
                      boxShadow: "0 4px 12px rgba(147, 51, 234, 0.4)",
                    }}
                    transition="all 0.2s"
                  >
                    Edit Profile
                  </Button>
                </Box>
              )}

              <Box p={4}>
                <Box bg="gray.50" borderRadius="lg" p={3} border="1px solid" borderColor="gray.100">
                  <VStack gap={3} align="stretch">
                    <HStack justify="space-between" align="center" py={1}>
                      <Text fontSize="sm" color="gray.600" fontWeight="500">
                        Member Since
                      </Text>
                      <Text fontSize="sm" color="gray.900" fontWeight="600">
                        {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
                      </Text>
                    </HStack>
                    <HStack justify="space-between" align="center" py={1}>
                      <Text fontSize="sm" color="gray.600" fontWeight="500">
                        Last Updated
                      </Text>
                      <Text fontSize="sm" color="gray.900" fontWeight="600">
                        {new Date(user?.updatedAt || Date.now()).toLocaleDateString()}
                      </Text>
                    </HStack>
                  </VStack>
                </Box>
              </Box>

              {!isEditing && (
                <Box p={4}>
                  <Box
                    bg="purple.50"
                    p={3}
                    borderRadius="lg"
                    textAlign="center"
                    border="1px solid"
                    borderColor="purple.100"
                  >
                    <Text color="purple.700" fontSize="sm" fontWeight="500">
                      ✨ Complete your profile to get more developer matches!
                    </Text>
                  </Box>
                </Box>
              )}
            </Box>

            <Box
              bg="white"
              borderRadius="xl"
              boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
              overflow="hidden"
              position="relative"
              border="1px solid"
              borderColor="gray.100"
              maxW={{ base: "100%", md: "520px" }}
              w="full"
            >
              <Box p={THEME_CONSTANTS.SPACING.MD}>
                <VStack gap={THEME_CONSTANTS.SPACING.MD} align="stretch">
                  <Box>
                    <Heading
                      size="md"
                      mb={6}
                      color="gray.700"
                      fontWeight="600"
                      letterSpacing="-0.025em"
                    >
                      Personal Information
                    </Heading>
                    <VStack gap={THEME_CONSTANTS.SPACING.SM} align="stretch">
                      {isEditing ? (
                        <VStack gap={THEME_CONSTANTS.SPACING.SM} align="stretch">
                          <VStack gap={THEME_CONSTANTS.SPACING.XS} align="stretch">
                            <Text
                              fontSize="xs"
                              color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}
                              fontWeight="medium"
                              textTransform="uppercase"
                              letterSpacing="wide"
                            >
                              Age
                            </Text>
                            <Input
                              type="number"
                              value={formData.age}
                              onChange={(e) => handleInputChange("age", e.target.value)}
                              placeholder="Enter your age"
                              bg={THEME_CONSTANTS.COLORS.WHITE}
                              min="0"
                              max="120"
                              size="sm"
                            />
                          </VStack>
                          <VStack gap={THEME_CONSTANTS.SPACING.XS} align="stretch">
                            <Text
                              fontSize="xs"
                              color={THEME_CONSTANTS.COLORS.TEXT_SECONDARY}
                              fontWeight="medium"
                              textTransform="uppercase"
                              letterSpacing="wide"
                            >
                              Gender
                            </Text>
                            <Input
                              value={formData.gender}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                handleInputChange("gender", e.target.value)
                              }
                              placeholder="male, female, or other"
                              bg={THEME_CONSTANTS.COLORS.WHITE}
                              list="gender-options"
                              size="sm"
                            />
                            <datalist id="gender-options">
                              <option value="male" />
                              <option value="female" />
                              <option value="other" />
                            </datalist>
                          </VStack>
                        </VStack>
                      ) : (
                        (user?.age || user?.gender) && (
                          <Box
                            bg="gray.50"
                            borderRadius="lg"
                            p={4}
                            border="1px solid"
                            borderColor="gray.100"
                          >
                            <VStack gap={3} align="stretch">
                              {user?.age && (
                                <HStack justify="space-between" align="center" py={1}>
                                  <Text fontSize="sm" color="gray.600" fontWeight="500">
                                    Age
                                  </Text>
                                  <Text fontSize="sm" color="gray.900" fontWeight="600">
                                    {user.age} years
                                  </Text>
                                </HStack>
                              )}
                              {user?.gender && (
                                <HStack justify="space-between" align="center" py={1}>
                                  <Text fontSize="sm" color="gray.600" fontWeight="500">
                                    Gender
                                  </Text>
                                  <Text
                                    fontSize="sm"
                                    color="gray.900"
                                    fontWeight="600"
                                    textTransform="capitalize"
                                  >
                                    {user.gender}
                                  </Text>
                                </HStack>
                              )}
                            </VStack>
                          </Box>
                        )
                      )}
                    </VStack>
                  </Box>

                  <SkillsSection
                    isEditing={isEditing}
                    skills={formData.skills}
                    newSkill={newSkill}
                    onNewSkillChange={setNewSkill}
                    onAddSkill={addSkill}
                    onRemoveSkill={removeSkill}
                  />

                  <AboutSection
                    isEditing={isEditing}
                    about={formData.about}
                    onAboutChange={(value) => handleInputChange("about", value)}
                  />

                  {isEditing && (
                    <AdditionalInfoSection
                      formData={{
                        age: formData.age,
                        gender: formData.gender,
                        photoUrl: formData.photoUrl,
                      }}
                      onInputChange={handleInputChange}
                    />
                  )}

                  {isEditing ? (
                    <HStack gap={THEME_CONSTANTS.SPACING.MD} justify="center">
                      <Button
                        colorScheme="purple"
                        onClick={handleSave}
                        size="md"
                        px={THEME_CONSTANTS.SPACING.LG}
                        loading={isUpdating}
                        loadingText="Saving..."
                      >
                        💾 Save Changes
                      </Button>
                      <Button
                        variant="outline"
                        colorScheme="gray"
                        onClick={handleCancel}
                        size="md"
                        px={THEME_CONSTANTS.SPACING.LG}
                        disabled={isUpdating}
                      >
                        ❌ Cancel
                      </Button>
                    </HStack>
                  ) : null}
                </VStack>
              </Box>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
