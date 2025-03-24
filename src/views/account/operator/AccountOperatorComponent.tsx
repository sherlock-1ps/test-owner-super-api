// MUI Imports
'use client'

import CustomTextField from '@/@core/components/mui/TextField'
import { Button, Card, CardContent, Divider, IconButton, InputAdornment, MenuItem } from '@mui/material'
import type { TextFieldProps } from '@mui/material/TextField'
import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import AccountOperatorTable from './AccountOperatorTable'
import { fetchAccountOperatorQueryOption } from '@/queryOptions/account/accountQueryOptions'

const AccountOperatorComponent = () => {
  const router = useRouter()
  const params = useParams()
  const { lang: locale } = params

  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const { data: operatorData, isPending: pendingOperatorData } = fetchAccountOperatorQueryOption(page, pageSize)

  return (
    <Card>
      <CardContent>
        <Grid container className='flex flex-col gap-6'>
          <Grid item xs={12} sm className='flex gap-2 justify-between'>
            <Typography variant='h5' className=' text-nowrap'>
              Operator Account List
            </Typography>
          </Grid>
          <Divider />
          <Grid container alignItems='end' className='flex gap-6'>
            <Grid item xs={12} sm>
              <CustomTextField select fullWidth defaultValue={10} label='Select Prefix'>
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>All</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm>
              <CustomTextField
                fullWidth
                value={search}
                label='Email'
                onChange={e => setSearch(e.target.value)}
                placeholder='Search Email'
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

            <Button variant='contained'>Search</Button>
          </Grid>
          <Grid item xs={12}>
            {pendingOperatorData && <p>Loading ...</p>}
            {operatorData?.data?.total && (
              <AccountOperatorTable
                data={operatorData.data}
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

export default AccountOperatorComponent
