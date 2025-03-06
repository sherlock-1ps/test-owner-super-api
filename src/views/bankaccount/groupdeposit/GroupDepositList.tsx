'use client'
import { useEffect, useState } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import type { TextFieldProps } from '@mui/material'
import { Box, Button, Card, CardContent, Grid, IconButton, InputAdornment } from '@mui/material'

import { toast } from 'react-toastify'

import { useDialog } from '@/hooks/useDialog'
import CustomTextField from '@/@core/components/mui/TextField'
import MenuOptions from '@/components/options/MenuOptions'
import ConfirmAlert from '@/components/dialogs/alerts/ConfirmAlert'
import ManageGroupDepositDialog from '@/components/dialogs/bankAccount/ManageGroupDepositDialog'
import GroupDepositDrawer from './GroupDepositDrawer'

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
    groupName: 'SUPER VVIP1',
    group: 'VVIP Group',
    mainAccount: {
      bank: 'scb',
      bankNumber: '121-3-31212-1',
      bankName: 'โรเบิร์ต จูเนียบ'
    },
    subAccount: [
      {
        bank: 'kbank',
        bankNumber: '121-3-31212-1',
        bankName: 'โรเบิร์ต จูเนียบ'
      },
      {
        bank: 'kbank',
        bankNumber: '121-3-31212-1',
        bankName: 'โรเบิร์ต จูเนียบ'
      },
      {
        bank: 'kbank',
        bankNumber: '121-3-31212-1',
        bankName: 'โรเบิร์ต จูเนียบ'
      }
    ]
  },
  {
    id: 2,
    groupName: 'SUPER VVIP2',
    group: 'VVIP Group',
    mainAccount: {
      bank: 'bbl',
      bankNumber: '121-3-31212-1',
      bankName: 'โรเบิร์ต จูเนียบ'
    },
    subAccount: [
      {
        bank: 'scb',
        bankNumber: '121-3-31212-1',
        bankName: 'โรเบิร์ต จูเนียบ'
      },
      {
        bank: 'scb',
        bankNumber: '121-3-31212-1',
        bankName: 'โรเบิร์ต จูเนียบ'
      },
      {
        bank: 'scb',
        bankNumber: '121-3-31212-1',
        bankName: 'โรเบิร์ต จูเนียบ'
      }
    ]
  },
  {
    id: 3,
    groupName: 'SUPER VVIP3',
    group: 'VVIP Group',
    mainAccount: {
      bank: 'scb',
      bankNumber: '121-3-31212-1',
      bankName: 'โรเบิร์ต จูเนียบ'
    },
    subAccount: [
      {
        bank: 'bbl',
        bankNumber: '121-3-31212-1',
        bankName: 'โรเบิร์ต จูเนียบ'
      },
      {
        bank: 'bbl',
        bankNumber: '121-3-31212-1',
        bankName: 'โรเบิร์ต จูเนียบ'
      },
      {
        bank: 'bbl',
        bankNumber: '121-3-31212-1',
        bankName: 'โรเบิร์ต จูเนียบ'
      }
    ]
  }
]

const GroupDepositList = () => {
  // States
  const { showDialog } = useDialog()
  const [sendDrawerOpen, setSendDrawerOpen] = useState(false)

  return (
    <div className='flex flex-col gap-6 w-full'>
      <Card>
        <CardContent>
          <Grid container spacing={4} alignItems='end'>
            <Grid item xs={12} sm>
              <Typography>Group name</Typography>
              <DebouncedInput
                value={''}
                placeholder='Search Group'
                onChange={() => {}}
                className='w-full'
                isIcon={true}
              />
            </Grid>
            <Grid item xs={12} sm>
              <Typography>Search Account</Typography>
              <DebouncedInput
                value={''}
                placeholder='Search Bank acc.'
                onChange={() => {}}
                className='w-full'
                isIcon={true}
              />
            </Grid>
            <Grid item xs={12} sm>
              <Typography>Bank name</Typography>
              <DebouncedInput
                value={''}
                placeholder='Search UserID'
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

              <GroupDepositDrawer open={sendDrawerOpen} handleClose={() => setSendDrawerOpen(false)} />
            </Grid>

            <Grid item xs='auto' className=''>
              <Button
                variant='contained'
                startIcon={<i className='tabler-plus' />}
                className='max-sm:is-full'
                onClick={() => {
                  showDialog({
                    id: 'dialogManageGroupDeposit',
                    component: (
                      <ManageGroupDepositDialog
                        id={'dialogManageGroupDeposit'}
                        title={'Add group Deposit'}
                        mode={'create'}
                        onClick={() => {}}
                      />
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

      <Grid container spacing={6} alignItems='end'>
        {dataMockup.map((item, index) => {
          return (
            <Grid item xs={12} md={4} key={index}>
              <Card className='flex flex-col h-full'>
                <CardContent className='flex flex-col flex-grow gap-2'>
                  <Box className='flex items-center justify-between gap-2'>
                    <Box className='flex gap-2 items-center'>
                      <Box className='flex items-center gap-2'>
                        <Typography variant='h5' className='flex items-center'>
                          {item.groupName}
                        </Typography>
                        <IconButton size='small' onClick={() => toast.success('Success copied!', { autoClose: 2000 })}>
                          <i className='tabler-copy text-textSecondary' />
                        </IconButton>
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
                                id: `alertDialogDeleteGroupDeposit`,
                                component: (
                                  <ConfirmAlert
                                    id={`alertDialogDeleteGroupDeposit`}
                                    title={'Are you sure to delete'}
                                    content='delete this group deposit?'
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

                  <Box className='flex items-center justify-between '>
                    <Box className='flex gap-2'>
                      <i className='tabler-info-circle' />
                      <Typography>Use With:</Typography>
                    </Box>
                    <Typography>{item.group}</Typography>
                  </Box>

                  <Box className=' border-b border-t py-3 #E6E6E7 mt-1'>
                    <Typography>Main account</Typography>
                    <Box className='flex justify-between gap-1 items-center'>
                      <Box className='flex gap-2 items-center'>
                        <img
                          src={`/images/bankAccount/${item.mainAccount.bank}Image.png`}
                          alt={'main_account'}
                          height={20}
                          width={20}
                          className=' rounded-md'
                        />
                        <Box className='flex gap-2 items-center'>
                          <Typography>{item.mainAccount.bankNumber}</Typography>

                          <IconButton
                            size='small'
                            onClick={() => toast.success('Success copied!', { autoClose: 2000 })}
                          >
                            <i className='tabler-copy text-textSecondary' />
                          </IconButton>
                        </Box>
                      </Box>

                      <Typography>{item.mainAccount.bankName}</Typography>
                    </Box>
                  </Box>

                  <Box>
                    <Typography>Sup account</Typography>
                    {item.subAccount.map((data, idx) => {
                      return (
                        <Box className='flex justify-between gap-1 items-center' key={idx}>
                          <Box className='flex gap-2 items-center'>
                            <img
                              src={`/images/bankAccount/${data.bank}Image.png`}
                              alt={'main_account'}
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

export default GroupDepositList
