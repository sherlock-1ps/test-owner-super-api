'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import type { Theme } from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'
import { Box, Button, IconButton, InputAdornment } from '@mui/material'

import type { TextFieldProps } from '@mui/material/TextField'
import { useEffect, useState } from 'react'
import CustomTextField from '@/@core/components/mui/TextField'
import MenuOptions from '@/components/options/MenuOptions'
import { getGroupLabelPlayer, getGroupPlayerGradient } from '@/utils/getGroupPlayer'
import { useDialog } from '@/hooks/useDialog'
import ConfirmAlert from '@/components/dialogs/alerts/ConfirmAlert'
import AddGroupPlayerDialog from '@/components/dialogs/user/AddGroupPlayerDialog'
import UserGroupDrawer from './UserGroupDrawer'

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  isIcon,
  ...props
}: {
  value: string | number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  debounce?: number
  isIcon?: boolean
} & Omit<TextFieldProps, 'onChange'>) => {
  const [value, setValue] = useState<string | number>(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fakeEvent = {
        target: { value }
      } as React.ChangeEvent<HTMLInputElement>

      onChange(fakeEvent)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value, debounce, onChange])

  return (
    <CustomTextField
      {...props}
      value={value}
      onChange={e => setValue(e.target.value)}
      InputProps={{
        endAdornment: isIcon ? (
          <InputAdornment position='end'>
            <IconButton onClick={() => {}}>
              <i className='tabler-search' />
            </IconButton>
          </InputAdornment>
        ) : null
      }}
    />
  )
}

const dataMockup = [
  {
    id: 1,
    groupName: 'New User',
    group: 1,
    hourRule: 'Less than 10 hr.',
    betRule: 'Less than $10',
    member: 157092,
    totalBet: 10000,
    totalLose: 5000,
    summary: 5000
  },
  {
    id: 2,
    groupName: 'Common User',
    group: 2,
    hourRule: 'Less than 10 hr.to 100 hr.',
    betRule: 'Less than $100',
    member: 244092,
    totalBet: 10000,
    totalLose: 5000,
    summary: 5000
  },
  {
    id: 3,
    groupName: 'Professional',
    group: 3,
    hourRule: 'Between 10 hr.to 100 hr.',
    betRule: 'Between $100 to 500 hr.',
    member: 244092,
    totalBet: 10000,
    totalLose: 5000,
    summary: 5000
  },
  {
    id: 4,
    groupName: 'VVIP',
    group: 4,
    hourRule: 'N/A',
    betRule: 'More than $1,000',
    member: 888888,
    totalBet: 10000,
    totalLose: 5000,
    summary: 5000
  }
]

const UserGroupList = () => {
  const { showDialog } = useDialog()
  const [sendDrawerOpen, setSendDrawerOpen] = useState(false)
  // Hooks
  const isBelowMdScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

  return (
    <div className='flex flex-col gap-6'>
      <Card>
        <CardContent>
          <Grid container spacing={4} alignItems='end'>
            <Grid item xs={12} sm>
              <Typography>UserID</Typography>
              <DebouncedInput
                value={''}
                placeholder='Group Name'
                onChange={() => {}}
                className='w-full'
                isIcon={true}
              />
            </Grid>

            <Grid item xs='auto' className=''>
              <Button
                color='primary'
                variant='outlined'
                startIcon={<i className='tabler-filter' />}
                className='max-sm:is-full'
                onClick={() => {
                  setSendDrawerOpen(true)
                }}
              >
                Filter
              </Button>
              <UserGroupDrawer open={sendDrawerOpen} handleClose={() => setSendDrawerOpen(false)} />
            </Grid>

            <Grid item xs='auto' className=''>
              <Button
                variant='contained'
                startIcon={<i className='tabler-plus' />}
                className='max-sm:is-full'
                onClick={() => {
                  showDialog({
                    id: 'AddGroupPlayerDialog',
                    component: (
                      <AddGroupPlayerDialog id={'AddGroupPlayerDialog'} title={'Add Group'} onClick={() => {}} />
                    )
                  })
                }}
              >
                Add Group
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Grid container spacing={6}>
        {dataMockup.map((item, index) => {
          return (
            <Grid item xs={12} sm={4} key={index}>
              <Card className='flex flex-col h-full'>
                <CardContent className='flex flex-col flex-grow gap-2'>
                  <Box className='flex items-center justify-between gap-2'>
                    <Typography variant='h5'>{item.groupName}</Typography>
                    <MenuOptions
                      options={[
                        {
                          text: 'แก้ไข',
                          onClick: () => {}
                        },
                        {
                          text: 'ลบ',
                          onClick: () => {
                            showDialog({
                              id: 'alertUserGroupList',
                              component: (
                                <ConfirmAlert
                                  id='alertUserGroupList'
                                  title={'Are you sure to delete'}
                                  content={`delete this ${item.groupName} group ?`}
                                  onClick={() => {}}
                                />
                              ),
                              size: 'sm'
                            })
                          }
                        }
                      ]}
                    />
                  </Box>
                  <Chip
                    label={getGroupLabelPlayer(item.group)}
                    sx={{
                      background: getGroupPlayerGradient(item.group)
                    }}
                    variant={'tonal'}
                    size='medium'
                    className='rounded-lg text-black'
                  />
                  <div className='flex gap-2 items-center'>
                    <i className='tabler-info-circle' />
                    <Typography variant='h6'>Condition</Typography>
                  </div>
                  <div className='flex items-center gap-2 justify-between'>
                    <Typography>Hour Active</Typography>
                    <Typography variant='h6'>{item.hourRule}</Typography>
                  </div>
                  <div className='flex items-center gap-2 justify-between'>
                    <Typography>Bet Amount</Typography>
                    <Typography variant='h6'>{item.betRule}</Typography>
                  </div>
                  <Divider />
                  <div className='flex items-center gap-2 justify-between my-2'>
                    <div className='flex gap-2 items-center'>
                      <i className='tabler-users' />
                      <Typography variant='h6'>Member</Typography>
                    </div>
                    <Typography variant='h6'>{item.member}</Typography>
                  </div>
                  <Divider />
                  <div className='flex gap-2 items-center'>
                    <i className='tabler-brand-google-analytics' />
                    <Typography variant='h6'>Statistic</Typography>
                  </div>
                  <div className='flex items-center gap-2 justify-between'>
                    <Typography>Total Bet</Typography>
                    <Typography variant='h6' color='success.main'>
                      ${' '}
                      {Number(item.totalBet).toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </Typography>
                  </div>
                  <div className='flex items-center gap-2 justify-between'>
                    <Typography>Total Lose</Typography>
                    <Typography variant='h6' color={'error.main'}>
                      ${' '}
                      {Number(item.totalLose).toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </Typography>
                  </div>
                  <div className='flex items-center gap-2 justify-between'>
                    <Typography>Summary</Typography>
                    <Typography variant='h6' color={'success.main'}>
                      ${' '}
                      {Number(item.summary).toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}

export default UserGroupList
