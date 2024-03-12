import { AxiosError } from "axios";

export default async function axiosErrorHandle(error: any) {
  if (error instanceof AxiosError) {
    const e = error as AxiosError<{
      error: string;
      message: string[] | string;
      statusCode: number;
    }>;
    const msg = JSON.stringify(e.response?.data.message);
    if (e.response?.status === 400) {
      alert(msg);
    } else {
      throw new Error(msg);
    }
  } else {
    console.error("Error creating user:", error);
    throw error;
  }
}
