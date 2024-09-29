import { GetRoomsResponse } from '../../api/client';

export type RoomChatProps = {
  room: GetRoomsResponse;
};

export const RoomChat: React.FC<RoomChatProps> = ({ room }) => {
  return <div className="flex flex-col h-full">test</div>;
};
