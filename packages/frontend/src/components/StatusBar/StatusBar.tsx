type StatusBarProps = {
  children: React.ReactNode;
};
export const StatusBar: React.FC<StatusBarProps> = ({ children }) => {
  return <div className="flex w-full flex-row p-2">{children}</div>;
};
