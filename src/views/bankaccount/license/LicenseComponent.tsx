// MUI Imports
'use client'

import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'

import LicenseList from './LicenseList'

const LicenseComponent = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4'>Auto License</Typography>
      </Grid>
      <Grid item xs={12} sm>
        <LicenseList />
      </Grid>
    </Grid>
  )
}

export default LicenseComponent
