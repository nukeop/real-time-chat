import { useState } from 'react';
import { Chat } from './Chat';

function App() {
  const [nickname, setNickname] = useState('');
  const [room, setRoom] = useState('');
  const [joined, setJoined] = useState(false);

  const handleJoin = () => {
    if (nickname && room) {
      setJoined(true);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      {!joined ? (
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h1 className="mb-4 text-2xl font-bold">Join Chat Room</h1>
          <input
            type="text"
            placeholder="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="mb-4 w-full border p-2"
          />
          <input
            type="text"
            placeholder="Room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="mb-4 w-full border p-2"
          />
          <button
            onClick={handleJoin}
            className="w-full rounded bg-blue-500 px-4 py-2 text-white"
          >
            Join Room
          </button>
        </div>
      ) : (
        <Chat nickname={nickname} room={room} />
      )}
    </div>
  );
}

export default App;