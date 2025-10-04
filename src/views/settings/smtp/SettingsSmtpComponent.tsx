// MUI Imports
'use client'

import CustomTextField from '@/@core/components/mui/TextField'
import { Button, Card, CardContent, Divider, IconButton, InputAdornment, MenuItem } from '@mui/material'
import type { TextFieldProps } from '@mui/material/TextField'
import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import SettingSmtpTable from './SettingSmtpTable'
import { fetchSettingSmtpQueryOption } from '@/queryOptions/smtp/settingSmtpQueryOptions'
import { useDictionary } from '@/contexts/DictionaryContext'
import { useHasPermission } from '@/hooks/useHasPermission'

const SettingsSmtpComponent = () => {
  const router = useRouter()
  const params = useParams()
  const { lang: locale } = params
  const { dictionary } = useDictionary()
  const { hasPermission } = useHasPermission()

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const { data, isPending } = fetchSettingSmtpQueryOption(page, pageSize)

  return (
    <Card>
      <CardContent>
        <Grid container className='flex flex-col gap-6'>
          <Grid item xs={12} sm className='flex gap-2 justify-between'>
            <Typography variant='h5' className=' text-nowrap'>
              SMTP Server
            </Typography>
            {hasPermission('create-owner-14') && (
              <Button
                variant='contained'
                onClick={() => {
                  router.push(`/${locale}/settings/smtp/create`)
                }}
              >
                {dictionary['smtp']?.addNewSmtp ?? 'Add New SMTP Server'}
              </Button>
            )}
          </Grid>
          <Divider />

          <Grid item xs={12}>
            {isPending && <p>{dictionary?.loading}....</p>}
            {data?.code == 'SUCCESS' && (
              <SettingSmtpTable
                data={data.data}
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

export default SettingsSmtpComponent
