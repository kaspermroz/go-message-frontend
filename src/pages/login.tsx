import React from 'react';
import { Button, Center, Box, Stack, Text, Spinner } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';

export const LoginPage = () => {
  const { loginWithRedirect, isLoading } = useAuth0();

  return (
    <Center h="100vh">
      <Box
        maxW="330px"
        w="full"
        h="500px"
        boxShadow="2xl"
        rounded="md"
        overflow="hidden"
        p={4}
      >
        <Center h="full">
          {isLoading ? (
            <Spinner size="xl" color="teal" />
          ) : (
            <Stack textAlign="center" align="center" p={6}>
              <Text my={8} fontSize="2xl">
                Welcome to go-message! Fancy a quick chat? 💬
              </Text>
              <Button colorScheme="teal" onClick={loginWithRedirect} px={16}>
                Log in
              </Button>
            </Stack>
          )}
        </Center>
      </Box>
    </Center>
  );
};
