import React from "react";
import { VerticalSidebar } from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import { Container, Flex, Hide, Show } from "@chakra-ui/react";
import { HorizontalBar } from "./components/Sidebar/HorizontalBar.tsx";

const App: React.FC = () => {
  return (
    <Flex>
      <Hide below="xl">
        <VerticalSidebar />
      </Hide>
      <Show below="xl">
        <HorizontalBar />
      </Show>
      <Container
        minW={400}
        mt={25}
        pt={[20, 20, 20, 20, 0]}
        maxW="container.md"
      >
        <Outlet />
      </Container>
    </Flex>
  );
};

export default App;
