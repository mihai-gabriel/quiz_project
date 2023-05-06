import React from "react";
import {
  Container,
  Heading,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { Login } from "./Login";
import { Register } from "./Register";

enum AuthOption {
  REGISTER,
  LOGIN,
}

export const Auth: React.FC = () => {
  return (
    <Container minW={500} fontFamily="Spline Sans Mono, monospace">
      <Heading as="h5" size="lg" my={8} textAlign="center">
        Quiz Project
      </Heading>
      <Tabs
        align="center"
        position="relative"
        variant="unstyled"
        defaultIndex={AuthOption.LOGIN}
      >
        <TabList>
          <Tab>Register</Tab>
          <Tab>Log in</Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="teal.400"
          borderRadius="1px"
        />
        <TabPanels>
          <TabPanel>
            <Register />
          </TabPanel>
          <TabPanel>
            <Login />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};
