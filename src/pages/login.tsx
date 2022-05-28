import React from 'react'
import { Button, Center, Box } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';

export const LoginPage = () => {
  const { loginWithRedirect } = useAuth0()

  return (
    <Center h="100vh">
      <Box>
        <Button
          colorScheme="teal"
          onClick={loginWithRedirect}
          px={16}
        >
          Log in
        </Button>
      </Box>
    </Center>
  )
}