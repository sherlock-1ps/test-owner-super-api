// MUI Imports
'use client'

import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'

import SettingWebsite from './SettingWebsite'
import ExampleSettingWebsite from './ExampleSettingWebsite'

const WebsiteComponent = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4'>ตั้งค่าเว็บไซด์</Typography>
      </Grid>
      <Grid item xs={12} sm={8}>
        <SettingWebsite />
      </Grid>
      <Grid item xs={12} sm={4}>
        <ExampleSettingWebsite />
      </Grid>
    </Grid>
  )
}

export default WebsiteComponent
