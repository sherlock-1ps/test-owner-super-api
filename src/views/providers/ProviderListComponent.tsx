/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import CustomTextField from '@/@core/components/mui/TextField'
import { Button, Card, CardContent, Divider, IconButton, InputAdornment, MenuItem } from '@mui/material'
import Grid from '@mui/material/Grid'
import { useMutation, useQuery } from '@tanstack/react-query'

import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import ProviderListTable from './ProviderListTable'
import { useParams, useRouter } from 'next/navigation'
import { searchProviders } from '@/app/sevices/provider/provider'
import fetchProviderQueryOption, { fetchProviderTypeQueryOption } from '@/queryOptions/provider/providerQueryOptions'
import { useDictionary } from '@/contexts/DictionaryContext'
import { useAuthStore } from '@/store/authStore'
import { useHasPermission } from '@/hooks/useHasPermission'

const ProviderListComponent = () => {
  const router = useRouter()
  const params = useParams()
  const { lang: locale } = params
  const { dictionary } = useDictionary()

  const [search, setSearch] = useState('')
  const [type, setType] = useState('all')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const profileData = useAuthStore(state => state.profile)
  const { hasPermission } = useHasPermission()
  // console.log('99898989', profileData)

  const {
    data: providersData,
    isPending: pendingProvider,
    error: errorProvider,
    refetch
  } = useQuery(fetchProviderQueryOption(page, pageSize))

  const { data: typeProvider, isPending: pendingType } = useQuery(fetchProviderTypeQueryOption())

  const {
    mutate,
    data: searchResults,
    isPending: isSearchingPending,
    error: searchError,
    reset
  } = useMutation({
    mutationFn: searchProviders
  })

  const handleSearch = () => {
    setPage(1)
    mutate({ page: 1, pageSize, search, type })
  }

  const handleRefetchSearch = () => {
    if (searchResults?.data) {
      mutate({ page, pageSize, search, type })
    }
  }

  const handleReset = () => {
    setPage(1)
    setSearch('')
    setType('all')
    reset()
    refetch()
  }

  return (
    <Card>
      <CardContent>
        <Grid container className='flex flex-col gap-6'>
          <Grid item xs={12} sm className='flex gap-2 justify-between'>
            <Typography variant='h5' className=' text-nowrap'>
              {dictionary['provider']?.providerList ?? 'Provider List'}
            </Typography>

            {hasPermission('create-owner-4') && (
              <Button
                variant='contained'
                onClick={() => {
                  router.push(`/${locale}/providers/addprovider`)
                }}
              >
                {dictionary['provider']?.addNewProvider ?? 'Add New Provider'}
              </Button>
            )}
          </Grid>
          <Divider />
          <Grid container spacing={4} alignItems='end'>
            <Grid item xs={12} md={3}>
              <CustomTextField
                value={search}
                label={dictionary['provider']?.providerName ?? 'Provider Name'}
                onChange={e => setSearch(e.target.value)}
                placeholder={dictionary['provider']?.searchProvider ?? 'Search provider'}
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
            <Grid item xs={12} md={3}>
              <CustomTextField
                select
                fullWidth
                value={type}
                defaultValue={'all'}
                onChange={e => setType(e.target.value)}
                label={dictionary['provider']?.selectType ?? 'Select Type'}
                disabled={pendingType}
              >
                {typeProvider?.code === 'SUCCESS'
                  ? [
                      <MenuItem value='all' key='all' className='capitalize'>
                        All
                      </MenuItem>,
                      ...typeProvider?.data?.provider_type.map((item: any, idx: number) => (
                        <MenuItem value={item} key={idx} className='capitalize'>
                          {item}
                        </MenuItem>
                      ))
                    ]
                  : [
                      <MenuItem value='all' key='all'>
                        All
                      </MenuItem>
                    ]}
              </CustomTextField>
            </Grid>
            <Grid item xs={12} md={4} className='flex gap-4'>
              <Button variant='contained' onClick={handleSearch}>
                {dictionary?.search ?? 'Search'}
              </Button>
              <Button variant='outlined' onClick={handleReset}>
                {dictionary?.reset ?? 'Search'}
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {pendingProvider && <Typography> {dictionary?.loading ?? 'Loading'}...</Typography>}
            {errorProvider && (
              <Typography className='text-error'>
                {dictionary?.errorFetch} : {errorProvider.message}
              </Typography>
            )}
            {isSearchingPending && <Typography>{dictionary?.searching ?? 'Searching'} providers...</Typography>}
            {searchError && (
              <Typography className='text-error'>
                {dictionary?.errorSearch}: {searchError.message}
              </Typography>
            )}

            {providersData?.data && !isSearchingPending && !pendingProvider && (
              <ProviderListTable
                data={searchResults?.data || providersData?.data}
                page={page}
                pageSize={pageSize}
                setPage={setPage}
                setPageSize={setPageSize}
                handleRefetchSearch={handleRefetchSearch}
              />
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ProviderListComponent
