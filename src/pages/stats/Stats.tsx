import { Box, Heading } from "@chakra-ui/react";
import React from "react";

export const Stats: React.FC = () => {
  return (
    <Box>
      <Heading
        as="h2"
        size="lg"
        mt={2}
        mb={1}
        fontFamily="Poppins, sans-serif"
        id="create-questions"
      >
        Statistics
      </Heading>
      <Heading
        as="h4"
        size="sm"
        mb={6}
        fontWeight="normal"
        fontFamily="Poppins, sans-serif"
        color="gray.600"
      >
        Pick a user to see their stats
      </Heading>
    </Box>
  );
};
