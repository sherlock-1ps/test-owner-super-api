import { downloadInvoice, fetchInvoice, getInvoice, publicInvoice, reCalInvoice, rejectDraftInvoice, searchInvoice, verifyInvoice, voidInvoice } from "@/app/sevices/invoice/invoiceService";
import { addProviderList, confirmCreateOperator, createOperator, deleteDraftOperator, deleteOperator, fetchAddProviderList, fetchCredentialList, fetchCredentialProviderList, fetchDraftOperator, fetchGameCredentialProviderList, fetchOperator, fetchOperatorCountry, fetchOperatorCurrency, fetchOperatorProfile, fetchOperatorTimezone, resetPasswordOperator, searchCredentialList, searchCredentialProviderList, searchGameCredentialProviderList, searchOperator, updateGameStatus, updateOperatorCredential, updateStatusCredentialProviderList, updateStatusCrendential, updateStatusOperator } from "@/app/sevices/operator/operator";

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useFetchInvoiceQueryOption(page: number, pageSize: number) {
  return useQuery({
    queryKey: ["invoiceList", page, pageSize],
    queryFn: () => fetchInvoice({ page, pageSize }),
  });
}

export const useSearchInvoiceMutationOption = () => {

  return useMutation({
    mutationFn: searchInvoice,
    onError: (error) => {
      console.error("Error search invoice:", error);
    },


  });
};

export const useDownloadInvoiceMutationOption = () => {

  return useMutation({
    mutationFn: downloadInvoice,
    onError: (error) => {
      console.error("Error download invoice:", error);
    },

  });
};

export const useVerifyInvoiceMutationOption = () => {

  return useMutation({
    mutationFn: verifyInvoice,
    onError: (error) => {
      console.error("Error verify invoice:", error);
    },

  });
};



export const useGetInvoiceMutationOption = () => {

  return useMutation({
    mutationFn: getInvoice,
    onError: (error) => {
      console.error("Error get invoice:", error);
    },

  });
};

export const useRecalculateMutationOption = () => {

  return useMutation({
    mutationFn: reCalInvoice,
    onError: (error) => {
      console.error("Error renew calculate:", error);
    },

  });
};

export const usePublicInvoiceMutationOption = () => {
  return useMutation({
    mutationFn: publicInvoice,
    onError: (error) => {
      console.error("Error public invoice:", error);
    }

  });
};

export const useVoidInvoiceMutationOption = () => {
  return useMutation({
    mutationFn: voidInvoice,
    onError: (error) => {
      console.error("Error void invoice:", error);
    }

  });
};




export const useRejectInvoiceMutationOption = () => {
  return useMutation({
    mutationFn: rejectDraftInvoice,
    onError: (error) => {
      console.error("Error reject invoice:", error);
    }

  });
};






