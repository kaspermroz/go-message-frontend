import React, { useContext, useMemo } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, SkeletonText, SkeletonCircle } from '@chakra-ui/react';
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
            <Box key={chat_id} p={6} onClick={() => setChatId(chat_id)}>
              {title}
              {': '}
              {messages_count}
            </Box>
          ))}
        </div>
      ) : (
        <Box padding="6" boxShadow="lg" bg="white">
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
        </Box>
      )}
    </div>
  );
};
