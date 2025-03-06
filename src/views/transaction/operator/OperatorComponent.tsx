// MUI Imports
'use client'

import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'
import OperatorList from './OperatorList'

const OperatorComponent = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4'>Transaction Operator</Typography>
      </Grid>
      <Grid item xs={12} sm>
        <OperatorList />
      </Grid>
    </Grid>
  )
}

export default OperatorComponent
