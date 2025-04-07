import Axios from "@/libs/axios/axios";
import { axiosErrorHandler } from "@/utils/axiosErrorHandler";

export const fetchRoleConfig = async () => {
  try {
    const response = await Axios.get("/config/role");

    return response.data;

  } catch (error) {
    console.error("Error fetching config role:", error);
    axiosErrorHandler(error, '/config/role')
    throw error;
  }
};

export const fetchOperatorPerfixConfig = async () => {
  try {
    const response = await Axios.get("/config/operatorPrefix");

    return response.data;

  } catch (error) {
    console.error("Error fetching operator prefix config:", error);
    axiosErrorHandler(error, '/config/operatorPrefix')
    throw error;
  }
};

export const fetchMenuConfig = async () => {
  try {
    const response = await Axios.get("/config/menu");

    return response.data;

  } catch (error) {
    console.error("Error fetching menu config:", error);
    axiosErrorHandler(error, '/config/menu')
    throw error;
  }
};


export const fetchActionLogConfig = async () => {
  try {
    const response = await Axios.get("/config/actionLog");

    return response.data;

  } catch (error) {
    console.error("Error fetching action log config:", error);
    axiosErrorHandler(error, '/config/actionLog')
    throw error;
  }
};

