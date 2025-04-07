/* eslint-disable react-hooks/rules-of-hooks */
import { createFaq, deleteFaq, fetchFaq, searchFaq, updateStatusFaq } from "@/app/sevices/faq/faq";

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function fetchFaqQueryOption(page: number, pageSize: number) {
  return useQuery({
    queryKey: ["faq", page, pageSize],
    queryFn: () => fetchFaq({ page, pageSize }),
  });
}

export const useUpdateFaqMutationOption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStatusFaq,
    onError: (error) => {
      console.error("Error update faq:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["faq"] });
    },

  });
};

export const useSearchFaqMutationOption = () => {

  return useMutation({
    mutationFn: searchFaq,
    onError: (error) => {
      console.error("Error search faq:", error);
    },

  });
};

export const useCreateFaqMutationOption = () => {

  return useMutation({
    mutationFn: createFaq,
    onError: (error) => {
      console.error("Error create faq:", error);
    },

  });
};

export const useDeleteFaqMutationOption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFaq,
    onError: (error) => {
      console.error("Error delete faq:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["faq"] });
    },

  });
};
