import React, { useContext, useMemo } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Box,
  SkeletonText,
  SkeletonCircle,
  Flex,
  Circle,
  HStack,
  Text,
} from '@chakra-ui/react';
import { useSSE } from '../api/chats';
import { ChatContext } from '../context/chat';

type User = {
  user_id: string;
  username: string;
}

type Chat = {
  messages_count: number;
  title: string;
  chat_id: string;
  users: User[];
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

const UserChat = ({
  chat_id,
  title,
  messages_count,
  users,
}: Chat) => {
  const { setChatId } = useContext(ChatContext)
  const { user } = useAuth0()

  const username = users
    .filter((u) => u.user_id !== user?.sub)[0]
    .username ?? user?.name ?? '?'
  const initial = username
    .charAt(0)
    .toUpperCase()

  return (
    <Box key={chat_id} p={3} onClick={() => setChatId(chat_id)} cursor="pointer">
      <HStack justify="space-between">
        <Circle size={10} bg={'#808080'} color="white">{initial}</Circle>
        <Text>{title}{': '}</Text>
        <Text as="strong">{messages_count}</Text>
      </HStack>
    </Box>
  )
}

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
  const { data } = useSSE<ChatsSSE>('chats', options);

  return (
    <div>
      {data ? (
        <div>
          {data.chats?.map((chat) => (
            <UserChat {...chat} />
          ))}
        </div>
      ) : (
        <ChatsPlaceHolder />
      )}
    </div>
  );
};
