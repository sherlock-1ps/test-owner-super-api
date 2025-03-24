// MUI Imports
'use client'

import CustomTextField from '@/@core/components/mui/TextField'
import { Button, Card, CardContent, Divider, IconButton, InputAdornment, MenuItem } from '@mui/material'
import type { TextFieldProps } from '@mui/material/TextField'
import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import FaqTable from './FaqTable'
import { fetchFaqQueryOption, useSearchFaqMutationOption } from '@/queryOptions/faq/faqQueryOptions'

const FaqComponent = () => {
  const router = useRouter()
  const params = useParams()

  // Vars
  const { lang: locale } = params
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const { data: faqData, isPending: pendingFaqData } = fetchFaqQueryOption(page, pageSize)
  const { mutate, data: searchFaqData, reset } = useSearchFaqMutationOption()

  console.log('faqData', faqData)

  const handleSearch = async (username: any) => {
    if (!search) return

    mutate({ page, pageSize, title: search })
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
              FAQs List
            </Typography>
            <Button
              variant='contained'
              onClick={() => {
                router.push(`/${locale}/faq/managefaq`)
              }}
            >
              Add New FAQ
            </Button>
          </Grid>
          <Divider />
          <Grid container alignItems='end' className='flex gap-6'>
            <Grid item xs={12} sm>
              <CustomTextField
                fullWidth
                value={search}
                label='Question'
                onChange={e => setSearch(e.target.value)}
                placeholder='Search Question'
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
              <Button
                variant='contained'
                onClick={() => {
                  handleSearch(search)
                }}
                disabled={!search}
              >
                Search
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {pendingFaqData && <p>Loading....</p>}

            {faqData?.data?.total && (
              <FaqTable
                data={searchFaqData?.data || faqData.data}
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

export default FaqComponent
