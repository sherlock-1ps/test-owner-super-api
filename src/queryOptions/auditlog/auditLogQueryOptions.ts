import { fetchDetailOperatorLog, fetchDetailOwnerLog, searchAuditLogOperator, searchAuditLogOwner } from "@/app/sevices/auditLog/auditLog";
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

export const useFetchDetailLogOwnerMutationOption = () => {

  return useMutation({
    mutationFn: fetchDetailOwnerLog,
    onError: (error) => {
      console.error("Error search detail owner log:", error);
    },

  });
};

export const useFetchDetailLogOperatorMutationOption = () => {

  return useMutation({
    mutationFn: fetchDetailOperatorLog,
    onError: (error) => {
      console.error("Error search detail operator log:", error);
    },

  });
};

