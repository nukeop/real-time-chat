import { GetRoomsResponse } from '../../api/client';

export type RoomChatProps = {
  room: GetRoomsResponse;
};

export const RoomChat: React.FC<RoomChatProps> = () => {
  return <div className="flex h-full flex-col">test</div>;
};
