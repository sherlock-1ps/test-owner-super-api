// MUI Imports
'use client'

import CustomTextField from '@/@core/components/mui/TextField'
import { Button, Card, CardContent, Divider, IconButton, InputAdornment, MenuItem } from '@mui/material'
import type { TextFieldProps } from '@mui/material/TextField'
import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import RoleTable from './RoleTable'
import {
  useFetchRoleListQueryOption,
  useSearchRoleListMutationOption
} from '@/queryOptions/rolePermission/rolePermissionQueryOptions'
import { useDictionary } from '@/contexts/DictionaryContext'

const RoleComponent = () => {
  const { dictionary } = useDictionary()
  const router = useRouter()
  const params = useParams()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Vars
  const { lang: locale } = params

  const { data: roleListData, isPending: pendingRoleList, refetch } = useFetchRoleListQueryOption(page, pageSize)

  const {
    mutate,
    data: searchRoleListData,
    isPending: pendingSearchRoleList,
    reset
  } = useSearchRoleListMutationOption()

  const handleRefetchSearch = () => {}

  const handleSearch = () => {
    setPage(1)
    mutate({ page: 1, pageSize, role_name: search })
  }

  // const handleReset = () => {
  //   setPage(1)
  //   setSearch('')
  //   reset()
  //   refetch()
  // }

  useEffect(() => {
    if (!search) reset(), refetch()
  }, [search])

  return (
    <Card>
      <CardContent>
        <Grid container className='flex flex-col gap-6'>
          <Grid item xs={12} sm className='flex gap-2 justify-between'>
            <Typography variant='h5' className=' text-nowrap'>
              Role & Permission
            </Typography>
            <Button
              variant='contained'
              onClick={() => {
                router.push(`/${locale}/role/managerole`)
              }}
            >
              Create Role
            </Button>
          </Grid>
          <Divider />
          <Grid container alignItems='end' className='flex gap-6'>
            <Grid item xs={12} sm>
              <CustomTextField
                fullWidth
                value={search}
                label={'Role'}
                onChange={e => setSearch(e.target.value)}
                placeholder={'Search Role'}
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
              <Button variant='contained' onClick={handleSearch}>
                Search
              </Button>
            </Grid>
          </Grid>

          {pendingRoleList && <Typography> {dictionary?.loading ?? 'Loading'}...</Typography>}

          {roleListData?.data?.total && !pendingRoleList && !pendingSearchRoleList && (
            <Grid item xs={12}>
              <RoleTable
                data={searchRoleListData?.data || roleListData?.data}
                page={page}
                pageSize={pageSize}
                setPage={setPage}
                setPageSize={setPageSize}
                handleRefetchSearch={handleRefetchSearch}
              />
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default RoleComponent
