import { User } from "@/interfaces/user";
import client from "./axios-client";
import axiosErrorHandle from "./error-handle";

export default async function updateUser(
  userData: Partial<User> & { id: string }
) {
  try {
    const response = await client.patch("/users", userData);
    return response.data;
  } catch (e) {
    return axiosErrorHandle(e);
  }
}
