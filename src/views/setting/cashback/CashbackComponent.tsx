// MUI Imports
'use client'

import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'

import TabsSettingCashback from '@/components/tabs/TabsSettingCashback'

const CashbackComponent = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4'>ตั้งค่าระบบแคสแบ็ค</Typography>
      </Grid>
      <Grid item xs={12} sm>
        <TabsSettingCashback />
      </Grid>
    </Grid>
  )
}

export default CashbackComponent
