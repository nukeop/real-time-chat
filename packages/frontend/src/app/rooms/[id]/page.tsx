import { Chat } from '../../../_components/views/Chat';

type RoomParams = {
  id: string;
};

export const Room = async ({ params: { id } }: { params: RoomParams }) => {
  return <Chat roomId={id} />;
};

export default Room;
