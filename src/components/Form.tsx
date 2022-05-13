import React, {ChangeEventHandler, FormEventHandler, useState} from 'react'
import { Input, Button } from '@chakra-ui/react'

export const Form = () => {
    const [message, setMessage] = useState('')

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        e.preventDefault()
        setMessage(e.currentTarget.value)
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        console.log(message)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Input value={message} onChange={handleChange} />
                <Button type="submit">Send</Button>
            </form>
        </div>
    )
}

