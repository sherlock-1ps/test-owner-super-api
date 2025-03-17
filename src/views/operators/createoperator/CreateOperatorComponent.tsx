// MUI Imports
'use client'

import CustomTextField from '@/@core/components/mui/TextField'
import {
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  Step,
  StepLabel,
  Stepper
} from '@mui/material'
import type { SelectChangeEvent } from '@mui/material/Select'
import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import StepperWrapper from '@/@core/styles/stepper'
import StepperCustomDot from '@components/stepper-dot'
import { toast } from 'react-toastify'
import DirectionalIcon from '@/components/DirectionalIcon'
import SelectProviderListTable from './SelectProviderListTable'
import ConfirmProviderListTable from './ConfirmProviderListTable'
import ConfirmAlert from '@/components/dialogs/alerts/ConfirmAlert'
import { useDialog } from '@/hooks/useDialog'

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
  username: string
  email: string
  password: string
  isPasswordShown: boolean
  confirmPassword: string
  isConfirmPasswordShown: boolean
  firstName: string
  lastName: string
  country: string
  language: string[]
  twitter: string
  facebook: string
  instagram: string
  github: string
}

const CreateProviderComponent = () => {
  const router = useRouter()
  const { showDialog } = useDialog()
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState<FormDataType>({
    username: '',
    email: '',
    password: '',
    isPasswordShown: false,
    confirmPassword: '',
    isConfirmPasswordShown: false,
    firstName: '',
    lastName: '',
    country: '',
    language: [],
    twitter: '',
    facebook: '',
    instagram: '',
    github: ''
  })

  const handleClickShowPassword = () => setFormData(show => ({ ...show, isPasswordShown: !show.isPasswordShown }))

  const handleClickShowConfirmPassword = () =>
    setFormData(show => ({ ...show, isConfirmPasswordShown: !show.isConfirmPasswordShown }))

  const handleReset = () => {
    setActiveStep(0)
    setFormData({
      username: '',
      email: '',
      password: '',
      isPasswordShown: false,
      confirmPassword: '',
      isConfirmPasswordShown: false,
      firstName: '',
      lastName: '',
      country: '',
      language: [],
      twitter: '',
      facebook: '',
      instagram: '',
      github: ''
    })
  }

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)

    if (activeStep === steps.length - 1) {
      toast.success('Form Submitted')
    }
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const renderStepContent = (activeStep: number) => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <Grid item xs={12} sm={2}>
              <CustomTextField
                fullWidth
                label='Username'
                placeholder='johnDoe'
                value={formData.username}
                onChange={e => setFormData({ ...formData, username: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <CustomTextField
                fullWidth
                label='Username'
                placeholder='johnDoe'
                value={formData.username}
                onChange={e => setFormData({ ...formData, username: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                type='email'
                label='Email'
                placeholder='johndoe@gmail.com'
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Password'
                placeholder='············'
                id='stepper-alternative-password'
                type={formData.isPasswordShown ? 'text' : 'password'}
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={e => e.preventDefault()}
                        aria-label='toggle password visibility'
                      >
                        <i className={formData.isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Confirm Password'
                placeholder='············'
                id='stepper-alternative-confirm-password'
                type={formData.isConfirmPasswordShown ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={e => e.preventDefault()}
                        aria-label='toggle confirm password visibility'
                      >
                        <i className={formData.isConfirmPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <CustomTextField
                select
                fullWidth
                label='Currency'
                value={formData.country}
                onChange={e => setFormData({ ...formData, country: e.target.value as string })}
              >
                <MenuItem value=''>Select Country</MenuItem>
                <MenuItem value='UK'>UK</MenuItem>
                <MenuItem value='USA'>USA</MenuItem>
                <MenuItem value='Australia'>Australia</MenuItem>
                <MenuItem value='Germany'>Germany</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={3}>
              <CustomTextField
                select
                fullWidth
                label='Country'
                value={formData.language}
                SelectProps={{
                  multiple: true,
                  onChange: e => setFormData({ ...formData, language: e.target.value as string[] })
                }}
              >
                <MenuItem value='English'>English</MenuItem>
                <MenuItem value='French'>French</MenuItem>
                <MenuItem value='Spanish'>Spanish</MenuItem>
                <MenuItem value='Portuguese'>Portuguese</MenuItem>
                <MenuItem value='Italian'>Italian</MenuItem>
                <MenuItem value='German'>German</MenuItem>
                <MenuItem value='Arabic'>Arabic</MenuItem>
              </CustomTextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextField
                select
                fullWidth
                label='Timezone'
                value={formData.language}
                SelectProps={{
                  multiple: true,
                  onChange: e => setFormData({ ...formData, language: e.target.value as string[] })
                }}
              >
                <MenuItem value='English'>English</MenuItem>
                <MenuItem value='French'>French</MenuItem>
                <MenuItem value='Spanish'>Spanish</MenuItem>
                <MenuItem value='Portuguese'>Portuguese</MenuItem>
                <MenuItem value='Italian'>Italian</MenuItem>
                <MenuItem value='German'>German</MenuItem>
                <MenuItem value='Arabic'>Arabic</MenuItem>
              </CustomTextField>
            </Grid>

            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                rows={8}
                multiline
                label='Contract or Address Detail (Optional)'
                placeholder=''
                sx={{ '& .MuiInputBase-root.MuiFilledInput-root': { alignItems: 'baseline' } }}
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
                value={formData.firstName}
                onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Typography>OPB-</Typography>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            <Grid item xs={12} sm={8}>
              <CustomTextField
                fullWidth
                label='Description (Optional)'
                placeholder=''
                value={formData.lastName}
                onChange={e => setFormData({ ...formData, lastName: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Typography color={'text.primary'}>Choose at least 1 provider to create credentials</Typography>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Typography variant='h6'>Slot Type</Typography>
              <SelectProviderListTable />
            </Grid>
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
              <div className='flex justify-end mt-4'>
                <Button variant='contained' onClick={handleReset}>
                  Reset
                </Button>
              </div>
            </>
          ) : (
            <>
              <form onSubmit={e => e.preventDefault()}>
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
                              content={`Discard this Create Operator?`}
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
                        variant='contained'
                        onClick={handleNext}
                        endIcon={
                          activeStep === steps.length - 1 ? (
                            <i className='tabler-check' />
                          ) : (
                            <DirectionalIcon ltrIconClass='tabler-arrow-right' rtlIconClass='tabler-arrow-left' />
                          )
                        }
                      >
                        {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
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
