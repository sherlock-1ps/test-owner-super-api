/* eslint-disable import/named */
'use client'

import { useState } from 'react'

// MUI
import { Grid, Typography, Divider, IconButton, InputAdornment, Button } from '@mui/material'

// Form & Validation
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// Project Imports
import { useDialog } from '@/hooks/useDialog'
import CustomTextField from '@/@core/components/mui/TextField'
import { useChangePasswordProflie } from '@/queryOptions/profile/profileQueryOptions'
import { toast } from 'react-toastify'

interface ConfirmProps {
  id: string
  onClick: () => void
}

const ChangePasswordDialog = ({ id, onClick }: ConfirmProps) => {
  const { closeDialog } = useDialog()

  const [isCurrentPasswordShown, setIsCurrentPasswordShown] = useState(false)
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)

  const { mutateAsync, isPending } = useChangePasswordProflie()

  const schema = z
    .object({
      currentPassword: z.string().min(1, 'Current password is required'),
      newPassword: z.string().min(6, 'New password must be at least 6 characters'),
      confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters')
    })
    .refine(data => data.newPassword === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword']
    })

  type FormData = z.infer<typeof schema>

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  })

  const onSubmit: SubmitHandler<FormData> = async data => {
    try {
      await mutateAsync({
        current_password: data?.currentPassword,
        new_password: data?.newPassword
      })
      toast.success('Password changed successfully')
      closeDialog(id)
      reset()
    } catch (error) {
      toast.error('Failed to change password')
    }
  }

  return (
    <Grid container className='flex flex-col gap-2' spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h5'>Change Password</Typography>
      </Grid>
      <Divider />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name='currentPassword'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Current Password'
                  type={isCurrentPasswordShown ? 'text' : 'password'}
                  error={!!errors.currentPassword}
                  helperText={errors.currentPassword?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={() => setIsCurrentPasswordShown(!isCurrentPasswordShown)}
                          onMouseDown={e => e.preventDefault()}
                        >
                          <i className={isCurrentPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name='newPassword'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='New Password'
                  type={isPasswordShown ? 'text' : 'password'}
                  error={!!errors.newPassword}
                  helperText={errors.newPassword?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={() => setIsPasswordShown(!isPasswordShown)}
                          onMouseDown={e => e.preventDefault()}
                        >
                          <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name='confirmPassword'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Confirm New Password'
                  type={isConfirmPasswordShown ? 'text' : 'password'}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={() => setIsConfirmPasswordShown(!isConfirmPasswordShown)}
                          onMouseDown={e => e.preventDefault()}
                        >
                          <i className={isConfirmPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid item xs={12} className='flex items-center justify-end gap-2 mt-4'>
          <Button variant='outlined' onClick={() => closeDialog(id)}>
            Cancel
          </Button>
          <Button variant='contained' type='submit' disabled={isPending}>
            Confirm
          </Button>
        </Grid>
      </form>
    </Grid>
  )
}

export default ChangePasswordDialog
