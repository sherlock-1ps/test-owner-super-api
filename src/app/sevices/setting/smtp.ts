import Axios from "@/libs/axios/axios";
import { SmtpConfigPayload } from "@/types/setting/settingTypes";
import { axiosErrorHandler } from "@/utils/axiosErrorHandler";

export const fetchSettingSmtp = async ({ page, pageSize }: { page: number; pageSize: number }) => {
  try {
    const response = await Axios.post("/smtp/getList", {
      page,
      limit: pageSize,
    });

    return response.data;

  } catch (error) {
    console.error("Error fetching smtp setting:", error);

    axiosErrorHandler(error, '/smtp/getList')
    throw error;
  }

};

export const createSettingSmtp = async (payload: SmtpConfigPayload) => {
  try {
    const response = await Axios.post("/smtp/create", payload);

    return response.data;

  } catch (error) {
    console.error("Error create smtp setting:", error);

    axiosErrorHandler(error, '/smtp/create')
    throw error;
  }

};



