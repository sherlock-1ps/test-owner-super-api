// MUI Imports
'use client'

import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'

import SettingProvider from './SettingProvider'

const ProviderComponent = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4'>Provider Setting</Typography>
      </Grid>
      <Grid item xs={12} sm>
        <SettingProvider />
      </Grid>
    </Grid>
  )
}

export default ProviderComponent
