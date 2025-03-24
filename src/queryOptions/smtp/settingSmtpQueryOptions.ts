
import { fetchSettingSmtp } from '@/app/sevices/setting/smtp';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function fetchSettingSmtpQueryOption(page: number, pageSize: number) {
  return useQuery({
    queryKey: ["settingSmtp", page, pageSize],
    queryFn: () => fetchSettingSmtp({ page, pageSize }),
  });
}
