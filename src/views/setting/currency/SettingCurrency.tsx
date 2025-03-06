// React Imports
import { useState } from 'react'
import type { SyntheticEvent } from 'react'

// MUI Imports
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  InputAdornment,
  MenuItem
} from '@mui/material'

import { alpha, useTheme } from '@mui/material/styles'

import CustomTabList from '@/@core/components/mui/TabList'
import CardRewardMinigame from '@/components/card/CardRewardMinigame'
import { useDialog } from '@/hooks/useDialog'
import MinigameDialog from '@/components/dialogs/minigame/MinigameDialog'
import CustomTextField from '@/@core/components/mui/TextField'
import SettingCurrencyTable from '@/views/react-table/SettingCurrencyTable'

const SettingCurrency = () => {
  // States
  const theme = useTheme()
  const { showDialog } = useDialog()

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card className=' w-full ' sx={{ overflow: 'visible' }}>
            <CardContent className='w-full flex flex-col gap-4'>
              <Typography variant='h6'>ตั้งค่าพื้นฐาน</Typography>
              <Grid item xs={12} sm>
                <CustomTextField select fullWidth defaultValue='10' label='Base Currency'>
                  <MenuItem value={10}>
                    <div className='flex gap-2 items-center'>
                      <img
                        src='/images/setting-website/currency/usaIcon.png'
                        alt='dollar icon'
                        width={24}
                        height={24}
                        style={{ borderRadius: '50%' }}
                      />
                      <Typography>ดอลล่าร์สหรัฐ</Typography>
                    </div>
                  </MenuItem>
                  <MenuItem value={20}>
                    <div className='flex gap-2 items-center'>
                      <img
                        src='/images/setting-website/currency/thaiIcon.png'
                        alt='dollar icon'
                        width={24}
                        height={24}
                        style={{ borderRadius: '50%' }}
                      />
                      <Typography>ไทยบาท</Typography>
                    </div>
                  </MenuItem>
                  <MenuItem value={30}>
                    <div className='flex gap-2 items-center'>
                      <img
                        src='/images/setting-website/currency/usaIcon.png'
                        alt='dollar icon'
                        width={24}
                        height={24}
                        style={{ borderRadius: '50%' }}
                      />
                      <Typography>ดอง</Typography>
                    </div>
                  </MenuItem>
                </CustomTextField>
              </Grid>

              <Grid item xs={12} sm>
                <CustomTextField
                  fullWidth
                  label='Offset Deposit'
                  placeholder='Offset Deposit'
                  type='number'
                  value={5}
                  InputProps={{
                    endAdornment: <InputAdornment position='end'>%</InputAdornment>
                  }}
                />
              </Grid>
              <Grid item xs={12} sm>
                <CustomTextField
                  fullWidth
                  label='Offset Withdraw'
                  placeholder='Offset Withdraw'
                  type='number'
                  value={4}
                  InputProps={{
                    endAdornment: <InputAdornment position='end'>%</InputAdornment>
                  }}
                />
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm>
          <Card className=' w-full ' sx={{ overflow: 'visible' }}>
            <CardContent className='w-full flex flex-col'>
              <Grid item xs='auto' textAlign='right'>
                <Button variant='contained' startIcon={<i className='tabler-plus' />} className='max-sm:is-full'>
                  Add new currency
                </Button>
              </Grid>
              <Grid item xs={12} sm className='mt-4'>
                <SettingCurrencyTable />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SettingCurrency
