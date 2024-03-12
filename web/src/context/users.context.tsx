import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/interfaces/user";
import getUsers from "@/axios/get-users.axios";

interface Props {
  children: React.ReactNode;
}

interface Context {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  deletedUser?: string;
  setDeletedUser: React.Dispatch<React.SetStateAction<string | undefined>>;
  blinkUser?: string;
  setBlinkUser: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const UserContext = createContext({} as Context);

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [deletedUser, setDeletedUser] = useState<string>();
  const [blinkUser, setBlinkUser] = useState<string>();

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
    <UserContext.Provider
      value={{
        users,
        setUsers,
        deletedUser,
        setDeletedUser,
        blinkUser,
        setBlinkUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
