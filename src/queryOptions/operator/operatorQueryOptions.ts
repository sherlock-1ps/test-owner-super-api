import { addProviderList, confirmCreateOperator, createOperator, deleteDraftOperator, deleteOperator, fetchAddProviderList, fetchCredentialList, fetchCredentialProviderList, fetchDraftOperator, fetchGameCredentialProviderList, fetchOperator, fetchOperatorCountry, fetchOperatorCurrency, fetchOperatorProfile, fetchOperatorTimezone, resetPasswordOperator, searchCredentialList, searchCredentialProviderList, searchGameCredentialProviderList, searchOperator, updateGameStatus, updateOperatorCredential, updateStatusCredentialProviderList, updateStatusCrendential, updateStatusOperator } from "@/app/sevices/operator/operator";

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useFetchOperatorQueryOption(page: number, pageSize: number) {
  return useQuery({
    queryKey: ["operators", page, pageSize],
    queryFn: () => fetchOperator({ page, pageSize }),
  });
}

export function useFetchCurrencyOperatorQueryOption() {

  return useQuery({
    queryKey: ['typeOperatorCurrency'],
    queryFn: fetchOperatorCurrency
  });
}
export function useFetchTimezoneOperatorQueryOption() {

  return useQuery({
    queryKey: ['typeOperatorTimezone'],
    queryFn: fetchOperatorTimezone
  });
}

export function useFetchCountryOperatorQueryOption() {

  return useQuery({
    queryKey: ['typeOperatorCountry'],
    queryFn: fetchOperatorCountry
  });
}

export const useCreateOperatorMutationOption = () => {

  return useMutation({
    mutationFn: createOperator,
    onError: (error) => {
      console.error("Error create operator:", error);
    },

  });
};



export const useConfirmCreateOperatorMutationOption = () => {

  return useMutation({
    mutationFn: confirmCreateOperator,
    onError: (error) => {
      console.error("Error confirm create operator:", error);
    },

  });
};

export const useUpdateCredentialOperatorMutationOption = () => {

  return useMutation({
    mutationFn: updateOperatorCredential,
    onError: (error) => {
      console.error("Error update credential:", error);
    },

  });
};


export const useSearchOperatorMutationOption = () => {

  return useMutation({
    mutationFn: searchOperator,
    onError: (error) => {
      console.error("Error search operator:", error);
    },

  });
};

export const useUpdateStatusOperatorMutationOption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStatusOperator,
    onError: (error) => {
      console.error("Error updating status operator:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["operators"] });
    },
  });
};

export const useResetPasswordOperatorMutationOption = () => {

  return useMutation({
    mutationFn: resetPasswordOperator,
    onError: (error) => {
      console.error("Error reset password operator:", error);
    },

  });
};

export const useDeleteDraftOperatorMutationOption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDraftOperator,
    onError: (error) => {
      console.error("Error delete draft operator:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["operators"] });
    },
  });
};

export const useDeleteOperatorMutationOption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOperator,
    onError: (error) => {
      console.error("Error delete operator:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["operators"] });
    },
  });
};

export const useFetchDraftOperatorMutationOption = () => {

  return useMutation({
    mutationFn: fetchDraftOperator,
    onError: (error) => {
      console.error("Error fetching draft operator:", error);
    },

  });
};

export function useFetchCredentialListQueryOption({
  prefix,
  page,
  pageSize,
}: {
  prefix: string;
  page: number;
  pageSize: number;
}) {
  return useQuery({
    queryKey: ["credentialList", prefix, page, pageSize],
    queryFn: () => fetchCredentialList({ prefix, page, pageSize }),
  });
}


export const useSearchCredentialMutationOption = () => {

  return useMutation({
    mutationFn: searchCredentialList,
    onError: (error) => {
      console.error("Error search crendential:", error);
    },

  });
};

export const useUpdateStatusCredentialMutationOption = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateStatusCrendential,
    onSuccess: () => {
      if (onSuccessCallback) onSuccessCallback()
    },
    onError: (error) => {
      console.error('Error updating status credential:', error)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['credentialList'] })
    }
  })
}




export function useFetchCredentialProviderListQueryOption({
  credential,
  page,
  pageSize,
}: {
  credential: string;
  page: number;
  pageSize: number;
}) {
  return useQuery({
    queryKey: ["credentialProviderList", credential, page, pageSize],
    queryFn: () => fetchCredentialProviderList({ credential, page, pageSize }),
  });
}

export const useSearchCredentialProviderListQueryOption = () => {

  return useMutation({
    mutationFn: searchCredentialProviderList,
    onError: (error) => {
      console.error("Error search crendential provider:", error);
    },

  });
};

export const useUpdateStatusCredentialProviderListQueryOption = (
  onSuccessCallback?: () => void
) => {
  // const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateStatusCredentialProviderList,
    onError: (error) => {
      console.error('Error updating credential provider:', error)
    },
    onSettled: () => {
      // queryClient.invalidateQueries({ queryKey: ['credentialProviderList'] })

      if (onSuccessCallback) {
        onSuccessCallback()
      }
    }
  })
}

export function useFetchGameCredentialListQueryOption({
  credential,
  page,
  pageSize,
}: {
  credential: string;
  page: number;
  pageSize: number;
}) {
  return useQuery({
    queryKey: ["gameCredentialList", credential, page, pageSize],
    queryFn: () => fetchGameCredentialProviderList({ credential, page, pageSize }),
  });
}

export const useSearchGameProviderMutationOption = () => {

  return useMutation({
    mutationFn: searchGameCredentialProviderList,
    onError: (error) => {
      console.error("Error search game provider:", error);
    },

  });
};


export const useUpdateStatusGameProviderMutationOption = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateGameStatus,
    onError: (error) => {
      console.error("Error updating status game provider:", error);
    },
    onSuccess: () => {
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["gameCredentialList"] });
    },
  });
};

export const useFetchAddProviderListQueryOption = () => {

  return useMutation({
    mutationFn: fetchAddProviderList,
    onError: (error) => {
      console.error("Error search add provider :", error);
    },

  });
};

export const useAddProviderMutationOption = () => {

  return useMutation({
    mutationFn: addProviderList,
    onError: (error) => {
      console.error("Error add provider:", error);
    },

  });
};

export function useFetchOperatorProfile(operator_id: string) {
  return useQuery({
    queryKey: ["operatorProfile"],
    queryFn: () => fetchOperatorProfile({ operator_id }),
  });
}




