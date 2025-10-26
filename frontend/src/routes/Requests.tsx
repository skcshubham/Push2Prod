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
import { FaCheck, FaHeart, FaTimes, FaUser } from "react-icons/fa";
import { useGetReceivedRequestsQuery, useRespondToRequestMutation } from "../services/api";

import AppNavigation from "../components/AppNavigation";

export default function Requests() {
  const { data: requestsData, isLoading, error, refetch } = useGetReceivedRequestsQuery();
  const [respondToRequest, { isLoading: isResponding }] = useRespondToRequestMutation();

  const cardWidth = useBreakpointValue({
    base: "100%",
    sm: "100%",
    md: "600px",
    lg: "700px",
  });

  const imageSize = useBreakpointValue({
    base: "50px",
    sm: "60px",
    md: "70px",
    lg: "80px",
  });

  const isMobile = useBreakpointValue({
    base: true,
    sm: false,
  });

  const handleAcceptRequest = async (requestId: string) => {
    try {
      console.log("Accepting request:", requestId);
      await respondToRequest({ status: "accepted", requestId }).unwrap();
      console.log("Request accepted successfully");
      // Refetch the requests to update the UI
      refetch();
    } catch (error) {
      console.error("Failed to accept request:", error);
    }
  };

  const handleDeclineRequest = async (requestId: string) => {
    try {
      console.log("Declining request:", requestId);
      await respondToRequest({ status: "rejected", requestId }).unwrap();
      console.log("Request declined successfully");
      // Refetch the requests to update the UI
      refetch();
    } catch (error) {
      console.error("Failed to decline request:", error);
    }
  };

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
                <FaHeart />
              </Box>
            </Box>
            <VStack gap={2}>
              <Text color="gray.700" fontSize="lg" fontWeight="medium">
                Loading connection requests...
              </Text>
              <Text color="gray.500" fontSize="sm">
                Finding people who want to connect with you
              </Text>
            </VStack>
          </VStack>
        </Box>
      </Box>
    );
  }

  if (error || !requestsData?.data || requestsData.data.length === 0) {
    return (
      <Box height="100vh" display="flex" flexDirection="column" overflow="hidden">
        <AppNavigation />
        <Box flex="1" display="flex" justifyContent="center" alignItems="center">
          <VStack gap={6} textAlign="center" px={4}>
            <Box bg="purple.50" borderRadius="full" p={6} color="purple.500" fontSize="4xl">
              <FaUser />
            </Box>
            <VStack gap={3}>
              <Heading size="lg" color="gray.700">
                No Connection Requests
              </Heading>
              <Text color="gray.600" maxW="md">
                You don't have any pending connection requests at the moment. Keep swiping to find
                more matches!
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
        <Container
          maxW="container.lg"
          py={{ base: 4, sm: 6, md: 8 }}
          px={{ base: 0, sm: 4, md: 6 }}
        >
          <VStack gap={6} align="stretch">
            <Box textAlign="center" mb={{ base: 4, sm: 6 }} px={{ base: 4, sm: 0 }}>
              <VStack gap={3}>
                <Heading size={{ base: "lg", sm: "xl" }} color="gray.800" fontFamily="heading">
                  Connection Requests 💌
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
                  {requestsData.data.length} pending request
                  {requestsData.data.length !== 1 ? "s" : ""}
                </Badge>
              </VStack>
            </Box>

            {requestsData.data.map((request, index) => (
              <Box key={index} px={{ base: 4, sm: 0 }}>
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
                  maxW={cardWidth}
                  mx="auto"
                >
                  {isMobile ? (
                    // Mobile Layout - Vertical Stack
                    <VStack gap={4} align="stretch">
                      <HStack gap={3} align="start">
                        <Box position="relative">
                          <Image
                            src={
                              request.fromUserId?.photoUrl ||
                              "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?semt=ais_hybrid&w=740&q=80"
                            }
                            alt={`${request.fromUserId?.firstName}'s profile`}
                            width={imageSize}
                            height={imageSize}
                            borderRadius="full"
                            objectFit="cover"
                            border="3px solid"
                            borderColor="purple.200"
                            boxShadow="0 4px 12px rgba(147, 51, 234, 0.15)"
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
                            {request.fromUserId?.firstName} {request.fromUserId?.lastName}
                          </Heading>
                          <Text color="purple.600" fontSize="xs" fontWeight="medium">
                            Wants to connect with you
                          </Text>
                        </VStack>
                      </HStack>

                      {request.fromUserId?.about && (
                        <Text color="gray.600" fontSize="xs" lineHeight="1.4">
                          {request.fromUserId.about}
                        </Text>
                      )}

                      <HStack gap={1} flexWrap="wrap">
                        {request.fromUserId?.skills
                          ?.slice(0, 2)
                          .map((skill: string, skillIndex: number) => (
                            <Badge
                              key={skillIndex}
                              colorScheme="purple"
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
                        {request.fromUserId?.skills?.length > 2 && (
                          <Badge
                            colorScheme="gray"
                            variant="outline"
                            px={2}
                            py={0.5}
                            borderRadius="full"
                            fontSize="2xs"
                            fontWeight="medium"
                          >
                            +{request.fromUserId.skills.length - 2} more
                          </Badge>
                        )}
                      </HStack>

                      <HStack gap={2} justify="stretch">
                        <Button
                          colorScheme="green"
                          size="sm"
                          borderRadius="full"
                          flex="1"
                          fontWeight="medium"
                          boxShadow="0 4px 12px rgba(34, 197, 94, 0.3)"
                          loading={isResponding}
                          disabled={isResponding}
                          _hover={{
                            transform: "translateY(-1px)",
                            boxShadow: "0 6px 16px rgba(34, 197, 94, 0.4)",
                          }}
                          transition="all 0.2s ease"
                          onClick={() => handleAcceptRequest(request._id.toString())}
                        >
                          <FaCheck style={{ marginRight: "6px" }} />
                          Accept
                        </Button>
                        <Button
                          colorScheme="red"
                          variant="outline"
                          size="sm"
                          borderRadius="full"
                          flex="1"
                          fontWeight="medium"
                          borderColor="red.300"
                          color="red.600"
                          loading={isResponding}
                          disabled={isResponding}
                          _hover={{
                            bg: "red.50",
                            borderColor: "red.400",
                            transform: "translateY(-1px)",
                          }}
                          transition="all 0.2s ease"
                          onClick={() => handleDeclineRequest(request._id.toString())}
                        >
                          <FaTimes style={{ marginRight: "6px" }} />
                          Decline
                        </Button>
                      </HStack>
                    </VStack>
                  ) : (
                    // Desktop Layout - Horizontal Stack
                    <HStack gap={4} align="center" h="full">
                      <Box position="relative">
                        <Image
                          src={
                            request.fromUserId?.photoUrl ||
                            "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?semt=ais_hybrid&w=740&q=80"
                          }
                          alt={`${request.fromUserId?.firstName}'s profile`}
                          width={imageSize}
                          height={imageSize}
                          borderRadius="full"
                          objectFit="cover"
                          border="3px solid"
                          borderColor="purple.200"
                          boxShadow="0 4px 12px rgba(147, 51, 234, 0.15)"
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
                            {request.fromUserId?.firstName} {request.fromUserId?.lastName}
                          </Heading>
                          <Text color="purple.600" fontSize="sm" fontWeight="medium">
                            Wants to connect with you
                          </Text>
                        </VStack>

                        {request.fromUserId?.about && (
                          <Text color="gray.600" fontSize="sm" lineHeight="1.5">
                            {request.fromUserId.about}
                          </Text>
                        )}

                        <HStack gap={2} flexWrap="wrap">
                          {request.fromUserId?.skills
                            ?.slice(0, 3)
                            .map((skill: string, skillIndex: number) => (
                              <Badge
                                key={skillIndex}
                                colorScheme="purple"
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
                          {request.fromUserId?.skills?.length > 3 && (
                            <Badge
                              colorScheme="gray"
                              variant="outline"
                              px={3}
                              py={1}
                              borderRadius="full"
                              fontSize="xs"
                              fontWeight="medium"
                            >
                              +{request.fromUserId.skills.length - 3} more
                            </Badge>
                          )}
                        </HStack>
                      </VStack>

                      <VStack gap={3} minW="120px" justify="center">
                        <Button
                          colorScheme="green"
                          size="sm"
                          borderRadius="full"
                          px={6}
                          fontWeight="medium"
                          boxShadow="0 4px 12px rgba(34, 197, 94, 0.3)"
                          _hover={{
                            transform: "translateY(-1px)",
                            boxShadow: "0 6px 16px rgba(34, 197, 94, 0.4)",
                          }}
                          transition="all 0.2s ease"
                          loading={isResponding}
                          disabled={isResponding}
                          onClick={() => handleAcceptRequest(request._id.toString())}
                        >
                          <FaCheck style={{ marginRight: "8px" }} />
                          Accept
                        </Button>
                        <Button
                          colorScheme="red"
                          variant="outline"
                          size="sm"
                          borderRadius="full"
                          px={6}
                          fontWeight="medium"
                          borderColor="red.300"
                          color="red.600"
                          loading={isResponding}
                          disabled={isResponding}
                          _hover={{
                            bg: "red.50",
                            borderColor: "red.400",
                            transform: "translateY(-1px)",
                          }}
                          transition="all 0.2s ease"
                          onClick={() => handleDeclineRequest(request._id.toString())}
                        >
                          <FaTimes style={{ marginRight: "8px" }} />
                          Decline
                        </Button>
                      </VStack>
                    </HStack>
                  )}
                </Card.Root>
              </Box>
            ))}
          </VStack>
        </Container>
      </Box>
    </Box>
  );
}
