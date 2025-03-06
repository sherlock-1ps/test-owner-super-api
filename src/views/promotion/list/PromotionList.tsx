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
      image: 'news'
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
      image: 'news'
    }
  ]
}

const PromotionList = () => {
  // States
  const theme = useTheme()
  const { showDialog } = useDialog()
  const [data, setData] = useState(dataMockup1)

  return (
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
  )
}

export default PromotionList
