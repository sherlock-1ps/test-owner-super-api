// React Imports
import { useState } from 'react'
import type { SyntheticEvent } from 'react'

// MUI Imports
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import { Box, Card, CardContent, Grid, InputAdornment } from '@mui/material'

import AffiliatePaymentSetting from '../accordion/AccordionAffiliatePaymentSetting'
import CustomTextField from '@/@core/components/mui/TextField'
import SettingAffiliateByProvider from '@/views/setting/affiliate/SettingAffiliateByProvider'

const TabsSettingAffiliate = () => {
  // States
  const [value, setValue] = useState<string>('1')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Card className=' w-full ' sx={{ overflow: 'visible' }}>
      <CardContent className='w-full flex flex-col'>
        <TabContext value={value}>
          <TabList onChange={handleChange}>
            <Tab value='1' label='ตั้งค่าภาพรวม' />
            <Tab value='2' label='ตั้งค่าแยกค่ายเกม' />
          </TabList>
          <TabPanel value='1' className='flex flex-col gap-2'>
            <Typography variant='h6'>เลือกช่วงเวลาจ่ายเงินค่าแนะนำ</Typography>
            <AffiliatePaymentSetting />
            <Box
              sx={{
                borderTop: '1px solid #E6E6E7',
                paddingTop: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}
            >
              <Typography variant='h6'>จำนวนลิมิตค่าแนะนำ</Typography>
              <Grid container className='flex  gap-2'>
                <Grid item xs={12} sm={4} md={2}>
                  <CustomTextField
                    fullWidth
                    label='จำนวนค่าแนะนำต่ำสุด'
                    InputProps={{
                      startAdornment: <InputAdornment position='start'>$</InputAdornment>
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={2}>
                  <CustomTextField
                    fullWidth
                    label='จำนวนค่าแนะนำสูงสุด'
                    InputProps={{
                      startAdornment: <InputAdornment position='start'>$</InputAdornment>
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </TabPanel>
          <TabPanel value='2' sx={{ paddingTop: '0rem !important' }}>
            <SettingAffiliateByProvider />
          </TabPanel>
        </TabContext>
      </CardContent>
    </Card>
  )
}

export default TabsSettingAffiliate
