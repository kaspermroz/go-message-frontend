import React, {ChangeEventHandler, FormEventHandler, useState} from 'react'
import { Input, Button } from '@chakra-ui/react'
import { useAuth0 } from "@auth0/auth0-react";

import { sendMessage } from "../api/chats";

export const Form = () => {
    const [message, setMessage] = useState('')
    const { user } = useAuth0()

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        e.preventDefault()
        setMessage(e.currentTarget.value)
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        sendMessage(message, user?.sub ?? '')
        setMessage("")
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Input value={message} onChange={handleChange} />
                <Button colorScheme="teal" type="submit">Send</Button>
            </form>
        </div>
    )
}

