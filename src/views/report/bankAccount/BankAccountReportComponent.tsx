// MUI Imports
'use client'

import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'
import BankAccountReportList from './BankAccountReportList'

const BankAccountReportComponent = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4'>Bank Account Report</Typography>
      </Grid>
      <Grid item xs={12} sm>
        <BankAccountReportList />
      </Grid>
    </Grid>
  )
}

export default BankAccountReportComponent
