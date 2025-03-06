// MUI Imports
'use client'

import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'
import CashBackReportList from './CashBackReportList'

const CashBackReportComponent = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4'>Cashback Report</Typography>
      </Grid>
      <Grid item xs={12} sm>
        <CashBackReportList />
      </Grid>
    </Grid>
  )
}

export default CashBackReportComponent
