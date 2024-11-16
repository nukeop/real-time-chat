'use client';

import { useEffect, useState } from 'react';

import { HomeView } from '../_components/views/HomeView';
import { ApiClient, GetRoomsResponse } from '../api/client';

const Home: React.FC = () => {
  const [rooms, setRooms] = useState<GetRoomsResponse[]>([]);
  useEffect(() => {
    ApiClient.getRooms().then((response) => setRooms(response));
  }, []);
  return <HomeView rooms={rooms} />;
};

export default Home;
