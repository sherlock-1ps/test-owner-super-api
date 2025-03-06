'use client'
import { useEffect, useState } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import type { TextFieldProps } from '@mui/material'
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Switch
} from '@mui/material'

import { toast } from 'react-toastify'

import { useDialog } from '@/hooks/useDialog'
import CustomTextField from '@/@core/components/mui/TextField'
import ManageDepositDialog from '@/components/dialogs/bankAccount/ManageDepositDialog'
import RestDrawer from './RestDrawer'

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
    bankName: 'อริกาโต นายดี',
    bankNumber: '457-3-00215-1',
    bankImage: 'bbl',
    currentAmount: 1554,
    rank: 'Big hand 1',
    limitAmount: 168888457,
    isActive: true,
    isAuto: true
  },
  {
    id: 2,
    bankName: 'Hanh Seeyonggoo',
    bankNumber: '666-3-31212-7',
    bankImage: 'bbl',
    currentAmount: 3254,
    rank: 'Big hand 1',
    limitAmount: 555222,
    isActive: true,
    isAuto: true
  },
  {
    id: 3,
    bankName: 'โดนัล ดักร์',
    bankNumber: '211-3-75412-8',
    bankImage: 'bbl',
    currentAmount: 21,
    rank: 'Big hand 1',
    limitAmount: 1945000,
    isActive: true,
    isAuto: true
  },
  {
    id: 4,
    bankName: 'โดนัล ดักร์',
    bankNumber: '211-3-75412-8',
    bankImage: 'kbank',
    currentAmount: 21,
    rank: 'Big hand 1',
    limitAmount: 1945000,
    isActive: true,
    isAuto: true
  }
]

const RestList = () => {
  // States
  const { showDialog } = useDialog()
  const [sendDrawerOpen, setSendDrawerOpen] = useState(false)

  return (
    <div className='flex flex-col gap-6 w-full'>
      <Card>
        <CardContent>
          <Grid container spacing={4} alignItems='end'>
            <Grid item xs={12} sm>
              <Typography>Bank Account</Typography>
              <DebouncedInput
                value={''}
                placeholder='Search Bank acc.
                '
                onChange={() => {}}
                className='w-full'
                isIcon={true}
              />
            </Grid>
            <Grid item xs={12} sm>
              <Typography>Bank name</Typography>
              <DebouncedInput
                value={''}
                placeholder='Search Bank name'
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

              <RestDrawer open={sendDrawerOpen} handleClose={() => setSendDrawerOpen(false)} />
            </Grid>

            <Grid item xs='auto' className=''>
              <Button
                variant='contained'
                startIcon={<i className='tabler-plus' />}
                className='max-sm:is-full'
                onClick={() => {
                  showDialog({
                    id: 'dialogManageWithdraw',
                    component: (
                      <ManageDepositDialog
                        id={'dialogManageWithdraw'}
                        title={'Add Bank Account for Rest'}
                        mode={'rest'}
                        onClick={() => {}}
                      />
                    )
                  })
                }}
              >
                Add Bank
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={6} alignItems='end'>
        {dataMockup.map((item, index) => {
          return (
            <Grid item xs={12} md={4} key={index}>
              <Card className='flex flex-col h-full'>
                <CardContent className='flex flex-col flex-grow gap-2'>
                  <Box className='flex items-center justify-between gap-2'>
                    <Box className='flex gap-2 items-center'>
                      <img
                        src={`/images/bankAccount/${item.bankImage}Image.png`}
                        alt={item.bankImage}
                        height={44}
                        width={44}
                        className=' rounded-lg'
                      />
                      <Box className='flex flex-col '>
                        <Box className='flex gap-2'>
                          <Typography>{item.bankNumber}</Typography>
                          <IconButton
                            size='small'
                            onClick={() => toast.success('Success copied!', { autoClose: 2000 })}
                          >
                            <i className='tabler-copy text-textSecondary' />
                          </IconButton>
                        </Box>
                        <Typography>{item.bankName}</Typography>
                      </Box>
                    </Box>
                    <Typography>
                      $
                      {Number(item.currentAmount).toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </Typography>
                  </Box>
                  <Box className='flex items-center justify-between'>
                    <Box className='flex gap-2'>
                      <i className='tabler-info-circle' />
                      <Typography>Use With:</Typography>
                    </Box>
                    <Typography>{item.rank}</Typography>
                  </Box>
                  <Box className='flex items-center justify-between'>
                    <Box className='flex gap-2'>
                      <i className='tabler-wallet' />
                      <Typography>Limit:</Typography>
                    </Box>
                    <Typography>
                      $
                      {Number(item.limitAmount).toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2
                      })}
                    </Typography>
                  </Box>
                  <Box className='border-t #E6E6E7 pt-4 pb-1 mt-2'>
                    <Box className='flex justify-evenly items-center'>
                      <FormControlLabel
                        control={<Switch defaultChecked sx={{ transform: 'scale(1.2)' }} />}
                        label='On/Off'
                      />
                      <FormControlLabel
                        control={<Switch defaultChecked sx={{ transform: 'scale(1.2)' }} />}
                        label='Move Auto'
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}

export default RestList
