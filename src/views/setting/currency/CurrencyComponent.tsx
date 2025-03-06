// MUI Imports
'use client'

import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'

import SettingCurrency from './SettingCurrency'

const CurrencyComponent = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4'>ตั้งค่าสกุลเงิน</Typography>
      </Grid>
      <Grid item xs={12} sm>
        <SettingCurrency />
      </Grid>
    </Grid>
  )
}

export default CurrencyComponent
