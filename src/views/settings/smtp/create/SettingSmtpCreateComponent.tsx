// MUI Imports
'use client'

import CustomTextField from '@/@core/components/mui/TextField'
import { Button, Card, CardContent, Divider, IconButton, InputAdornment, MenuItem } from '@mui/material'
import type { TextFieldProps } from '@mui/material/TextField'
import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

const SettingSmtpCreateComponent = () => {
  const router = useRouter()
  const params = useParams()

  const [isPasswordShown, setIsPasswordShown] = useState(false)

  // Vars
  const { lang: locale } = params

  return (
    <Card>
      <CardContent>
        <Grid container className='flex flex-col gap-6'>
          <Grid item xs={12} sm className='flex gap-2 justify-between'>
            <Typography variant='h5' className=' text-nowrap'>
              Add New SMTP Server
            </Typography>
          </Grid>
          <Divider />
          <form className='flex flex-col gap-4'>
            <Grid container alignItems='end' className='flex gap-6'>
              <Grid item xs={12} sm>
                <CustomTextField fullWidth label='Host' />
              </Grid>
              <Grid item xs={12} sm>
                <CustomTextField fullWidth label='Port' />
              </Grid>

              <Grid container alignItems='end' className='flex gap-6'>
                <Grid item xs={12} sm>
                  <CustomTextField fullWidth label='SMTP Username' />
                </Grid>
                <Grid item xs={12} sm>
                  <CustomTextField
                    fullWidth
                    label='Password'
                    type={isPasswordShown ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={() => setIsPasswordShown(!isPasswordShown)}
                            onMouseDown={e => e.preventDefault()}
                          >
                            <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container alignItems='end' className='flex gap-6'>
                <Grid item xs={12} sm>
                  <CustomTextField fullWidth label='Sender Name' />
                </Grid>
                <Grid item xs={12} sm>
                  <CustomTextField fullWidth label='Form Email Address' />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm>
              <div className='flex gap-4 justify-end'>
                <Button
                  variant='outlined'
                  onClick={() => {
                    router.back()
                  }}
                >
                  Cancel
                </Button>
                <Button variant='contained'> Add SMTP Server</Button>
              </div>
            </Grid>
          </form>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default SettingSmtpCreateComponent
