import { searchAuditLogOperator, searchAuditLogOwner } from "@/app/sevices/auditLog/auditLog";
import { useMutation } from "@tanstack/react-query";

export const useSearchAuditLogOwnerMutationOption = () => {

  return useMutation({
    mutationFn: searchAuditLogOwner,
    onError: (error) => {
      console.error("Error search owner log:", error);
    },

  });
};


export const useSearchAuditLogOperatorMutationOption = () => {

  return useMutation({
    mutationFn: searchAuditLogOperator,
    onError: (error) => {
      console.error("Error search operator log:", error);
    },

  });
};

