// MUI Imports
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import CustomTextField from '@/@core/components/mui/TextField'
import { Button, Card, CardContent, Divider, IconButton, InputAdornment, MenuItem } from '@mui/material'
import type { TextFieldProps } from '@mui/material/TextField'
import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const smtpSchema = z.object({
  host: z.string().min(1, 'Host is required'),
  port: z.string().min(1, 'Port is required'), // Change to `number().positive()` if port should be a number
  smtp_username: z.string().min(1, 'SMTP Username is required'),
  password: z.string().min(1, 'Password is required'),
  sender_name: z.string().min(1, 'Sender Name is required'),
  sender_email: z.string().email('Invalid email format'),
  is_enable: z.boolean()
})

type SmtpFormValues = z.infer<typeof smtpSchema>

const SettingSmtpCreateComponent = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const data = searchParams.get('data')

  const smtpData = data ? JSON.parse(decodeURIComponent(data as string)) : null

  const [isPasswordShown, setIsPasswordShown] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<SmtpFormValues>({
    resolver: zodResolver(smtpSchema),
    defaultValues: {
      host: smtpData?.host || '',
      port: smtpData?.port || '',
      smtp_username: smtpData?.smtp_username || '',
      password: smtpData?.password || '',
      sender_name: smtpData?.sender_name || '',
      sender_email: smtpData?.sender_email || ''
    }
  })

  const onSubmit = (data: SmtpFormValues) => {
    console.log('Form Submitted:', data)
    // API call or mutation here
  }

  return (
    <Card>
      <CardContent>
        <Grid container className='flex flex-col gap-6'>
          <Grid item xs={12} sm className='flex gap-2 justify-between'>
            <Typography variant='h5' className=' text-nowrap'>
              {smtpData ? 'Edit SMTP Server' : 'Add New SMTP Server'}
            </Typography>
          </Grid>
          <Divider />
          <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
            <Grid container alignItems='start' className='flex gap-6'>
              <Grid item xs={12} sm>
                <CustomTextField
                  fullWidth
                  label='Host'
                  {...register('host')}
                  error={!!errors.host}
                  helperText={errors.host?.message}
                />
              </Grid>
              <Grid item xs={12} sm>
                <CustomTextField
                  fullWidth
                  label='Port'
                  {...register('port')}
                  error={!!errors.port}
                  helperText={errors.port?.message}
                />
              </Grid>

              <Grid container alignItems='start' className='flex gap-6'>
                <Grid item xs={12} sm>
                  <CustomTextField
                    fullWidth
                    label='SMTP Username'
                    {...register('smtp_username')}
                    error={!!errors.smtp_username}
                    helperText={errors.smtp_username?.message}
                  />
                </Grid>
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
              </Grid>
              <Grid container alignItems='start' className='flex gap-6'>
                <Grid item xs={12} sm>
                  <CustomTextField
                    fullWidth
                    label='Sender Name'
                    {...register('sender_name')}
                    error={!!errors.sender_name}
                    helperText={errors.sender_name?.message}
                  />
                </Grid>
                <Grid item xs={12} sm>
                  <CustomTextField
                    fullWidth
                    label='From Email Address'
                    {...register('sender_email')}
                    error={!!errors.sender_email}
                    helperText={errors.sender_email?.message}
                  />
                </Grid>
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
                  {smtpData ? 'Edit SMTP Server' : 'Add SMTP Server'}
                </Button>
              </div>
            </Grid>
          </form>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default SettingSmtpCreateComponent
