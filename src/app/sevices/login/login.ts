import Axios from "@/libs/axios/axios";
import AxiosAuth from "@/libs/axios/axiosAuth";
import { axiosErrorHandler } from "@/utils/axiosErrorHandler";

export const setPasswordAccount = async ({ password }: { password: string }) => {
  try {
    const response = await AxiosAuth.patch("/owner/password/set", {
      password,
    });

    return response.data;

  } catch (error) {
    console.error("Error set password:", error);

    axiosErrorHandler(error, '/owner/password/set')
    throw error;

  }

};
