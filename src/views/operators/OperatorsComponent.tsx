// MUI Imports
'use client'

import CustomTextField from '@/@core/components/mui/TextField'
import { Button, Card, CardContent, Divider, IconButton, InputAdornment, MenuItem } from '@mui/material'
import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import OperatorsListTable from './OperatorsListTable'
import {
  useFetchCountryOperatorQueryOption,
  useFetchCurrencyOperatorQueryOption,
  useFetchOperatorQueryOption,
  useFetchTimezoneOperatorQueryOption,
  useSearchOperatorMutationOption
} from '@/queryOptions/operator/operatorQueryOptions'
import { useDictionary } from '@/contexts/DictionaryContext'
import { useHasPermission } from '@/hooks/useHasPermission'

const OperatorsComponent = () => {
  const router = useRouter()
  const params = useParams()
  const { dictionary } = useDictionary()
  const { hasPermission } = useHasPermission()
  // Vars
  const { lang: locale } = params

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [search, setSearch] = useState('')
  const [currency, setCurrency] = useState('all')
  const [timezone, setTimezone] = useState('all')
  const [country, setCountry] = useState('all')

  const {
    data: operatorsData,
    isPending: pendingOperatorsData,
    error: errorOpeatorsData,
    refetch
  } = useFetchOperatorQueryOption(page, pageSize)

  const { data: currencyList, isPending: pendingCurrency } = useFetchCurrencyOperatorQueryOption()

  const { data: timezoneList, isPending: pendingTimezone } = useFetchTimezoneOperatorQueryOption()

  const { data: countryList, isPending: pendingCountry } = useFetchCountryOperatorQueryOption()

  const {
    mutate,
    data: searchOperatorsData,
    isPending: pendingSearchOperatorData,
    reset
  } = useSearchOperatorMutationOption()

  const handleSearch = () => {
    mutate({ page: 1, pageSize, search, currency, timezone, country })
  }

  const handleReset = () => {
    setPage(1)
    setSearch('')
    setCurrency('all')
    setTimezone('all')
    setCountry('all')
    reset()
    refetch()
  }

  return (
    <Card>
      <CardContent>
        <Grid container className='flex flex-col gap-6'>
          <Grid item xs={12} sm className='flex gap-2 justify-between'>
            <Typography variant='h5' className=' text-nowrap'>
              {dictionary['operator']?.operatorList ?? 'Operator List'}
            </Typography>
            {hasPermission('create-owner-5') && (
              <Button
                variant='contained'
                onClick={() => {
                  router.push(`/${locale}/operators/createoperator`)
                }}
              >
                {dictionary['operator']?.createOperator ?? 'Create Operator'}
              </Button>
            )}
          </Grid>
          <Divider />
          <Grid container alignItems='end' className='flex gap-6'>
            <Grid item xs={12} sm>
              <CustomTextField
                value={search}
                label={dictionary['operator']?.operatorName ?? 'Operator Name'}
                onChange={e => setSearch(e.target.value)}
                placeholder={dictionary['operator']?.searchOperator ?? 'Search Operator'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton onClick={() => {}}>
                        <i className='tabler-search' />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm>
              <CustomTextField
                select
                fullWidth
                value={currency}
                label={dictionary['operator']?.selectCurrency}
                onChange={e => setCurrency(e.target.value)}
                disabled={pendingCurrency}
              >
                <MenuItem value='all' key='all' className='capitalize'>
                  All
                </MenuItem>

                {currencyList?.code === 'SUCCESS' &&
                  currencyList.data.map((item: any, idx: number) => (
                    <MenuItem value={item.currency_code} key={idx} className='capitalize'>
                      {item.currency_code}
                    </MenuItem>
                  ))}
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm>
              <CustomTextField
                select
                fullWidth
                value={timezone}
                label={dictionary['operator']?.selectTimezone}
                onChange={e => setTimezone(e.target.value)}
                disabled={pendingTimezone}
              >
                <MenuItem value='all' key='all' className='capitalize'>
                  All
                </MenuItem>

                {timezoneList?.code === 'SUCCESS' &&
                  timezoneList.data.map((item: any, idx: number) => (
                    <MenuItem value={item.timezone} key={idx} className='capitalize'>
                      {item.timezone}
                    </MenuItem>
                  ))}
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm>
              <CustomTextField
                select
                fullWidth
                value={country}
                label={dictionary['operator']?.selectCountry ?? 'Select Country'}
                onChange={e => setCountry(e.target.value)}
                disabled={pendingCountry}
              >
                <MenuItem value='all' key='all' className='capitalize'>
                  All
                </MenuItem>

                {countryList?.code === 'SUCCESS' &&
                  countryList.data.map((item: any) => (
                    <MenuItem value={item.country_code} key={item.country_code} className='capitalize'>
                      {item.country_name} ({item.country_code})
                    </MenuItem>
                  ))}
              </CustomTextField>
            </Grid>
            <Button variant='contained' disabled={pendingSearchOperatorData} onClick={handleSearch}>
              {dictionary?.search ?? 'Search'}
            </Button>
            <Button variant='outlined' onClick={handleReset}>
              {dictionary?.reset ?? 'Reset'}
            </Button>
          </Grid>
          {pendingOperatorsData && <p>{dictionary?.loading ?? 'Loading'}....</p>}
          {errorOpeatorsData && <Typography className=' text-error'>{errorOpeatorsData.message}</Typography>}

          {operatorsData?.data?.total && !pendingOperatorsData && !pendingSearchOperatorData && (
            <Grid item xs={12}>
              <OperatorsListTable
                data={searchOperatorsData?.data || operatorsData?.data}
                page={page}
                pageSize={pageSize}
                setPage={setPage}
                setPageSize={setPageSize}
              />
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default OperatorsComponent
