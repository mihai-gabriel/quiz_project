import React from "react";
import { Sidebar } from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import { Container, Flex } from "@chakra-ui/react";

const App: React.FC = () => {
  return (
    <Flex>
      <Sidebar />
      <Container minW={400} my={10} maxW="container.md">
        <Outlet />
      </Container>
    </Flex>
  );
};

export default App;
