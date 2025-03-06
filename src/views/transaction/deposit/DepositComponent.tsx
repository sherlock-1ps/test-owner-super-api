// MUI Imports
'use client'

import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'

import DepositTransactionSummary from './DepositTransactionSummary'
import TransactionManagementTable from './TransactionManagementTable'

const DepositComponent = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4'>Transaction Deposit</Typography>
      </Grid>
      <Grid item xs={12} md={12}>
        <DepositTransactionSummary />
      </Grid>
      <Grid item xs={12} md={12}>
        <TransactionManagementTable title='deposit' />
      </Grid>
    </Grid>
  )
}

export default DepositComponent
