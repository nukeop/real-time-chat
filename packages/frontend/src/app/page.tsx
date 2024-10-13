import { Rooms } from '../_components/views/Rooms';
import { ApiClient } from '../api/client';

const Home = async () => {
  const rooms = await ApiClient.getRooms();
  return <Rooms rooms={rooms} />;
};

export default Home;
