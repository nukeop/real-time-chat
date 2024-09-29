import { ClientEvent, ServerEvent } from '@real-time-chat/core';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { ApiClient } from '../api/client';

type Message = {
  nickname: string;
  message: string;
};

const socket = ApiClient.getSocket();

type ChatLoaderData = {
  roomId: string;
};

export function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const { roomId } = useLoaderData() as ChatLoaderData;
  const nickname = 'test';

  useEffect(() => {
    socket.emit(ClientEvent.JOIN_ROOM, { roomId, nickname });

    socket.on(ServerEvent.MESSAGE, (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on(ServerEvent.ERROR, (err) => {
      alert(err.message);
    });

    return () => {
      socket.off(ServerEvent.MESSAGE);
      socket.off(ServerEvent.ERROR);
    };
  }, [roomId, nickname]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit(ClientEvent.SEND_MESSAGE, { roomId, message });
      setMessage('');
    }
  };

  console.log({ messages, message });

  return (
    <motion.div
      key="chat"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex h-screen w-full flex-col bg-slate-800"
    >
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-4"
          >
            <p className="font-semibold">{message.nickname}</p>
            <p className="bg-gray-700 p-2 rounded-lg inline-block">
              {message.message}
            </p>
          </motion.div>
        ))}
      </div>
      <div className="flex p-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow rounded-l-md bg-slate-700 border-transparent focus:border-indigo-500 focus:bg-slate-600 focus:ring-0 text-white px-4 py-1"
        />
        <button
          onClick={sendMessage}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-r-md transition-colors"
        >
          Send
        </button>
      </div>
    </motion.div>
  );
}
