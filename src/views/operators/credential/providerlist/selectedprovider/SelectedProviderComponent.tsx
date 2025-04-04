// MUI Imports
'use client'

import { Button, Card, CardContent, Divider, IconButton, InputAdornment } from '@mui/material'
import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'

import { useParams, useSearchParams } from 'next/navigation'
import CustomTextField from '@/@core/components/mui/TextField'
import Link from 'next/link'
import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { searchGameProviders } from '@/app/sevices/provider/provider'
import { fetchGamesProviderQueryOption } from '@/queryOptions/provider/providerQueryOptions'
import { useDialog } from '@/hooks/useDialog'
import AddGameDialog from '@/components/dialogs/provider/AddGameDialog'
import { useDictionary } from '@/contexts/DictionaryContext'
import SelectedProviderTable from './SelectedProviderTable'
import {
  useFetchGameCredentialListQueryOption,
  useSearchGameProviderMutationOption
} from '@/queryOptions/operator/operatorQueryOptions'

const SelectedProviderComponent = () => {
  const { dictionary } = useDictionary()
  const { showDialog } = useDialog()
  const searchParams = useSearchParams()
  const params = useParams()

  const gamePath = searchParams.get('game')

  const gameData = gamePath ? JSON.parse(decodeURIComponent(gamePath as string)) : null

  console.log('gameData', gameData)
  // Vars
  const { lang: locale } = params
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const {
    data: gameProvider,
    isPending: pendingGameProvider,
    error: errorGameProvider
  } = useFetchGameCredentialListQueryOption({
    credential: gameData?.provider_credential_id || '',
    page,
    pageSize
  })

  const {
    mutate,
    data: searchResults,
    isPending: isSearchingPending,
    error: searchError,
    reset
  } = useSearchGameProviderMutationOption()

  const handleSearch = (search: string) => {
    setPage(1)
    mutate({ page: 1, pageSize, credential: gameData?.provider_credential_id || '', game_name: search })
  }

  const handleReset = () => {
    setPage(1)
    setSearch('')
    reset()
  }

  const handleRefetchSearch = () => {
    if (searchResults?.data) {
      mutate({ page, pageSize, credential: gameData?.provider_credential_id || '', game_name: search })
    }
  }

  console.log('pendingGameProvider', pendingGameProvider)

  return (
    <div className='flex flex-col gap-6'>
      <Grid container spacing={6} className='flex sm:flex-col md:flex-row'>
        <Grid item xs={12}>
          <Card>
            <CardContent className='flex flex-col gap-6'>
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
                /
                <Link href={`/${locale}/operators`} className='flex gap-2 items-center'>
                  <i className='tabler-crown text-[20px] text-primary' />
                  <Typography variant='h6' className='text-primary'>
                    Provider List (dsds)
                  </Typography>
                </Link>
                /<Typography variant='h6'>{gameData?.provider_name}</Typography>
              </div>

              <div className='flex gap-6 h-[80px] justify-between items-center'>
                <div className='flex gap-6'>
                  <img
                    src={gameData?.image}
                    className='w-[80px] h-full rounded-md overflow-hidden'
                    alt='logoProvider'
                  />
                  <div className='flex flex-col justify-between'>
                    <Typography variant='h2' className=' capitalize'>
                      {gameData?.provider_name}
                    </Typography>

                    <Typography color={'secondary'}>{gameData?.provider_credential_id}</Typography>
                  </div>
                </div>
              </div>

              <Divider />

              <div className='flex gap-2 items-center justify-between'>
                <div>
                  <CustomTextField
                    value={search}
                    label='Game Name'
                    onChange={e => setSearch(e.target.value)}
                    placeholder='Search game'
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
                </div>

                <div className=' flex gap-2'>
                  <Button
                    variant='contained'
                    onClick={() => {
                      handleSearch(search)
                    }}
                  >
                    {dictionary?.search ?? 'Search'}
                  </Button>
                  <Button variant='outlined' onClick={handleReset}>
                    {dictionary?.reset ?? 'Reset'}
                  </Button>
                </div>
              </div>
              {pendingGameProvider && <p> {dictionary?.loading ?? 'Loading'}....</p>}
              {errorGameProvider && (
                <Typography className='text-error'>
                  Error fetching games providers: {errorGameProvider.message}
                </Typography>
              )}
              {isSearchingPending && <Typography> {dictionary?.searching ?? 'Searching'} providers...</Typography>}
              {searchError && <Typography className='text-error'>Error searching: {searchError.message}</Typography>}
              {gameProvider?.code == 'SUCCESS' && (
                <SelectedProviderTable
                  data={searchResults?.data || gameProvider?.data}
                  page={page}
                  pageSize={pageSize}
                  setPage={setPage}
                  setPageSize={setPageSize}
                  handleRefetchSearch={handleRefetchSearch}
                />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default SelectedProviderComponent
