import client from "./axios-client";
import axiosErrorHandle from "./error-handle";

export default async function deleteUser(id: string) {
  try {
    const response = await client.delete("/users", { data: { id } });
    return response.data;
  } catch (e) {
    return axiosErrorHandle(e);
  }
}
