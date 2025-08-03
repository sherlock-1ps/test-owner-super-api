/* eslint-disable react-hooks/rules-of-hooks */
import { changeEmailAccountOperator, changeRoleAccountOwner, createAccountOwner, fetchAccountOperator, fetchAccountOwner, resetPasswordAccount, resetPasswordAccountOperator, searchAccountOperator, searchAccountOwner, updateStatusAccountOperator, updateStatusAccountOwner } from "@/app/sevices/account/account";
import { fetchOperatorPerfixConfig } from "@/app/sevices/config/config";

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function fetchAccountOwnerQueryOption(page: number, pageSize: number) {
  return useQuery({
    queryKey: ["accountOwner", page, pageSize],
    queryFn: () => fetchAccountOwner({ page, pageSize }),
  });
}

export const useSearchAccountOwnerMutationOption = () => {

  return useMutation({
    mutationFn: searchAccountOwner,
    onError: (error) => {
      console.error("Error search account owner:", error);
    },

  });
};


export const useUpdateAccountOwnerMutationOption = () => {
  const queryClient = useQueryClient();


};

export const useChangeRoleAccountOwnerMutationOption = () => {
  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: changeRoleAccountOwner,
    onError: (error) => {
      console.error("Error change role owner account:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["accountOwner"] });
    },

  });
};

export const useResetPasswordAccountOwnerMutationOption = () => {

  return useMutation({
    mutationFn: resetPasswordAccount,
    onError: (error) => {
      console.error("Error reset password owner account:", error);
    },

  });
};

export const useUpdateStatusAccountOwnerMutationOption = (onSuccessCallback?: () => void) => {

  return useMutation({
    mutationFn: updateStatusAccountOwner,
    onError: (error) => {
      console.error("Error update status owner account:", error);
    },
    onSuccess: () => {
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },

  });
};

export const useCreateAccountOwnerMutationOption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAccountOwner,

    onError: (error) => {
      console.error("Error create owner account:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["accountOwner"] });
    },

  });
};


export const fetchAccountOperatorQueryOption = (page: number, pageSize: number) => {
  return useQuery({
    queryKey: ["accountOperator", page, pageSize],
    queryFn: () => fetchAccountOperator({ page, pageSize }),
  });

}

export const fetchOperatorPrefixQueryOption = () => {
  return useQuery({
    queryKey: ["operatorPrefix"],
    queryFn: fetchOperatorPerfixConfig,
  });

}



export const useSearchAccountOperatorMutationOption = () => {

  return useMutation({
    mutationFn: searchAccountOperator,
    onError: (error) => {
      console.error("Error search account Operator:", error);
    },

  });
};

export const useUpdateStatusAccountOperatorMutationOption = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateStatusAccountOperator,
    onError: (error) => {
      console.error("Error update status account Operator:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["accountOperator"] });
    },

  });
};

export const useResetPasswordAccountOperatorMutationOption = () => {

  return useMutation({
    mutationFn: resetPasswordAccountOperator,
    onError: (error) => {
      console.error("Error reset password account Operator:", error);
    },

  });
};

export const useChangeEmailAccountOperatorMutationOption = () => {

  return useMutation({
    mutationFn: changeEmailAccountOperator,
    onError: (error) => {
      console.error("Error chnage Email account Operator:", error);
    },

  });
};


