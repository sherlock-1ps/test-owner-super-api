// MUI Imports
'use client'

import { Card, CardContent, MenuItem } from '@mui/material'

import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'

import CustomTextField from '@/@core/components/mui/TextField'
import ColorToneComponent from '@/components/colorTone/ColorToneComponent'
import CustomHorizontalRadio from '@/components/radio/CustomHorizontalRadio'

const SettingWebsite = () => {
  return (
    <Card className='min-h-40 '>
      <CardContent className='gap-4 flex flex-col'>
        <Typography variant='h5'>ข้อมูลทั่วไป</Typography>
        <Grid container spacing={2} alignItems='center'>
          <Grid item xs={12} sm>
            <CustomTextField fullWidth label='ชื่อเว็บไซด์ ภาษาอังกฤษ' placeholder='Website english name' />
          </Grid>
          <Grid item xs={12} sm>
            <CustomTextField fullWidth label='ชื่อเว็บไซด์ ภาษาไทย' placeholder='Website thai name' />
          </Grid>
        </Grid>
        <Grid item xs={12} sm>
          <CustomTextField fullWidth label='ไตเติ้ลเว็บไซด์' placeholder='ไตเติ้ลเว็บไซด์' />
        </Grid>

        <div className='border-t border-b #E6E6E7 py-3'>
          <Typography variant='h5'>รูปภาพและโลโก้</Typography>

          <Grid item xs={12} sm>
            <img src='/images/setting-website/demoLogo.png' className='' alt='example website' width='100%' />
          </Grid>
        </div>

        <div className='flex flex-col gap-3'>
          <Typography variant='h5'>รูปแบบฟ้อนข้อความ</Typography>

          <Grid item xs={12} sm={6}>
            <CustomTextField select fullWidth label='' value={'kanit'}>
              <MenuItem value='kanit'>Kanit</MenuItem>
              <MenuItem value='thaiFont'>Thai Font</MenuItem>
              <MenuItem value='sarabun'>Sarabun</MenuItem>
            </CustomTextField>
          </Grid>

          <Typography variant='h5'>รูปแบบสี</Typography>
          <ColorToneComponent />
          <Typography variant='h5'>รูปแบบไอคอน</Typography>
          <CustomHorizontalRadio />
        </div>
      </CardContent>
    </Card>
  )
}

export default SettingWebsite
