/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import {
  Button,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material'
import CustomTextField from '@/@core/components/mui/TextField'
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'
import { useDictionary } from '@/contexts/DictionaryContext'
import { useSearchParams } from 'next/navigation'
import {
  useFetchConfigActionLogQueryOption,
  useFetchConfigMenuQueryOption
} from '@/queryOptions/config/configQueryOptions'

import { useForm, Controller, FormProvider } from 'react-hook-form'
import { format, addDays } from 'date-fns'
import { forwardRef, useEffect, useState } from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import AuditLogTable from './AuditLogTable'
import { formatToLocalEndOfDay, formatToLocalStartOfDay } from '@/utils/formatDateTime'
import {
  useSearchAuditLogOperatorMutationOption,
  useSearchAuditLogOwnerMutationOption
} from '@/queryOptions/auditlog/auditLogQueryOptions'
import { cleanPayload } from '@/utils/cleanPayload'
import { AuditLogOperatorFilterPayload, AuditLogOwnerFilterPayload } from '@/types/auditLog/auditLogTypes'

const schema = z.object({
  tab: z.enum(['owner', 'operator']),
  menu_index: z.union([z.string().refine(val => val === 'all'), z.coerce.number()]).optional(),
  action: z.string().optional(),
  operator_prefix: z.string().optional(),
  username: z.string().optional(),
  start_date: z.date().optional(),
  end_date: z.date().optional()
})

type FormData = z.infer<typeof schema>

const CustomInput = forwardRef(({ label, start, end, ...rest }: any, ref) => {
  const startDate = format(start, 'dd/MM/yyyy')
  const endDateStr = end ? ` - ${format(end, 'dd/MM/yyyy')}` : ''
  return <CustomTextField fullWidth inputRef={ref} {...rest} label={label} value={`${startDate}${endDateStr}`} />
})

const AuditLogComponent = () => {
  const { dictionary } = useDictionary()
  const searchParams = useSearchParams()
  const operatorFromURL = searchParams.get('operator')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      tab: 'owner',
      start_date: new Date(),
      end_date: new Date(),
      menu_index: 'all',
      action: 'all',
      username: '',
      operator_prefix: ''
    }
  })

  const { control, handleSubmit, watch } = methods

  const { data: menuList, isPending: pendingMenuList } = useFetchConfigMenuQueryOption()
  const { data: actionList, isPending: pendingActionList } = useFetchConfigActionLogQueryOption()
  const {
    mutate: searchOwnerLog,
    data: ownerDataLog,
    isPending: pendingOwnerData,
    reset: clearSearchOwnerData
  } = useSearchAuditLogOwnerMutationOption()
  const {
    mutate: searchOperatorLog,
    data: operatorDataLog,
    isPending: pendingOperatorData,
    reset: clearSearchOpeartorData
  } = useSearchAuditLogOperatorMutationOption()

  const tab = watch('tab')

  const onSubmit = (data: FormData) => {
    if (tab == 'owner') {
      handleSearchOwnerLog(data)
    } else if (tab == 'operator') {
      handleSearchOperatorLog(data)
    } else {
      return
    }
  }

  const handleReset = () => {
    clearSearchOwnerData()
    clearSearchOpeartorData()

    const currentTab = methods.watch('tab')
    methods.reset({
      tab: currentTab,
      start_date: new Date(),
      end_date: new Date(),
      menu_index: 'all',
      action: 'all',
      username: '',
      operator_prefix: ''
    })

    setPage(1)
    setPageSize(10)
  }

  useEffect(() => {
    handleReset()
  }, [tab])

  const buildPayload = (data: FormData, page: number, pageSize: number) => {
    const basePayload = {
      ...data,
      start_date: data.start_date ? formatToLocalStartOfDay(data.start_date) : undefined,
      end_date: data.end_date ? formatToLocalEndOfDay(data.end_date) : undefined,
      action: data.action === 'all' ? [] : [data.action],
      menu_index: data.menu_index === 'all' ? undefined : Number(data.menu_index),
      page,
      limit: pageSize
    }

    return basePayload
  }

  const handleSearchOwnerLog = (data: FormData) => {
    try {
      const basePayload = buildPayload(data, page, pageSize)

      const cleanedPayload: AuditLogOwnerFilterPayload = cleanPayload({
        start_date: basePayload.start_date,
        end_date: basePayload.end_date,
        menu_index: basePayload.menu_index,
        action: (basePayload.action || []).filter((item): item is string => !!item),
        username: basePayload.username,
        operator_prefix: basePayload.operator_prefix,
        page,
        limit: pageSize
      })

      searchOwnerLog(cleanedPayload)
    } catch (error) {
      console.error('Error searching owner logs:', error)
    }
  }

  const handleSearchOperatorLog = (data: FormData) => {
    try {
      const basePayload = buildPayload(data, page, pageSize)

      const cleanedPayload: AuditLogOperatorFilterPayload = cleanPayload({
        start_date: basePayload.start_date,
        end_date: basePayload.end_date,
        menu_index: basePayload.menu_index,
        action: (basePayload.action || []).filter((item): item is string => !!item),
        email: basePayload.username,
        operator_prefix: basePayload.operator_prefix,
        page,
        limit: pageSize
      })

      searchOperatorLog(cleanedPayload)
    } catch (error) {
      console.error('Error searching operator logs:', error)
    }
  }

  useEffect(() => {
    const values = methods.getValues()

    if (tab === 'owner' && ownerDataLog) {
      handleSearchOwnerLog(values)
    } else if (tab === 'operator' && operatorDataLog?.data?.total) {
      handleSearchOperatorLog(values)
    }
  }, [page, pageSize])

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
        <Card>
          <CardContent>
            <div className='flex flex-col gap-6'>
              <Typography variant='h5'>{dictionary['audit']?.auditLog}</Typography>
              <Divider />
              <Grid container spacing={4}>
                {/* Date Range */}
                <Grid item xs={12} sm>
                  <Controller
                    name='start_date'
                    control={control}
                    render={({ field }) => (
                      <AppReactDatepicker
                        selectsRange
                        startDate={watch('start_date')}
                        endDate={watch('end_date')}
                        onChange={([start, end]) => {
                          methods.setValue('start_date', start ?? undefined)
                          methods.setValue('end_date', end ?? undefined)
                        }}
                        customInput={
                          <CustomInput label='Date Range' start={watch('start_date')} end={watch('end_date')} />
                        }
                        shouldCloseOnSelect={false}
                      />
                    )}
                  />
                </Grid>

                {/* Menu Select */}
                <Grid item xs={12} sm>
                  <Controller
                    name='menu_index'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField select fullWidth {...field} label='Menu' disabled={pendingMenuList}>
                        <MenuItem value='all'>All</MenuItem>
                        {menuList?.code === 'SUCCESS' &&
                          menuList.data.map((item: any) => (
                            <MenuItem key={item.menu_index} value={item.menu_index}>
                              {item.menu_name}
                            </MenuItem>
                          ))}
                      </CustomTextField>
                    )}
                  />
                </Grid>

                {/* Action Select */}
                <Grid item xs={12} sm>
                  <Controller
                    name='action'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField select fullWidth {...field} label='Action' disabled={pendingActionList}>
                        <MenuItem value='all'>All</MenuItem>
                        {actionList?.code === 'SUCCESS' &&
                          actionList.data.action_log.map((item: string) => (
                            <MenuItem key={item} value={item}>
                              {item}
                            </MenuItem>
                          ))}
                      </CustomTextField>
                    )}
                  />
                </Grid>
              </Grid>

              {/* Radio + Search Fields */}
              <Grid container spacing={4} alignItems='end'>
                <Grid item xs={12} sm>
                  <Controller
                    name='tab'
                    control={control}
                    render={({ field }) => (
                      <RadioGroup row {...field}>
                        <FormControlLabel value='operator' control={<Radio />} label='Operator' />
                        <FormControlLabel value='owner' control={<Radio />} label='Owner' />
                      </RadioGroup>
                    )}
                  />
                </Grid>

                <Grid item xs={6} sm>
                  <Controller
                    name='operator_prefix'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        fullWidth
                        label='Operator Prefix'
                        size='small'
                        disabled={tab === 'owner'}
                        placeholder='Search Operator'
                        {...field}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={6} sm>
                  <Controller
                    name='username'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        fullWidth
                        label={tab === 'owner' ? 'Username' : 'Email'}
                        placeholder={tab === 'owner' ? 'Search Username' : 'Search Email'}
                        size='small'
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button variant='outlined' fullWidth onClick={handleReset}>
                    {dictionary?.reset}
                  </Button>
                </Grid>

                <Grid item xs={12} sm={2}>
                  <Button type='submit' variant='contained' fullWidth>
                    {dictionary?.search}
                  </Button>
                </Grid>
              </Grid>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Typography variant='h6'>
                  {ownerDataLog?.data?.total || operatorDataLog?.data?.total
                    ? `Found ${ownerDataLog.data.total.toLocaleString() || operatorDataLog.data.total.toLocaleString()} activity results`
                    : 'Search to discover the results of your input.'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>

              {(pendingOwnerData || pendingOperatorData) && (
                <Grid item xs={12}>
                  <p>{dictionary?.loading}...</p>
                </Grid>
              )}

              {(operatorDataLog?.code == 'SUCCESS' || ownerDataLog?.code == 'SUCCESS') && (
                <Grid item xs={12}>
                  <AuditLogTable
                    data={operatorDataLog?.data || ownerDataLog?.data || { list: [] }}
                    page={page}
                    pageSize={pageSize}
                    setPage={setPage}
                    setPageSize={setPageSize}
                  />
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  )
}

export default AuditLogComponent
