// MUI Imports
'use client'

import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'

import RestList from './RestList'

const RestComponent = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4'>Bank Account for Rest</Typography>
      </Grid>
      <Grid item xs={12} sm>
        <RestList />
      </Grid>
    </Grid>
  )
}

export default RestComponent
