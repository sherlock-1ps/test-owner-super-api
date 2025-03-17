// MUI Imports
'use client'

import CustomTextField from '@/@core/components/mui/TextField'
import { Button, Card, CardContent, Chip, Divider, IconButton, InputAdornment, MenuItem } from '@mui/material'
import type { SelectChangeEvent } from '@mui/material/Select'
import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ProviderLogo from './ProviderLogo'

const names = ['slot', 'casino', 'sport', 'lotto']

const AddProviderComponent = () => {
  const router = useRouter()
  const [providerType, setProviderType] = useState<string[]>([])

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const value = event.target.value as string[]
    setProviderType(value)
  }

  return (
    <Card>
      <CardContent>
        <Grid container className='flex flex-col gap-6'>
          <Grid item xs={12} sm className='flex gap-2 justify-between'>
            <Typography variant='h5' className=' text-nowrap'>
              Add Provider
            </Typography>
          </Grid>
          <Divider />
          <Grid container className='flex gap-6'>
            <Grid item xs={12} sm={4}>
              <ProviderLogo />
            </Grid>
            <Grid item xs className='flex flex-col gap-6'>
              <div className='flex gap-6'>
                <CustomTextField fullWidth type='text' label='Provider Name' placeholder='' />
                <CustomTextField fullWidth type='text' label='Provider Code' placeholder='' />
              </div>
              <div className='flex gap-6'>
                <CustomTextField
                  select
                  fullWidth
                  SelectProps={{
                    onChange: handleChange,
                    multiple: true,
                    renderValue: (selected: unknown) => {
                      const selectedValues = selected as string[]
                      const maxDisplayCount = 3 // Set the max number of items to display before truncating

                      return (
                        <div className='flex gap-1 flex-wrap'>
                          {selectedValues.slice(0, maxDisplayCount).map(value => (
                            <Chip key={value} label={value} size='small' />
                          ))}
                          {selectedValues.length > maxDisplayCount && (
                            <Chip label={`+${selectedValues.length - maxDisplayCount} more`} size='small' />
                          )}
                        </div>
                      )
                    }
                  }}
                  label='Provider Type'
                  value={providerType}
                >
                  {names.map(name => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </CustomTextField>

                <CustomTextField
                  select
                  fullWidth
                  SelectProps={{
                    onChange: handleChange,
                    multiple: true,
                    renderValue: (selected: unknown) => {
                      const selectedValues = selected as string[]
                      const maxDisplayCount = 3 // Set the max number of items to display before truncating

                      return (
                        <div className='flex gap-1 flex-wrap'>
                          {selectedValues.slice(0, maxDisplayCount).map(value => (
                            <Chip key={value} label={value} size='small' />
                          ))}
                          {selectedValues.length > maxDisplayCount && (
                            <Chip label={`+${selectedValues.length - maxDisplayCount} more`} size='small' />
                          )}
                        </div>
                      )
                    }
                  }}
                  label='Currency'
                  value={providerType}
                >
                  {names.map(name => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </CustomTextField>

                <CustomTextField type='text' label='Share %' placeholder='' />
              </div>
            </Grid>
          </Grid>
          <CustomTextField fullWidth type='text' label='External secret key' placeholder='' />
          <CustomTextField fullWidth type='text' label='Encrypt key' placeholder='' />
          <CustomTextField fullWidth type='text' label='Remark' placeholder='' />
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              rows={10}
              multiline
              label='Auto scale config'
              placeholder=''
              sx={{ '& .MuiInputBase-root.MuiFilledInput-root': { alignItems: 'baseline' } }}
            />
          </Grid>

          <Grid item xs={12}>
            <div className='flex gap-2  justify-end '>
              <Button
                variant='outlined'
                color='primary'
                onClick={() => {
                  router.back()
                }}
              >
                Cancel
              </Button>
              <Button variant='contained' color='primary'>
                Add Provider
              </Button>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default AddProviderComponent
