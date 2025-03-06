// MUI Imports
'use client'

import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'

import UserReportList from './UserReportList'

const UserReportComponent = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4'>Player Report</Typography>
      </Grid>
      <Grid item xs={12} sm>
        <UserReportList />
      </Grid>
    </Grid>
  )
}

export default UserReportComponent
