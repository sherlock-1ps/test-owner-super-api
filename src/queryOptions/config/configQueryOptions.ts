import { fetchRoleConfig } from "@/app/sevices/config/config";
import { useQuery } from "@tanstack/react-query";

export function useFetchConfigRoleQueryOption() {
  return useQuery({
    queryKey: ["roleConfig"],
    queryFn: fetchRoleConfig,
  });
}
