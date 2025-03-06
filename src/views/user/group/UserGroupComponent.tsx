// MUI Imports
'use client'

import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'
import UserGroupList from './UserGroupList'

const UserGroupComponent = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4'>User Group</Typography>
      </Grid>
      <Grid item xs={12} sm>
        <UserGroupList />
      </Grid>
    </Grid>
  )
}

export default UserGroupComponent
