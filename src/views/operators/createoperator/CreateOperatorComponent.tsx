// MUI Imports
'use client'

import CustomTextField from '@/@core/components/mui/TextField'
import {
  Button,
  Card,
  CardContent,
  Chip,
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
import type { SelectChangeEvent } from '@mui/material/Select'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import StepperWrapper from '@/@core/styles/stepper'
import StepperCustomDot from '@components/stepper-dot'
import { toast } from 'react-toastify'
import DirectionalIcon from '@/components/DirectionalIcon'
import SelectProviderListTable from './SelectProviderListTable'
import ConfirmProviderListTable from './ConfirmProviderListTable'
import ConfirmAlert from '@/components/dialogs/alerts/ConfirmAlert'
import { useDialog } from '@/hooks/useDialog'
import { useCreateOperatorMutationOption } from '@/queryOptions/operator/operatorQueryOptions'

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

  const operatorDraftData = operatorDraft ? JSON.parse(decodeURIComponent(operatorDraft as string)) : null

  console.log('operatorDraftData', operatorDraftData)

  const [activeStep, setActiveStep] = useState(operatorDraftData ? 1 : 0)
  const [isShowPassword, setIsShowPassword] = useState({
    isPasswordShown: false,
    isConfirmPasswordShown: false
  })
  const [stateSetPercent, setStateSetPercent] = useState({
    isHolder: true,
    inputValue: ''
  })
  const [dataTable, setDataTable] = useState([
    {
      provider_id: '01d7360a-e8d4-43e5-8780-fb9205b6968c',
      provider_code: 'pg',
      provider_name: 'Pocket Game',
      categories: ['slot', 'casino'],
      percent_holder: 95,
      is_enable: true,
      image: 'https://example.com/image.png',
      currencies: ['THB', 'USD'],
      isAll: false
    },
    {
      provider_id: '01d7360a-e8d4-43e5-8780-fb9205b6962c',
      provider_code: 'spn',
      provider_name: 'Spinix Game',
      categories: ['slot', 'casino'],
      percent_holder: 91,
      is_enable: true,
      image: 'https://example.com/image.png',
      currencies: ['THB', 'USD'],
      isAll: true
    }
  ])

  const { mutateAsync: createOperator, isPending: pendingCreateOperator } = useCreateOperatorMutationOption()

  const generateRandomCredential = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase()
  }
  const [formValues, setFormValues] = useState<FormDataType>({
    prefix: operatorDraftData?.operator_prefix || 'TEO',
    credential: generateRandomCredential(),
    operatorName: 'erererer',
    email: 'figma.devonecent@gmail.com',
    password: '123456',
    confirmPassword: '123456',
    currency: 'THB',
    country: 'th',
    timezone: 'UTC+7',
    contract: '',
    description: '',
    provider: []
  })

  const schema = z
    .object({
      prefix: z.string().min(3, 'Prefix is required'),
      operatorName: z.string().min(1, 'Operator Name is required'),
      email: z.string().email('Invalid email').min(1, 'Email is required'),
      password: z.string().min(6, 'Password must be at least 6 characters'),
      confirmPassword: z.string().min(6, 'Confirm Password is required'),
      currency: z.string().min(1, 'Currency is required'),
      country: z.string().min(1, 'Country is required'),
      timezone: z.string().min(1, 'Timezone is required'),
      contract: z.string().optional(),
      credential:
        activeStep >= 1 ? z.string().min(6, 'Credential is required, at least 6 characters') : z.string().optional()
    })
    .refine(data => data.password === data.confirmPassword, {
      message: 'Passwords must match',
      path: ['confirmPassword']
    })
  const {
    register,
    handleSubmit,
    control,
    trigger,
    setValue, // ✅ Allows setting values dynamically
    getValues,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: formValues
  })

  const handleClickShowPassword = () => setIsShowPassword(show => ({ ...show, isPasswordShown: !show.isPasswordShown }))

  const handleClickShowConfirmPassword = () =>
    setIsShowPassword(show => ({ ...show, isConfirmPasswordShown: !show.isConfirmPasswordShown }))

  // const handleNext = async () => {
  //   const isValid = await trigger()

  //   if (!isValid) return

  //   setFormValues(getValues())

  //   setActiveStep(prevActiveStep => prevActiveStep + 1)
  //   if (activeStep === steps.length - 1) {
  //     toast.success('Form Submitted', { autoClose: 3000 })
  //   }
  // }

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
    setFormValues(getValues())
    Object.keys(formValues).forEach(field => {
      setValue(field as keyof typeof formValues, formValues[field as keyof typeof formValues])
    })
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleUpdateProvider = (index: number, key: any) => {
    console.log(key)
  }

  console.log('formValues', formValues)

  const handleChangeSelectedProvider = (
    category: string = 'slot',
    id: string = 'aa57c48f-1ef1-407e-baa4-238b7be103d8'
  ) => {
    setFormValues(prev => {
      const updatedCategory =
        prev.provider?.[category]?.map((item: any) =>
          item.id === id ? { ...item, isSelected: !item.isSelected } : item
        ) || []

      return {
        ...prev,
        provider: {
          ...prev.provider,
          [category]: updatedCategory
        }
      }
    })
  }

  const handleFormSubmit = async (data: FormDataType) => {
    const isValid = await trigger()

    if (!isValid) return

    setFormValues(getValues())
    if (activeStep == 0) {
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
              isSelected: true
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

      console.log('response', response)
    }

    if (activeStep === steps.length - 1) {
      toast.success('Form Submitted', { autoClose: 3000 })
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
                  <CustomTextField
                    select
                    fullWidth
                    label='Currency'
                    {...register('currency')}
                    {...field}
                    error={!!errors.currency}
                    helperText={errors.currency?.message}
                  >
                    <MenuItem value='THB'>THB</MenuItem>
                    <MenuItem value='USD'>USD</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Controller
                name='country'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    select
                    fullWidth
                    label='Country'
                    {...register('country')}
                    {...field}
                    error={!!errors.country}
                    helperText={errors.country?.message}
                  >
                    <MenuItem value='th'>Thailand</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='timezone'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    select
                    fullWidth
                    label='Timezone'
                    {...register('timezone')}
                    {...field}
                    error={!!errors.timezone}
                    helperText={errors.timezone?.message}
                  >
                    <MenuItem value='UTC+7'>UTC+7</MenuItem>
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
                    {...field} // ✅ Ensures value and onChange are correctly handled
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
                  <Button
                    variant='contained'
                    onClick={() => {
                      handleChangeSelectedProvider()
                    }}
                  >
                    TEST
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            {formValues?.provider &&
              Object.entries(formValues.provider).map(([categoryKey, providers]) => (
                <Grid item xs={12} sm={12} key={categoryKey}>
                  <Typography variant='h6' className='capitalize'>
                    {categoryKey} Type
                  </Typography>

                  <SelectProviderListTable
                    handleUpdateProvider={handleUpdateProvider}
                    handleChangeSelectedProvider={handleChangeSelectedProvider}
                    dataTable={providers}
                    category={categoryKey}
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
                <Typography color={'text.primary'}>OPB</Typography>
              </div>
              <div className='flex flex-col'>
                <Typography>Operator Name</Typography>
                <Typography color={'text.primary'}>ONEPLAYBET</Typography>
              </div>
            </Grid>
            <Grid item xs={12} className='flex gap-16'>
              <div className='flex flex-col'>
                <Typography>Email Address</Typography>
                <Typography color={'text.primary'}>Oneplaybet@opb.com</Typography>
              </div>
              <div className='flex flex-col'>
                <Typography>Password</Typography>
                <Typography color={'text.primary'}>********</Typography>
              </div>
            </Grid>
            <Grid item xs={12} className='flex gap-16'>
              <div className='flex flex-col'>
                <Typography>Currency</Typography>
                <Typography color={'text.primary'}>Thai Baht</Typography>
              </div>
              <div className='flex flex-col'>
                <Typography>Country</Typography>
                <Typography color={'text.primary'}>Thailand</Typography>
              </div>
              <div className='flex flex-col'>
                <Typography>Timezone</Typography>
                <Typography color={'text.primary'}>(GMT+7) Bangkok, Ho Chi Minh</Typography>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className='flex flex-col'>
                <Typography>Contract</Typography>
                <Typography color={'text.primary'}>
                  Office Name: Thai Tech Solutions Co., Ltd. Address: 123/45 Sukhumvit Road, Khlong Tan, Khlong Toei,
                  Bangkok 10110, Thailand. Contract: Service Agreement for IT Support (02-111-9999)
                </Typography>
              </div>
            </Grid>
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
              <div className='flex flex-col'>
                <Typography>Description</Typography>
                <Typography color={'text.primary'}>1st credential of OnePlayBet Operator</Typography>
              </div>
            </Grid>

            <Grid item xs={12}>
              <ConfirmProviderListTable />
            </Grid>
          </>
        )
      default:
        return 'Unknown step'
    }
  }

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
                                router.back()
                              }}
                            />
                          ),
                          size: 'sm'
                        })
                      }}
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
                        disabled={pendingCreateOperator}
                        endIcon={
                          activeStep === steps.length - 1 ? (
                            <i className='tabler-check' />
                          ) : (
                            <DirectionalIcon ltrIconClass='tabler-arrow-right' rtlIconClass='tabler-arrow-left' />
                          )
                        }
                      >
                        {pendingCreateOperator ? 'Loading...' : activeStep === steps.length - 1 ? 'Submit' : 'Next'}
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
