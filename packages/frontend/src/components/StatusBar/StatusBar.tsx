type StatusBarProps = {
  children: React.ReactNode;
};
export const StatusBar: React.FC<StatusBarProps> = ({ children }) => {
  return (
    <div className="flex-0 fixed z-10 flex w-full flex-row items-center justify-center p-2">
      <div className="flex w-full max-w-screen-lg flex-1 flex-row items-center justify-between rounded-lg bg-gray-600 bg-opacity-50 p-2 shadow-lg ring-1 ring-black ring-opacity-25 backdrop-blur-md">
        {children}
      </div>
    </div>
  );
};
