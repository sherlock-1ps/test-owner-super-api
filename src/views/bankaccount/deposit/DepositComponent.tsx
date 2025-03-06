// MUI Imports
'use client'

import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'

import DepositList from './DepositList'

const DepositComponent = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4'>Bank Account for Deposit</Typography>
      </Grid>
      <Grid item xs={12} sm>
        <DepositList />
      </Grid>
    </Grid>
  )
}

export default DepositComponent
