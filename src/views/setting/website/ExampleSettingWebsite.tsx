// MUI Imports
'use client'

import { Card, CardContent } from '@mui/material'
import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'

const ExampleSettingWebsite = () => {
  return (
    <Card className='min-h-40 h-full'>
      <CardContent className='h-full gap-4 flex flex-col'>
        <Typography variant='h5'>ข้อมูลทั่วไป</Typography>
        <Grid container spacing={2} alignItems='center'>
          <Grid item xs={12} sm>
            <img
              src='/images/setting-website/exampleDesign.png'
              alt='example website'
              width='100%'
              style={{ borderRadius: '8px' }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ExampleSettingWebsite
