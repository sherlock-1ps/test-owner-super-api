/* eslint-disable react-hooks/exhaustive-deps */
// MUI Imports
'use client'

import CustomTextField from '@/@core/components/mui/TextField'
import { Button, Card, CardContent, Divider, IconButton, InputAdornment, MenuItem } from '@mui/material'
import type { TextFieldProps } from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import { useMutation, useQuery } from '@tanstack/react-query'

import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { searchProviders } from '@/app/sevices/provider/provider'
import fetchProviderQueryOption, { fetchProviderTypeQueryOption } from '@/queryOptions/provider/providerQueryOptions'
import ProviderListTable from '@/views/providers/ProviderListTable'

const CrendentialComponent = () => {
  const router = useRouter()
  const params = useParams()
  const { lang: locale } = params

  const [search, setSearch] = useState('')
  const [type, setType] = useState('all')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(1)

  const [isSearching, setIsSearching] = useState(false)

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
    error: searchError
  } = useMutation({
    mutationFn: searchProviders
  })

  const handleSearch = () => {
    setPage(1)
    setIsSearching(true)
    mutate({ page: 1, pageSize, search, type })
  }

  const handleReset = () => {
    setPage(1)
    setIsSearching(false)
    setSearch('')
    setType('all')
    refetch()
  }

  return (
    <Card>
      <CardContent>
        <Grid container className='flex flex-col gap-6'>
          <Grid item xs={12} sm className='flex gap-2 justify-between'>
            <Typography variant='h5' className=' text-nowrap'>
              Credential List - (OPB1)
            </Typography>
          </Grid>
          <Divider />
          <Grid container spacing={4} alignItems='end'>
            <Grid item xs={12} md={3}>
              <CustomTextField
                value={search}
                label='Prefix'
                onChange={e => setSearch(e.target.value)}
                placeholder='Search prefix'
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

            <Grid item xs={12} md={4} className='flex gap-4'>
              <Button variant='contained' onClick={handleSearch}>
                Search
              </Button>
              <Button variant='outlined' onClick={handleReset}>
                Reset
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {pendingProvider && <Typography>Loading providers...</Typography>}
            {errorProvider && (
              <Typography className='text-error'>Error fetching providers: {errorProvider.message}</Typography>
            )}
            {isSearchingPending && <Typography>Searching providers...</Typography>}
            {searchError && <Typography className='text-error'>Error searching: {searchError.message}</Typography>}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CrendentialComponent
