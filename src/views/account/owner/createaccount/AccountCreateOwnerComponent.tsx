'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

// MUI Imports
import CustomTextField from '@/@core/components/mui/TextField'
import {
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  Grid,
  Typography
} from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { useCreateAccountOwnerMutationOption } from '@/queryOptions/account/accountQueryOptions'
import { toast } from 'react-toastify'

// Zod Schema for Validation
const accountSchema = z
  .object({
    username: z.string().min(3, { message: 'Username must be at least 3 characters' }),
    role: z.string().min(1, { message: 'Role selection is required' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(/(?=.*[0-9])(?=.*[!@#$%^&*])/, {
        message: 'Password must contain at least one number and one special character'
      }),
    confirmPassword: z.string().min(1, { message: 'Confirm Password is required' })
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })

const AccountCreateOwnerComponent = () => {
  const router = useRouter()
  const { lang: locale } = useParams()

  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      username: '',
      role: '',
      password: '',
      confirmPassword: ''
    }
  })

  const { mutateAsync } = useCreateAccountOwnerMutationOption()

  const passwordValue = watch('password', '')

  // Password Conditions
  const isMinLength = passwordValue.length >= 8
  const hasNumber = /[0-9]/.test(passwordValue)
  const hasSpecialChar = /[!@#$%^&*]/.test(passwordValue)

  const onSubmit = async (data: any) => {
    console.log('Form Submitted', data)
    try {
      const response = await mutateAsync({
        username: data.username,
        password: data.password,
        role_id: data.role_id
      })

      toast.success('Account created successfully!', { autoClose: 3000 })

      console.log('Account Created:', response)
    } catch (error) {
      toast.error('create account error!', { autoClose: 3000 })
      console.error('Error Creating Account:', error)
    }
  }

  return (
    <Card>
      <CardContent>
        <Grid container className='flex flex-col gap-6'>
          <Grid item xs={12} sm className='flex gap-2 justify-between'>
            <Typography variant='h5' className=' text-nowrap'>
              Create Account
            </Typography>
          </Grid>
          <Divider />
          <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
            <Grid container alignItems='start' className='flex gap-6'>
              <Grid item xs={12} sm>
                <CustomTextField
                  fullWidth
                  label='Username'
                  {...register('username')}
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
              </Grid>
              <Grid item xs={12} sm>
                <CustomTextField
                  select
                  fullWidth
                  {...register('role')}
                  error={!!errors.role}
                  helperText={errors.role?.message}
                  label='Select Role'
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value='admin'>Admin</MenuItem>
                  <MenuItem value='user'>User</MenuItem>
                </CustomTextField>
              </Grid>
              <Grid container alignItems='start' className='flex gap-6'>
                <Grid item xs={12} sm>
                  <CustomTextField
                    fullWidth
                    label='Password'
                    type={isPasswordShown ? 'text' : 'password'}
                    {...register('password')}
                    error={!!errors.password}
                    helperText={errors.password?.message}
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
                </Grid>
                <Grid item xs={12} sm>
                  <CustomTextField
                    fullWidth
                    label='Confirm Password'
                    type={isConfirmPasswordShown ? 'text' : 'password'}
                    {...register('confirmPassword')}
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
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='body2' className='text-warning'>
                  Password must be at least 8 characters and contain a mix of letters, numbers, and special characters
                </Typography>
              </Grid>

              <Grid item xs={12} sm={8}>
                <div className='flex flex-col gap-2'>
                  <Typography className={isMinLength ? 'text-primary' : 'text-secondary'}>
                    {isMinLength ? '✅' : '❌'} At least 8 characters
                  </Typography>
                  <Typography className={hasNumber ? 'text-primary' : 'text-secondary'}>
                    {hasNumber ? '✅' : '❌'} At least one number
                  </Typography>
                  <Typography className={hasSpecialChar ? 'text-primary' : 'text-secondary'}>
                    {hasSpecialChar ? '✅' : '❌'} At least one special character (!, @, #, etc.)
                  </Typography>
                </div>
              </Grid>
            </Grid>
            <Grid item xs={12} sm>
              <div className='flex gap-4 justify-end'>
                <Button
                  variant='outlined'
                  onClick={() => {
                    router.back()
                  }}
                >
                  Cancel
                </Button>
                <Button variant='contained' type='submit'>
                  Create Account
                </Button>
              </div>
            </Grid>
          </form>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default AccountCreateOwnerComponent
