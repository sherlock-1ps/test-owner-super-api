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

import { useDialog } from '@/hooks/useDialog'
import CustomTextField from '@/@core/components/mui/TextField'
import SettingCurrentLang from './SettingCurrentLang'
import SettingLangAvaliable from './SettingLangAvaliable'
import ConfirmAlert from '@/components/dialogs/alerts/ConfirmAlert'

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

const dataMockup = [
  {
    id: 1,
    key: 'th',
    name: 'ไทย',
    image: 'thai',
    isUse: true,
    defaultLang: true
  },
  {
    id: 2,
    key: 'en',
    name: 'ENGLISH',
    image: 'usa',
    isUse: true,
    defaultLang: false
  },
  {
    id: 3,
    key: 'es',
    name: 'español',
    image: 'es',
    isUse: false,
    defaultLang: false
  },
  {
    id: 4,
    key: 'my',
    name: 'myanmar',
    image: 'my',
    isUse: true,
    defaultLang: false
  },
  {
    id: 5,
    key: 'vn',
    name: 'vietnam',
    image: 'vn',
    isUse: false,
    defaultLang: false
  },
  {
    id: 6,
    key: 'kr',
    name: '한국어',
    image: 'kr',
    isUse: false,
    defaultLang: false
  },
  {
    id: 7,
    key: 'jp',
    name: '日本語',
    image: 'jp',
    isUse: false,
    defaultLang: false
  }
]

const SettingLanguage = () => {
  const theme = useTheme()
  const [languages, setLanguages] = useState([...dataMockup])
  const { showDialog } = useDialog()

  const handleSetDefaultLang = (index: number) => {
    setLanguages(prev =>
      prev.map((item: any, idx: number) => ({
        ...item,
        defaultLang: idx === index
      }))
    )
  }

  const handleToggle = (index: number) => {
    if (languages[index].defaultLang) {
      showDialog({
        id: 'alertCancloseCurrencyLang',
        component: (
          <ConfirmAlert
            id='alertCancloseCurrencyLang'
            title={'Can not close default Language'}
            content=''
            onClick={() => {}}
          />
        ),
        size: 'sm'
      })
      
return
    }

    setLanguages(prev => prev.map((row: any, idx: number) => (idx === index ? { ...row, isUse: !row.isUse } : row)))
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={5}>
        <Card className=' w-full ' sx={{ overflow: 'visible' }}>
          <CardContent className='w-full flex flex-col gap-4'>
            <Typography variant='h5'>ภาษาที่ใช้ที่เว็บไซด์</Typography>
            <Box>
              <Typography>ค้นหาภาษา</Typography>
              <DebouncedInput
                value={''}
                onChange={newValue => {}}
                placeholder='ค้นหาภาษา'
                className='w-full'
                isIcon={true}
              />
            </Box>
            <SettingCurrentLang data={languages} handleSetDefaultLang={handleSetDefaultLang} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm>
        <Card className=' w-full ' sx={{ overflow: 'visible' }}>
          <CardContent className='w-full flex flex-col gap-4'>
            <Typography color='text.primary' variant='h5'>
              ภาษาที่เว็บไซด์รองรับ
            </Typography>
            <Box>
              <Typography>ค้นหาภาษา</Typography>
              <DebouncedInput
                value={''}
                onChange={newValue => {}}
                placeholder='ค้นหาภาษา'
                className='w-full'
                isIcon={true}
              />
            </Box>
            <SettingLangAvaliable data={languages} handleToggle={handleToggle} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default SettingLanguage
