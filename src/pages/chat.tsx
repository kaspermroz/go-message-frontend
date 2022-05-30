import React, { useContext } from 'react';
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
import { ChatContext } from '../context/chat';
import { Chat } from '../components/Chat';


export const ChatPage = () => {
  const { logout } = useAuth0();
  const { chatId } = useContext(ChatContext)
  return (
    <HStack h="full" divider={<StackDivider borderColor="gray.200" />}>
      <Flex w={240} h="full" justify="space-between" direction="column">
        <UserChats />
        <Flex justify="flex-start" p={1}>
          <Button colorScheme="teal" onClick={() => logout()}>
            Log out
          </Button>
        </Flex>
      </Flex>
      <Box w="full" h="full">
        <VStack justify="space-between" h="full" align="stretch" p={2}>
          {chatId ? (
            <Chat chatId={chatId} />
          ) : (
            <div>select chat</div>
          )}
          <Form />
        </VStack>
      </Box>
    </HStack>
  );
};
