import React from 'react'
import {UserChats} from "../components/UserChats";
import {Form} from "../components/Form";
import {useAuth0} from "@auth0/auth0-react";
import {Button} from "@chakra-ui/react";

export const ChatPage = () => {
    const { logout } = useAuth0()
    return (
        <div>
            <UserChats/>
            <Form/>
            <Button colorScheme="teal" onClick={() => logout()}>Log out</Button>
        </div>
    )
}