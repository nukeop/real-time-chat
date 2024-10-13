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
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Available Rooms</h2>
      </div>

      {rooms.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {rooms.map((room) => (
            <motion.button
              key={room.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer rounded-lg bg-slate-800 p-4 transition-colors hover:bg-slate-700"
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
  <div className="flex h-64 flex-col items-center justify-center rounded-lg bg-slate-800">
    <svg
      className="mb-4 h-16 w-16 text-slate-400"
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
    <h3 className="mb-2 text-xl font-semibold text-slate-300">
      No Rooms Available
    </h3>
    <p className="text-center text-slate-400">
      Create a new room or wait for others to join.
    </p>
  </div>
);
