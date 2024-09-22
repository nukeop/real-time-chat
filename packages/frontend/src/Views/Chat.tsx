import { useEffect, useState } from 'react';
import { ApiClient } from '../api/client';

type ChatProps = {
  nickname: string;
  room: string;
};

type Message = {
  nickname: string;
  message: string;
};

const socket = ApiClient.getSocket();

export function Chat({ nickname, room }: ChatProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.emit('joinRoom', { roomId: room, nickname });

    socket.on('message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on('error', (err) => {
      alert(err.message);
    });

    return () => {
      socket.off('message');
      socket.off('error');
    };
  }, [room, nickname]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('sendMessage', { roomId: room, message });
      setMessage('');
    }
  };

  return (
    <div className="flex h-screen w-full flex-col bg-white">
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <strong>{msg.nickname}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <div className="flex border-t p-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow border p-2"
          placeholder="Type a message"
        />
        <button
          onClick={sendMessage}
          className="ml-2 rounded bg-blue-500 px-4 py-2 text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
}
