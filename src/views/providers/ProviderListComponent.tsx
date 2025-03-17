// MUI Imports
'use client'

import CustomTextField from '@/@core/components/mui/TextField'
import { Button, Card, CardContent, Divider, IconButton, InputAdornment, MenuItem } from '@mui/material'
import type { TextFieldProps } from '@mui/material/TextField'
import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import ProviderListTable from './ProviderListTable'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  isIcon,
  ...props
}: {
  value: string | number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  debounce?: number
  isIcon?: boolean
} & Omit<TextFieldProps, 'onChange'>) => {
  const [value, setValue] = useState<string | number>(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fakeEvent = {
        target: { value }
      } as React.ChangeEvent<HTMLInputElement>

      onChange(fakeEvent)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value, debounce, onChange])

  return (
    <CustomTextField
      {...props}
      value={value}
      onChange={e => setValue(e.target.value)}
      InputProps={{
        endAdornment: isIcon ? (
          <InputAdornment position='end'>
            <IconButton onClick={() => {}}>
              <i className='tabler-search' />
            </IconButton>
          </InputAdornment>
        ) : null
      }}
    />
  )
}

const ProviderListComponent = () => {
  const router = useRouter()
  const params = useParams()

  const { lang: locale } = params

  return (
    <Card>
      <CardContent>
        <Grid container className='flex flex-col gap-6'>
          <Grid item xs={12} sm className='flex gap-2 justify-between'>
            <Typography variant='h5' className=' text-nowrap'>
              Provider List
            </Typography>
            <Button
              variant='contained'
              onClick={() => {
                router.push(`/${locale}/providers/addprovider`)
              }}
            >
              Add New Provider
            </Button>
          </Grid>
          <Divider />
          <Grid container spacing={4} alignItems='end'>
            <Grid item sm={12} md={3}>
              <Typography>Provider Name</Typography>
              <DebouncedInput
                value={''}
                placeholder='search provider'
                onChange={() => {}}
                className='w-full'
                isIcon={true}
              />
            </Grid>
            <Grid item sm={12} md={3}>
              <CustomTextField select fullWidth defaultValue={10} label='Select Type'>
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>All</MenuItem>
              </CustomTextField>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <ProviderListTable />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ProviderListComponent
