// MUI Imports
'use client'

import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'

import GroupDepositList from './GroupDepositList'

const GroupDepositComponent = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4'>Group Deposit Account</Typography>
      </Grid>
      <Grid item xs={12} sm>
        <GroupDepositList />
      </Grid>
    </Grid>
  )
}

export default GroupDepositComponent
