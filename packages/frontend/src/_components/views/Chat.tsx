'use client';

import { ClientEvent, ServerEvent } from '@real-time-chat/core';
import { motion } from 'framer-motion';
import { FC, useEffect, useState } from 'react';

import { ApiClient } from '../../api/client';

type Message = {
  nickname: string;
  message: string;
};

const socket = ApiClient.getSocket();

type ChatProps = {
  roomId: string;
};

export const Chat: FC<ChatProps> = ({ roomId }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
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

  return (
    <motion.div
      key="chat"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex h-screen w-full flex-col bg-slate-800"
    >
      <h1 className="p-4 text-2xl font-semibold">Room: {roomId}</h1>
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
            <p className="inline-block rounded-lg bg-gray-700 p-2">
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
          className="flex-grow rounded-l-md border-transparent bg-slate-700 px-4 py-1 text-white focus:border-indigo-500 focus:bg-slate-600 focus:ring-0"
        />
        <button
          type="button"
          onClick={sendMessage}
          className="rounded-r-md bg-indigo-600 px-4 py-2 font-bold text-white transition-colors hover:bg-indigo-700"
        >
          Send
        </button>
      </div>
    </motion.div>
  );
};
