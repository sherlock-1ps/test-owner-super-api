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
  useFetchCredentialProviderListQueryOption,
  useSearchCredentialMutationOption,
  useSearchCredentialProviderListQueryOption
} from '@/queryOptions/operator/operatorQueryOptions'
import CredentialProviderTable from './CredentialProviderTable'
import { useDialog } from '@/hooks/useDialog'
import AddNewProviderDialog from '@/components/dialogs/operators/AddNewProviderDialog'

const CredentialProviderListComponent = () => {
  const { showDialog } = useDialog()
  const { dictionary } = useDictionary()
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const provider = searchParams.get('provider')

  const providerResult = provider ? JSON.parse(decodeURIComponent(provider as string)) : null
  const { lang: locale } = params
  const [type, setType] = useState('all')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  console.log('providerResult', providerResult)
  const {
    data: providerData,
    isPending: pendingProviderData,
    error: errorProviderData,
    refetch
  } = useFetchCredentialProviderListQueryOption({
    credential: providerResult?.credential_id ?? '',
    page: page,
    pageSize: pageSize
  })

  const {
    mutate,
    data: searchProviderData,
    isPending: pendingSearchProviderData,
    reset
  } = useSearchCredentialProviderListQueryOption()

  const { data: typeProvider, isPending: pendingType } = useQuery(fetchProviderTypeQueryOption())

  const handleSearch = () => {
    if (!search && type == 'all') return
    setPage(1)
    mutate({
      page: 1,
      pageSize,
      credential_id: providerResult?.credential_id,
      provider_name: search,
      category_code: type
    })
  }

  const handleReset = () => {
    refetch()
    setPage(1)
    setSearch('')
    setType('all')
    reset()
  }
  const handleStatusUpdated = () => {
    if (search || type !== 'all') {
      mutate({
        page,
        pageSize,
        credential_id: providerResult?.credential_id,
        provider_name: search,
        category_code: type
      })
    } else {
      refetch()
    }
  }

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
              /
              <Link href={`/${locale}/operators`} className='flex gap-2 items-center'>
                <i className='tabler-share text-[20px] text-primary' />
                <Typography variant='h6' color={'primary'}>
                  Credential List
                </Typography>
              </Link>
              / <i className='tabler-crown text-[20px] ' />
              <Typography variant='h6'>Provider List ({providerResult?.credential_prefix})</Typography>
            </div>
          </Grid>
          <Grid container spacing={4} alignItems='end'>
            <Grid item xs={12} sm={6} className='flex gap-2 justify-between'>
              <Typography variant='h5' className=' text-nowrap'>
                Provider List ({providerResult?.operator_prefix} - {providerResult?.credential_prefix})
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} className='flex gap-2 justify-end'>
              <Button
                variant='contained'
                startIcon={<i className='tabler-plus' />}
                className='max-sm:is-full'
                onClick={() => {
                  showDialog({
                    id: 'AddNewProviderDialog',
                    component: (
                      <AddNewProviderDialog
                        id='AddNewProviderDialog'
                        credential={providerResult?.credential_id}
                        onClick={() => {}}
                      />
                    ),
                    size: 'sm'
                  })
                }}
              >
                Add New Provider
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={3}>
              <CustomTextField
                value={search}
                label='Provider Name'
                onChange={e => setSearch(e.target.value)}
                placeholder='Search provider'
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
              <Button variant='outlined' onClick={handleReset}>
                {dictionary?.reset}
              </Button>
              <Button variant='contained' onClick={handleSearch}>
                {dictionary?.search}
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {(pendingProviderData || pendingSearchProviderData) && <Typography>Loading providers...</Typography>}
            {errorProviderData && (
              <Typography className='text-error'>Error fetching providers: {errorProviderData.message}</Typography>
            )}

            <Grid container spacing={4}>
              {providerData?.data?.total > 0 && !pendingProviderData && !pendingSearchProviderData ? (
                Object.entries(searchProviderData?.data?.list || providerData?.data?.list || {})
                  .filter(([_, value]) => Array.isArray(value) && value.length > 0)
                  .map(([categoryKey, providers]) => (
                    <Grid item xs={12} sm={12} key={categoryKey}>
                      <Typography variant='h6' className='capitalize'>
                        {categoryKey} Type
                      </Typography>

                      <CredentialProviderTable
                        data={providers}
                        category={categoryKey}
                        onStatusUpdated={handleStatusUpdated}
                      />
                    </Grid>
                  ))
              ) : (
                <Grid item xs={12} sm={12}>
                  <Typography variant='h6' className='capitalize'>
                    Data not found!
                  </Typography>
                </Grid>
              )}

              {providerData?.data?.total > 0 && searchProviderData?.data?.total == 0 && (
                <Grid item xs={12} sm={12}>
                  <Typography variant='h6' className='capitalize'>
                    Data not found!
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CredentialProviderListComponent
