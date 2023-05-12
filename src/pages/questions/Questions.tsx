import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import { CreateQuestionsForm } from "./CreateQuestionsForm";

export const Questions: React.FC = () => {
  return (
    <Box>
      <Heading as="h2" size="lg" my={2} fontFamily="Share Tech Mono, monospace">
        Create a question
      </Heading>
      <Heading
        as="h4"
        size="sm"
        mb={6}
        fontWeight="normal"
        fontFamily="Share Tech Mono, monospace"
        color="gray.600"
      >
        Here you will see the top 10 players and their scoring
      </Heading>

      <CreateQuestionsForm />

      <Heading as="h2" size="lg" my={2} fontFamily="Share Tech Mono, monospace">
        Questions Library
      </Heading>
      <Heading
        as="h4"
        size="sm"
        mb={6}
        fontWeight="normal"
        fontFamily="Share Tech Mono, monospace"
        color="gray.600"
      >
        Questions already created to choose from when creating quizzes
      </Heading>
    </Box>
  );
};
