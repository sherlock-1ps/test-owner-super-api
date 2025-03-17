// MUI Imports
'use client'

import CustomTextField from '@/@core/components/mui/TextField'
import { Button, Card, CardContent, Divider, IconButton, InputAdornment, MenuItem } from '@mui/material'
import type { TextFieldProps } from '@mui/material/TextField'
import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import AccountOwnerTable from './AccountOwnerTable'

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

const AccountOwnerComponent = () => {
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
              Owner Account List
            </Typography>
            <Button
              variant='contained'
              onClick={() => {
                router.push(`/${locale}/account/owner/createowner`)
              }}
            >
              Create Account
            </Button>
          </Grid>
          <Divider />
          <Grid container alignItems='end' className='flex gap-6'>
            <Grid item xs={12} sm>
              <DebouncedInput
                value={''}
                placeholder='Search Username'
                onChange={() => {}}
                className='w-full'
                isIcon={true}
                label='Username'
              />
            </Grid>
            <Grid item xs={12} sm>
              <CustomTextField select fullWidth defaultValue={10} label='Select Role'>
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>All</MenuItem>
              </CustomTextField>
            </Grid>

            <Button variant='contained'>Search</Button>
          </Grid>
          <Grid item xs={12}>
            <AccountOwnerTable />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default AccountOwnerComponent
