/* eslint-disable react-hooks/rules-of-hooks */

import { createSettingSmtp, fetchSettingSmtp } from '@/app/sevices/setting/smtp';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function fetchSettingSmtpQueryOption(page: number, pageSize: number) {
  return useQuery({
    queryKey: ["settingSmtp", page, pageSize],
    queryFn: () => fetchSettingSmtp({ page, pageSize }),
  });
}

export const useCreateSmtpMutationOption = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createSettingSmtp,
    onSuccess: () => {
    },
    onError: (error) => {
      console.error('Error create stmp:', error)
    },
    onSettled: () => {
      // queryClient.invalidateQueries({ queryKey: ['settingSmtp'] })
    }
  })
}


