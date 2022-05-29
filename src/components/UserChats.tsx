import React, { useMemo } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useSSE } from '../api/chats';
import { Box, SkeletonText, SkeletonCircle } from '@chakra-ui/react';

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

  const { data } = useSSE<ChatsSSE>('chats', options);

  console.log(data);

  return (
    <div>
      {data ? (
        <div>
          {data.chats?.map(({ title, messages_count, chat_id }) => (
            <div key={chat_id}>
              {title}
              {': '}
              {messages_count}
            </div>
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
