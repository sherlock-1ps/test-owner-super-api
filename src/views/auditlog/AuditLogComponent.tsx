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
import { useDictionary } from '@/contexts/DictionaryContext'

type CustomInputProps = TextFieldProps & {
  label: string
  end: Date | number
  start: Date | number
}

const AuditLogComponent = () => {
  const { dictionary } = useDictionary()
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
                {dictionary['audit']?.auditLog}
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
                <CustomTextField select fullWidth defaultValue={10} label={dictionary['operator']?.selectTimezone}>
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>All</MenuItem>
                </CustomTextField>
              </Grid>
              <Grid item xs={12} sm>
                <CustomTextField select fullWidth defaultValue={10} label={dictionary['operator']?.selectCountry}>
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>All</MenuItem>
                </CustomTextField>
              </Grid>
              <Grid item xs={12} sm>
                <CustomTextField
                  fullWidth
                  label={dictionary['audit']?.selectAction}
                  placeholder={dictionary['audit']?.selectAction}
                ></CustomTextField>
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={3}>
                <Button variant='contained' fullWidth>
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
