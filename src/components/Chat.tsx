import React  from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import { useSSE } from '../api/chats';
import { useAuth0 } from '@auth0/auth0-react';

type ChatProps = {
  chatId: string;
}

type Message = {
  author_id: string;
  text: string;
}

type ChatSSEData = {
  uuid: string;
  title: string;
  messages: Message[] | null
}

type MessageProps = {
  text: string;
  isAuthor: boolean;
}

const Message = ({ text, isAuthor }: MessageProps) => (
  <Flex justify={isAuthor ? 'flex-end' : 'flex-start'}>
    <Box w="fit-content" p={3} pt={1} pb={1} bg={isAuthor ? 'teal' : '#808080'} borderRadius={'10px'} mb={2}>
      <Text color="white">{text}</Text>
    </Box>
  </Flex>

)

export const Chat = ({ chatId }: ChatProps) => {
  const { data } = useSSE<ChatSSEData>(`chats/${chatId}`)
  const { user } = useAuth0()

  return (
    <Flex justify="space-between" direction="column" align="space-between" h="full">
      <Flex p={3} borderBottom="1px solid #E2E8F0">
        <Text fontSize="xl" data-cy="chat-title">{data?.title}</Text>
      </Flex>
      <Flex p={3} pb={0} h="full" direction="column" justify="flex-end" data-cy="chat-messages">
        {data?.messages?.map(({ text, author_id }) => (
          <Message text={text} isAuthor={author_id === user?.sub} />
        ))}
      </Flex>
    </Flex>
  )
}