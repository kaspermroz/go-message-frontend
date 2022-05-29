import { useEffect, useState } from 'react';
import {
  EventSourcePolyfill,
  EventSourcePolyfillInit,
} from 'event-source-polyfill';

const apiUrl = process.env.REACT_APP_API_URL ?? 'http://localhost:8080/api/v1';

export const useSSE = <T = object>(
  url: string,
  options?: EventSourcePolyfillInit,
): { data: T | undefined } => {
  const [data, setData] = useState<T>();

  useEffect(() => {
    const sse = new EventSourcePolyfill(`${apiUrl}/${url}`, options);

    sse.addEventListener('data', (e) => {
      // @ts-ignore
      setData(JSON.parse(e.data));
    });

    return () => {
      sse.close();
    };
  }, [url, options, setData]);

  return { data };
};

export const sendMessage = async (
  text: string,
  userId: string,
  chatId: string,
): Promise<any> => {
  const body = JSON.stringify({
    message: {
      author_id: userId,
      text: text,
    },
  });
  return fetch(`${apiUrl}/chats/${chatId}/send`, {
    method: 'POST',
    body,
  });
};
