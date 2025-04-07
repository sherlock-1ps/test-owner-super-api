import { createRole, deleteRoleList, fetchPermission, fetchPermissionExist, fetchRoleList, searchRoleList, updateRole } from "@/app/sevices/rolePermission/rolePermission";
import { RoleExistPayload } from "@/types/role/roleTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

// export const useUpdateStatusMutationOption = () => {

//   return useMutation({
//     mutationFn: ,
//     onError: (error) => {
//       console.error("Error update status role List :", error);
//     },

//   });
// };

export const useDeleteRoleListMutationOption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRoleList,
    onError: (error) => {
      console.error("Error delete role List :", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["roleList"] });
    },

  });
};

export function useFetchPermissionQueryOption() {

  return useQuery({
    queryKey: ['permissionList'],
    queryFn: fetchPermission
  });
}

export function useFetchUpdatePermissionQueryOption(payload: RoleExistPayload) {

  return useQuery({
    queryKey: ['permissionListExist'],
    queryFn: () => fetchPermissionExist(payload)
  });
}

export const useCreateRoleMutationOption = () => {

  return useMutation({
    mutationFn: createRole,
    onError: (error) => {
      console.error("Error create role :", error);
    },

  });
};

export const useUpdateRoleMutationOption = () => {

  return useMutation({
    mutationFn: updateRole,
    onError: (error) => {
      console.error("Error update role :", error);
    },

  });
};
