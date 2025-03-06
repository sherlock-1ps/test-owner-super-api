// React Imports

// MUI Imports
import type { SyntheticEvent} from 'react';

import { useEffect, useState } from 'react'

import TabContext from '@mui/lab/TabContext'

import TabPanel from '@mui/lab/TabPanel'
import type {
  TextFieldProps} from '@mui/material';
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  Tab,
  Typography
} from '@mui/material'


import { alpha, useTheme } from '@mui/material/styles'

import CustomTextField from '@/@core/components/mui/TextField'
import CustomTabList from '@/@core/components/mui/TabList'

import theme from '@/@core/theme'
import SettingAfiliateProviderTable from '@/views/react-table/SettingAfiliateProviderTable'

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

const SettingAffiliateByProvider = () => {
  const [value, setValue] = useState<string>('1')
  const theme = useTheme()

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  
return (
    <TabContext value={value}>
      <Grid container spacing={4} className='flex items-end '>
        <Grid item xs={12} sm={6}>
          <Typography>ชื่อค่าย</Typography>
          <DebouncedInput
            value={''}
            onChange={newValue => {}}
            placeholder='ค้นหาชื่อค่าย'
            className='w-full'
            isIcon={true}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: 8
          }}
        >
          <Typography>ชื่อค่าย</Typography>
          <Card sx={{ backgroundColor: alpha(theme.palette.secondary.main, 0.2) }}>
            <CustomTabList pill='true' onChange={handleChange}>
              <Tab value='1' label='Slot Game' />
              <Tab value='2' label='Casino' />
              <Tab value='3' label='Sport' />
              <Tab value='4' label='Lottery' />
            </CustomTabList>
          </Card>
        </Grid>
      </Grid>

      <TabPanel value='1'>
        <Grid item xs={12} className='mt-4'>
          <SettingAfiliateProviderTable keyProp='slot' />
        </Grid>
      </TabPanel>
      <TabPanel value='2'>
        <Grid item xs={12} className='mt-4'>
          <SettingAfiliateProviderTable keyProp='casino' />
        </Grid>
      </TabPanel>
      <TabPanel value='3'>
        <Grid item xs={12} className='mt-4'>
          <SettingAfiliateProviderTable keyProp='sport' />
        </Grid>
      </TabPanel>
      <TabPanel value='4'>
        <Grid item xs={12} className='mt-4'>
          <SettingAfiliateProviderTable keyProp='lottery' />
        </Grid>
      </TabPanel>
    </TabContext>
  )
}

export default SettingAffiliateByProvider
