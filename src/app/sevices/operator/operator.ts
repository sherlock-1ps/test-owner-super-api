import Axios from "@/libs/axios/axios";
import { ResetPasswordOperatorPayload, CreateOperatorPayload, OperatorCredentialPayload, DeleteOperatorPayload, DeleteDraftOperatorPayload, UpdateStatusOperatorPayload, UpdateStatusCredentialPayload, UpdateGameStatusProviderPayload, CredentialQueryParamsPayload, UpdateAddCredentialPayload } from "@/types/operator/operatorTypes";
import { axiosErrorHandler } from "@/utils/axiosErrorHandler";

export const fetchOperator = async ({ page, pageSize }: { page: number; pageSize: number }) => {
  try {
    const response = await Axios.post("/operator/getList", {
      page,
      limit: pageSize,
    });

    return response.data;

  } catch (error) {
    console.error("Error fetching operator:", error);

    axiosErrorHandler(error, '/operator/getList')
    throw error;

  }

};

export const fetchOperatorProfile = async ({ operator_id }: { operator_id: string; }) => {
  try {
    const response = await Axios.post("/operator/get", {
      operator_id,
    });

    return response.data;

  } catch (error) {
    console.error("Error fetching operator profile:", error);

    axiosErrorHandler(error, '/operator/get')
    throw error;

  }

};

export const fetchOperatorCurrency = async () => {
  try {
    const response = await Axios.get("/config/currency");

    return response.data;

  } catch (error) {
    console.error("Error fetching operator currency:", error);

    axiosErrorHandler(error, '/config/currency')
    throw error;

  }

};

export const fetchOperatorTimezone = async () => {
  try {
    const response = await Axios.get("/config/timezone");

    return response.data;

  } catch (error) {
    console.error("Error fetching operator timezone:", error);

    axiosErrorHandler(error, '/config/timezone')
    throw error;

  }

};

export const fetchOperatorCountry = async () => {
  try {
    const response = await Axios.get("/config/country");

    return response.data;

  } catch (error) {
    console.error("Error fetching operator country:", error);

    axiosErrorHandler(error, '/config/country')
    throw error;

  }

};

export const fetchDraftOperator = async (operator_prefix: string) => {
  try {
    const payload = {
      operator_prefix
    }

    const response = await Axios.post("/operator/credential/draft/get", payload);

    return response.data;
  } catch (error) {
    console.error("Error fetching draft operator:", error);
    axiosErrorHandler(error, "/operator/credential/draft/get");

    throw error;
  }
};

export const searchOperator = async ({ page, pageSize, search, currency, timezone, country }: { page: number; pageSize: number; search: string; currency: string; timezone: string; country: string }) => {
  try {
    const payload = {

      operator_name: search,
      ...(currency && currency !== "all" && { currency_code: currency }),
      ...(timezone && timezone !== "all" && { timezone }),
      ...(country && country !== "all" && { country_code: country }),
      page: page,
      limit: pageSize
    }

    const response = await Axios.post("/operator/search", payload);

    return response.data;
  } catch (error) {
    console.error("Error searching operator:", error);
    axiosErrorHandler(error, "/operator/search");

    throw error;
  }
};

export const updateStatusOperator = async (payload: UpdateStatusOperatorPayload) => {
  try {


    const response = await Axios.patch("/operator/update/status", payload);

    return response.data;
  } catch (error) {
    console.error("Error updating status operator:", error);
    axiosErrorHandler(error, "/operator/update/status");

    throw error;
  }
};

export const resetPasswordOperator = async (payload: ResetPasswordOperatorPayload) => {
  try {

    const response = await Axios.post("/operator/resetPassword", payload);

    return response.data;
  } catch (error) {
    console.error("Error reset password operator:", error);
    axiosErrorHandler(error, "/operator/resetPassword");

    throw error;
  }
};

export const deleteOperator = async (payload: DeleteOperatorPayload) => {
  try {

    const response = await Axios.patch("/operator/delete", payload);

    return response.data;
  } catch (error) {
    console.error("Error delete operator:", error);
    axiosErrorHandler(error, "/operator/delete");

    throw error;
  }
};

export const deleteDraftOperator = async (payload: DeleteDraftOperatorPayload) => {
  console.log("eee", payload);

  try {

    const response = await Axios.delete("/operator/credential/draft/delete", {
      data: payload
    });

    return response.data;
  } catch (error) {
    console.error("Error delete draft operator:", error);
    axiosErrorHandler(error, "/operator/credential/draft/delete");

    throw error;
  }
};

export const resetOperator = async (payload: ResetPasswordOperatorPayload) => {
  try {
    const filteredPayload = Object.fromEntries(
      Object.entries(payload).filter(([_, value]) => value !== undefined)
    );

    const response = await Axios.post("/operator/resetPassword", filteredPayload);

    return response.data;
  } catch (error) {
    console.error("Error reset password operator:", error);
    axiosErrorHandler(error, "/operator/resetPassword");

    throw error;
  }
};

export const createOperator = async (payload: CreateOperatorPayload) => {
  try {
    const response = await Axios.post("/operator/create", payload);

    return response.data;

  } catch (error) {
    console.error("Error create operator:", error);

    axiosErrorHandler(error, '/operator/create')
    throw error;

  }

};



