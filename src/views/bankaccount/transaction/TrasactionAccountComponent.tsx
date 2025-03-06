// MUI Imports
'use client'

import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'

import TrasactionAccountList from './TrasactionAccountList'

const TrasactionAccountComponent = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4'>Move Transaction</Typography>
      </Grid>
      <Grid item xs={12} sm>
        <TrasactionAccountList />
      </Grid>
    </Grid>
  )
}

export default TrasactionAccountComponent
