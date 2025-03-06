// MUI Imports
'use client'

import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'
import UserTagList from './UserTagList'

const UserTagComponent = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4'>User Tag</Typography>
      </Grid>
      <Grid item xs={12} sm>
        <UserTagList />
      </Grid>
    </Grid>
  )
}

export default UserTagComponent
