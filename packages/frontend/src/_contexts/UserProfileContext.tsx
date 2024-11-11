import { createContext, FC, useState } from 'react';

export type UserProfileState = {
  username: string | null;
};

export type UserProfileContextType = UserProfileState & {
  setUsername: (username: string) => void;
};

type UserProfileProviderProps = {
  children: React.ReactNode;
};

export const UserProfileContext = createContext<UserProfileContextType | null>(
  null,
);

export const UserProfileProvider: FC<UserProfileProviderProps> = ({
  children,
}) => {
  const [username, setUsername] = useState<string | null>(null);

  return (
    <UserProfileContext.Provider value={{ username, setUsername }}>
      {children}
    </UserProfileContext.Provider>
  );
};
