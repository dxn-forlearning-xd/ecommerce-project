import { createContext, useContext, useState } from 'react';

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([
    { id: 1, title: '订单已发货', time: '2025-09-12 14:23', isNew: true },
    { id: 2, title: '优惠券即将过期', time: '2025-09-11 10:15', isNew: true },
  ]);

  const markAsRead = (id) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, isNew: false } : msg))
    );
  };

  const markAllAsRead = () => {
    setMessages((prev) => prev.map((msg) => ({ ...msg, isNew: false })));
  };

  const hasNewMessages = messages.some((msg) => msg.isNew);

  return (
    <MessageContext.Provider
      value={{ messages, hasNewMessages, markAsRead, markAllAsRead }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => useContext(MessageContext);
