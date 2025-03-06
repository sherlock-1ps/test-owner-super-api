// MUI Imports
'use client'

import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'
import PromotionReportList from './PromotionReportList'

const PromotionReportComponent = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4'>Promotion Report</Typography>
      </Grid>
      <Grid item xs={12} sm>
        <PromotionReportList />
      </Grid>
    </Grid>
  )
}

export default PromotionReportComponent
