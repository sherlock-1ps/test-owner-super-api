import Axios from "@/libs/axios/axios";
import { ResetPasswordOperatorPayload, UpdateOperatorPayload } from "@/types/operator/operatorTypes";
import { axiosErrorHandler } from "@/utils/axiosErrorHandler";

export const fetchAccountOwner = async ({ page, pageSize }: { page: number; pageSize: number }) => {
  try {
    const response = await Axios.post("/owner/get", {
      page,
      limit: pageSize,
    });

    return response.data;

  } catch (error) {
    console.error("Error fetching account owner:", error);

    axiosErrorHandler(error, '/owner/get')
    throw error;

  }

};

export const searchAccountOwner = async ({ page, pageSize, username }: { page: number; pageSize: number; username: string }) => {
  try {
    const response = await Axios.post("/owner/search", {
      page,
      limit: pageSize,
      username
    });

    return response.data;

  } catch (error) {
    console.error("Error fetching search account owner:", error);

    axiosErrorHandler(error, '/owner/search')
    throw error;

  }

};

export const createAccountOwner = async ({ username, password, role_id }: { username: string, password: string, role_id: string }) => {
  try {
    const response = await Axios.post("/owner/create", {
      username,
      password,
      role_id
    });

    return response.data;

  } catch (error) {
    console.error("Error create account owner:", error);

    axiosErrorHandler(error, '/owner/create')
    throw error;

  }

};

export const updateAccountOwner = async ({ owner_id }: { owner_id: string }) => {
  try {
    const response = await Axios.post("/owner/resetPassword", {
      owner_id
    });

    return response.data;

  } catch (error) {
    console.error("Error reset password account owner:", error);

    axiosErrorHandler(error, '/owner/resetPassword')
    throw error;

  }

};


export const fetchAccountOperator = async ({ page, pageSize }: { page: number; pageSize: number }) => {
  try {
    const response = await Axios.post("/operator/get", {
      page,
      limit: pageSize,
    });

    return response.data;

  } catch (error) {
    console.error("Error fetching account operator:", error);

    axiosErrorHandler(error, '/operator/get')
    throw error;

  }

};

export const searchAccountOperator = async ({ page, pageSize, username }: { page: number; pageSize: number; username: string }) => {
  try {
    const response = await Axios.post("/operator/search", {
      page,
      limit: pageSize,
      username
    });

    return response.data;

  } catch (error) {
    console.error("Error fetching search account operator:", error);

    axiosErrorHandler(error, '/operator/search')
    throw error;

  }

};


