import { fetchActionLogConfig, fetchMenuConfig, fetchRoleConfig } from "@/app/sevices/config/config";
import { useQuery } from "@tanstack/react-query";

export function useFetchConfigRoleQueryOption() {
  return useQuery({
    queryKey: ["roleConfig"],
    queryFn: fetchRoleConfig,
  });
}

export function useFetchConfigMenuQueryOption() {
  return useQuery({
    queryKey: ["menu"],
    queryFn: fetchMenuConfig,
  });
}

export function useFetchConfigActionLogQueryOption() {
  return useQuery({
    queryKey: ["actionLog"],
    queryFn: fetchActionLogConfig,
  });
}
