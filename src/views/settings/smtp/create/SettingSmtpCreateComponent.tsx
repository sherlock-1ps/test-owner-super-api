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
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useDictionary } from '@/contexts/DictionaryContext'
import { useCreateSmtpMutationOption } from '@/queryOptions/smtp/settingSmtpQueryOptions'
import { toast } from 'react-toastify'

const SettingSmtpCreateComponent = () => {
  const { dictionary } = useDictionary()
  const router = useRouter()
  const searchParams = useSearchParams()
  const data = searchParams.get('data')
  const { lang: locale } = useParams()

  const smtpData = data ? JSON.parse(decodeURIComponent(data as string)) : null

  const [isPasswordShown, setIsPasswordShown] = useState(false)

  const { mutateAsync, isPending: pendingCreateSmtp } = useCreateSmtpMutationOption()

  const smtpSchema = z.object({
    host: z.string().min(1, dictionary['smtp']?.hostRequired),
    port: z.string().min(1, dictionary['smtp']?.portRequired),
    smtp_username: z.string().min(1, dictionary['smtp']?.smtpRequired),
    password: z.string().min(1, dictionary['smtp']?.passwordRequired),
    sender_name: z.string().min(1, dictionary['smtp']?.senderRequired),
    sender_email: z.string().email(dictionary['operator']?.invalidEmail)
  })

  type SmtpFormValues = z.infer<typeof smtpSchema>

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
    handleCreateSmtp(data)
  }

  const handleCreateSmtp = async (data: SmtpFormValues) => {
    try {
      const result = await mutateAsync({
        host: data.host,
        port: data.host,
        smtp_username: data.smtp_username,
        password: data.password,
        sender_name: data.sender_name,
        sender_email: data.sender_email
      })

      if (result?.code == 'SUCCESS') {
        toast.success('Create success!', { autoClose: 3000 })
        router.push(`/${locale}/settings/smtp`)
      }
    } catch (error) {
      toast.error('Create failed!', { autoClose: 3000 })
      console.log('errror', error)
    }
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
                    label={dictionary['smtp']?.smtpUsername}
                    {...register('smtp_username')}
                    error={!!errors.smtp_username}
                    helperText={errors.smtp_username?.message}
                  />
                </Grid>
                <Grid item xs={12} sm>
                  <CustomTextField
                    fullWidth
                    label={dictionary?.password}
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
                    label={dictionary['smtp']?.senderName}
                    {...register('sender_name')}
                    error={!!errors.sender_name}
                    helperText={errors.sender_name?.message}
                  />
                </Grid>
                <Grid item xs={12} sm>
                  <CustomTextField
                    fullWidth
                    label={dictionary['smtp']?.formEmail}
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
                  {dictionary?.cancel}
                </Button>
                <Button variant='contained' type='submit' disabled={pendingCreateSmtp}>
                  {smtpData ? dictionary['smtp']?.editSmtp : dictionary['smtp']?.addNewSmtp}
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
