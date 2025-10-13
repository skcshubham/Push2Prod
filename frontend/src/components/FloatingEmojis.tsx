import { Box } from "@chakra-ui/react";

export default function FloatingEmojis() {
  return (
    <>
      <Box
        position="absolute"
        top="22%"
        left="32%"
        w="32px"
        h="32px"
        bg="white"
        borderRadius="full"
        opacity={0.08}
        animation="float 15s ease-in-out infinite"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="md"
        filter="blur(0.5px)"
      >
        💕
      </Box>

      <Box
        position="absolute"
        top="78%"
        right="28%"
        w="38px"
        h="38px"
        bg="white"
        borderRadius="full"
        opacity={0.1}
        animation="float 13s ease-in-out infinite reverse"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="lg"
        filter="blur(0.5px)"
      >
        ✨
      </Box>

      <Box
        position="absolute"
        top="65%"
        left="18%"
        w="48px"
        h="48px"
        bg="white"
        borderRadius="full"
        opacity={0.18}
        animation="float 11s ease-in-out infinite"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="2xl"
        boxShadow="0 3px 8px rgba(0, 0, 0, 0.06)"
      >
        💖
      </Box>

      <Box
        position="absolute"
        top="48%"
        right="12%"
        w="42px"
        h="42px"
        bg="white"
        borderRadius="full"
        opacity={0.16}
        animation="float 12s ease-in-out infinite reverse"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="xl"
        boxShadow="0 3px 6px rgba(0, 0, 0, 0.06)"
      >
        🚀
      </Box>

      <Box
        position="absolute"
        top="35%"
        left="8%"
        w="62px"
        h="62px"
        bg="white"
        borderRadius="full"
        opacity={0.25}
        animation="float 8s ease-in-out infinite"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="4xl"
        boxShadow="0 5px 12px rgba(0, 0, 0, 0.08)"
      >
        💻
      </Box>

      <Box
        position="absolute"
        top="15%"
        right="22%"
        w="55px"
        h="55px"
        bg="white"
        borderRadius="full"
        opacity={0.22}
        animation="float 9s ease-in-out infinite reverse"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="3xl"
        boxShadow="0 4px 10px rgba(0, 0, 0, 0.07)"
      >
        💘
      </Box>

      <Box
        position="absolute"
        top="8%"
        left="15%"
        w="65px"
        h="65px"
        bg="white"
        borderRadius="full"
        opacity={0.32}
        animation="float 6s ease-in-out infinite"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="4xl"
        boxShadow="0 8px 16px rgba(0, 0, 0, 0.1)"
      >
        💝
      </Box>

      <Box
        position="absolute"
        bottom="15%"
        right="8%"
        w="58px"
        h="58px"
        bg="white"
        borderRadius="full"
        opacity={0.3}
        animation="float 7s ease-in-out infinite reverse"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="4xl"
        boxShadow="0 6px 14px rgba(0, 0, 0, 0.09)"
      >
        ❤️
      </Box>

      <Box
        position="absolute"
        top="52%"
        left="25%"
        w="70px"
        h="70px"
        bg="white"
        borderRadius="full"
        opacity={0.06}
        animation="float 16s ease-in-out infinite"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="5xl"
        boxShadow="0 10px 20px rgba(0, 0, 0, 0.08)"
        filter="blur(1.5px)"
      >
        💞
      </Box>
    </>
  );
}
