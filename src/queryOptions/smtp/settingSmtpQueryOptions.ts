/* eslint-disable react-hooks/rules-of-hooks */

import { createSettingSmtp, deleteSmtp, editSettingSmtp, fetchSettingSmtp, updateStatusSmtp } from '@/app/sevices/setting/smtp';
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

export const useEditSmtpMutationOption = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: editSettingSmtp,
    onSuccess: () => {
    },
    onError: (error) => {
      console.error('Error edit stmp:', error)
    },
    onSettled: () => {
      // queryClient.invalidateQueries({ queryKey: ['settingSmtp'] })
    }
  })
}

export const useDeleteSmtpMutationOption = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteSmtp,
    onSuccess: () => {
    },
    onError: (error) => {
      console.error('Error delete stmp:', error)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['settingSmtp'] })
    }
  })
}

export const useUpdateStatusSmtpMutationOption = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateStatusSmtp,
    onSuccess: () => {
    },
    onError: (error) => {
      console.error('Error update status stmp:', error)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['settingSmtp'] })
    }
  })
}


