import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

export const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [usernameDirty, setUsernameDirty] = useState(false);
  const isUsernameValid = !usernameDirty || username !== "";

  const [password, setPassword] = useState("");
  const [passwordDirty, setPasswordDirty] = useState(false);
  const isPasswordValid = !passwordDirty || password !== "";

  return (
    <VStack spacing={6} align="left" my={6}>
      <FormControl isInvalid={!isUsernameValid}>
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setUsernameDirty(true);
          }}
        />
        {!isUsernameValid && (
          <FormErrorMessage>Username is required.</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={!isPasswordValid}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordDirty(true);
          }}
        />
        {!isPasswordValid && (
          <FormErrorMessage>Password is required.</FormErrorMessage>
        )}
      </FormControl>

      <Button>Sign in</Button>
    </VStack>
  );
};
