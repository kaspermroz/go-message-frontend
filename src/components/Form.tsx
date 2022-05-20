import React, {ChangeEventHandler, FormEventHandler, useState} from 'react'
import { Input, Button } from '@chakra-ui/react'

import { sendMessage } from "../api/chats";

export const Form = () => {
    const [message, setMessage] = useState('')

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        e.preventDefault()
        setMessage(e.currentTarget.value)
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        sendMessage(message)
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

