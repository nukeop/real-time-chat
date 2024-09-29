import { motion } from 'framer-motion';
import { GetRoomsResponse } from '../../api/client';

type RoomsTableProps = {
  rooms: GetRoomsResponse[];
  onJoinRoom: (roomId: string) => void;
};

export const RoomsTable: React.FC<RoomsTableProps> = ({
  rooms,
  onJoinRoom,
}) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Available Rooms</h2>
      </div>

      {rooms.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rooms.map((room) => (
            <motion.button
              key={room.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-slate-800 p-4 rounded-lg cursor-pointer hover:bg-slate-700 transition-colors"
              onClick={() => onJoinRoom(room.id)}
            >
              <div>
                <h3 className="text-xl font-semibold text-slate-300">
                  {room.name}
                </h3>
                <p className="text-slate-400">
                  {room.users.length} / {room.maxUsers} users
                </p>
                {room.hasPassword && (
                  <span className="text-yellow-500">🔒 Password Protected</span>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      )}
    </>
  );
};
const EmptyState: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-64 bg-slate-800 rounded-lg">
    <svg
      className="w-16 h-16 text-slate-400 mb-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
      />
    </svg>
    <h3 className="text-xl font-semibold text-slate-300 mb-2">
      No Rooms Available
    </h3>
    <p className="text-slate-400 text-center">
      Create a new room or wait for others to join.
    </p>
  </div>
);
