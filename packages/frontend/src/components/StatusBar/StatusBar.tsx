type StatusBarProps = {
  children: React.ReactNode;
};
export const StatusBar: React.FC<StatusBarProps> = ({ children }) => {
  return <div className="w-full flex flex-row p-2">{children}</div>;
};
