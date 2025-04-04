import { fetchRoleList, searchRoleList } from "@/app/sevices/rolePermission/rolePermission";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useFetchRoleListQueryOption(page: number, pageSize: number) {

  return useQuery({
    queryKey: ['roleList', page, pageSize],
    queryFn: () => fetchRoleList({ page, pageSize })
  });
}

export const useSearchRoleListMutationOption = () => {

  return useMutation({
    mutationFn: searchRoleList,
    onError: (error) => {
      console.error("Error search role List :", error);
    },

  });
};
