import Axios from "@/libs/axios/axios";
import { ResetPasswordOperatorPayload } from "@/types/operator/operatorTypes";
import { axiosErrorHandler } from "@/utils/axiosErrorHandler";

export const fetchAccountOwner = async ({ page, pageSize }: { page: number; pageSize: number }) => {
  try {
    const response = await Axios.post("/owner/getList", {
      page,
      limit: pageSize,
    });

    return response.data;

  } catch (error) {
    console.error("Error fetching account owner:", error);

    axiosErrorHandler(error, '/owner/getList')
    throw error;

  }

};

export const searchAccountOwner = async ({
  page,
  pageSize,
  username,
  role_id
}: {
  page: number
  pageSize: number
  username: string
  role_id?: string
}) => {
  try {
    const payload: Record<string, any> = {
      page,
      limit: pageSize,
      username
    }

    if (role_id && role_id !== 'all') {
      payload.role_id = role_id
    }

    const response = await Axios.post('/owner/search', payload)

    return response.data
  } catch (error) {
    console.error('Error fetching search account owner:', error)
    axiosErrorHandler(error, '/owner/search')
    throw error
  }
}

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

export const changeRoleAccountOwner = async ({ owner_id, role_id }: { owner_id: string; role_id: string }) => {
  try {
    const response = await Axios.patch("/owner/update/role", {
      owner_id,
      role_id
    });

    return response.data;

  } catch (error) {
    console.error("Error change role account owner:", error);

    axiosErrorHandler(error, '/owner/update/role')
    throw error;

  }

};

export const resetPasswordAccount = async (payload: any) => {
  try {
    const response = await Axios.patch("/owner/password/reset", payload);

    return response.data;

  } catch (error) {
    console.error("Error reset password account owner:", error);

    axiosErrorHandler(error, '/owner/password/reset')
    throw error;

  }

};

export const updateStatusAccountOwner = async ({ owner_id, is_enable }: { owner_id: string, is_enable: boolean }) => {
  try {
    const response = await Axios.patch("/owner/update/status", { owner_id, is_enable });

    return response.data;

  } catch (error) {
    console.error("Error update status account owner:", error);

    axiosErrorHandler(error, '/owner/update/status')
    throw error;

  }

};


export const fetchAccountOperator = async ({ page, pageSize }: { page: number; pageSize: number }) => {
  try {
    const response = await Axios.post("/operator/user/getList", {
      page,
      limit: pageSize,
    });

    return response.data;

  } catch (error) {
    console.error("Error fetching account operator:", error);

    axiosErrorHandler(error, '/operator/user/getList')
    throw error;

  }

};



export const searchAccountOperator = async ({
  page,
  pageSize,
  operator_prefix,
  email
}: {
  page: number
  pageSize: number
  email?: string
  operator_prefix?: string
}) => {
  try {
    const payload: Record<string, any> = {
      page,
      limit: pageSize
    }

    if (email) payload.email = email
    if (operator_prefix && operator_prefix !== 'all') payload.operator_prefix = operator_prefix

    const response = await Axios.post("/operator/user/search", payload)

    return response.data
  } catch (error) {
    console.error("Error fetching search account operator:", error)
    axiosErrorHandler(error, '/operator/user/search')
    throw error
  }
}

export const updateStatusAccountOperator = async ({
  is_enable,
  operator_user_id,
}: {
  is_enable: boolean
  operator_user_id: string
}) => {
  try {
    const response = await Axios.patch("/operator/user/update/status", {
      operator_user_id,
      is_enable
    })

    return response.data
  } catch (error) {
    console.error("Error update status account operator:", error)
    axiosErrorHandler(error, '/operator/user/update/status')
    throw error
  }
}

export const resetPasswordAccountOperator = async ({
  email,
}: {
  email
  : string
}) => {
  try {
    const response = await Axios.post("/operator/password/reset", {
      email,
    })

    return response.data
  } catch (error) {
    console.error("Error reset password account operator:", error)
    const e = axiosErrorHandler(error, '/operator/password/reset')
    throw e
  }
}

export const changeEmailAccountOperator = async ({
  operator_user_id,
  email
}: {
  operator_user_id
  : string,
  email: string
}) => {
  try {
    const response = await Axios.patch("/operator/user/update/email", {
      operator_user_id,
      email
    })

    return response.data
  } catch (error) {
    console.error("Error change email account operator:", error)
    axiosErrorHandler(error, '/operator/user/update/email')
    throw error
  }
}




