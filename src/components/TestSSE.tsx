import React, { useEffect } from "react";

export const TestSSE = () => {
   useEffect(() => {
        const sse = new EventSource('http://localhost:8080/api/v1/test',
            { withCredentials: false });
        function getRealtimeData(data: any) {
            console.log(data)
        }
        sse.onopen = () => console.log("SSE conn open")
        sse.onmessage = e => getRealtimeData(JSON.parse(e.data))
        sse.onerror = (err) => {
            console.error(err)

            sse.close();
        }
        return () => {
            sse.close();
        };
    }, []);
    return (<span>
        Test SSE is mounted - check console.
    </span>)
}
