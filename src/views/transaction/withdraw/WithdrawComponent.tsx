// MUI Imports
'use client'

import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'
import TransactionManagementTable from '../deposit/TransactionManagementTable'
import WithdrawTransactionSummary from './WithdrawTransactionSummary'

const WithdrawComponent = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4'>Transaction Withdraw</Typography>
      </Grid>
      <Grid item xs={12} md={12}>
        <WithdrawTransactionSummary />
      </Grid>
      <Grid item xs={12} md={12}>
        <TransactionManagementTable title={'withdraw'} />
      </Grid>
    </Grid>
  )
}

export default WithdrawComponent
