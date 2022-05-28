import React, { useMemo } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useSSE } from "../api/chats";

export const UserChats = () => {
    const { user } = useAuth0()
    const options = useMemo(() => ({
        headers: {
            "User-ID": user?.sub ?? '',
        }
    }), [user?.sub])

    const { data } = useSSE('chats', options)

    console.log(data)

    return (<span/>)
}
