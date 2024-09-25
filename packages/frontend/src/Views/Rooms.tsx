import { useEffect, useState } from 'react';
import { ApiClient } from '../api/client';
import { RoomsTable } from '../components/RoomsTable/RoomsTable';
import { Room } from '../types';

export const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  useEffect(() => {
    ApiClient.getRooms().then(setRooms);
  }, []);

  return (
    <div className="flex h-screen w-full flex-col bg-white">
      <div className="flex-grow overflow-y-auto p-4">
        <RoomsTable rooms={rooms} />
      </div>
    </div>
  );
};
