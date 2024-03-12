import client from "./axios-client";
import axiosErrorHandle from "./error-handle";

export default async function getUsers() {
  try {
    const response = await client.get("/users");
    return response.data;
  } catch (e) {
    return axiosErrorHandle(e);
  }
}
