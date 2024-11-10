import { HomeView } from '../_components/views/HomeView';
import { ApiClient } from '../api/client';

const Home = async () => {
  const rooms = await ApiClient.getRooms();
  return <HomeView rooms={rooms} />;
};

export default Home;
