// MUI Imports
'use client'

import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'

import WithdrawList from './WithdrawList'

const WithdrawComponent = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4'>Bank Account for Withdraw</Typography>
      </Grid>
      <Grid item xs={12} sm>
        <WithdrawList />
      </Grid>
    </Grid>
  )
}

export default WithdrawComponent
