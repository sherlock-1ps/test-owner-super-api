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
import {
  fetchAccountOperatorQueryOption,
  fetchOperatorPrefixQueryOption,
  useSearchAccountOperatorMutationOption
} from '@/queryOptions/account/accountQueryOptions'
import { useDictionary } from '@/contexts/DictionaryContext'

const AccountOperatorComponent = () => {
  const router = useRouter()
  const params = useParams()
  const { lang: locale } = params
  const { dictionary } = useDictionary()
  const [prefix, setPrefix] = useState('all')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const {
    data: operatorData,
    isPending: pendingOperatorData,
    refetch
  } = fetchAccountOperatorQueryOption(page, pageSize)
  const { data: prefixData, isPending: pendingPrefixData } = fetchOperatorPrefixQueryOption()

  const {
    mutate,
    data: searchOperatorData,
    isPending: pendingSearchOperatorData,
    reset
  } = useSearchAccountOperatorMutationOption()

  const handleSearch = () => {
    setPage(1)
    mutate({
      page: 1,
      pageSize,
      email: search,
      operator_prefix: prefix
    })
  }

  const handleReset = () => {
    setPage(1), setPrefix('all'), setSearch(''), reset()
    refetch()
  }

  return (
    <Card>
      <CardContent>
        <Grid container className='flex flex-col gap-6'>
          <Grid item xs={12} sm className='flex gap-2 justify-between'>
            <Typography variant='h5' className=' text-nowrap'>
              {dictionary['account']?.operatorAccountList}
            </Typography>
          </Grid>
          <Divider />
          <Grid container alignItems='end' className='flex gap-6'>
            <Grid item xs={12} sm>
              <CustomTextField
                select
                fullWidth
                value={prefix}
                defaultValue={'all'}
                onChange={e => setPrefix(e.target.value)}
                label={dictionary['account']?.selectPrefix}
                disabled={pendingPrefixData}
              >
                {prefixData?.code === 'SUCCESS'
                  ? [
                      <MenuItem value='all' key='all' className='capitalize'>
                        All
                      </MenuItem>,
                      ...prefixData?.data?.operator_prefix.map((item: any, idx: number) => (
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
            <Grid item xs={12} sm>
              <CustomTextField
                fullWidth
                value={search}
                label={dictionary?.email}
                onChange={e => setSearch(e.target.value)}
                placeholder={dictionary?.searchEmail}
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

            <Button variant='contained' onClick={handleReset}>
              {dictionary?.reset}
            </Button>

            <Button variant='contained' onClick={handleSearch} disabled={pendingSearchOperatorData}>
              {dictionary?.search}
            </Button>
          </Grid>
          <Grid item xs={12}>
            {pendingOperatorData && <p>{dictionary?.loading}...</p>}
            {operatorData?.data?.total && (
              <AccountOperatorTable
                data={searchOperatorData?.data || operatorData?.data}
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
