// MUI Imports
'use client'

import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'

import SettingLanguage from './SettingLanguage'

const LanguageComponent = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4'>ตั้งค่าภาษา</Typography>
      </Grid>
      <Grid item xs={12} sm>
        <SettingLanguage />
      </Grid>
    </Grid>
  )
}

export default LanguageComponent
