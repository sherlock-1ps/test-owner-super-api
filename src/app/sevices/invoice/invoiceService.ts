import Axios from "@/libs/axios/axios";
import { axiosErrorHandler } from "@/utils/axiosErrorHandler";

export const fetchInvoice = async ({ page, pageSize }: { page: number; pageSize: number }) => {
  try {
    const response = await Axios.post("/invoice/getList", {
      page,
      limit: pageSize,
    });

    return response.data;

  } catch (error) {
    console.error("Error fetching invoice:", error);

    axiosErrorHandler(error, '/invoice/getList')
    throw error;

  }



};

export const searchInvoice = async (payload: any) => {
  try {
    const response = await Axios.post("/invoice/search", payload);

    return response.data;

  } catch (error) {
    console.error("Error saerching invoice:", error);

    axiosErrorHandler(error, '/invoice/search')
    throw error;

  }

};

export const getInvoice = async (payload: any) => {
  try {
    const response = await Axios.post("/invoice/get", payload);

    return response.data;

  } catch (error) {
    console.error("Error get invoice:", error);

    axiosErrorHandler(error, '/invoice/get')
    throw error;

  }

};

export const downloadInvoice = async ({ invoice_id }: any) => {
  try {
    const response = await Axios.post("/invoice/downloadPdf", { invoice_id });

    return response.data;

  } catch (error) {
    console.error("Error download invoice:", error);

    axiosErrorHandler(error, '/invoice/downloadPdf')
    throw error;

  }


};
