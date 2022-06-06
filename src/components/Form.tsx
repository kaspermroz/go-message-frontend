import React, { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { Input, Button, HStack } from '@chakra-ui/react';
import { EmailIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { useAuth0 } from '@auth0/auth0-react';

import { sendMessage } from '../api/chats';

export const Form = () => {
  const [message, setMessage] = useState('');
  const { user } = useAuth0();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setMessage(e.currentTarget.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    sendMessage(message, user?.sub ?? '', 'test');
    setMessage('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <HStack p={3} pt={1}>
          <Input value={message} onChange={handleChange} />
          <Button colorScheme="teal" type="submit" variant={''}>
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
