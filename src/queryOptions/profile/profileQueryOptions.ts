import { changePasswordProfile, fetchProfile } from '@/app/sevices/profile/profile';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useChangePasswordProflie = () => {

  return useMutation({
    mutationFn: changePasswordProfile,
    onError: (error) => {
      console.error("Error change password profile:", error);
    },


  });
};
