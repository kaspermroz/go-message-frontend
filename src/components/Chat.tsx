import React  from 'react'
import { Flex } from '@chakra-ui/react'
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

export const Chat = ({ chatId }: ChatProps) => {
  const { data } = useSSE<ChatSSEData>(`chats/${chatId}`)
  const { user } = useAuth0()

  console.log(data)

  return (
    <Flex justify="space-between" direction="column" align="space-between" h="full">
      <Flex>{data?.title}</Flex>
      <Flex h="full" direction="column" justify="flex-end">
        {data?.messages?.map(({ text, author_id }) => (
          <Flex justify={author_id === user?.sub ? 'flex-end' : 'flex-start'}>{text}</Flex>
        ))}
      </Flex>
    </Flex>
  )
}