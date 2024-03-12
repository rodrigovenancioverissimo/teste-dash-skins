import { User } from "@/interfaces/user";
import client from "./axios-client";
import axiosErrorHandle from "./error-handle";

export default async function createUser(userData: Partial<User>) {
  try {
    const response = await client.post("/users", userData);
    return response.data;
  } catch (e) {
    return axiosErrorHandle(e);
  }
}
