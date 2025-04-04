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