export const confirmCreateOperator = async (payload: OperatorCredentialPayload) => {
  try {
    const response = await Axios.post("/operator/create/provider", payload);

    return response.data;

  } catch (error) {
    console.error("Error confirm create operator:", error);

    axiosErrorHandler(error, '/operator/create/provider')
    throw error;

  }

};

export const updateOperatorCredential = async (payload: CreateOperatorPayload) => {
  try {
    const response = await Axios.patch("/operator/credential/draft/update", payload);

    return response.data;

  } catch (error) {
    console.error("Error update operator credential:", error);

    axiosErrorHandler(error, '/operator/credential/draft/update')
    throw error;

  }

};

export const fetchCredentialList = async ({
  prefix,
  page,
  pageSize,
}: {
  prefix: string;
  page: number;
  pageSize: number;
}) => {
  try {
    const response = await Axios.post("/operator/credential/getList", {
      operator_prefix: prefix,
      page,
      limit: pageSize,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching credential:", error);
    axiosErrorHandler(error, "/operator/credential/getList");
    throw error;
  }
};

export const searchCredentialList = async ({
  credential,
  prefix,
  page,
  pageSize,
}: {
  credential: string
  prefix: string;
  page: number;
  pageSize: number;
}) => {
  try {
    const response = await Axios.post("/operator/credential/search", {
      operator_prefix: prefix,
      credential_prefix: credential,
      page,
      limit: pageSize,
    });

    return response.data;
  } catch (error) {
    console.error("Error searching credential:", error);
    axiosErrorHandler(error, "/operator/credential/search");
    throw error;
  }
};

export const updateStatusCrendential = async (payload: UpdateStatusCredentialPayload) => {
  try {


    const response = await Axios.patch("/operator/credential/update/status", payload);

    return response.data;
  } catch (error) {
    console.error("Error updating status credential:", error);
    axiosErrorHandler(error, "/operator/credential/update/status");

    throw error;
  }
};

export const fetchCredentialProviderList = async ({
  credential,
  page,
  pageSize,
}: {
  credential: string;
  page: number;
  pageSize: number;
}) => {
  try {
    const response = await Axios.post("/operator/credential/provider/getList", {
      credential_id: credential,
      page,
      limit: pageSize,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching credential provider:", error);
    axiosErrorHandler(error, "/operator/credential/provider/getList");
    throw error;
  }
};

export const searchCredentialProviderList = async ({
  credential_id,
  provider_name,
  category_code,
  page,
  pageSize,
}: CredentialQueryParamsPayload) => {
  try {
    const payload: Record<string, any> = {
      credential_id,
      provider_name,
      page,
      limit: pageSize,
    }

    if (category_code && category_code !== 'all') {
      payload.category_code = category_code
    }

    const response = await Axios.post("/operator/credential/provider/search", payload)

    return response.data
  } catch (error) {
    console.error("Error search game credential provider:", error)
    axiosErrorHandler(error, "/operator/credential/provider/search")
    throw error
  }
}

export const updateStatusCredentialProviderList = async ({
  provider_credential_id,
  is_enable,
}: { provider_credential_id: string, is_enable: boolean }) => {
  try {

    const response = await Axios.patch("/operator/credential/provider/update/status", {
      provider_credential_id,
      is_enable
    })

    return response.data
  } catch (error) {
    console.error("Error update status credential provider:", error)
    axiosErrorHandler(error, "/operator/credential/provider/update/status")
    throw error
  }
}

export const fetchGameCredentialProviderList = async ({
  credential,
  page,
  pageSize,
}: {
  credential: string;
  page: number;
  pageSize: number;
}) => {
  try {
    const response = await Axios.post("/operator/credential/game/getList", {
      provider_credential_id: credential,
      page,
      limit: pageSize,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching game credential provider:", error);
    axiosErrorHandler(error, "/operator/credential/game/getList");
    throw error;
  }
};

export const searchGameCredentialProviderList = async ({
  credential,
  game_name,
  page,
  pageSize,
}: {
  credential: string;
  game_name: string;
  page: number;
  pageSize: number;
}) => {
  try {
    const response = await Axios.post("/operator/credential/game/search", {
      provider_credential_id: credential,
      game_name,
      page,
      limit: pageSize,
    });

    return response.data;
  } catch (error) {
    console.error("Error search game credential provider:", error);
    axiosErrorHandler(error, "/operator/credential/game/search");
    throw error;
  }
};



export const updateGameStatus = async (payload: UpdateGameStatusProviderPayload) => {
  try {


    const response = await Axios.patch("/operator/credential/game/update/status", payload);

    return response.data;
  } catch (error) {
    console.error("Error updating status operator:", error);
    axiosErrorHandler(error, "/operator/credential/game/update/status");

    throw error;
  }
};

export const fetchAddProviderList = async (credential_id: string) => {
  try {

    const response = await Axios.post("/operator/credential/provider/new/getList", {
      credential_id
    });

    return response.data;
  } catch (error) {
    console.error("Error fetch add provide list operator:", error);
    axiosErrorHandler(error, "/operator/credential/provider/new/getList");

    throw error;
  }
};

export const addProviderList = async (payload: UpdateAddCredentialPayload) => {
  try {

    const response = await Axios.post("/operator/credential/provider/add", payload);

    return response.data;
  } catch (error) {
    console.error("Error add provider list operator:", error);
    axiosErrorHandler(error, "/operator/credential/provider/add");

    throw error;
  }
};


