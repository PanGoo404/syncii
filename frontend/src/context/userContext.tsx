import { createContext, useState } from 'react';

export interface User {
  _id: string;
  name: string;
  login: string;
  password: string;
  workouts: string[];
  isAdmin: boolean;
}

type UserContextType = [
  User | null,
  React.Dispatch<React.SetStateAction<User | null>>
];

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<User | null>(null);

  return (
    <UserContext.Provider value={[userData, setUserData]}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
