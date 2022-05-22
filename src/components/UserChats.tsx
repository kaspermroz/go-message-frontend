import React, { useEffect } from "react";
import { EventSourcePolyfill } from 'event-source-polyfill'

export const UserChats = () => {
    useEffect(() => {
        const sse = new EventSourcePolyfill('http://localhost:8080/api/v1/chats', {
            headers: {
                "User-ID": '2137'
            }
        });
        function getRealtimeData(data: any) {
            console.log(data)
        }
        sse.onopen = () => console.log("All Chats SSE conn open")
        sse.addEventListener("data", (e) => {
            // @ts-ignore
            getRealtimeData(JSON.parse(e.data))
        })

        return () => {
            sse.close();
        };
    }, []);

    return (<span/>)
}
