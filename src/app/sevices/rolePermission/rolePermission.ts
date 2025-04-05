import Axios from "@/libs/axios/axios";
import { axiosErrorHandler } from "@/utils/axiosErrorHandler";

export const fetchRoleList = async ({ page, pageSize }: { page: number; pageSize: number }) => {
  try {
    const response = await Axios.post("/role/getList", {
      page,
      limit: pageSize,
    });

    return response.data;

  } catch (error) {
    console.error("Error fetching role list:", error);

    axiosErrorHandler(error, '/role/getList')
    throw error;

  }

};

export const searchRoleList = async ({ page, pageSize, role_name }: { page: number; pageSize: number; role_name: string }) => {
  try {
    const response = await Axios.post("/role/search", {
      role_name,
      page,
      limit: pageSize,
    });

    return response.data;

  } catch (error) {
    console.error("Error search role list:", error);

    axiosErrorHandler(error, '/role/search')
    throw error;

  }

};

export const fetchPermission = async () => {
  try {
    const response = await Axios.get("/role/permission/getList");

    return response.data;

  } catch (error) {
    console.error("Error fetch permission:", error);

    axiosErrorHandler(error, '/role/permission/getList')
    throw error;

  }

};
