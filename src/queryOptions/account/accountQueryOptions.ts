import { createAccountOwner, fetchAccountOperator, fetchAccountOwner, searchAccountOperator, searchAccountOwner, updateAccountOwner } from "@/app/sevices/account/account";

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from "react-toastify";

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

  return useMutation({
    mutationFn: updateAccountOwner,
    onError: (error) => {
      console.error("Error change role owner account:", error);
    },

  });
};

export const useResetPasswordAccountOwnerMutationOption = () => {

  return useMutation({
    mutationFn: updateAccountOwner,
    onError: (error) => {
      console.error("Error reset password owner account:", error);
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

export const useSearchAccountOperatorMutationOption = () => {

  return useMutation({
    mutationFn: searchAccountOperator,
    onError: (error) => {
      console.error("Error search account Operator:", error);
    },

  });
};

