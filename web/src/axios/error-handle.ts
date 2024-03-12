import { AxiosError } from "axios";

export default async function axiosErrorHandle(error: any) {
  if (error instanceof AxiosError) {
    const e = error as AxiosError<{
      error: string;
      message: string[];
      statusCode: number;
    }>;
    const msg = e.response?.data.message.join("\n");
    throw new Error(msg);
  } else {
    console.error("Error creating user:", error);
    throw error;
  }
}
