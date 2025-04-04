/* eslint-disable react-hooks/exhaustive-deps */
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
import {
  fetchAccountOwnerQueryOption,
  useSearchAccountOwnerMutationOption
} from '@/queryOptions/account/accountQueryOptions'
import { useDictionary } from '@/contexts/DictionaryContext'
import { useFetchConfigRoleQueryOption } from '@/queryOptions/config/configQueryOptions'

const AccountOwnerComponent = () => {
  const router = useRouter()
  const params = useParams()
  const { dictionary } = useDictionary()

  // Vars
  const { lang: locale } = params
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [role, setRole] = useState('all')

  const {
    data: accountOwnerData,
    isPending: pendingAccountOwner,
    refetch
  } = fetchAccountOwnerQueryOption(page, pageSize)
  const { mutateAsync: searchAccountOwner, data: searchAccountData, reset } = useSearchAccountOwnerMutationOption()
  const { data: roleListData, isPending: pendingRole } = useFetchConfigRoleQueryOption()

  const handleSearch = async (username: any) => {
    if (!username && role == 'all') return
    try {
      const response = await searchAccountOwner({
        username,
        role_id: role,
        page,
        pageSize
      })
    } catch (error) {
      console.error('Error search username:', error)
    }
  }

  const handleReset = () => {
    setPage(1)
    setRole('all')
    setSearch('')
    reset()
    refetch()
  }

  const handleUpdateStatus = () => {
    if (searchAccountData?.data) {
      searchAccountOwner({
        username: search,
        role_id: role,
        page,
        pageSize
      })
    } else {
      refetch()
    }
  }

  useEffect(() => {
    if (!search) reset()
  }, [search])

  return (
    <Card>
      <CardContent>
        <Grid container className='flex flex-col gap-6'>
          <Grid item xs={12} sm className='flex gap-2 justify-between'>
            <Typography variant='h5' className=' text-nowrap'>
              {dictionary['account']?.ownerList}
            </Typography>
            <Button
              variant='contained'
              onClick={() => {
                router.push(`/${locale}/account/owner/createowner`)
              }}
            >
              {dictionary['account']?.createOwner}
            </Button>
          </Grid>
          <Divider />
          <Grid container alignItems='end' className='flex gap-6'>
            <Grid item xs={12} sm>
              <CustomTextField
                fullWidth
                value={search}
                label={dictionary?.username}
                onChange={e => setSearch(e.target.value)}
                placeholder={dictionary?.searchUsername}
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
                value={role}
                defaultValue={'all'}
                onChange={e => setRole(e.target.value)}
                label={dictionary['account']?.selectRole}
                disabled={pendingRole}
              >
                {roleListData?.code === 'SUCCESS'
                  ? [
                      <MenuItem value='all' key='all' className='capitalize'>
                        All
                      </MenuItem>,
                      ...roleListData?.data.map((item: any, idx: number) => (
                        <MenuItem value={item?.role_id} key={idx} className='capitalize'>
                          {item?.role_name}
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

            <Button
              variant='outlined'
              onClick={() => {
                handleReset()
              }}
            >
              {dictionary?.reset}
            </Button>

            <Button
              variant='contained'
              onClick={() => {
                handleSearch(search)
              }}
            >
              {dictionary?.search}
            </Button>
          </Grid>
          <Grid item xs={12}>
            {pendingAccountOwner && <p>{dictionary?.loading} ...</p>}
            {accountOwnerData?.data?.total && (
              <AccountOwnerTable
                data={searchAccountData?.data || accountOwnerData.data}
                page={page}
                pageSize={pageSize}
                setPage={setPage}
                setPageSize={setPageSize}
                onUpdateStatus={handleUpdateStatus}
              />
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default AccountOwnerComponent
