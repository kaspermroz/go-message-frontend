import React, { ChangeEventHandler, FormEventHandler, useContext, useState } from 'react';
import { Input, Button, HStack } from '@chakra-ui/react';
import { EmailIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { useAuth0 } from '@auth0/auth0-react';

import { sendMessage } from '../api/chats';
import { ChatContext } from '../context/chat';

export const Form = () => {
  const [message, setMessage] = useState('');
  const { user } = useAuth0();
  const { chatId } = useContext(ChatContext)

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setMessage(e.currentTarget.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    sendMessage(message, user?.sub ?? '', chatId);
    setMessage(''); 
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <HStack p={3} pt={1}>
          <Input value={message} onChange={handleChange} data-cy="chat-input" />
          <Button colorScheme="teal" type="submit" variant={''} data-cy="chat-send-button">
            <HStack spacing={1}>
              <EmailIcon w={8} h={8} color="teal" />
              <ArrowForwardIcon w={8} h={8} color="teal" />
            </HStack>
          </Button>
        </HStack>
      </form>
    </div>
  );
};
