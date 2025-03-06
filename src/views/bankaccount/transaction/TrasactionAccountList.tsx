// React Imports
import { useEffect, useState } from 'react'
import type { SyntheticEvent } from 'react'

// MUI Imports
import Tab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import type { TextFieldProps } from '@mui/material'
import { Box, Button, Card, CardContent, Grid, IconButton, InputAdornment } from '@mui/material'

import { alpha, useTheme } from '@mui/material/styles'

import CustomTabList from '@/@core/components/mui/TabList'
import CustomTextField from '@/@core/components/mui/TextField'
import TransactionAccountDrawer from './TransactionAccountDrawer'

const dataMockup = [
  {
    id: 1,
    date: '10/01/2025',
    type: 'deposit',
    before: {
      bankNumber: '987-1-234567-8',
      bankName: 'โรเบิร์ต จูเนียยร์',
      image: 'scb',
      type: 'deposit'
    },
    after: {
      bankNumber: '987-1-234567-8',
      bankName: 'โรเบิร์ต จูเนียยร์',
      image: 'scb',
      type: 'rest'
    },
    moveCondition: 'all',
    moveAmount: 10000
  },
  {
    id: 2,
    date: '11/08/2024',
    type: 'withdraw',
    before: {
      bankNumber: '987-1-234567-8',
      bankName: 'โรเบิร์ต จูเนียยร์',
      image: 'bbl',
      type: 'deposit'
    },
    after: {
      bankNumber: '987-1-234567-8',
      bankName: 'โรเบิร์ต จูเนียยร์',
      image: 'scb',
      type: 'rest'
    },
    moveCondition: 'all',
    moveAmount: 10000
  },
  {
    id: 3,
    date: '20/08/2024',
    type: 'rest',
    before: {
      bankNumber: '987-1-234567-8',
      bankName: 'โรเบิร์ต จูเนียยร์',
      image: 'scb',
      type: 'deposit'
    },
    after: {
      bankNumber: '987-1-234567-8',
      bankName: 'โรเบิร์ต จูเนียยร์',
      image: 'bbl',
      type: 'rest'
    },
    moveCondition: 'all',
    moveAmount: 10000
  },
  {
    id: 4,
    date: '12/01/2025',
    type: 'deposit',
    before: {
      bankNumber: '555-1-234567-8',
      bankName: 'โรเบิร์ต จูเนียยร์',
      image: 'bbl',
      type: 'deposit'
    },
    after: {
      bankNumber: '666-1-234567-8',
      bankName: 'โรเบิร์ต จูเนียยร์',
      image: 'kbank',
      type: 'rest'
    },
    moveCondition: 'all',
    moveAmount: 888888
  },
  {
    id: 5,
    date: '12/01/2025',
    type: 'withdraw',
    before: {
      bankNumber: '555-1-234567-8',
      bankName: 'โรเบิร์ต จูเนียยร์',
      image: 'kbank',
      type: 'deposit'
    },
    after: {
      bankNumber: '666-1-234567-8',
      bankName: 'โรเบิร์ต จูเนียยร์',
      image: 'kbank',
      type: 'rest'
    },
    moveCondition: 'all',
    moveAmount: 6500
  },
  {
    id: 6,
    date: '15/02/2025',
    type: 'withdraw',
    before: {
      bankNumber: '980-1-234567-8',
      bankName: 'โรเบิร์ต จูเนียยร์',
      image: 'scb',
      type: 'deposit'
    },
    after: {
      bankNumber: '666-1-234567-8',
      bankName: 'โรเบิร์ต จูเนียยร์',
      image: 'kbank',
      type: 'rest'
    },
    moveCondition: 'all',
    moveAmount: 554547
  }
]

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

