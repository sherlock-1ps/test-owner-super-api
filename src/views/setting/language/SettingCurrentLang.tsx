'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import { useColorScheme } from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'

// Types Imports
import { Box, CardContent, FormControlLabel, Switch } from '@mui/material'

import type { ThemeColor, SystemMode } from '@core/types'

// Components Imports
import OptionMenu from '@core/components/option-menu'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import MenuOptions from '@/components/options/MenuOptions'

const SettingCurrentLang = ({ data, handleSetDefaultLang }: { data: any; handleSetDefaultLang: any }) => {
  if (!data) return null

  return data
    .filter((item: any) => item.isUse)
    .map((item: any, idx: number) => (
      <Card key={idx}>
        <CardContent className='py-4 border rounded flex gap-2 items-center justify-between'>
          <Box className='flex gap-2 items-center'>
            <img
              src={`/images/setting-website/currency/${item.image}Icon.png`}
              alt={item.cardNumber}
              width={24}
              height={24}
              style={{ borderRadius: '50%' }}
            />
            <Typography>{item.name || 'ไม่ระบุ'}</Typography>
          </Box>
          <Box>
            {item.defaultLang ? (
              <Typography color='primary.main'>ภาษาเริ่มต้น</Typography>
            ) : (
              <MenuOptions
                options={[
                  {
                    text: 'ตั้งเป็นภาษาเริ่มต้น',
                    onClick: () => {
                      handleSetDefaultLang(idx)
                    }
                  }
                ]}
              />
            )}
          </Box>
        </CardContent>
      </Card>
    ))
}

export default SettingCurrentLang
