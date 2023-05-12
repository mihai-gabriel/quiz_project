import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Heading,
  Icon,
  Input,
  ListItem,
  OrderedList,
} from "@chakra-ui/react";
import { MdDeleteOutline, GrFormAdd } from "react-icons/all";

export const MultipleChoiceAnswer: React.FC = () => {
  const MAX_LIMIT = 5;

  const [choicesAnswer, setChoicesAnswer] = useState<string[]>([""]);

  return (
    <Box>
      <Heading as="h4" size="sm" mb={3} fontWeight="semibold">
        Choices
      </Heading>
      <OrderedList spacing={4} style={{ listStyleType: "upper-latin" }}>
        {choicesAnswer.map((answer, idx) => (
          <ListItem ml={4} pl={4} key={idx}>
            <Box display="flex" gap={4}>
              <FormControl>
                <Input
                  type="text"
                  value={answer}
                  onChange={(e) =>
                    setChoicesAnswer((prevAnswers) => [
                      ...prevAnswers.map((prevAnswer, prevIdx) =>
                        prevIdx === idx ? e.target.value : prevAnswer
                      ),
                    ])
                  }
                  placeholder="Type here..."
                />
              </FormControl>
              <Button
                color="white"
                background="red.400"
                onClick={() =>
                  choicesAnswer.length > 1 &&
                  setChoicesAnswer((prevAnswers) =>
                    prevAnswers.filter((_, prevIdx) => prevIdx !== idx)
                  )
                }
                isDisabled={choicesAnswer.length === 1}
              >
                <Icon as={MdDeleteOutline} boxSize={5} />
              </Button>
            </Box>
          </ListItem>
        ))}
      </OrderedList>
      {choicesAnswer.length < MAX_LIMIT && (
        <Button
          mt={4}
          mx={12}
          onClick={() =>
            setChoicesAnswer((prevAnswers) => [...prevAnswers, ""])
          }
          gap={1}
        >
          <Icon as={GrFormAdd} boxSize={6} /> Add Choice
        </Button>
      )}
    </Box>
  );
};
