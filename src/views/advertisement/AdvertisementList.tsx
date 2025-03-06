// React Imports
import { useState } from 'react'
import type { SyntheticEvent } from 'react'

// MUI Imports
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  FormControlLabel,
  FormGroup,
  Grid,
  InputAdornment
} from '@mui/material'

import { alpha, useTheme } from '@mui/material/styles'

import CustomTabList from '@/@core/components/mui/TabList'
import { useDialog } from '@/hooks/useDialog'
import MenuOptions from '@/components/options/MenuOptions'
import ConfirmAlert from '@/components/dialogs/alerts/ConfirmAlert'
import ManageAdvertiseDialog from '@/components/dialogs/advertisement/ManageAdvertiseDialog'

const dataMockup1 = {
  news: [
    {
      id: 1,
      title: 'เปิดใหม่ แจกจัดเต็ม',
      isActive: false,
      start: '4 กุมภาพันธ์ 2568 11:00',
      end: '5 กุมภาพันธ์ 2568 23:00',
      image: 'news5'
    },
    {
      id: 2,
      title: 'เติมปุบ รับปับ',
      isActive: true,
      start: '16 มกราคา 2567 18:00',
      end: '16 มกราคา 2567 20:00',
      image: 'news'
    },
    {
      id: 3,
      title: 'Oneplaybet No1 แจกไม่อั้น',
      isActive: true,
      start: '16 มกราคา 2567 18:00',
      end: '16 มกราคา 2567 20:00',
      image: 'news3'
    },
    {
      id: 4,
      title: 'Huay V2 เปิดบริการแล้ว!',
      isActive: true,
      start: '16 มกราคา 2567 18:00',
      end: '31 มกราคา 2567 20:00',
      image: 'news4'
    }
  ],
  banner: [
    {
      id: 1,
      title: 'เกมใหม่ PG มาแล้ววันนี้',
      isActive: true,
      start: '1 มกราคม 2567 00:00',
      end: '31 มกราคม 2567 14:00',
      image: 'news5'
    },
    {
      id: 2,
      title: 'พริตตี้มาเอง Oneplaybet ใจใหญ่',
      isActive: false,
      start: '15 ธันวาคม 2567 18:00',
      end: '16 ธันวาคม 2567 20:00',
      image: 'news'
    }
  ],
  affiliate: [
    {
      id: 1,
      title: 'เปิดใหม่ แจกจัดเต็ม',
      isActive: false,
      start: '4 กุมภาพันธ์ 2568 11:00',
      end: '5 กุมภาพันธ์ 2568 23:00',
      image: 'news'
    },
    {
      id: 2,
      title: 'เติมปุบ รับปับ',
      isActive: true,
      start: '16 มกราคา 2567 18:00',
      end: '16 มกราคา 2567 20:00',
      image: 'news5'
    },
    {
      id: 3,
      title: 'Oneplaybet No1 แจกไม่อั้น',
      isActive: true,
      start: '16 มกราคา 2567 18:00',
      end: '16 มกราคา 2567 20:00',
      image: 'news3'
    }
  ],
  cashback: [
    {
      id: 1,
      title: 'เปิดใหม่ แจกจัดเต็ม',
      isActive: false,
      start: '4 กุมภาพันธ์ 2568 11:00',
      end: '5 กุมภาพันธ์ 2568 23:00',
      image: 'news4'
    }
  ]
}

