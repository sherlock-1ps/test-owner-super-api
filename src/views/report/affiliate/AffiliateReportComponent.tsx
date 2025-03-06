// MUI Imports
'use client'

import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'
import AffiliateReportList from './AffiliateReportList'

const AffiliateReportComponent = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4'>Affiliate Report</Typography>
      </Grid>
      <Grid item xs={12} sm>
        <AffiliateReportList />
      </Grid>
    </Grid>
  )
}

export default AffiliateReportComponent
