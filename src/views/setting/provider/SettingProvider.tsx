// React Imports
import { useEffect, useState } from 'react'
import type { SyntheticEvent } from 'react'

// MUI Imports
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import type {
  TextFieldProps
} from '@mui/material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment
} from '@mui/material'

import { alpha, useTheme } from '@mui/material/styles'

import CustomTabList from '@/@core/components/mui/TabList'
import CardRewardMinigame from '@/components/card/CardRewardMinigame'
import { useDialog } from '@/hooks/useDialog'
import MinigameDialog from '@/components/dialogs/minigame/MinigameDialog'
import CustomTextField from '@/@core/components/mui/TextField'
import SettingProviderStatus from '@/views/react-table/SettingProviderStatus'
import SettingProviderArrange from '@/views/react-table/SettingProviderArrange'

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

const SettingProvider = () => {
  const [value, setValue] = useState<string>('1')
  const theme = useTheme()

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm>
        <Card className=' w-full ' sx={{ overflow: 'visible' }}>
          <CardContent className='w-full flex flex-col gap-4'>
            <Typography variant='h5'>สถานะ Providers</Typography>
            <Box>
              <Typography>Provider Name</Typography>
              <DebouncedInput
                value={''}
                onChange={newValue => {}}
                placeholder='Search Provider'
                className='w-full'
                isIcon={true}
              />
            </Box>
            <SettingProviderStatus />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={5}>
        <Card className=' w-full ' sx={{ overflow: 'visible' }}>
          <CardContent className='w-full flex flex-col gap-4'>
            <Typography color='text.primary' variant='h5'>
              Arrange
            </Typography>
            <SettingProviderArrange />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default SettingProvider
