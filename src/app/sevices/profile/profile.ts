import Axios from "@/libs/axios/axios";
import { axiosErrorHandler } from "@/utils/axiosErrorHandler";

export const fetchProfile = async () => {
  try {
    const response = await Axios.get("/owner/profile");



    return response.data;

  } catch (error) {
    console.error("Error fetching profile:", error);

    axiosErrorHandler(error, '/owner/profile')
    throw error;
  }

};

export const changePasswordProfile = async ({ current_password, new_password }: { current_password: string; new_password: string }) => {
  try {
    const response = await Axios.patch("/owner/password/change", {
      current_password,
      new_password
    });

    return response.data;

  } catch (error) {
    console.error("Error change password:", error);

    axiosErrorHandler(error, '/owner/password/change')
    throw error;

  }

};

