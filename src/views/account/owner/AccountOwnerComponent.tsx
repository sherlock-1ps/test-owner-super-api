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

const AccountOwnerComponent = () => {
  const router = useRouter()
  const params = useParams()

  // Vars
  const { lang: locale } = params
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const { data: accountOwnerData, isPending: pendingAccountOwner } = fetchAccountOwnerQueryOption(page, pageSize)
  const { mutateAsync: searchAccountOwner, data: searchAccountData, reset } = useSearchAccountOwnerMutationOption()

  const handleSearch = async (username: any) => {
    if (!username) return
    try {
      const response = await searchAccountOwner({
        username,
        page,
        pageSize
      })
    } catch (error) {
      console.error('Error search username:', error)
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
              <CustomTextField
                fullWidth
                value={search}
                label='Username'
                onChange={e => setSearch(e.target.value)}
                placeholder='Search Username'
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
              <CustomTextField select fullWidth defaultValue={10} label='Select Role'>
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>All</MenuItem>
              </CustomTextField>
            </Grid>

            <Button
              variant='contained'
              onClick={() => {
                handleSearch(search)
              }}
            >
              Search
            </Button>
          </Grid>
          <Grid item xs={12}>
            {pendingAccountOwner && <p>Loading ...</p>}
            {accountOwnerData?.data?.total && (
              <AccountOwnerTable
                data={searchAccountData?.data || accountOwnerData.data}
                page={page}
                pageSize={pageSize}
                setPage={setPage}
                setPageSize={setPageSize}
              />
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default AccountOwnerComponent
