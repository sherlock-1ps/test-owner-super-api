import type { SyntheticEvent } from 'react'
import { useEffect, useState } from 'react'

import type { TextFieldProps } from '@mui/material'
import { Button, Card, CardContent, Grid, IconButton, InputAdornment, MenuItem, Tab, Typography } from '@mui/material'

import { alpha, useTheme } from '@mui/material/styles'

import CustomTextField from '@/@core/components/mui/TextField'
import CustomTabList from '@/@core/components/mui/TabList'
import type { CardCashbackReportProps, CardStatsHorizontalWithBorderProps } from '@/types/pages/widgetTypes'
import CashBackReportDrawer from './CashBackReportDrawer'
import CashBackReportCardSummary from './CashBackReportCardSummary'
import CashBackReportTable from './CashBackReportTable'

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  isIcon,
  ...props
}: {
  value: string | number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  debounce?: number
  isIcon?: boolean
} & Omit<TextFieldProps, 'onChange'>) => {
  const [value, setValue] = useState<string | number>(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fakeEvent = {
        target: { value }
      } as React.ChangeEvent<HTMLInputElement>

      onChange(fakeEvent)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value, debounce, onChange])

  return (
    <CustomTextField
      {...props}
      value={value}
      onChange={e => setValue(e.target.value)}
      InputProps={{
        endAdornment: isIcon ? (
          <InputAdornment position='end'>
            <IconButton onClick={() => {}}>
              <i className='tabler-search' />
            </IconButton>
          </InputAdornment>
        ) : null
      }}
    />
  )
}

const dataMockup: CardCashbackReportProps[] = [
  {
    id: 1,
    title: '82174',
    totalCashback: 8700,
    status: 'success',
    start: '13/12/2025',
    end: '18/12/2025'
  },
  {
    id: 2,
    title: '82175',
    totalCashback: 5400,
    status: 'success',
    start: '20/12/2025',
    end: '27/12/2025'
  },
  {
    id: 3,
    title: '82176',
    totalCashback: 9255,
    status: 'success',
    start: '01/01/2025',
    end: '07/01/2025'
  }
]

const CashBackReportList = () => {
  const theme = useTheme()
  const [sendDrawerOpen, setSendDrawerOpen] = useState(false)
  const [activeCard, setActiveCard] = useState(1)

  const handleSelectedCard = (index: number) => {
    setActiveCard(index)
  }

  return (
    <div className='flex flex-col gap-4'>
      <Card>
        <CardContent>
          <Grid container spacing={4} alignItems='end'>
            <Grid item xs={12} sm>
              <CustomTextField select fullWidth defaultValue={10} label='Filter by Time Period'>
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Today</MenuItem>
                <MenuItem value={20}>3 Day Ago</MenuItem>
                <MenuItem value={30}>7 Day Ago</MenuItem>
                <MenuItem value={40}>14 Day Ago</MenuItem>
                <MenuItem value={50}>30 Day Ago</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm>
              <CustomTextField select fullWidth defaultValue='' label='Filter by Month'>
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>January</MenuItem>
                <MenuItem value={2}>February</MenuItem>
                <MenuItem value={3}>March</MenuItem>
                <MenuItem value={4}>April</MenuItem>
                <MenuItem value={5}>May</MenuItem>
                <MenuItem value={6}>June</MenuItem>
                <MenuItem value={7}>July</MenuItem>
                <MenuItem value={8}>August</MenuItem>
                <MenuItem value={9}>September</MenuItem>
                <MenuItem value={10}>October</MenuItem>
                <MenuItem value={11}>November</MenuItem>
                <MenuItem value={12}>December</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm>
              <Typography>UserID</Typography>
              <DebouncedInput
                value={''}
                placeholder='Search UserID'
                onChange={() => {}}
                className='w-full'
                isIcon={true}
              />
            </Grid>

            <Grid item xs='auto' className=''>
              <Button
                color='primary'
                variant='outlined'
                startIcon={<i className='tabler-filter' />}
                className='max-sm:is-full'
                onClick={() => {
                  setSendDrawerOpen(true)
                }}
              >
                Filter
              </Button>
            </Grid>
          </Grid>
          <CashBackReportDrawer open={sendDrawerOpen} handleClose={() => setSendDrawerOpen(false)} />
        </CardContent>
      </Card>

      <Grid item xs={12}>
        <Typography variant='h5'>Select Week Cashback</Typography>
      </Grid>

      <Grid container spacing={4} alignItems='end'>
        {dataMockup.map((item, index) => {
          return (
            <Grid item xs={12} sm key={index}>
              <CashBackReportCardSummary {...item} handleSelectedCard={handleSelectedCard} activeCard={activeCard} />
            </Grid>
          )
        })}
        <Grid item xs={12}>
          <CashBackReportTable activeCard={activeCard} />
        </Grid>
      </Grid>
    </div>
  )
}

export default CashBackReportList
