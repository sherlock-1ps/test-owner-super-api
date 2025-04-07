// MUI Imports
'use client'

import CustomTextField from '@/@core/components/mui/TextField'
import { AxiosError } from 'axios'
import {
  Button,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Step,
  StepLabel,
  Stepper
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import StepperWrapper from '@/@core/styles/stepper'
import StepperCustomDot from '@components/stepper-dot'
import { toast } from 'react-toastify'
import DirectionalIcon from '@/components/DirectionalIcon'
import SelectProviderListTable from './SelectProviderListTable'
import ConfirmProviderListTable from './ConfirmProviderListTable'
import ConfirmAlert from '@/components/dialogs/alerts/ConfirmAlert'
import { useDialog } from '@/hooks/useDialog'
import {
  useConfirmCreateOperatorMutationOption,
  useCreateOperatorMutationOption,
  useDeleteDraftOperatorMutationOption,
  useFetchCountryOperatorQueryOption,
  useFetchCurrencyOperatorQueryOption,
  useFetchTimezoneOperatorQueryOption,
  useUpdateCredentialOperatorMutationOption
} from '@/queryOptions/operator/operatorQueryOptions'
import { DataModifyProviderType } from '@/types/operator/operatorTypes'
import { useDictionary } from '@/contexts/DictionaryContext'

const steps = [
  {
    title: 'Operator Details',
    subtitle: 'Enter your Operator Details'
  },
  {
    title: 'Credential Setting',
    subtitle: 'Select Provider, Game, Share%'
  },
  {
    title: 'Confirmation',
    subtitle: 'Check your summary and confirm'
  }
]
type ProviderCredentialType = {
  provider_code: string
  credential_percent?: number
  selectShare: number | string
  is_select: boolean
}

type FormDataType = {
  currency: string
  prefix: string
  credential: string
  operatorName: string
  email: string
  password: string
  confirmPassword: string
  description: string
  country: string
  timezone: string
  contract: string
  provider: any
}

const CreateProviderComponent = () => {
  const router = useRouter()
  const { showDialog } = useDialog()
  const searchParams = useSearchParams()
  const operatorDraft = searchParams.get('operatorDraft')
  const { dictionary } = useDictionary()
  const { lang: locale } = useParams()

  const operatorDraftData = operatorDraft ? JSON.parse(decodeURIComponent(operatorDraft as string)) : null

  const [activeStep, setActiveStep] = useState(0)
  const [isShowPassword, setIsShowPassword] = useState({
    isPasswordShown: false,
    isConfirmPasswordShown: false
  })
  const [stateSetPercent, setStateSetPercent] = useState({
    isHolder: true,
    inputValue: ''
  })
  const [dataModify, setDataModify] = useState<DataModifyProviderType>({})

  const { data: currencyList, isPending: pendingCurrency } = useFetchCurrencyOperatorQueryOption()

  const { data: timezoneList, isPending: pendingTimezone } = useFetchTimezoneOperatorQueryOption()

  const { data: countryList, isPending: pendingCountry } = useFetchCountryOperatorQueryOption()

  const { mutateAsync: createOperator, isPending: pendingCreateOperator } = useCreateOperatorMutationOption()
  const { mutateAsync: deleteDraftOperator, isPending: pendingDeleteDraft } = useDeleteDraftOperatorMutationOption()

  const { mutateAsync: updateOperatorCredential } = useUpdateCredentialOperatorMutationOption()

  const { mutateAsync: confirmCreateOperator } = useConfirmCreateOperatorMutationOption()

  const generateRandomCredential = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase()
  }

  const [formValues, setFormValues] = useState<FormDataType>({
    prefix: operatorDraftData?.operator_prefix || '',
    credential: generateRandomCredential(),
    operatorName: operatorDraftData?.operator_prefix || '',
    email: operatorDraftData?.email || '',
    password: operatorDraftData?.password || '',
    confirmPassword: operatorDraftData?.password || '',
    currency: operatorDraftData?.currency_code || '',
    country: operatorDraftData?.country_code || '',
    timezone: operatorDraftData?.timezone || '',
    contract: operatorDraftData?.contract || '',
    description: '',
    provider: {}
  })

  const schema = z
    .object({
      prefix: z.string().min(3, dictionary['operator']?.prefixRequired ?? 'Prefix is required'),
      operatorName: z.string().min(1, dictionary['operator']?.operatorRequired ?? 'Operator Name is required'),
      email: z
        .string()
        .email(dictionary['operator']?.invalidEmail ?? 'Invalid email')
        .min(1, dictionary['operator']?.emailRequired ?? 'Email is required'),
      password: z.string().min(6, dictionary['operator']?.passwordRequired ?? 'Password must be at least 6 characters'),
      confirmPassword: z.string().min(6, dictionary['operator']?.confirmPasswordRequired),
      currency: z.string().min(1, dictionary['operator']?.currencyRequired),
      country: z.string().min(1, dictionary['operator']?.countryRequired),
      timezone: z.string().min(1, dictionary['operator']?.timezoneRequired),
      contract: z.string().optional(),
      credential:
        activeStep >= 1 ? z.string().min(6, dictionary['operator']?.credentialRequired) : z.string().optional(),
      description: activeStep >= 1 ? z.string().optional() : z.string().optional(),
      provider: activeStep >= 1 ? z.any() : z.any()
    })
    .refine(data => data.password === data.confirmPassword, {
      message: dictionary['operator']?.matchPassword,
      path: ['confirmPassword']
    })
  const {
    register,
    handleSubmit,
    control,
    trigger,
    setValue, // ✅ Allows setting values dynamically
    getValues,
    setError,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: formValues
  })

  const handleClickShowPassword = () => setIsShowPassword(show => ({ ...show, isPasswordShown: !show.isPasswordShown }))

  console.log('operatorDraftData', operatorDraftData)

  console.log('dataModify', dataModify)

  console.log('formValues', formValues)

  const handleClickShowConfirmPassword = () =>
    setIsShowPassword(show => ({ ...show, isConfirmPasswordShown: !show.isConfirmPasswordShown }))

  const handleUpdateProvider = (category: string, index?: number, share?: number, list?: ProviderCredentialType[]) => {
    setFormValues(prev => {
      const currentProvider = prev.provider || {}

      let updatedCategory: ProviderCredentialType[]

      if (list) {
        updatedCategory = list
      } else {
        const categoryList = currentProvider[category] || []
        updatedCategory = categoryList.map((item: any, idx: number | undefined) => {
          if (idx === index) {
            return {
              ...item,
              ...(share !== undefined && { selectShare: share })
            }
          }

          return item
        })
      }

      return {
        ...prev,
        provider: {
          ...currentProvider,
          [category]: updatedCategory
        }
      }
    })
  }

  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStateSetPercent({
      ...stateSetPercent,
      isHolder: event.target.value === 'true'
    })
  }
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value

    const maxLength = input.startsWith('-') ? 3 : 2

    if (input.length <= maxLength) {
      setStateSetPercent(prev => ({
        ...prev,
        inputValue: input
      }))
    }
  }

  const handleBack = () => {
    // setFormValues(getValues())
    // Object.keys(formValues).forEach(field => {
    //   setValue(field as keyof typeof formValues, formValues[field as keyof typeof formValues])
    // })
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleDeleteDraft = async (prefix: string) => {
    try {
      const result = await deleteDraftOperator({ operator_prefix: prefix })

      if (result?.code == 'SUCCESS') {
        toast.success('delete draft success!', { autoClose: 3000 })
        router.back()
      }
    } catch (error) {
      toast.error('delete draft failed!', { autoClose: 3000 })
      console.log('error', error)
    }
  }

  const handleFormSubmit = async (data: FormDataType) => {
    if (activeStep == 0) {
      const isValid = await trigger()

      if (!isValid) return
      setFormValues(getValues())
      if (operatorDraftData) {
        await handleUpdateOperatorCredential(data)
      } else {
        await handleCreateOperatorCrendential(data)
      }
    } else if (activeStep == 1) {
      setValue('provider', formValues.provider)
      const latestValues = getValues()
      setFormValues(latestValues)
      setActiveStep(prevActiveStep => prevActiveStep + 1)
    } else if (activeStep === steps.length - 1) {
      await handleConfirmCreateOperatorCredential(data)
    }
  }

  const handleCreateOperatorCrendential = async (data: FormDataType) => {
    try {
      const response = await createOperator({
        operator_prefix: data.prefix,
        email: data.email,
        password: data.password,
        operator_name: data.operatorName,
        currency_code: data.currency,
        country_code: data.country,
        timezone: data.timezone,
        contract: data.contract
      })

      if (response?.code == 'SUCCESS') {
        setActiveStep(prevActiveStep => prevActiveStep + 1)

        const updatedProvider = Object.entries(response?.data?.provider || {}).reduce(
          (acc, [key, value]) => {
            acc[key] = (value as any[]).map(item => ({
              ...item,
              selectShare: '',
              is_select: true
            }))

            return acc
          },
          {} as Record<string, any[]>
        )

        setFormValues(prev => ({
          ...prev,
          provider: updatedProvider
        }))
      }
    } catch (error) {
      console.log('error', error)

      const errorCase = error as AxiosError<{ code?: string; message?: string }>
      if (errorCase.response?.data?.code == 'DUPPLICATE_CREDENTIAL_FAILED') {
        setError('prefix', {
          type: 'manual',
          message: 'This prefix already exists!'
        })
        toast.error('duplicate credential!', { autoClose: 3000 })
      }
    }
  }

  const handleUpdateOperatorCredential = async (data: FormDataType) => {
    try {
      const response = await updateOperatorCredential({
        operator_prefix: data.prefix,
        email: data.email,
        password: data.password,
        operator_name: data.operatorName,
        currency_code: data.currency,
        country_code: data.country,
        timezone: data.timezone,
        contract: data.contract
      })

      if (response?.code == 'SUCCESS') {
        setActiveStep(prevActiveStep => prevActiveStep + 1)

        const updatedProvider = Object.entries(response?.data?.provider || {}).reduce(
          (acc, [key, value]) => {
            acc[key] = (value as any[]).map(item => ({
              ...item,
              selectShare: '',
              is_select: true
            }))

            return acc
          },
          {} as Record<string, any[]>
        )

        setFormValues(prev => ({
          ...prev,
          provider: updatedProvider
        }))
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleConfirmCreateOperatorCredential = async (data: FormDataType) => {
    try {
      const resultProvider = Object.values(data?.provider || {})
        .flat()
        .filter((p): p is ProviderCredentialType => {
          return (p as ProviderCredentialType).is_select && Number((p as ProviderCredentialType).selectShare) > 0
        })
        .map(p => ({
          provider_code: p.provider_code,
          credential_percent: Number(p.selectShare) || 0
        }))

      const payload = {
        email: data.email,
        operator_prefix: data.prefix,
        credential_prefix: data.credential,
        currency_code: data.currency,
        ...(data.description && { description: data.description }),
        credential_provider: resultProvider
      }

      const response = await confirmCreateOperator(payload)

      if (response?.code == 'SUCCESS') {
        toast.success('Create Success', { autoClose: 3000 })
        router.push(`/${locale}/operators`)
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const renderStepContent = (activeStep: number) => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <Grid item xs={12} sm={2}>
              <Controller
                name='prefix'
                control={control}
                render={({ field: { onChange, value, ...restField } }) => (
                  <CustomTextField
                    fullWidth
                    label='Prefix'
                    placeholder=''
                    value={value || ''}
                    onChange={e => {
                      const upperValue = e.target.value.toUpperCase().slice(0, 7)
                      onChange(upperValue)
                    }}
                    inputProps={{ maxLength: 7 }}
                    error={!!errors.prefix}
                    helperText={errors.prefix?.message}
                    {...restField}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name='operatorName'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    fullWidth
                    label='Operator Name'
                    placeholder=''
                    {...register('operatorName')}
                    {...field}
                    error={!!errors.operatorName}
                    helperText={errors.operatorName?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='email'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    fullWidth
                    type='email'
                    label='Email'
                    placeholder=''
                    {...register('email')}
                    {...field}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='password'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    fullWidth
                    label='Password'
                    placeholder='············'
                    id='stepper-alternative-password'
                    type={isShowPassword.isPasswordShown ? 'text' : 'password'}
                    {...register('password')}
                    {...field} // ✅ Ensures value and onChange are correctly handled
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={handleClickShowPassword}
                            onMouseDown={e => e.preventDefault()}
                            aria-label='toggle password visibility'
                          >
                            <i className={isShowPassword.isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='confirmPassword'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    fullWidth
                    label='Confirm Password'
                    placeholder='············'
                    id='stepper-alternative-confirm-password'
                    type={isShowPassword.isConfirmPasswordShown ? 'text' : 'password'}
                    {...register('confirmPassword')}
                    {...field} // ✅ Ensures value and onChange are correctly handled
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={e => e.preventDefault()}
                            aria-label='toggle confirm password visibility'
                          >
                            <i className={isShowPassword.isConfirmPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Controller
                name='currency'
                control={control}
                render={({ field }) => (
                  // <CustomTextField
                  //   select
                  //   fullWidth
                  //   label='Currency'
                  //   {...register('currency')}
                  //   {...field}
                  //   error={!!errors.currency}
                  //   helperText={errors.currency?.message}
                  // >
                  //   <MenuItem value='THB'>THB</MenuItem>
                  //   <MenuItem value='USD'>USD</MenuItem>
                  // </CustomTextField>

                  <CustomTextField
                    select
                    fullWidth
                    defaultValue={''}
                    label='Currency'
                    {...register('currency')}
                    {...field}
                    error={!!errors.currency}
                    helperText={errors.currency?.message}
                    disabled={pendingCurrency}
                  >
                    {currencyList?.code === 'SUCCESS'
                      ? [
                          ...currencyList?.data?.currencies_code?.map((item: any, idx: number) => (
                            <MenuItem value={item} key={idx} className='capitalize'>
                              {item}
                            </MenuItem>
                          ))
                        ]
                      : []}
                  </CustomTextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Controller
                name='country'
                control={control}
                render={({ field }) => (
                  // <CustomTextField
                  //   select
                  //   fullWidth
                  //   label='Country'
                  //   {...register('country')}
                  //   {...field}
                  //   error={!!errors.country}
                  //   helperText={errors.country?.message}
                  // >
                  //   <MenuItem value='th'>Thailand</MenuItem>
                  // </CustomTextField>

                  <CustomTextField
                    select
                    fullWidth
                    defaultValue={'all'}
                    label='Select Country'
                    {...register('country')}
                    {...field}
                    error={!!errors.country}
                    helperText={errors.country?.message}
                    disabled={pendingCountry}
                  >
                    {countryList?.code === 'SUCCESS'
                      ? [
                          ...countryList?.data?.country?.map((item: any, idx: number) => (
                            <MenuItem value={item} key={idx} className='capitalize'>
                              {item}
                            </MenuItem>
                          ))
                        ]
                      : []}
                  </CustomTextField>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='timezone'
                control={control}
                render={({ field }) => (
                  // <CustomTextField
                  //   select
                  //   fullWidth
                  //   label='Timezone'
                  //   {...register('timezone')}
                  //   {...field}
                  //   error={!!errors.timezone}
                  //   helperText={errors.timezone?.message}
                  // >
                  //   <MenuItem value='UTC+7'>UTC+7</MenuItem>
                  // </CustomTextField>

                  <CustomTextField
                    select
                    fullWidth
                    defaultValue={''}
                    label='Timezone'
                    {...register('timezone')}
                    {...field}
                    error={!!errors.timezone}
                    helperText={errors.timezone?.message}
                    disabled={pendingTimezone}
                  >
                    {timezoneList?.code === 'SUCCESS'
                      ? [
                          ...timezoneList?.data?.timezone?.map((item: any, idx: number) => (
                            <MenuItem value={item} key={idx} className='capitalize'>
                              {item}
                            </MenuItem>
                          ))
                        ]
                      : []}
                  </CustomTextField>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name='contract'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    fullWidth
                    rows={8}
                    multiline
                    label='Contract or Address Detail (Optional)'
                    placeholder=''
                    sx={{ '& .MuiInputBase-root.MuiFilledInput-root': { alignItems: 'baseline' } }}
                    {...register('contract')}
                    {...field}
                    error={!!errors.contract}
                    helperText={errors.contract?.message}
                  />
                )}
              />
            </Grid>
          </>
        )
      case 1:
        return (
          <>
            <Grid item xs={12} sm={4}>
              <CustomTextField
                fullWidth
                label='Credential Prefix'
                placeholder=''
                {...register('credential', {
                  onChange: e => {
                    e.target.value = e.target.value.toUpperCase() // 🔥 Converts to uppercase
                  }
                })}
                error={!!errors.credential}
                helperText={errors.credential?.message}
                inputProps={{ maxLength: 6 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Typography className=' uppercase'>{formValues.prefix}-</Typography>{' '}
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={() => {
                          const randomCredential = generateRandomCredential()
                          setValue('credential', randomCredential)
                          setFormValues(prev => ({ ...prev, credential: randomCredential }))
                        }}
                        onMouseDown={e => e.preventDefault()}
                      >
                        <i className={'tabler-refresh'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            <Grid item xs={12} sm={8}>
              <CustomTextField fullWidth label='Description (Optional)' placeholder='' {...register('description')} />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={4} alignItems='center'>
                {/* Instruction Text */}
                <Grid item xs={12} md={4}>
                  <Typography color='text.primary'>Choose at least 1 provider to create credentials</Typography>
                </Grid>

                {/* Radio Buttons */}
                <Grid item xs={12} sm={6} md alignSelf={'end'} className='flex justify-end '>
                  <RadioGroup row value={stateSetPercent.isHolder.toString()} onChange={handleChangeRadio}>
                    <FormControlLabel value='true' control={<Radio />} label='Holder %' />
                    <FormControlLabel value='false' control={<Radio />} label='Credential %' />
                  </RadioGroup>
                </Grid>

                {/* Input */}
                <Grid item xs={6} sm={3} md={2}>
                  <CustomTextField
                    type='number'
                    fullWidth
                    label={`Set all ${stateSetPercent.isHolder ? 'Holder %' : 'Credential %'}`}
                    value={stateSetPercent.inputValue}
                    onChange={handleInputChange}
                    inputProps={{ maxLength: 2 }}
                  />
                </Grid>

                {/* Apply Button */}
                <Grid item xs={6} sm={1} md={1} alignSelf={'end'}>
                  <Button fullWidth variant='contained' disabled={!stateSetPercent.inputValue}>
                    Apply
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            {/* {dataModify &&
              Object.entries(dataModify).map(([categoryKey, providers]) => (
                <Grid item xs={12} sm={12} key={categoryKey}>
                  <Typography variant='h6' className='capitalize'>
                    {categoryKey} Type
                  </Typography>

                  <SelectProviderListTable
                    dataTable={providers}
                    category={categoryKey}
                    updateMain={handleUpdateDataModify}
                  />
                </Grid>
              ))} */}

            {formValues?.provider &&
              Object.entries(formValues.provider).map(([categoryKey, providers]) => (
                <Grid item xs={12} sm={12} key={categoryKey}>
                  <Typography variant='h6' className='capitalize'>
                    {categoryKey} Type
                  </Typography>

                  <SelectProviderListTable
                    dataTable={providers}
                    category={categoryKey}
                    updateMain={handleUpdateProvider}
                  />
                </Grid>
              ))}
          </>
        )
      case 2:
        return (
          <>
            <Grid item xs={12}>
              <Typography variant='h5'>Operator Detail</Typography>
            </Grid>
            <Grid item xs={12} className='flex gap-16'>
              <div className='flex flex-col'>
                <Typography>Operator Prefix</Typography>
                <Typography color={'text.primary'}>{formValues?.prefix}</Typography>
              </div>
              <div className='flex flex-col'>
                <Typography>Operator Name</Typography>
                <Typography color={'text.primary'}>{formValues?.operatorName}</Typography>
              </div>
            </Grid>
            <Grid item xs={12} className='flex gap-16'>
              <div className='flex flex-col'>
                <Typography>Email Address</Typography>
                <Typography color={'text.primary'}>{formValues?.email}</Typography>
              </div>
              <div className='flex flex-col'>
                <Typography>Password</Typography>
                <Typography color={'text.primary'}>{formValues?.password}</Typography>
              </div>
            </Grid>
            <Grid item xs={12} className='flex gap-16'>
              <div className='flex flex-col'>
                <Typography>Currency</Typography>
                <Typography color={'text.primary'}>{formValues?.currency}</Typography>
              </div>
              <div className='flex flex-col'>
                <Typography>Country</Typography>
                <Typography color={'text.primary'}>{formValues?.country}</Typography>
              </div>
              <div className='flex flex-col'>
                <Typography>Timezone</Typography>
                <Typography color={'text.primary'}>{formValues?.timezone}</Typography>
              </div>
            </Grid>
            {formValues?.contract && (
              <Grid item xs={12}>
                <div className='flex flex-col'>
                  <Typography>Contract</Typography>
                  <Typography color={'text.primary'}>{formValues.contract}</Typography>
                </div>
              </Grid>
            )}

            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h5'>Operator Detail</Typography>
            </Grid>

            <Grid item xs={12} className='flex gap-16'>
              <div className='flex flex-col'>
                <Typography>Credential Prefix</Typography>
                <Typography color={'text.primary'}>OBT - G1PX78</Typography>
              </div>
              {formValues?.description && (
                <div className='flex flex-col'>
                  <Typography>Description</Typography>
                  <Typography color={'text.primary'}>{formValues.description}</Typography>
                </div>
              )}
            </Grid>

            {formValues?.provider &&
              Object.entries(formValues?.provider).map(([categoryKey, providers]) => {
                const typedProviders = providers as ProviderCredentialType[]

                const filteredProviders = typedProviders.filter(
                  provider => provider?.is_select === true && provider?.selectShare
                )

                if (filteredProviders.length === 0) return null

                return (
                  <Grid item xs={12} sm={12} key={categoryKey}>
                    <ConfirmProviderListTable dataTable={filteredProviders} category={categoryKey} />
                  </Grid>
                )
              })}
          </>
        )
      default:
        return 'Unknown step'
    }
  }

  console.log('dataModify', dataModify)

  const renderTitle = (activeStep: number) => {
    switch (activeStep) {
      case 0:
        return 'Create Operator'

      case 1:
        return 'Credential Setting'
      case 2:
        return 'Your summary'

      default:
        return 'Create Operator'
    }
  }

  return (
    <>
      <StepperWrapper>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => {
            return (
              <Step key={label.title}>
                <StepLabel StepIconComponent={StepperCustomDot}>
                  <div className='step-label'>
                    <div>
                      <Typography className='step-title'>{label.title}</Typography>
                      <Typography className='step-subtitle'>{label.subtitle}</Typography>
                    </div>
                  </div>
                </StepLabel>
              </Step>
            )
          })}
        </Stepper>
      </StepperWrapper>
      <Card className='mt-4'>
        <CardContent>
          {activeStep === steps.length ? (
            <>
              <Typography className='mlb-2 mli-1'>All steps are completed!</Typography>
              <div className='flex justify-end mt-4  gap-4'>
                <Button
                  variant='tonal'
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  color='secondary'
                  startIcon={<DirectionalIcon ltrIconClass='tabler-arrow-left' rtlIconClass='tabler-' />}
                >
                  Previous
                </Button>
                <Button variant='contained' color='success' endIcon={<i className='tabler-check' />}>
                  Create Operator
                </Button>
              </div>
            </>
          ) : (
            <>
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <Typography variant='h4' color='text.primary'>
                      {renderTitle(activeStep)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  {renderStepContent(activeStep)}
                  <Grid item xs={12} className='flex justify-between'>
                    <Button
                      variant='outlined'
                      onClick={() => {
                        showDialog({
                          id: 'alertDialogConfirmDiscardCreateOperator',
                          component: (
                            <ConfirmAlert
                              id='alertDialogConfirmDiscardCreateOperator'
                              title={'Are you sure to Discard'}
                              content1={`Discard this Create Operator?`}
                              onClick={() => {
                                handleDeleteDraft(operatorDraftData?.operator_prefix)
                              }}
                            />
                          ),
                          size: 'sm'
                        })
                      }}
                      disabled={pendingDeleteDraft}
                    >
                      Discard
                    </Button>

                    <div className='flex gap-4'>
                      <Button
                        variant='tonal'
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        color='secondary'
                        startIcon={
                          <DirectionalIcon ltrIconClass='tabler-arrow-left' rtlIconClass='tabler-arrow-right' />
                        }
                      >
                        Previous
                      </Button>
                      <Button
                        type='submit'
                        variant='contained'
                        // onClick={handleNext}
                        color={activeStep === steps.length - 1 ? 'success' : 'primary'}
                        disabled={pendingCreateOperator}
                        endIcon={
                          activeStep === steps.length - 1 ? (
                            <i className='tabler-check' />
                          ) : (
                            <DirectionalIcon ltrIconClass='tabler-arrow-right' rtlIconClass='tabler-arrow-left' />
                          )
                        }
                      >
                        {pendingCreateOperator
                          ? 'Loading...'
                          : activeStep === steps.length - 1
                            ? 'Create Operator'
                            : 'Next'}
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </form>
            </>
          )}
        </CardContent>
      </Card>
    </>
  )
}

export default CreateProviderComponent
