import React from 'react';
import { UserChats } from '../components/UserChats';
import { Form } from '../components/Form';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Button,
  HStack,
  StackDivider,
  Box,
  VStack,
  Flex,
} from '@chakra-ui/react';

export const ChatPage = () => {
  const { logout } = useAuth0();
  return (
    <HStack h="full" divider={<StackDivider borderColor="gray.200" />}>
      <Box w={240} h="full">
        <UserChats />
      </Box>
      <Box w="full" h="full">
        <VStack justify="space-between" h="full" align="stretch" p={2}>
          <Flex justify="end">
            <Button colorScheme="teal" onClick={() => logout()}>
              Log out
            </Button>
          </Flex>
          <Form />
        </VStack>
      </Box>
    </HStack>
  );
};
