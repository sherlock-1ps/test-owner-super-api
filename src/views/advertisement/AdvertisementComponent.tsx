// MUI Imports
'use client'

import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'

import AdvertisementList from './AdvertisementList'

const AdvertisementComponent = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4'>รายการโฆษณา</Typography>
      </Grid>
      <Grid item xs={12} sm>
        <AdvertisementList />
      </Grid>
    </Grid>
  )
}

export default AdvertisementComponent
