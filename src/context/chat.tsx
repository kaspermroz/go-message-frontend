import React, { useState, createContext, PropsWithChildren } from 'react';

type ChatContextValues = {
  chatId: string;
  setChatId: (s: string) => void
}

export const ChatContext = createContext<ChatContextValues>({
  chatId: '', setChatId(_: string): void {
  },
});

export const ChatContextProvider = ({ children }: PropsWithChildren<any>) => {
  const [chatId, setChatId] = useState('');

  return (
    <ChatContext.Provider value={{ chatId, setChatId }}>
      {children}
    </ChatContext.Provider>
  );
};
