import type { SyntheticEvent } from 'react'
import { useEffect, useState } from 'react'

import type { TextFieldProps } from '@mui/material'
import { Button, Card, CardContent, Grid, IconButton, InputAdornment, MenuItem, Tab, Typography } from '@mui/material'

import { alpha, useTheme } from '@mui/material/styles'

import CustomTextField from '@/@core/components/mui/TextField'
import CustomTabList from '@/@core/components/mui/TabList'
import type { CardStatsHorizontalWithBorderProps } from '@/types/pages/widgetTypes'
import PromotionReportCardSummary from './PromotionReportCardSummary'
import PromotionReportTable from './PromotionReportTable'
import PromotionReportDrawer from './PromotionReportDrawer'

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

const dataMockup: CardStatsHorizontalWithBorderProps[] = [
  {
    title: 'Total number of user who used promotions',
    stats: 25000,
    trendNumber: 18.2,
    avatarIcon: 'tabler-device-ipad-horizontal-up',
    color: 'primary'
  },
  {
    title: 'Total Deposit with promotions',
    stats: 884748.76,
    trendNumber: -8.7,
    avatarIcon: 'tabler-device-ipad-horizontal-x',
    color: 'success'
  },
  {
    title: 'Total Bonus',
    stats: 92060.15,
    trendNumber: 4.3,
    avatarIcon: 'tabler-coin-bitcoin',
    color: 'info'
  }
]

const PromotionReportList = () => {
  const theme = useTheme()
  const [value, setValue] = useState<string>('1')
  const [sendDrawerOpen, setSendDrawerOpen] = useState(false)

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
              <Typography>User ID</Typography>
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
          <PromotionReportDrawer open={sendDrawerOpen} handleClose={() => setSendDrawerOpen(false)} />
        </CardContent>
      </Card>

      <Grid container spacing={4} alignItems='end'>
        {dataMockup.map((item, index) => {
          return (
            <Grid item xs={12} sm key={index}>
              <PromotionReportCardSummary {...item} />
            </Grid>
          )
        })}
        <Grid item xs={12}>
          <PromotionReportTable />
        </Grid>
      </Grid>
    </div>
  )
}

export default PromotionReportList