const TrasactionAccountList = () => {
  // States
  const theme = useTheme()
  const [value, setValue] = useState<string>('1')
  const [sendDrawerOpen, setSendDrawerOpen] = useState(false)

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <TabContext value={value}>
      <Box className='flex flex-col gap-6'>
        <Card className=' w-full ' sx={{ overflow: 'visible' }}>
          <CardContent className='w-full flex flex-col'>
            <Grid container spacing={4} className='flex items-end '>
              <Grid
                item
                xs={12}
                sm
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                <Box>
                  <Typography>Choose Source Account</Typography>
                  <Card sx={{ backgroundColor: alpha(theme.palette.secondary.main, 0.2) }}>
                    <CustomTabList pill='true' onChange={handleChange}>
                      <Tab value='1' label='All' />
                      <Tab value='2' label='Deposit' />
                      <Tab value='3' label='Withdraw' />
                      <Tab value='4' label='Rest' />
                    </CustomTabList>
                  </Card>
                </Box>

                <Grid item xs={12} sm>
                  <Typography>Bank Account</Typography>
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

                <Grid item xs='auto' className='self-end'>
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

                  <TransactionAccountDrawer open={sendDrawerOpen} handleClose={() => setSendDrawerOpen(false)} />
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <TabPanel value='1'>
          <Grid container spacing={4}>
            {dataMockup.map((item, index) => {
              return (
                <Grid item xs={12} key={index}>
                  <Card className='flex flex-col h-full'>
                    <CardContent className='flex flex-col flex-grow gap-2'>
                      <Grid container spacing={2} className='flex items-center '>
                        <Grid item xs={12} sm={2}>
                          <Box className='flex flex-col item-center border-r  #E6E6E7 pr-4 '>
                            <Typography className='text-center'>{item.date}</Typography>
                            <Typography className='text-center'>10:30</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm className='flex items-center justify-center'>
                          <Box className='flex gap-2 item-center '>
                            <img
                              src={`/images/bankAccount/${item.before.image}Image.png`}
                              width={48}
                              alt='image-transaction'
                              className=' rounded'
                            />
                            <Box className='flex flex-col'>
                              <Typography variant='h6'>
                                {item.before.bankNumber} ({item.before.type})
                              </Typography>
                              <Typography variant='body2'>{item.before.bankName}</Typography>
                            </Box>
                          </Box>
                        </Grid>
                        <i className='tabler-arrow-right' />

                        <Grid item xs={12} sm className='flex items-center justify-center'>
                          <Box className='flex gap-2 item-center '>
                            <img
                              src={`/images/bankAccount/${item.after.image}Image.png`}
                              width={48}
                              alt='image-transaction'
                              className=' rounded'
                            />
                            <Box className='flex flex-col'>
                              <Typography variant='h6'>
                                {item.after.bankNumber} ({item.after.type})
                              </Typography>
                              <Typography variant='body2'>{item.after.bankName}</Typography>
                            </Box>
                          </Box>
                        </Grid>

                        <Grid item xs={12} sm={3}>
                          <Box className='flex flex-col item-center border-l  #E6E6E7 pl-4'>
                            <Box className='flex justify-between gap-2'>
                              <Box className='flex gap-2'>
                                <i className='tabler-shield-check-filled' />
                                <Typography>Move Condition:</Typography>
                              </Box>
                              <Typography>Move All</Typography>
                            </Box>
                            <Box className='flex justify-between gap-2'>
                              <Box className='flex gap-2'>
                                <i className='tabler-cash' />
                                <Typography>Move Amount:</Typography>
                              </Box>
                              <Typography>
                                $
                                {Number(item.moveAmount).toLocaleString('en-US', {
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 2
                                })}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </TabPanel>
        <TabPanel value='2'>
          <Grid container spacing={4}>
            {dataMockup
              .filter(data => data.type == 'deposit')
              .map((item, index) => {
                return (
                  <Grid item xs={12} key={index}>
                    <Card className='flex flex-col h-full'>
                      <CardContent className='flex flex-col flex-grow gap-2'>
                        <Grid container spacing={2} className='flex items-center '>
                          <Grid item xs={12} sm={2}>
                            <Box className='flex flex-col item-center border-r  #E6E6E7 pr-4 '>
                              <Typography className='text-center'>{item.date}</Typography>
                              <Typography className='text-center'>10:30</Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm className='flex items-center justify-center'>
                            <Box className='flex gap-2 item-center '>
                              <img
                                src={`/images/bankAccount/${item.before.image}Image.png`}
                                width={48}
                                alt='image-transaction'
                                className=' rounded'
                              />
                              <Box className='flex flex-col'>
                                <Typography variant='h6'>
                                  {item.before.bankNumber} ({item.before.type})
                                </Typography>
                                <Typography variant='body2'>{item.before.bankName}</Typography>
                              </Box>
                            </Box>
                          </Grid>
                          <i className='tabler-arrow-right' />

                          <Grid item xs={12} sm className='flex items-center justify-center'>
                            <Box className='flex gap-2 item-center '>
                              <img
                                src={`/images/bankAccount/${item.after.image}Image.png`}
                                width={48}
                                alt='image-transaction'
                                className=' rounded'
                              />
                              <Box className='flex flex-col'>
                                <Typography variant='h6'>
                                  {item.after.bankNumber} ({item.after.type})
                                </Typography>
                                <Typography variant='body2'>{item.after.bankName}</Typography>
                              </Box>
                            </Box>
                          </Grid>

                          <Grid item xs={12} sm={3}>
                            <Box className='flex flex-col item-center border-l  #E6E6E7 pl-4'>
                              <Box className='flex justify-between gap-2'>
                                <Box className='flex gap-2'>
                                  <i className='tabler-shield-check-filled' />
                                  <Typography>Move Condition:</Typography>
                                </Box>
                                <Typography>Move All</Typography>
                              </Box>
                              <Box className='flex justify-between gap-2'>
                                <Box className='flex gap-2'>
                                  <i className='tabler-cash' />
                                  <Typography>Move Amount:</Typography>
                                </Box>
                                <Typography>
                                  $
                                  {Number(item.moveAmount).toLocaleString('en-US', {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 2
                                  })}
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                )
              })}
          </Grid>
        </TabPanel>
        <TabPanel value='3'>
          <Grid container spacing={4}>
            {dataMockup
              .filter(data => data.type == 'withdraw')
              .map((item, index) => {
                return (
                  <Grid item xs={12} key={index}>
                    <Card className='flex flex-col h-full'>
                      <CardContent className='flex flex-col flex-grow gap-2'>
                        <Grid container spacing={2} className='flex items-center '>
                          <Grid item xs={12} sm={2}>
                            <Box className='flex flex-col item-center border-r  #E6E6E7 pr-4 '>
                              <Typography className='text-center'>{item.date}</Typography>
                              <Typography className='text-center'>10:30</Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm className='flex items-center justify-center'>
                            <Box className='flex gap-2 item-center '>
                              <img
                                src={`/images/bankAccount/${item.before.image}Image.png`}
                                width={48}
                                alt='image-transaction'
                                className=' rounded'
                              />
                              <Box className='flex flex-col'>
                                <Typography variant='h6'>
                                  {item.before.bankNumber} ({item.before.type})
                                </Typography>
                                <Typography variant='body2'>{item.before.bankName}</Typography>
                              </Box>
                            </Box>
                          </Grid>
                          <i className='tabler-arrow-right' />

                          <Grid item xs={12} sm className='flex items-center justify-center'>
                            <Box className='flex gap-2 item-center '>
                              <img
                                src={`/images/bankAccount/${item.after.image}Image.png`}
                                width={48}
                                alt='image-transaction'
                                className=' rounded'
                              />
                              <Box className='flex flex-col'>
                                <Typography variant='h6'>
                                  {item.after.bankNumber} ({item.after.type})
                                </Typography>
                                <Typography variant='body2'>{item.after.bankName}</Typography>
                              </Box>
                            </Box>
                          </Grid>

                          <Grid item xs={12} sm={3}>
                            <Box className='flex flex-col item-center border-l  #E6E6E7 pl-4'>
                              <Box className='flex justify-between gap-2'>
                                <Box className='flex gap-2'>
                                  <i className='tabler-shield-check-filled' />
                                  <Typography>Move Condition:</Typography>
                                </Box>
                                <Typography>Move All</Typography>
                              </Box>
                              <Box className='flex justify-between gap-2'>
                                <Box className='flex gap-2'>
                                  <i className='tabler-cash' />
                                  <Typography>Move Amount:</Typography>
                                </Box>
                                <Typography>
                                  $
                                  {Number(item.moveAmount).toLocaleString('en-US', {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 2
                                  })}
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                )
              })}
          </Grid>
        </TabPanel>
        <TabPanel value='4'>
          <Grid container spacing={4}>
            {dataMockup
              .filter(data => data.type == 'rest')
              .map((item, index) => {
                return (
                  <Grid item xs={12} key={index}>
                    <Card className='flex flex-col h-full'>
                      <CardContent className='flex flex-col flex-grow gap-2'>
                        <Grid container spacing={2} className='flex items-center '>
                          <Grid item xs={12} sm={2}>
                            <Box className='flex flex-col item-center border-r  #E6E6E7 pr-4 '>
                              <Typography className='text-center'>{item.date}</Typography>
                              <Typography className='text-center'>10:30</Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm className='flex items-center justify-center'>
                            <Box className='flex gap-2 item-center '>
                              <img
                                src={`/images/bankAccount/${item.before.image}Image.png`}
                                width={48}
                                alt='image-transaction'
                                className=' rounded'
                              />
                              <Box className='flex flex-col'>
                                <Typography variant='h6'>
                                  {item.before.bankNumber} ({item.before.type})
                                </Typography>
                                <Typography variant='body2'>{item.before.bankName}</Typography>
                              </Box>
                            </Box>
                          </Grid>
                          <i className='tabler-arrow-right' />

                          <Grid item xs={12} sm className='flex items-center justify-center'>
                            <Box className='flex gap-2 item-center '>
                              <img
                                src={`/images/bankAccount/${item.after.image}Image.png`}
                                width={48}
                                alt='image-transaction'
                                className=' rounded'
                              />
                              <Box className='flex flex-col'>
                                <Typography variant='h6'>
                                  {item.after.bankNumber} ({item.after.type})
                                </Typography>
                                <Typography variant='body2'>{item.after.bankName}</Typography>
                              </Box>
                            </Box>
                          </Grid>

                          <Grid item xs={12} sm={3}>
                            <Box className='flex flex-col item-center border-l  #E6E6E7 pl-4'>
                              <Box className='flex justify-between gap-2'>
                                <Box className='flex gap-2'>
                                  <i className='tabler-shield-check-filled' />
                                  <Typography>Move Condition:</Typography>
                                </Box>
                                <Typography>Move All</Typography>
                              </Box>
                              <Box className='flex justify-between gap-2'>
                                <Box className='flex gap-2'>
                                  <i className='tabler-cash' />
                                  <Typography>Move Amount:</Typography>
                                </Box>
                                <Typography>
                                  $
                                  {Number(item.moveAmount).toLocaleString('en-US', {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 2
                                  })}
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                )
              })}
          </Grid>
        </TabPanel>
      </Box>
    </TabContext>
  )
}

export default TrasactionAccountList
