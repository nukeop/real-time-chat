import { useEffect, useState } from 'react';
import { ApiClient } from '../api/client';

type Room = {
  id: string;
  name: string;
  maxUsers: number;
};

export const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  useEffect(() => {
    ApiClient.getRooms().then(setRooms);
  }, []);

  return (
    <div className="flex h-screen w-full flex-col bg-white">
      <div className="flex-grow overflow-y-auto p-4">
        {rooms.map((room, index) => (
          <div key={index} className="mb-2">
            <span className="text-xs bg-blue-500 text-white rounded-full px-2 py-1">
              {room.id}
            </span>
            <span className="ml-2">{room.name}</span>
            <span className="text-xs ml-2 text-gray-500">
              ({room.maxUsers})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
