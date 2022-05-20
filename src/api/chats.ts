export const sendMessage = async (text: string): Promise<any> => {
    const body = JSON.stringify({
        message: {
            "author_id": "2137",
            "text": text,
        }
    })
    return fetch("http://localhost:8080/api/v1/chats/test/send", {
        method: "POST",
        body,
    })
}