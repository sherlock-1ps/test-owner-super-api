import Axios from "@/libs/axios/axios";
import { CreateGameProviderPayload, CreateProviderPayload, GameProviderUpdatePayload, ProviderUpdatePayload, UpdateGameNameProviderPayload, UpdateGameStatusProviderPayload, UpdateThumbnailGameProviderPayload, UploadProviderLogoPayload } from "@/types/provider/provider";
import { axiosErrorHandler } from "@/utils/axiosErrorHandler";

export const fetchProviders = async ({ page, pageSize }: { page: number; pageSize: number }) => {
  try {
    const response = await Axios.post("/provider/getList", {
      page,
      limit: pageSize,
    });

    return response.data;

  } catch (error) {
    console.error("Error fetching providers:", error);

    axiosErrorHandler(error, '/provider/getList')
    throw error;

  }

};

export const fetchProviderType = async () => {
  try {
    const response = await Axios.get("/config/providerType");

    return response.data;

  } catch (error) {
    console.error("Error fetching provider type:", error);

    axiosErrorHandler(error, '/config/providerType')
    throw error;

  }

};

export const fetchProviderCurrency = async () => {
  try {
    const response = await Axios.get("/config/currency");

    return response.data;

  } catch (error) {
    console.error("Error fetching provider currency:", error);

    axiosErrorHandler(error, '/config/currency')
    throw error;

  }

};

export const searchProviders = async ({ page = 1, pageSize, search, type }: { page: number; pageSize: number; search: string; type: string }) => {
  try {
    const response = await Axios.post("/provider/search", {
      page: page,
      limit: pageSize,
      provider_name: search,
      category_code: type == "all" ? "" : type,
    });

    return response.data;
  } catch (error) {
    console.error("Error searching providers:", error);
    axiosErrorHandler(error, "/provider/search");

    throw error;
  }
};

export const updateProvider = async (payload: ProviderUpdatePayload) => {
  try {
    const filteredPayload = Object.fromEntries(
      Object.entries(payload).filter(([_, value]) => value !== undefined)
    );

    const response = await Axios.patch("/provider/update/status", filteredPayload);

    return response.data;
  } catch (error) {
    console.error("Error updating provider status:", error);
    axiosErrorHandler(error, "/provider/update/status");

    throw error;
  }
};

export const uploadLogoProvider = async (payload: UploadProviderLogoPayload) => {
  try {


    const response = await Axios.patch("/provider/update/logo", payload);

    return response.data;
  } catch (error) {
    console.error("Error upload logo provider:", error);
    axiosErrorHandler(error, "/provider/update/logo");

    throw error;
  }
};


export const fetchGameProvider = async ({ page, pageSize, provider_code }: { page: number; pageSize: number, provider_code: string }) => {
  try {
    const response = await Axios.post("/provider/game/getList", {
      page,
      limit: pageSize,
      provider_code
    });

    return response.data;

  } catch (error) {
    console.error("Error fetching game provider:", error);

    axiosErrorHandler(error, '/provider/game/getList')
    throw error;

  }

};

export const searchGameProviders = async ({
  page = 1,
  pageSize,
  provider_code,
  game_name
}: {
  page: number
  pageSize: number
  provider_code: string
  game_name: string
}) => {
  try {
    const payload: any = {
      page,
      limit: pageSize
    }

    if (provider_code?.trim()) {
      payload.provider_code = provider_code
    }

    if (game_name?.trim()) {
      payload.game_name = game_name
    }

    const response = await Axios.post("/provider/game/search", payload)

    return response.data
  } catch (error) {
    console.error("Error searching game providers:", error)
    axiosErrorHandler(error, "/provider/game/search")
    throw error
  }
}

export const updateGameProvider = async (payload: GameProviderUpdatePayload) => {
  try {
    const filteredPayload = Object.fromEntries(
      Object.entries(payload).filter(([_, value]) => value !== undefined)
    );

    const response = await Axios.post("/provider/editGame", filteredPayload);

    return response.data;
  } catch (error) {
    console.error("Error updating game provider:", error);
    axiosErrorHandler(error, "/provider/editGame");

    throw error;
  }
};

export const updateStatusGame = async (payload: UpdateGameStatusProviderPayload) => {
  try {


    const response = await Axios.patch("/provider/game/update/status", payload);

    return response.data;
  } catch (error) {
    console.error("Error update status game:", error);
    axiosErrorHandler(error, "/provider/game/update/status");

    throw error;
  }
};

export const updateThumbtailGame = async (payload: UpdateThumbnailGameProviderPayload) => {
  try {

    const response = await Axios.patch("/provider/game/update/thumbnail", payload);

    return response.data;
  } catch (error) {
    console.error("Error updating thumbnail game:", error);
    axiosErrorHandler(error, "/provider/game/update/thumbnail");

    throw error;
  }
};

export const updateGameNameProvider = async (payload: UpdateGameNameProviderPayload) => {
  try {

    const response = await Axios.patch("/provider/game/update/name", payload);

    return response.data;
  } catch (error) {
    console.error("Error updating game name:", error);
    axiosErrorHandler(error, "/provider/game/update/name");

    throw error;
  }
};

export const createProvider = async (payload: CreateProviderPayload) => {
  try {
    const filteredPayload = Object.fromEntries(
      Object.entries(payload).filter(([_, value]) => value !== undefined)
    );


    const payloadRequest = {
      ...(filteredPayload?.image && { image: filteredPayload.image }),
      provider_name: filteredPayload?.provider_name,
      provider_code: filteredPayload?.provider_code,
      category_code: filteredPayload?.provider_type,
      currencies_code: filteredPayload?.currency,
      percent_holder: Number(filteredPayload?.percent_holder),
      secret_key: filteredPayload?.external_secret_key,
      encrypt_key: filteredPayload?.encrypt_key,
      ...(filteredPayload?.remark && { remark: filteredPayload.remark }),
      ...(filteredPayload?.auto_scale_config && { config: filteredPayload.auto_scale_config }),
    }

    const response = await Axios.post("/provider/create", payloadRequest);

    return response.data;
  } catch (error) {
    console.error("Error Create Provider", error);
    axiosErrorHandler(error, "/provider/create");

    throw error;
  }
};

export const createGameProvider = async (payload: CreateGameProviderPayload) => {
  try {

    const response = await Axios.post("/provider/game/add", payload);

    return response.data;
  } catch (error) {
    console.error("Error Create Game Provider", error);
    axiosErrorHandler(error, "/provider/game/add");

    throw error;
  }
};


