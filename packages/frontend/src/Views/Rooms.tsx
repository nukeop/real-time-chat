import { useEffect, useState } from 'react';
import { ApiClient } from '../api/client';

export const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    ApiClient.getRooms().then(setRooms);
  }, []);

  return (
    <div className="flex h-screen w-full flex-col bg-white">
      <div className="flex-grow overflow-y-auto p-4">
        {rooms.map((room, index) => (
          <div key={index} className="mb-2">
            {room}
          </div>
        ))}
      </div>
    </div>
  );
};
