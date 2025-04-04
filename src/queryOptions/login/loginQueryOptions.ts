import { setPasswordAccount } from "@/app/sevices/login/login";
import { useMutation } from "@tanstack/react-query";

export const useSetPasswordMutationOption = () => {

  return useMutation({
    mutationFn: setPasswordAccount,
    onError: (error) => {
      console.error("Error change password account:", error);
    },

  });
};
