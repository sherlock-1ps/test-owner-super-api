'use client'
import { useEffect, useState } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import type { TextFieldProps } from '@mui/material'
import { Box, Button, Card, CardContent, Chip, Grid, IconButton, InputAdornment } from '@mui/material'

import { toast } from 'react-toastify'

import { useDialog } from '@/hooks/useDialog'
import CustomTextField from '@/@core/components/mui/TextField'
import MenuOptions from '@/components/options/MenuOptions'
import ConfirmAlert from '@/components/dialogs/alerts/ConfirmAlert'
import ManageLicenseDialog from '@/components/dialogs/bankAccount/ManageLicenseDialog'
import LicenseDrawer from './LicenseDrawer'

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
    name: 'ONEAGENT',
    code: 'c2eb9c',
    status: 'enabled',
    image: 'oneagent',
    accounts: [
      {
        bank: 'scb',
        bankName: 'โรเบิร์ต จูเนีย',
        bankNumber: '121-3-31212-1'
      },
      {
        bank: 'scb',
        bankName: 'ปีเตอร์ ปาคเกอ',
        bankNumber: '777-3-31212-5'
      }
    ]
  },
  {
    id: 2,
    name: 'Line',
    code: '497710',
    status: 'enabled',
    image: 'line',
    accounts: [
      {
        bank: 'kbank',
        bankName: 'โรเบิร์ต จูเนีย',
        bankNumber: '121-3-31212-1'
      },
      {
        bank: 'scb',
        bankName: 'ปีเตอร์ ปาคเกอ',
        bankNumber: '777-3-31212-5'
      }
    ]
  },
  {
    id: 3,
    name: 'SICIBI',
    code: 'as7pfuejwkklk00',
    status: 'enabled',
    image: 'scb',
    accounts: [
      {
        bank: 'bbl',
        bankName: 'โรเบิร์ต จูเนีย',
        bankNumber: '121-3-31212-1'
      },
      {
        bank: 'bbl',
        bankName: 'ปีเตอร์ ปาคเกอ',
        bankNumber: '777-3-31212-5'
      }
    ]
  },
  {
    id: 4,
    name: 'ONEAGENT',
    code: 'c2eb9c',
    status: 'disabled',
    image: 'oneagent',
    accounts: [
      {
        bank: 'scb',
        bankName: 'โรเบิร์ต จูเนีย',
        bankNumber: '121-3-31212-1'
      },
      {
        bank: 'scb',
        bankName: 'ปีเตอร์ ปาคเกอ',
        bankNumber: '777-3-31212-5'
      }
    ]
  },
  {
    id: 5,
    name: 'Line',
    code: '497710',
    status: 'notAvailable',
    image: 'line',
    accounts: [
      {
        bank: 'kbank',
        bankName: 'โรเบิร์ต จูเนีย',
        bankNumber: '121-3-31212-1'
      },
      {
        bank: 'scb',
        bankName: 'ปีเตอร์ ปาคเกอ',
        bankNumber: '777-3-31212-5'
      }
    ]
  },
  {
    id: 6,
    name: 'SICIBI',
    code: 'as7pfuejwkklk00',
    status: 'disabled',
    image: 'scb',
    accounts: [
      {
        bank: 'bbl',
        bankName: 'โรเบิร์ต จูเนีย',
        bankNumber: '121-3-31212-1'
      },
      {
        bank: 'bbl',
        bankName: 'ปีเตอร์ ปาคเกอ',
        bankNumber: '777-3-31212-5'
      }
    ]
  }
]

const LicenseList = () => {
  // States
  const { showDialog } = useDialog()
  const [sendDrawerOpen, setSendDrawerOpen] = useState(false)

  return (
    <div className='flex flex-col gap-6 w-full'>
      <Card>
        <CardContent>
          <Grid container spacing={4} alignItems='end'>
            <Grid item xs={12} sm>
              <Typography>Code</Typography>
              <DebouncedInput
                value={''}
                placeholder='Search Code'
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

              <LicenseDrawer open={sendDrawerOpen} handleClose={() => setSendDrawerOpen(false)} />
            </Grid>

            <Grid item xs='auto' className=''>
              <Button
                variant='contained'
                startIcon={<i className='tabler-plus' />}
                className='max-sm:is-full'
                onClick={() => {
                  showDialog({
                    id: 'dialogManageLicenseDialog',
                    component: (
                      <ManageLicenseDialog
                        id={'dialogManageLicenseDialog'}
                        title={'Add Auto License'}
                        mode={'create'}
                        onClick={() => {}}
                      />
                    )
                  })
                }}
              >
                Add License
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
                        src={`/images/bankAccount/${item.image}Image.png`}
                        alt={item.image}
                        height={44}
                        width={44}
                        className=' rounded-lg'
                      />
                      <Box className='flex flex-col'>
                        <Typography>{item.name}</Typography>

                        <Box className='flex items-center gap-2'>
                          <Typography className='flex items-center'>#{item.code}</Typography>
                          <IconButton
                            size='small'
                            onClick={() => toast.success('Success copied!', { autoClose: 2000 })}
                          >
                            <i className='tabler-copy text-textSecondary' />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                    <div className='self-start'>
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
                                id: `alertDialogDeleteAutoLicense`,
                                component: (
                                  <ConfirmAlert
                                    id={`alertDialogDeleteAutoLicense`}
                                    title={'Are you sure to delete'}
                                    content1='delete this License ?'
                                    onClick={async () => {}}
                                  />
                                ),
                                size: 'sm'
                              })
                            }
                          }
                        ]}
                      />
                    </div>
                  </Box>

                  <Chip
                    label={
                      item.status === 'enabled'
                        ? 'Enabled'
                        : item.status === 'disabled'
                          ? 'Disabled'
                          : item.status === 'notAvailable'
                            ? 'Not Available'
                            : 'Unknown'
                    }
                    color={
                      item.status === 'enabled'
                        ? 'success'
                        : item.status === 'disabled'
                          ? 'error'
                          : item.status === 'notAvailable'
                            ? 'info'
                            : 'default'
                    }
                    variant={'tonal'}
                    size='medium'
                    className='w-full'
                  />
                  <Box className='flex items-center justify-between border-t #E6E6E7 pt-4 mt-2'>
                    <Box className='flex gap-2'>
                      <i className='tabler-info-circle' />
                      <Typography>Use With:</Typography>
                    </Box>
                    <Typography>{item.accounts.length} Bank Account</Typography>
                  </Box>
                  {item.accounts.map((data, idx) => {
                    return (
                      <Box className='flex justify-between gap-1 items-center' key={idx}>
                        <Box className='flex gap-2 items-center'>
                          <img
                            src={`/images/bankAccount/${data.bank}Image.png`}
                            alt={data.bank}
                            height={20}
                            width={20}
                            className=' rounded-md'
                          />
                          <Box className='flex gap-2 items-center'>
                            <Typography>{data.bankNumber}</Typography>

                            <IconButton
                              size='small'
                              onClick={() => toast.success('Success copied!', { autoClose: 2000 })}
                            >
                              <i className='tabler-copy text-textSecondary' />
                            </IconButton>
                          </Box>
                        </Box>

                        <Typography>{data.bankName}</Typography>
                      </Box>
                    )
                  })}
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}

export default LicenseList
