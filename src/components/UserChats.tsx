import React, { useContext, useMemo } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, SkeletonText, SkeletonCircle, Flex } from '@chakra-ui/react';
import { useSSE } from '../api/chats';
import { ChatContext } from '../context/chat';

type Chat = {
  messages_count: number;
  title: string;
  chat_id: string;
};

type ChatsSSE = {
  chats?: Chat[]; 
};

const ChatsPlaceHolder = () => (
  <div>
    <Flex p={3}>
      <SkeletonCircle size="10" />
      <Flex flex="1" p={2} align="center">
        <SkeletonText noOfLines={2} w="full"/>
      </Flex>
    </Flex>
    <Flex p={3}>
      <SkeletonCircle size="10" />
      <Flex flex="1" p={2} align="center">
        <SkeletonText noOfLines={2} w="full"/>
      </Flex>
    </Flex>
    <Flex p={3}>
      <SkeletonCircle size="10" />
      <Flex flex="1" p={2} align="center">
        <SkeletonText noOfLines={2} w="full"/>
      </Flex>
    </Flex>
  </div>
)

export const UserChats = () => {
  const { user } = useAuth0();
  const options = useMemo(
    () => ({
      headers: {
        'User-ID': user?.sub ?? '',
      },
    }),
    [user?.sub],
  );
  const { setChatId } = useContext(ChatContext)
  const { data } = useSSE<ChatsSSE>('chats', options);

  return (
    <div>
      {data ? (
        <div>
          {data.chats?.map(({ title, messages_count, chat_id }) => (
            <Box key={chat_id} p={3} onClick={() => setChatId(chat_id)}>
              {title}
              {': '}
              {messages_count}
            </Box>
          ))}
        </div>
      ) : (
        <ChatsPlaceHolder />
      )}
    </div>
  );
};
