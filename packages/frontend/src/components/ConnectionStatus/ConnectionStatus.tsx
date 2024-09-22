import { useConnectionStatus } from './useConnectionStatus';

export const ConnectionStatus = () => {
  const isConnected = useConnectionStatus();

  return (
    <div className="flex items-center border border-stone-200 rounded-md gap-2 bg-stone-50 px-2 py-1 select-none text-xs">
      <span
        className={`w-2 h-2 rounded-full inline-block ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}
      ></span>
      {isConnected ? 'Connected' : 'Disconnected'}
    </div>
  );
};
