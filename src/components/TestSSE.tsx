import React, { useEffect } from "react";

export const TestSSE = () => {
   useEffect(() => {
        const sse = new EventSource('http://localhost:8080/api/v1/chats/test');
        function getRealtimeData(data: any) {
            console.log(data)
        }
        sse.onopen = () => console.log("SSE conn open")
        sse.onerror = (err) => {
            console.error(err)

            sse.close();
        }
        sse.addEventListener("data", (e) => {
            getRealtimeData(JSON.parse(e.data))
        })

        return () => {
            sse.close();
        };
    }, []);

    return (<span>
        Test SSE is mounted - check console.
    </span>)
}
