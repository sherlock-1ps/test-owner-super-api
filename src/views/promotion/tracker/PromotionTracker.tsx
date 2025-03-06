// React Imports
import { useEffect, useState } from 'react'
import type { SyntheticEvent } from 'react'

// MUI Imports
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import type { TextFieldProps } from '@mui/material'
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem
} from '@mui/material'

import { alpha, useTheme } from '@mui/material/styles'

import CustomTabList from '@/@core/components/mui/TabList'
import { useDialog } from '@/hooks/useDialog'
import MenuOptions from '@/components/options/MenuOptions'
import ConfirmAlert from '@/components/dialogs/alerts/ConfirmAlert'
import ManageAdvertiseDialog from '@/components/dialogs/advertisement/ManageAdvertiseDialog'
import CustomTextField from '@/@core/components/mui/TextField'
import CardPromotionTracker from './CardPromotionTracker'
import type { CardStatsHorizontalWithBorderProps } from '@/types/pages/widgetTypes'
import { db } from '@/fake-db/apps/invoice'
import PromotionTable from './PromotionTable'

const dataMockup: CardStatsHorizontalWithBorderProps[] = [
  {
    title: 'Total user who are using promotions',
    stats: 4000,
    trendNumber: 18.2,
    avatarIcon: 'tabler-users',
    color: 'primary'
  },
  {
    title: 'Total Deposit with promotions',
    stats: 976973.14,
    trendNumber: -8.7,
    avatarIcon: 'tabler-wallet',
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

const PromotionTracker = () => {
  // States
  const theme = useTheme()
  const { showDialog } = useDialog()
  const [value, setValue] = useState('')

  return (
    <div className='flex flex-col gap-6 w-full'>
      <Card>
        <CardContent>
          <Grid container spacing={4} alignItems='end'>
            <Grid item xs={12} sm>
              <Typography>UserID</Typography>
              <DebouncedInput
                value={''}
                placeholder='Search UserID'
                onChange={newValue => {}}
                className='w-full'
                isIcon={true}
              />
            </Grid>
            <Grid item xs={12} sm>
              <CustomTextField select fullWidth defaultValue='' label='Promotion'>
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>โปรโมชั่น 1</MenuItem>
                <MenuItem value={20}>โปรโมชั่น 2</MenuItem>
                <MenuItem value={30}>โปรโมชั่น 3</MenuItem>
              </CustomTextField>
            </Grid>
            {/* <Grid item xs='auto' className=''>
            <Button
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              className='max-sm:is-full'
              onClick={() => {}}
            >
              Create Role
            </Button>
          </Grid> */}
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={4} alignItems='end'>
        {dataMockup.map((item, index) => {
          return (
            <Grid item xs={12} sm key={index}>
              <CardPromotionTracker {...item} />
            </Grid>
          )
        })}
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} sm>
          <PromotionTable />
        </Grid>
      </Grid>
    </div>
  )
}

export default PromotionTracker
