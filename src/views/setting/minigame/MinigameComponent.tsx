// MUI Imports
'use client'

import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'

import TabsSettingCashback from '@/components/tabs/TabsSettingCashback'
import SettingMinigame from './SettingMinigame'

const MinigameComponent = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4'>ตั้งค่าระบบมินิเกม</Typography>
      </Grid>
      <Grid item xs={12} sm>
        <SettingMinigame />
      </Grid>
    </Grid>
  )
}

export default MinigameComponent
