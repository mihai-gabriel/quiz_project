import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

export const Register: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [fullNameDirty, setFullNameDirty] = useState(false);
  const isFullNameValid = !fullNameDirty || fullName !== "";

  const [username, setUsername] = useState("");
  const [usernameDirty, setUsernameDirty] = useState(false);
  const isUsernameValid = !usernameDirty || username !== "";

  const [email, setEmail] = useState("");
  const [emailDirty, setEmailDirty] = useState(false);
  const isEmailValid = !emailDirty || email !== "";

  const [password, setPassword] = useState("");
  const [passwordDirty, setPasswordDirty] = useState(false);
  const isPasswordValid = !passwordDirty || password !== "";

  return (
    <VStack spacing={6} align="left" my={6}>
      <FormControl isInvalid={!isFullNameValid}>
        <FormLabel>Full Name</FormLabel>
        <Input
          type="text"
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
            setFullNameDirty(true);
          }}
        />
        {!isFullNameValid && (
          <FormErrorMessage>Full Name is required.</FormErrorMessage>
        )}
      </FormControl>

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

      <FormControl isInvalid={!isEmailValid}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailDirty(true);
          }}
        />
        {!isEmailValid && (
          <FormErrorMessage>Email is required.</FormErrorMessage>
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

      <RouterLink to="/">
        <Button w="100%">Sign up</Button>
      </RouterLink>
    </VStack>
  );
};
