import { useConnectionStatus } from './useConnectionStatus';

export const ConnectionStatus = () => {
  const isConnected = useConnectionStatus();

  return (
    <div className="flex select-none items-center gap-2 rounded-md bg-slate-800 px-2 py-1 text-xs text-white ring-1 ring-slate-600">
      <span
        className={`inline-block h-2 w-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}
      ></span>
      {isConnected ? 'Connected' : 'Disconnected'}
    </div>
  );
};
