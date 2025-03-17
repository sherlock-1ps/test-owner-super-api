// MUI Imports
'use client'

import CustomerStats from '@/components/card-statistics/CustomerStats'
import SalesOverview from '@/views/pages/widget-examples/statistics/SalesOverview'
import { Button, Card, CardContent, Chip, Divider, IconButton, InputAdornment } from '@mui/material'
import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'

import { useParams, useSearchParams } from 'next/navigation'
import CustomTextField from '@/@core/components/mui/TextField'
import { getGroupLabelPlayer, getGroupPlayerGradient } from '@/utils/getGroupPlayer'
import { getTagLabelPlayer, getTagPlayerGradient } from '@/utils/getTagPlayer'
import ConfirmAlert from '@/components/dialogs/alerts/ConfirmAlert'
import { useDialog } from '@/hooks/useDialog'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { TextFieldProps } from '@mui/material'
import ProviderNameTable from './ProviderNameTable'

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

const ProviderNameComponent = () => {
  const { showDialog } = useDialog()
  const searchParams = useSearchParams()
  const provider = searchParams.get('provider')
  const params = useParams()

  // Vars
  const { lang: locale } = params

  return (
    <div className='flex flex-col gap-6'>
      <Grid container spacing={6} className='flex sm:flex-col md:flex-row'>
        <Grid item xs={12}>
          <Card>
            <CardContent className='flex flex-col gap-6'>
              <div className='flex gap-2 items-center w-full'>
                <Link href={`/${locale}/providers`} className='flex gap-2 items-center'>
                  <i className='tabler-crown text-[25px] text-primary' />
                  <Typography variant='h6' color={'primary'}>
                    Provider List
                  </Typography>
                </Link>
                /<Typography variant='h6'>{provider}</Typography>
              </div>

              <div className='flex gap-6 h-[80px]'>
                <img
                  src='/images/avatars/1.png'
                  className='w-[80px] h-full rounded-md overflow-hidden'
                  alt='logoProvider'
                />
                <div className='flex flex-col justify-between'>
                  <Typography variant='h2'>{provider}</Typography>

                  <Typography color={'secondary'}>PG SLOTS</Typography>
                </div>
              </div>
              <Divider />

              <div className='flex gap-2 items-center justify-between'>
                <div>
                  <Typography>Game Name</Typography>
                  <DebouncedInput
                    value={''}
                    placeholder='Search Game'
                    onChange={() => {}}
                    className='w-full'
                    isIcon={true}
                  />
                </div>

                <Button variant='contained'>Search</Button>
              </div>

              <ProviderNameTable />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default ProviderNameComponent
