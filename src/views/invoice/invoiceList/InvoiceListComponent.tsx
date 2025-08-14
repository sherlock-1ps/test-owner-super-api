/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
// MUI Imports
'use client'

import CustomTextField from '@/@core/components/mui/TextField'
import { Button, Card, CardContent, Divider, Grid, IconButton, InputAdornment, MenuItem } from '@mui/material'
import type { TextFieldProps } from '@mui/material/TextField'
import { format, addDays, subDays } from 'date-fns'

import Typography from '@mui/material/Typography'
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'
import { forwardRef, useEffect, useRef, useState } from 'react'
import InvoiceListTable from './InvoiceListTable'
import {
  useDownloadInvoiceMutationOption,
  useFetchInvoiceQueryOption,
  useSearchInvoiceMutationOption
} from '@/queryOptions/invoice/invoiceQueryOptions'
import { toast } from 'react-toastify'

type CustomInputProps = TextFieldProps & {
  label: string
  end: Date | number
  start: Date | number
}

const InvoiceListComponent = () => {
  const firstRun = useRef(true)
  const [startCreateDate, setStartCreateDate] = useState<Date | null | undefined>(subDays(new Date(), 100))
  const [endCreateDate, setEndCreateDate] = useState<Date | null | undefined>(new Date())
  const [startDueDate, setStartDueDate] = useState<Date | null | undefined>(subDays(new Date(), 100))
  const [endDueDate, setEndDueDate] = useState<Date | null | undefined>(new Date())
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [status, setStatus] = useState('all')
  const [payment, setPayment] = useState('all')
  const [invoiceId, setInvoiceId] = useState('')
  const [invoiceNumber, setInvoiceNumber] = useState('')
  const [prefix, setPrefix] = useState('')
  const {
    mutateAsync: searchList,
    data: invoiceLists,
    isPending: pendingSearchList,
    reset
  } = useSearchInvoiceMutationOption()
  const { mutateAsync: callDownloadInvoice, isPending: pendingDownloadInvoice } = useDownloadInvoiceMutationOption()

  const handleOnChange = (dates: any) => {
    const [start, end] = dates

    setStartCreateDate(start)
    setEndCreateDate(end)
  }

  const handleOnChangeDue = (dates: any) => {
    const [start, end] = dates

    setStartDueDate(start)
    setEndDueDate(end)
  }

  const CustomInput = forwardRef((props: CustomInputProps, ref) => {
    const { label, start, end, ...rest } = props

    const startDate = format(start, 'dd/MM/yyyy')
    const endDate = end !== null ? ` - ${format(end, 'dd/MM/yyyy')}` : null

    const value = `${startDate}${endDate !== null ? endDate : ''}`

    return <CustomTextField fullWidth inputRef={ref} {...rest} label={label} value={value} />
  })

  const handleSearchInvoice = async (pageChange: any, pageSizeChange: any) => {
    try {
      const request: any = {
        page: pageChange || page,
        limit: pageSizeChange || pageSize
        // start_date: startCreateDate ? startCreateDate.toISOString() : undefined,
        // end_date: endCreateDate ? endCreateDate.toISOString() : undefined,
        // start_due_date: startDueDate ? startDueDate.toISOString() : undefined,
        // end_due_date: endDueDate ? endDueDate.toISOString() : undefined
      }
      if (status != 'all') request.invoice_status = status
      if (payment != 'all') request.invoice_payment = payment
      if (invoiceId) request.invoice_id = Number(invoiceId)
      if (invoiceNumber) request.invoice_no = invoiceNumber
      if (prefix) request.prefix = prefix
      // if (operatorPrefix) request.operator_prefix = operatorPrefix

      const response = await searchList(request)
    } catch (error) {
      toast.error('ไม่สามารถเรียกข้อมูลได้', { autoClose: 3000 })
      console.log('error', error)
    }
  }

  const handleResetInvoice = () => {
    setInvoiceId('')
    setInvoiceNumber('')
    setPrefix('')
    reset()
  }

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false
      return
    }
    handleSearchInvoice(page, pageSize)
  }, [page, pageSize])

  return (
    <div className='flex flex-col gap-6'>
      <Card>
        <CardContent>
          <div className='flex flex-col gap-6'>
            <div className='flex gap-2 justify-between'>
              <Typography variant='h5' className=' text-nowrap'>
                Invoice List
              </Typography>
            </div>
            <Divider />
            <Grid container spacing={4}>
              <Grid item xs={12} sm>
                <AppReactDatepicker
                  selectsRange
                  endDate={endCreateDate as Date}
                  selected={startCreateDate}
                  startDate={startCreateDate as Date}
                  id='date-range-picker-audit-log'
                  onChange={handleOnChange}
                  shouldCloseOnSelect={false}
                  customInput={
                    <CustomInput
                      label='Create Date'
                      start={startCreateDate as Date | number}
                      end={endCreateDate as Date | number}
                    />
                  }
                />
              </Grid>

              <Grid item xs={12} sm>
                <CustomTextField
                  fullWidth
                  label='Invoice ID'
                  placeholder='Search invoice ID'
                  value={invoiceId}
                  onChange={e => setInvoiceId(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm>
                <CustomTextField
                  fullWidth
                  label='Invoice Number'
                  placeholder='Search invoice number'
                  value={invoiceNumber}
                  onChange={e => setInvoiceNumber(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm>
                <CustomTextField
                  fullWidth
                  label='Prefix'
                  placeholder='Search prefix'
                  value={prefix}
                  onChange={e => setPrefix(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container spacing={4} className='flex items-end justify-end'>
              <Grid item xs={12} sm>
                <AppReactDatepicker
                  selectsRange
                  endDate={endDueDate as Date}
                  selected={startDueDate}
                  startDate={startDueDate as Date}
                  id='date-range-picker-audit-log'
                  onChange={handleOnChangeDue}
                  shouldCloseOnSelect={false}
                  customInput={
                    <CustomInput
                      label='Due Date'
                      start={startDueDate as Date | number}
                      end={endDueDate as Date | number}
                    />
                  }
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <CustomTextField
                  select
                  fullWidth
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                  label='Status'
                >
                  <MenuItem value='all'>All</MenuItem>
                  <MenuItem value='draft'>Draft</MenuItem>
                  <MenuItem value='void'>Void</MenuItem>
                  <MenuItem value='reject'>Reject</MenuItem>
                  <MenuItem value='public'>Public</MenuItem>
                </CustomTextField>
              </Grid>
              <Grid item xs={12} sm={3}>
                <CustomTextField
                  select
                  fullWidth
                  value={payment}
                  onChange={e => setPayment(e.target.value)}
                  label='Payment'
                >
                  <MenuItem value='all'>All</MenuItem>
                  <MenuItem value='pending'>Pending</MenuItem>
                  <MenuItem value='cancel'>Cancel</MenuItem>
                  <MenuItem value='paid'>Paid</MenuItem>
                  <MenuItem value='unpaid'>Unpaid</MenuItem>
                </CustomTextField>
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant='contained'
                  fullWidth
                  onClick={() => {
                    handleSearchInvoice(null, null)
                  }}
                  disabled={pendingSearchList}
                >
                  Search
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button variant='outlined' fullWidth onClick={handleResetInvoice}>
                  Reset
                </Button>
              </Grid>
            </Grid>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12} className='flex items-center justify-between'>
              <Typography variant='h6'>
                {invoiceLists?.data?.list?.length > 0
                  ? `Found ${invoiceLists?.data?.list?.length} invoice results`
                  : 'Search to discover the results of your input.'}
              </Typography>
              {/* <Button variant='contained' disabled={pendingDownloadInvoice}>
                Download Selected as PDF
              </Button> */}
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <InvoiceListTable
                // data={invoiceLists?.data?.list}
                data={invoiceLists?.data?.list?.length > 0 ? invoiceLists?.data?.list : []}
                page={page}
                pageSize={pageSize}
                setPage={setPage}
                setPageSize={setPageSize}
                maxSize={invoiceLists?.data?.max_page}
                onSearch={handleSearchInvoice}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  )
}

export default InvoiceListComponent