const AdvertisementList = () => {
  // States
  const theme = useTheme()
  const { showDialog } = useDialog()
  const [value, setValue] = useState<string>('1')
  const [data, setData] = useState(dataMockup1)

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
                <Card sx={{ backgroundColor: alpha(theme.palette.secondary.main, 0.2) }}>
                  <CustomTabList pill='true' onChange={handleChange}>
                    <Tab value='1' label='ข่าวสาร' />
                    <Tab value='2' label='แบนเนอร์' />
                    <Tab value='3' label='แนะนำเพื่อน' />
                    <Tab value='4' label='แคชแบ็ค' />
                  </CustomTabList>
                </Card>

                <Grid item xs='auto' textAlign='right'>
                  <Button
                    variant='contained'
                    startIcon={<i className='tabler-plus' />}
                    className='max-sm:is-full'
                    onClick={() => {
                      showDialog({
                        id: 'CreateAdvertise',
                        component: (
                          <ManageAdvertiseDialog id={'CreateAdvertise'} title={'สร้างโฆษณา'} onClick={() => {}} />
                        )
                      })
                    }}
                  >
                    สร้างโฆษณา
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <TabPanel value='1'>
          <Grid container spacing={4}>
            {data.news.map((item, index) => {
              return (
                <Grid item xs={12} sm={4} key={index}>
                  <Card className='flex flex-col h-full'>
                    <CardContent className='flex flex-col flex-grow gap-2'>
                      <Box className='flex items-center justify-between gap-2'>
                        <Typography variant='h5'>{item.title}</Typography>
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
                                  id: `alertDialogDeleteNews${index}`,
                                  component: (
                                    <ConfirmAlert
                                      id={`alertDialogDeleteNews${index}`}
                                      title={'Are you sure to delete'}
                                      content='delete this Advertise ?'
                                      onClick={async () => {}}
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
                        label={item.isActive ? 'แสดงอยู่' : 'ปิดอยู่'}
                        color={item.isActive ? 'success' : 'error'}
                        variant={'tonal'}
                        size='medium'
                        className='w-full'
                      />
                      <Typography>เริ่ม : {item.start}</Typography>
                      <Typography>ถึง : {item.end}</Typography>
                      <div className='flex h-full flex-1 items-center'>
                        <img
                          src={`/images/advertisement/${item.image}Image.png`}
                          width={'100%'}
                          alt='image-advertisement'
                          className=' rounded'
                        />
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </TabPanel>
        <TabPanel value='2'>
          <Grid container spacing={4}>
            {data.banner.map((item, index) => {
              return (
                <Grid item xs={12} sm={4} key={index}>
                  <Card className='flex flex-col h-full'>
                    <CardContent className='flex flex-col flex-grow gap-2'>
                      <Box className='flex items-center justify-between gap-2'>
                        <Typography variant='h5'>{item.title}</Typography>
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
                                  id: `alertDialogDeleteNews${index}`,
                                  component: (
                                    <ConfirmAlert
                                      id={`alertDialogDeleteNews${index}`}
                                      title={'Are you sure to delete'}
                                      content='delete this Advertise ?'
                                      onClick={async () => {}}
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
                        label={item.isActive ? 'แสดงอยู่' : 'ปิดอยู่'}
                        color={item.isActive ? 'success' : 'error'}
                        variant={'tonal'}
                        size='medium'
                        className='w-full'
                      />
                      <Typography>เริ่ม : {item.start}</Typography>
                      <Typography>ถึง : {item.end}</Typography>
                      <div className='flex h-full flex-1 items-center'>
                        <img
                          src={`/images/advertisement/${item.image}Image.png`}
                          width={'100%'}
                          alt='image-advertisement'
                          className=' rounded'
                        />
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </TabPanel>
        <TabPanel value='3'>
          <Grid container spacing={4}>
            {data.affiliate.map((item, index) => {
              return (
                <Grid item xs={12} sm={4} key={index}>
                  <Card className='flex flex-col h-full'>
                    <CardContent className='flex flex-col flex-grow gap-2'>
                      <Box className='flex items-center justify-between gap-2'>
                        <Typography variant='h5'>{item.title}</Typography>
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
                                  id: `alertDialogDeleteNews${index}`,
                                  component: (
                                    <ConfirmAlert
                                      id={`alertDialogDeleteNews${index}`}
                                      title={'Are you sure to delete'}
                                      content='delete this Advertise ?'
                                      onClick={async () => {}}
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
                        label={item.isActive ? 'แสดงอยู่' : 'ปิดอยู่'}
                        color={item.isActive ? 'success' : 'error'}
                        variant={'tonal'}
                        size='medium'
                        className='w-full'
                      />
                      <Typography>เริ่ม : {item.start}</Typography>
                      <Typography>ถึง : {item.end}</Typography>
                      <div className='flex h-full flex-1 items-center'>
                        <img
                          src={`/images/advertisement/${item.image}Image.png`}
                          width={'100%'}
                          alt='image-advertisement'
                          className=' rounded'
                        />
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </TabPanel>
        <TabPanel value='4'>
          <Grid container spacing={4}>
            {data.cashback.map((item, index) => {
              return (
                <Grid item xs={12} sm={4} key={index}>
                  <Card className='flex flex-col h-full'>
                    <CardContent className='flex flex-col flex-grow gap-2'>
                      <Box className='flex items-center justify-between gap-2'>
                        <Typography variant='h5'>{item.title}</Typography>
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
                                  id: `alertDialogDeleteNews${index}`,
                                  component: (
                                    <ConfirmAlert
                                      id={`alertDialogDeleteNews${index}`}
                                      title={'Are you sure to delete'}
                                      content='delete this Advertise ?'
                                      onClick={async () => {}}
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
                        label={item.isActive ? 'แสดงอยู่' : 'ปิดอยู่'}
                        color={item.isActive ? 'success' : 'error'}
                        variant={'tonal'}
                        size='medium'
                        className='w-full'
                      />
                      <Typography>เริ่ม : {item.start}</Typography>
                      <Typography>ถึง : {item.end}</Typography>
                      <div className='flex h-full flex-1 items-center'>
                        <img
                          src={`/images/advertisement/${item.image}Image.png`}
                          width={'100%'}
                          alt='image-advertisement'
                          className=' rounded'
                        />
                      </div>
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

export default AdvertisementList
