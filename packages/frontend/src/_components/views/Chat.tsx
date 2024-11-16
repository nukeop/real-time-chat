'use client';

import { HashtagIcon } from '@heroicons/react/24/outline';
import { ClientEvent, ServerEvent } from '@real-time-chat/core';
import { RoomInfoServerPayload } from '@real-time-chat/core/src/Event';
import { motion } from 'framer-motion';
import { FC, FormEvent, useEffect, useState } from 'react';

import { useBackendSocket } from '../../_hooks/useBackendSocket';

type Message = {
  nickname: string;
  message: string;
};

type ChatProps = {
  roomId: string;
};

export const Chat: FC<ChatProps> = ({ roomId }) => {
  const socket = useBackendSocket();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [roomName, setRoomName] = useState('');
  const [users, setUsers] = useState<string[]>([]);
  const nickname = 'test';

  useEffect(() => {
    console.log('joining room', { roomId, nickname });

    socket?.emit(ClientEvent.JOIN_ROOM, { roomId, nickname });

    socket?.on(ServerEvent.MESSAGE, (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket?.on(ServerEvent.ERROR, (err) => {
      alert(err.message);
    });

    socket?.on(ServerEvent.ROOM_INFO, (info: RoomInfoServerPayload) => {
      setRoomName(info.name);
      setUsers(info.users);
    });

    return () => {
      console.log('leaving room', { roomId, nickname });
      socket?.emit(ClientEvent.LEAVE_ROOM, { roomId, nickname });
      socket?.off(ServerEvent.MESSAGE);
      socket?.off(ServerEvent.ERROR);
    };
  }, []);

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      socket!.emit(ClientEvent.SEND_MESSAGE, { roomId, message });
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
      className="flex w-full flex-grow flex-col bg-slate-800"
    >
      <div className="flex items-center justify-between rounded-t-md bg-slate-900 p-4">
        <h1 className="text-md flex items-center justify-start font-medium text-gray-300">
          <HashtagIcon className="mr-2 inline-block h-6 w-6 text-gray-400" />
          {roomName}
          <span className="ml-2 font-thin text-gray-600">({roomId})</span>
        </h1>
        <div className="flex items-center">
          <span className="mr-2 text-sm text-gray-400">
            Users Online: {users.length}
          </span>
        </div>
      </div>
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
      <form className="flex p-4" onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow rounded-l-md border-transparent bg-slate-700 px-4 py-1 text-white focus:border-indigo-500 focus:bg-slate-600 focus:ring-0"
        />
        <button
          type="submit"
          onClick={sendMessage}
          className="rounded-r-md bg-indigo-600 px-4 py-2 font-bold text-white transition-colors hover:bg-indigo-700"
        >
          Send
        </button>
      </form>
    </motion.div>
  );
};
