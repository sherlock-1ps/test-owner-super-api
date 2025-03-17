// MUI Imports
'use client'

import CustomTextField from '@/@core/components/mui/TextField'
import { Button, Card, CardContent, Divider, IconButton, InputAdornment, MenuItem } from '@mui/material'
import type { TextFieldProps } from '@mui/material/TextField'
import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import PermissionList from './PermissionList'

const RoleManageRoleComponent = () => {
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
              Create Role
            </Typography>
          </Grid>
          <Divider />
          <Grid container alignItems='end' className='flex gap-6'>
            <Grid item xs={12} sm={3}>
              <CustomTextField fullWidth label='Role Name' />
            </Grid>
            <Grid item xs={12} sm={2}>
              <CustomTextField select fullWidth defaultValue={10} label='Role Level'>
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>All</MenuItem>
              </CustomTextField>
            </Grid>

            <Grid item xs={12} sm>
              <CustomTextField fullWidth label='Description' />
            </Grid>
          </Grid>
          <Grid item xs={12} sm>
            <Typography variant='h6'>Permission</Typography>
          </Grid>
          <Grid item xs={12}>
            <PermissionList />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default RoleManageRoleComponent
