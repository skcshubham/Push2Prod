import {
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";
import type { User } from "../../types/user.types";

const DEFAULT_AVATAR_URL =
  "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?semt=ais_hybrid&w=740&q=80";

interface ChatHeaderProps {
  user: User;
  onClose: () => void;
}

export default function ChatHeader({ user, onClose }: ChatHeaderProps) {
  return (
    <HStack
      borderBottom="1px solid"
      borderColor="gray.200"
      p={{ base: 3, md: 4 }}
      pb={{ base: 3, md: 3 }}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      flexShrink={0}
    >
      <HStack gap={{ base: 2, md: 3 }} flex={1} minW={0}>
        <Image
          src={user.photoUrl || DEFAULT_AVATAR_URL}
          alt={`${user.firstName}'s profile`}
          width={{ base: "36px", md: "40px" }}
          height={{ base: "36px", md: "40px" }}
          borderRadius="full"
          objectFit="cover"
          border="2px solid"
          borderColor="purple.200"
          flexShrink={0}
        />
        <VStack align="start" gap={0} flex={1} minW={0}>
          <Text
            fontSize={{ base: "xs", md: "sm" }}
            fontWeight="semibold"
            color="gray.800"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            {user.firstName} {user.lastName}
          </Text>
          <Text
            fontSize={{ base: "2xs", md: "xs" }}
            color="green.600"
            fontWeight="medium"
          >
            Online
          </Text>
        </VStack>
      </HStack>
      <IconButton
        variant="ghost"
        size="md"
        onClick={onClose}
        aria-label="Close chat"
        flexShrink={0}
        ml={2}
      >
        <FaTimes />
      </IconButton>
    </HStack>
  );
}

