import React from 'react'
import { Button } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

export const LoginPage = () => {
    const { loginWithRedirect } = useAuth0()
    return (
        <div>
            <Button colorScheme="teal" onClick={loginWithRedirect}>Log in</Button>
        </div>
    )
}