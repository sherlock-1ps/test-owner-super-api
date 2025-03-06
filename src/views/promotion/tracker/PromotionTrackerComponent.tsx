// MUI Imports
'use client'

import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'

import PromotionTracker from './PromotionTracker'

const PromotionTrackerComponent = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4'>Promotion Tracker</Typography>
      </Grid>
      <Grid item xs={12} sm>
        <PromotionTracker />
      </Grid>
    </Grid>
  )
}

export default PromotionTrackerComponent
