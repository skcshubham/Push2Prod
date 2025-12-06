import {
  Badge,
  Box,
  Button,
  Card,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaComments, FaHeart } from "react-icons/fa";
import type { User } from "../../types/user.types";

interface ConnectionCardProps {
  connection: User;
  onOpenChat: (connection: User) => void;
}

const DEFAULT_AVATAR_URL =
  "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?semt=ais_hybrid&w=740&q=80";

export default function ConnectionCard({
  connection,
  onOpenChat,
}: ConnectionCardProps) {
  const imageSize = useBreakpointValue({
    base: "50px",
    sm: "60px",
    md: "70px",
    lg: "80px",
  });

  const cardWidth = useBreakpointValue({
    base: "100%",
    sm: "100%",
    md: "600px",
    lg: "600px",
  });

  const isMobile = useBreakpointValue({
    base: true,
    sm: false,
  });

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpenChat(connection);
  };

  return (
    <Card.Root
      p={{ base: 4, sm: 5, md: 6 }}
      borderRadius="2xl"
      boxShadow="0 4px 20px rgba(0,0,0,0.08)"
      bg="white"
      border="1px solid"
      borderColor="gray.100"
      transition="all 0.3s ease"
      _hover={{
        boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
        transform: "translateY(-2px)",
        borderColor: "purple.200",
      }}
      w={cardWidth}
      mx="auto"
      cursor="pointer"
      onClick={() => onOpenChat(connection)}
    >
      {isMobile ? (
        <MobileLayout
          connection={connection}
          imageSize={imageSize}
          onButtonClick={handleClick}
        />
      ) : (
        <DesktopLayout
          connection={connection}
          imageSize={imageSize}
          onButtonClick={handleClick}
        />
      )}
    </Card.Root>
  );
}

interface LayoutProps {
  connection: User;
  imageSize: string | undefined;
  onButtonClick: (e: React.MouseEvent) => void;
}

function MobileLayout({ connection, imageSize, onButtonClick }: LayoutProps) {
  return (
    <VStack gap={4} align="stretch">
      <HStack gap={3} align="start">
        <UserAvatar photoUrl={connection.photoUrl} size={imageSize} />
        <VStack align="start" flex="1" gap={1}>
          <Heading size="sm" color="gray.800" fontFamily="heading">
            {connection.firstName} {connection.lastName}
          </Heading>
          <Text color="green.600" fontSize="xs" fontWeight="medium">
            Connected ✨
          </Text>
        </VStack>
      </HStack>

      {connection.about && (
        <Text color="gray.600" fontSize="xs" lineHeight="1.4">
          {connection.about}
        </Text>
      )}

      <SkillsList skills={connection.skills} maxSkills={2} />

      <Button
        colorScheme="purple"
        size="sm"
        borderRadius="full"
        fontWeight="medium"
        boxShadow="0 4px 12px rgba(147, 51, 234, 0.3)"
        _hover={{
          transform: "translateY(-1px)",
          boxShadow: "0 6px 16px rgba(147, 51, 234, 0.4)",
        }}
        transition="all 0.2s ease"
        onClick={onButtonClick}
      >
        <FaComments style={{ marginRight: "6px" }} />
        Start Chat
      </Button>
    </VStack>
  );
}

function DesktopLayout({ connection, imageSize, onButtonClick }: LayoutProps) {
  return (
    <HStack gap={4} align="center" h="full">
      <UserAvatar photoUrl={connection.photoUrl} size={imageSize} />

      <VStack align="start" flex="1" gap={3} justify="center">
        <VStack align="start" gap={1}>
          <Heading size="md" color="gray.800" fontFamily="heading">
            {connection.firstName} {connection.lastName}
          </Heading>
          <Text color="green.600" fontSize="sm" fontWeight="medium">
            Connected ✨
          </Text>
        </VStack>

        {connection.about && (
          <Text color="gray.600" fontSize="sm" lineHeight="1.5">
            {connection.about}
          </Text>
        )}

        <SkillsList skills={connection.skills} maxSkills={3} />
      </VStack>

      <Button
        colorScheme="purple"
        size="sm"
        borderRadius="full"
        px={6}
        fontWeight="medium"
        boxShadow="0 4px 12px rgba(147, 51, 234, 0.3)"
        _hover={{
          transform: "translateY(-1px)",
          boxShadow: "0 6px 16px rgba(147, 51, 234, 0.4)",
        }}
        transition="all 0.2s ease"
        onClick={onButtonClick}
      >
        <FaComments style={{ marginRight: "8px" }} />
        Start Chat
      </Button>
    </HStack>
  );
}

function UserAvatar({
  photoUrl,
  size,
}: {
  photoUrl?: string;
  size: string | undefined;
}) {
  return (
    <Box position="relative">
      <Image
        src={photoUrl || DEFAULT_AVATAR_URL}
        alt="Profile"
        width={size}
        height={size}
        borderRadius="full"
        objectFit="cover"
        border="3px solid"
        borderColor="green.200"
        boxShadow="0 4px 12px rgba(34, 197, 94, 0.15)"
      />
      <Box
        position="absolute"
        bottom="-2px"
        right="-2px"
        bg="green.400"
        borderRadius="full"
        p={1}
        border="2px solid white"
      >
        <FaHeart fontSize="xs" color="white" />
      </Box>
    </Box>
  );
}

function SkillsList({
  skills,
  maxSkills,
}: {
  skills?: string[];
  maxSkills: number;
}) {
  const displayedSkills = skills?.slice(0, maxSkills) || [];
  const remainingCount = skills && skills.length > maxSkills ? skills.length - maxSkills : 0;

  return (
    <HStack gap={maxSkills === 2 ? 1 : 2} flexWrap="wrap">
      {displayedSkills.map((skill: string, skillIndex: number) => (
        <Badge
          key={skillIndex}
          colorScheme="green"
          variant="subtle"
          px={maxSkills === 2 ? 2 : 3}
          py={maxSkills === 2 ? 0.5 : 1}
          borderRadius="full"
          fontSize={maxSkills === 2 ? "2xs" : "xs"}
          fontWeight="medium"
        >
          {skill}
        </Badge>
      ))}
      {remainingCount > 0 && (
        <Badge
          colorScheme="gray"
          variant="outline"
          px={maxSkills === 2 ? 2 : 3}
          py={maxSkills === 2 ? 0.5 : 1}
          borderRadius="full"
          fontSize={maxSkills === 2 ? "2xs" : "xs"}
          fontWeight="medium"
        >
          +{remainingCount} more
        </Badge>
      )}
    </HStack>
  );
}

