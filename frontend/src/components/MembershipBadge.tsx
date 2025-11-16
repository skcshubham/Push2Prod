import { Box } from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";

export default function MembershipBadge({
  type,
  size = 14,
}: {
  type: "silver" | "gold";
  size?: number;
}) {
  const bgColor = type === "gold" ? "blue.500" : "gray.400";
  const label = type === "gold" ? "Gold member" : "Silver member";

  return (
    <Box
      as="span"
      title={label}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      width={`${size}px`}
      height={`${size}px`}
      borderRadius="full"
      bg={bgColor}
      color="white"
      ml="6px"
      boxShadow={type === "gold" ? "0 0 0 2px rgba(59,130,246,0.2)" : "0 0 0 2px rgba(156,163,175,0.2)"}
    >
      <FaCheck style={{ width: size * 0.6, height: size * 0.6 }} />
    </Box>
  );
}


