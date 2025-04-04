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
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { searchProviders } from '@/app/sevices/provider/provider'
import fetchProviderQueryOption, { fetchProviderTypeQueryOption } from '@/queryOptions/provider/providerQueryOptions'
import ProviderListTable from '@/views/providers/ProviderListTable'
import { useDictionary } from '@/contexts/DictionaryContext'
import {
  useFetchCredentialListQueryOption,
  useSearchCredentialMutationOption
} from '@/queryOptions/operator/operatorQueryOptions'
import CredentialListTable from './CredentialListTable'

const CrendentialComponent = () => {
  const { dictionary } = useDictionary()
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const credential = searchParams.get('credential')
  const { lang: locale } = params

  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const {
    data: credentialList,
    isPending: pendingCredential,
    error: errorCredential
  } = useFetchCredentialListQueryOption({
    prefix: credential || '',
    page,
    pageSize
  })

  const {
    mutate,
    data: searchCrendentialData,
    isPending: pendingSearchData,
    reset
  } = useSearchCredentialMutationOption()

  const handleRefetchSearch = () => {
    if (searchCrendentialData?.data) {
      mutate({ page, pageSize, credential: search, prefix: credential ?? '' })
    }
  }

  const handleSearch = () => {
    setPage(1)
    mutate({
      page: 1,
      pageSize,
      credential: search,
      prefix: credential ?? ''
    })
  }

  const handleReset = () => {
    setPage(1)
    setSearch('')
  }

  useEffect(() => {
    if (!search) reset()
  }, [search])

  return (
    <Card>
      <CardContent>
        <Grid container className='flex flex-col gap-6'>
          <Grid item xs={12}>
            <div className='flex gap-2 items-center w-full'>
              <Link href={`/${locale}/operators`} className='flex gap-2 items-center'>
                <i className='tabler-building text-[20px] text-primary' />
                <Typography variant='h6' color={'primary'}>
                  Operator List
                </Typography>
              </Link>
              / <i className='tabler-share text-[20px]' />
              <Typography variant='h6'>Credential List</Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm className='flex gap-2 justify-between'>
            <Typography variant='h5' className=' text-nowrap'>
              Credential List - ({credential})
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
                {dictionary?.search}
              </Button>
              {/* <Button variant='outlined' onClick={handleReset}>
                {dictionary?.reset}
              </Button> */}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {pendingCredential && <Typography>Loading providers...</Typography>}
            {errorCredential && (
              <Typography className='text-error'>Error fetching providers: {errorCredential.message}</Typography>
            )}
            {credentialList?.data?.total && !pendingCredential && !pendingSearchData && (
              <Grid item xs={12}>
                <CredentialListTable
                  data={searchCrendentialData?.data || credentialList?.data}
                  handleRefetchSearch={handleRefetchSearch}
                  // data={{
                  //   page: 1,
                  //   limit: 10,
                  //   total: 1,
                  //   max_page: 1,
                  //   list: [
                  //     {
                  //       credential_id: '2a85e9d4-afb8-48d2-b5a6-504568fa6f39',
                  //       credential_prefix: 'CRED2',
                  //       operator_prefix: 'BRF10',
                  //       credential_provider_count: {
                  //         casino: ['Pocket Game', 'spinix'],
                  //         lottery: ['xylo'],
                  //         slot: [],
                  //         sport: []
                  //       },
                  //       is_enable: true,
                  //       update_at: '2025-04-01T20:54:48Z'
                  //     }
                  //   ]
                  // }}
                  page={page}
                  pageSize={pageSize}
                  setPage={setPage}
                  setPageSize={setPageSize}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CrendentialComponent
