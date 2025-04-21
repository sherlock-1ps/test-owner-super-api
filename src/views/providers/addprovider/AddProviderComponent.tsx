'use client'

import { useForm, FormProvider, Controller, useFormContext } from 'react-hook-form'
import { useState } from 'react'
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { Button, Card, CardContent, Chip, Divider, Grid, MenuItem, Typography } from '@mui/material'
import CustomTextField from '@/@core/components/mui/TextField'
import ProviderLogo from './ProviderLogo'
import {
  fetchCurrencyProviderQueryOption,
  fetchProviderTypeQueryOption
} from '@/queryOptions/provider/providerQueryOptions'
import { createProvider } from '@/app/sevices/provider/provider'
import { toast } from 'react-toastify'
import { useDictionary } from '@/contexts/DictionaryContext'
import { useHasPermission } from '@/hooks/useHasPermission'

const AddProviderComponent = () => {
  const router = useRouter()
  const params = useParams()
  const { dictionary } = useDictionary()
  const queryClient = useQueryClient()
  const { lang: locale } = params
  const { hasPermission } = useHasPermission()

  const [fileImg, setFileImg] = useState<File | null>(null)

  const [providerTypesQuery, currencyProvidersQuery] = useQueries({
    queries: [fetchProviderTypeQueryOption(), fetchCurrencyProviderQueryOption()]
  })

  const { data: providerTypes, isLoading: loadingProviderTypes } = providerTypesQuery
  const { data: currencyProviders, isLoading: loadingCurrencyProviders } = currencyProvidersQuery

  const methods = useForm({
    defaultValues: {
      image: null,
      provider_name: '',
      provider_code: '',
      provider_type: [],
      currency: [],
      percent_holder: '',
      external_secret_key: '',
      encrypt_key: '',
      remark: '',
      auto_scale_config: ''
    },
    mode: 'onBlur'
  })

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = methods

  const { mutate, isPending } = useMutation({
    mutationFn: createProvider,
    onSuccess() {
      setFileImg(null)
      toast.success(dictionary['provider']?.createSuccess, { autoClose: 2000 })
      router.push(`/${locale}/providers`)
    },

    onError: error => {
      toast.error(dictionary['provider']?.errorCreateSuccess, { autoClose: 2000 })
      console.error('Error creating game provider:', error)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['gameProvider'] })
      reset()
    }
  })

  const onSubmit = (data: any) => {
    mutate({ ...data, image: fileImg })
  }

  return (
    <Card>
      <CardContent>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container className='flex flex-col gap-6'>
              <Grid item xs={12} sm className='flex gap-2 justify-between'>
                <Typography variant='h5'> {dictionary['provider']?.addNewProvider ?? 'Add New Provider'}</Typography>
              </Grid>
              <Divider />

              <Grid container className='flex gap-6'>
                <Grid item xs={12} sm={4}>
                  <ProviderLogo setFileImg={setFileImg} />
                </Grid>

                <Grid item xs={12} sm className='flex flex-col gap-2'>
                  <CustomTextField
                    fullWidth
                    type='text'
                    label={dictionary['provider']?.providerName ?? 'Provider Name'}
                    {...register('provider_name', {
                      required: dictionary['provider']?.providerNameRequired ?? 'Provider Name is required'
                    })}
                    error={!!errors.provider_name}
                    helperText={errors.provider_name?.message}
                  />

                  <Controller
                    name='provider_type'
                    control={control}
                    rules={{ validate: value => value.length > 0 || 'Provider Type is required' }}
                    render={({ field }) => (
                      <CustomTextField
                        select
                        fullWidth
                        label={dictionary['provider']?.providerType ?? 'Provider Type'}
                        {...field}
                        error={!!errors.provider_type}
                        helperText={errors.provider_type?.message}
                      >
                        {loadingProviderTypes ? (
                          <MenuItem disabled>{dictionary?.loading ?? 'Loading'}...</MenuItem>
                        ) : (
                          providerTypes?.code === 'SUCCESS' &&
                          providerTypes.data.provider_type.map((item: string, idx: number) => (
                            <MenuItem key={idx} value={item} className='capitalize'>
                              {item}
                            </MenuItem>
                          ))
                        )}
                      </CustomTextField>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm className='flex flex-col gap-2'>
                  <CustomTextField
                    fullWidth
                    type='text'
                    label={dictionary['provider']?.providerCode ?? 'Provider Code'}
                    {...register('provider_code', {
                      required: dictionary['provider']?.providerCodeRequired ?? 'Provider Code is required'
                    })}
                    error={!!errors.provider_code}
                    helperText={errors.provider_code?.message}
                  />

                  <Controller
                    name='currency'
                    control={control}
                    rules={{ validate: value => value.length > 0 || 'Currency is required' }}
                    render={({ field }) => (
                      <CustomTextField
                        select
                        fullWidth
                        label={dictionary?.currency}
                        {...field}
                        error={!!errors.currency}
                        helperText={errors.currency?.message}
                        SelectProps={{
                          multiple: true,
                          renderValue: selected => {
                            const selectedValues = selected as string[]
                            const maxDisplayCount = 3

                            return (
                              <div className='flex gap-1 flex-wrap'>
                                {selectedValues.slice(0, maxDisplayCount).map(value => (
                                  <Chip key={value} label={value} size='small' />
                                ))}
                                {selectedValues.length > maxDisplayCount && (
                                  <Chip label={`+${selectedValues.length - maxDisplayCount} more`} size='small' />
                                )}
                              </div>
                            )
                          }
                        }}
                      >
                        {loadingCurrencyProviders ? (
                          <MenuItem disabled>{dictionary?.loading ?? 'Loading'}...</MenuItem>
                        ) : (
                          currencyProviders?.code === 'SUCCESS' &&
                          currencyProviders.data.currencies_code.map((item: string, idx: number) => (
                            <MenuItem key={idx} value={item} className='capitalize'>
                              {item}
                            </MenuItem>
                          ))
                        )}
                      </CustomTextField>
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    type='number'
                    label={`${dictionary?.share ?? 'Share'} %`}
                    {...register('percent_holder', {
                      required: dictionary['provider']?.shareRequired ?? 'Share Percentage is required'
                    })}
                    error={!!errors.percent_holder}
                    helperText={errors.percent_holder?.message}
                  />
                </Grid>
              </Grid>

              {/* More Fields */}
              <CustomTextField
                fullWidth
                type='text'
                label='External Secret Key'
                {...register('external_secret_key', {
                  required: dictionary['provider']?.secretkeyRequired ?? 'External Secret Key is required'
                })}
                error={!!errors.external_secret_key}
                helperText={errors.external_secret_key?.message}
              />
              <CustomTextField
                fullWidth
                type='text'
                label='Encrypt Key'
                {...register('encrypt_key', {
                  required: dictionary['provider']?.encryptRequired ?? 'Encrypt Key is required'
                })}
                error={!!errors.encrypt_key}
                helperText={errors.encrypt_key?.message}
              />
              <CustomTextField
                fullWidth
                type='text'
                label={dictionary?.remark ?? 'Remark'}
                {...register('remark')}
                error={!!errors.remark}
                helperText={errors.remark?.message}
              />
              <CustomTextField
                fullWidth
                rows={10}
                multiline
                label='Auto Scale Config'
                {...register('auto_scale_config', {
                  required: dictionary['provider']?.autoScaleRequired ?? 'Auto Scale Config is required'
                })}
                error={!!errors.auto_scale_config}
                helperText={errors.auto_scale_config?.message}
                sx={{ '& .MuiInputBase-root.MuiFilledInput-root': { alignItems: 'baseline' } }}
              />

              {/* Action Buttons */}
              <Grid item xs={12} className='flex gap-2 justify-end'>
                <Button variant='outlined' color='primary' onClick={() => router.back()}>
                  {dictionary?.cancel ?? 'Cancel'}
                </Button>
                <Button variant='contained' color='primary' type='submit' disabled={isPending}>
                  {isPending
                    ? `${dictionary?.loading ?? 'Loading'}...`
                    : (dictionary['provider']?.addNewProvider ?? 'Add New Provider')}
                </Button>

                {hasPermission('create-owner-4') && (
                  <Button variant='contained' color='primary' type='submit' disabled={isPending}>
                    {isPending
                      ? `${dictionary?.loading ?? 'Loading'}...`
                      : (dictionary['provider']?.addNewProvider ?? 'Add New Provider')}
                  </Button>
                )}
              </Grid>
            </Grid>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  )
}

export default AddProviderComponent
