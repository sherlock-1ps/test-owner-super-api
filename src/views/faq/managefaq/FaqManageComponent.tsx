// MUI Imports
'use client'

import dynamic from 'next/dynamic'
import CustomTextField from '@/@core/components/mui/TextField'
import { Button, Card, CardContent, Divider, IconButton, InputAdornment, MenuItem } from '@mui/material'
import type { TextFieldProps } from '@mui/material/TextField'
import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

const HtmlEditor = dynamic(() => import('@/components/lib/htmlEditor'), { ssr: false })
const FaqManageComponent = () => {
  const router = useRouter()
  const params = useParams()

  // Vars
  const { lang: locale } = params

  return (
    <Card>
      <CardContent>
        <Grid container className='flex flex-col gap-6'>
          <Grid item xs={12} sm className='flex gap-2 justify-between'>
            <Typography variant='h5' className=' text-nowrap'>
              Add New FAQ
            </Typography>
          </Grid>
          <Divider />
          <Grid container alignItems='end' className='flex gap-6'>
            <Grid item xs={12} sm>
              <CustomTextField fullWidth label='Question' />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <HtmlEditor />
          </Grid>
          <Grid item xs={12}>
            <div className='flex gap-4 justify-end'>
              <Button
                variant='outlined'
                onClick={() => {
                  router.back()
                }}
              >
                Cancel
              </Button>
              <Button variant='contained'>Add Faq</Button>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default FaqManageComponent
