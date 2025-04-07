import Axios from "@/libs/axios/axios";
import { EditSmtpPayload, SmtpConfigPayload } from "@/types/setting/settingTypes";
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

export const editSettingSmtp = async (payload: EditSmtpPayload) => {
  try {
    const response = await Axios.patch("/smtp/update", payload);

    return response.data;

  } catch (error) {
    console.error("Error edit smtp setting:", error);

    axiosErrorHandler(error, '/smtp/update')
    throw error;
  }

};

export const deleteSmtp = async ({ smtp_id }: { smtp_id: string }) => {
  try {
    const response = await Axios.patch("/smtp/delete", { smtp_id });

    return response.data;

  } catch (error) {
    console.error("Error delete smtp:", error);

    axiosErrorHandler(error, '/smtp/delete')
    throw error;
  }

};

export const updateStatusSmtp = async ({ smtp_id, is_enable }: { smtp_id: string, is_enable: boolean }) => {
  try {
    const response = await Axios.patch("/smtp/update/status", { smtp_id, is_enable });

    return response.data;

  } catch (error) {
    console.error("Error update status smtp:", error);

    axiosErrorHandler(error, '/smtp/update/status')
    throw error;
  }

};



