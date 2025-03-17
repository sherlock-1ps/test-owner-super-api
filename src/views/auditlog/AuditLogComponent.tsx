// MUI Imports
'use client'

import CustomTextField from '@/@core/components/mui/TextField'
import { Button, Card, CardContent, Divider, Grid, IconButton, InputAdornment, MenuItem } from '@mui/material'
import type { TextFieldProps } from '@mui/material/TextField'
import { format, addDays } from 'date-fns'

import Typography from '@mui/material/Typography'
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'
import { forwardRef, useState } from 'react'
import AuditLogTable from './AuditLogTable'
import { useSearchParams } from 'next/navigation'

type CustomInputProps = TextFieldProps & {
  label: string
  end: Date | number
  start: Date | number
}

const AuditLogComponent = () => {
  const searchParams = useSearchParams()
  const operator = searchParams.get('operator')
  const [startDate, setStartDate] = useState<Date | null | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | null | undefined>(addDays(new Date(), 15))

  const handleOnChange = (dates: any) => {
    const [start, end] = dates

    setStartDate(start)
    setEndDate(end)
  }

  const CustomInput = forwardRef((props: CustomInputProps, ref) => {
    const { label, start, end, ...rest } = props

    const startDate = format(start, 'MM/dd/yyyy')
    const endDate = end !== null ? ` - ${format(end, 'MM/dd/yyyy')}` : null

    const value = `${startDate}${endDate !== null ? endDate : ''}`

    return <CustomTextField fullWidth inputRef={ref} {...rest} label={label} value={value} />
  })

  return (
    <div className='flex flex-col gap-6'>
      <Card>
        <CardContent>
          <div className='flex flex-col gap-6'>
            <div className='flex gap-2 justify-between'>
              <Typography variant='h5' className=' text-nowrap'>
                Audit Log
              </Typography>
            </div>
            <Divider />
            <Grid container spacing={4}>
              <Grid item xs={12} sm>
                <AppReactDatepicker
                  selectsRange
                  endDate={endDate as Date}
                  selected={startDate}
                  startDate={startDate as Date}
                  id='date-range-picker-audit-log'
                  onChange={handleOnChange}
                  shouldCloseOnSelect={false}
                  customInput={
                    <CustomInput label='Date Range' start={startDate as Date | number} end={endDate as Date | number} />
                  }
                />
              </Grid>
              <Grid item xs={12} sm>
                <CustomTextField select fullWidth defaultValue={10} label='Select Timezone'>
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>All</MenuItem>
                </CustomTextField>
              </Grid>
              <Grid item xs={12} sm>
                <CustomTextField select fullWidth defaultValue={10} label='Select Country'>
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>All</MenuItem>
                </CustomTextField>
              </Grid>
              <Grid item xs={12} sm>
                <CustomTextField fullWidth label='Search Action' placeholder='search action'></CustomTextField>
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={3}>
                <Button variant='contained' fullWidth>
                  Search
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
              <Typography variant='h6'>Search to discover the results of your input.</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <AuditLogTable />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  )
}

export default AuditLogComponent
