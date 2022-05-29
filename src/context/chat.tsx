import React, { useState, createContext, PropsWithChildren } from 'react';

export const ChatContext = createContext({});

export const ChatContextProvider = ({ children }: PropsWithChildren<any>) => {
  const [chatId, setChatId] = useState('');

  return (
    <ChatContext.Provider value={{ chatId, setChatId }}>
      {children}
    </ChatContext.Provider>
  );
};
