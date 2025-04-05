import Axios from "@/libs/axios/axios";
import { CreateRolePayload, RoleExistPayload } from "@/types/role/roleTypes";
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

export const deleteRoleList = async ({ role_id }: { role_id: string }) => {
  try {
    const response = await Axios.patch("/role/delete", {
      role_id,
    });

    return response.data;

  } catch (error) {
    console.error("Error delete role list:", error);

    axiosErrorHandler(error, '/role/delete')
    throw error;

  }

};



export const createRole = async (payload: CreateRolePayload) => {
  try {
    const response = await Axios.post("/role/create", payload);

    return response.data;

  } catch (error) {
    console.error("Error create role:", error);

    axiosErrorHandler(error, '/role/create')
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

export const fetchPermissionExist = async (payload: RoleExistPayload) => {
  try {
    const response = await Axios.post("/role/permission/update/getList", payload);

    return response.data;

  } catch (error) {
    console.error("Error fetch permission exist:", error);

    axiosErrorHandler(error, '/role/permission/update/getList')
    throw error;

  }

};
