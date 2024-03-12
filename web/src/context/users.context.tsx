import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/interfaces/user";
import getUsers from "@/axios/get-users.axios";

interface Props {
  children: React.ReactNode;
}

interface Context {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const UserContext = createContext({} as Context);

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }: Props) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};
