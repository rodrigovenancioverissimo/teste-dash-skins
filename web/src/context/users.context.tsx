import React, { createContext, useContext, useState, useEffect } from "react";
import client from "@/utils/axios-client";
import { User } from "@/interfaces/user";

interface Props {
  children: React.ReactNode;
}

interface Context {
  users: User[];
}

const UserContext = createContext({} as Context);

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }: Props) => {
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    try {
      const response = await client.get("/users");
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };

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
    <UserContext.Provider value={{ users }}>{children}</UserContext.Provider>
  );
};
