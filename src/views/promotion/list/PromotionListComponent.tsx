// MUI Imports
'use client'

import { Button } from '@mui/material'
import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'

import PromotionList from './PromotionList'

const PromotionListComponent = () => {
  return (
    <Grid container spacing={6}>
      <Grid
        item
        xs={12}
        className='flex items-center justify-between'
        sx={{
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2, sm: 0 },
          alignItems: { xs: 'flex-start', sm: 'center' }
        }}
      >
        <Typography variant='h4'>รายการโปรโมชั่น</Typography>
        <Button
          variant='contained'
          startIcon={<i className='tabler-plus' />}
          className='max-sm:is-full'
          onClick={() => {}}
        >
          สร้างโปรโมชั่น
        </Button>
      </Grid>
      <Grid item xs={12} sm>
        <PromotionList />
      </Grid>
    </Grid>
  )
}

export default PromotionListComponent
