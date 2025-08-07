import Axios from "@/libs/axios/axios";
import { axiosErrorHandler } from "@/utils/axiosErrorHandler";

export const fetchFaq = async ({ page, pageSize }: { page: number; pageSize: number }) => {
  try {
    const response = await Axios.post("/faq/getList", {
      page,
      limit: pageSize,
    });

    return response.data;

  } catch (error) {
    console.error("Error fetching faq:", error);

    axiosErrorHandler(error, '/faq/getList')
    throw error;
  }

};

export const searchFaq = async ({ page, pageSize, title }: { page: number; pageSize: number, title: string }) => {
  try {
    const response = await Axios.post("/faq/search", {
      page,
      limit: pageSize,
      title
    });

    return response.data;

  } catch (error) {
    console.error("Error fetching search faq:", error);

    axiosErrorHandler(error, '/faq/search')
    throw error;
  }

};

export const updateStatusFaq = async ({ faq_id, is_enable }: { faq_id: string, is_enable: boolean }) => {
  try {
    const response = await Axios.patch("/faq/update/status", {
      faq_id,
      is_enable
    });

    return response.data;

  } catch (error) {
    console.error("Error update status faq:", error);

    axiosErrorHandler(error, '/faq/update/status')
    throw error;
  }

};


export const createFaq = async ({ title, body }: { body: string, title: string }) => {
  try {
    const response = await Axios.post("/faq/create", {
      title,
      body
    });

    return response.data;

  } catch (error) {
    console.error("Error create faq:", error);

    axiosErrorHandler(error, '/faq/create')
    throw error;
  }

};

export const updateFaq = async (payload: any) => {
  try {
    const response = await Axios.post("/faq/update", payload);

    return response.data;

  } catch (error) {
    console.error("Error update faq:", error);

    axiosErrorHandler(error, '/faq/update')
    throw error;
  }

};

export const deleteFaq = async ({ faq_id }: { faq_id: string }) => {
  try {
    const response = await Axios.delete('/faq/delete', {
      data: { faq_id }
    });

    return response.data;
  } catch (error) {
    console.error('Error deleting FAQ:', error);

    axiosErrorHandler(error, '/faq/delete');
    throw error;
  }
};





