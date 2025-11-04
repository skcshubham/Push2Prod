import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  HStack,
  Heading,
  Image,
  Spinner,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaComments, FaHeart } from "react-icons/fa";

import AppNavigation from "../components/AppNavigation";
import { useGetConnectionsQuery } from "../services/api";

export default function Chats() {
  const { data: connectionsData, isLoading, error } = useGetConnectionsQuery();

  const imageSize = useBreakpointValue({
    base: "50px",
    sm: "60px",
    md: "70px",
    lg: "80px",
  });

  const cardWidth = useBreakpointValue({
    base: "350px",
    sm: "450px",
    md: "600px",
    lg: "600px",
  });

  const isMobile = useBreakpointValue({
    base: true,
    sm: false,
  });

  if (isLoading) {
    return (
      <Box height="100vh" display="flex" flexDirection="column" overflow="hidden">
        <AppNavigation />
        <Box flex="1" display="flex" justifyContent="center" alignItems="center">
          <VStack gap={6}>
            <Box position="relative">
              <Spinner size="xl" color="purple.500" />
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                fontSize="lg"
                color="purple.500"
              >
                <FaComments />
              </Box>
            </Box>
            <VStack gap={2}>
              <Text color="gray.700" fontSize="lg" fontWeight="medium">
                Loading your connections...
              </Text>
              <Text color="gray.500" fontSize="sm">
                Finding people you've connected with
              </Text>
            </VStack>
          </VStack>
        </Box>
      </Box>
    );
  }

  if (error || !connectionsData?.data || connectionsData.data.length === 0) {
    return (
      <Box height="100vh" display="flex" flexDirection="column" overflow="hidden">
        <AppNavigation />
        <Box flex="1" display="flex" justifyContent="center" alignItems="center">
          <VStack gap={6} textAlign="center" px={4}>
            <Box bg="purple.50" borderRadius="full" p={6} color="purple.500" fontSize="4xl">
              <FaHeart />
            </Box>
            <VStack gap={3}>
              <Heading size="lg" color="gray.700">
                No Connections Yet
              </Heading>
              <Text color="gray.600" maxW="md">
                You haven't connected with anyone yet. Start swiping to find your perfect match!
              </Text>
            </VStack>
          </VStack>
        </Box>
      </Box>
    );
  }

  return (
    <Box height="100vh" display="flex" flexDirection="column" overflow="hidden">
      <AppNavigation />
      <Box flex="1" overflow="auto" bg="gray.50">
        <Container maxW="container.lg" py={{ base: 4, sm: 6, md: 8 }} px={{ base: 4, sm: 6 }}>
          <VStack gap={6} align="stretch">
            <Box textAlign="center" mb={{ base: 4, sm: 6 }}>
              <VStack gap={3}>
                <Heading size={{ base: "lg", sm: "xl" }} color="gray.800" fontFamily="heading">
                  Your Connections 💬
                </Heading>
                <Badge
                  colorScheme="purple"
                  variant="subtle"
                  px={{ base: 3, sm: 4 }}
                  py={{ base: 1, sm: 2 }}
                  borderRadius="full"
                  fontSize={{ base: "xs", sm: "sm" }}
                  fontWeight="medium"
                >
                  {connectionsData.data.length} connection
                  {connectionsData.data.length !== 1 ? "s" : ""}
                </Badge>
              </VStack>
            </Box>

            {connectionsData.data.map((connection, index) => (
              <Card.Root
                key={index}
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
              >
                {isMobile ? (
                  // Mobile Layout - Vertical Stack
                  <VStack gap={4} align="stretch">
                    <HStack gap={3} align="start">
                      <Box position="relative">
                        <Image
                          src={
                            connection.photoUrl ||
                            "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?semt=ais_hybrid&w=740&q=80"
                          }
                          alt={`${connection.firstName}'s profile`}
                          width={imageSize}
                          height={imageSize}
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

                    <HStack gap={1} flexWrap="wrap">
                      {connection.skills?.slice(0, 2).map((skill: string, skillIndex: number) => (
                        <Badge
                          key={skillIndex}
                          colorScheme="green"
                          variant="subtle"
                          px={2}
                          py={0.5}
                          borderRadius="full"
                          fontSize="2xs"
                          fontWeight="medium"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {connection.skills && connection.skills.length > 2 && (
                        <Badge
                          colorScheme="gray"
                          variant="outline"
                          px={2}
                          py={0.5}
                          borderRadius="full"
                          fontSize="2xs"
                          fontWeight="medium"
                        >
                          +{connection.skills.length - 2} more
                        </Badge>
                      )}
                    </HStack>

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
                    >
                      <FaComments style={{ marginRight: "6px" }} />
                      Start Chat
                    </Button>
                  </VStack>
                ) : (
                  // Desktop Layout - Horizontal Stack
                  <HStack gap={4} align="center" h="full">
                    <Box position="relative">
                      <Image
                        src={
                          connection.photoUrl ||
                          "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?semt=ais_hybrid&w=740&q=80"
                        }
                        alt={`${connection.firstName}'s profile`}
                        width={imageSize}
                        height={imageSize}
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

                      <HStack gap={2} flexWrap="wrap">
                        {connection.skills?.slice(0, 3).map((skill: string, skillIndex: number) => (
                          <Badge
                            key={skillIndex}
                            colorScheme="green"
                            variant="subtle"
                            px={3}
                            py={1}
                            borderRadius="full"
                            fontSize="xs"
                            fontWeight="medium"
                          >
                            {skill}
                          </Badge>
                        ))}
                        {connection.skills && connection.skills.length > 3 && (
                          <Badge
                            colorScheme="gray"
                            variant="outline"
                            px={3}
                            py={1}
                            borderRadius="full"
                            fontSize="xs"
                            fontWeight="medium"
                          >
                            +{connection.skills.length - 3} more
                          </Badge>
                        )}
                      </HStack>
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
                    >
                      <FaComments style={{ marginRight: "8px" }} />
                      Start Chat
                    </Button>
                  </HStack>
                )}
              </Card.Root>
            ))}
          </VStack>
        </Container>
      </Box>
    </Box>
  );
}
