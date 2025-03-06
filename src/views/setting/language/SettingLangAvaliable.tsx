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
import { CardContent, FormControlLabel, Switch } from '@mui/material'

import type { ThemeColor, SystemMode } from '@core/types'

// Components Imports
import OptionMenu from '@core/components/option-menu'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

const SettingLangAvaliable = ({ data, handleToggle }: { data: any; handleToggle: any }) => {
  return (
    <Card>
      <CardContent className='p-0'>
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead className='uppercase border-0 bg-primary text-white'>
              <tr className='border-be '>
                <th className='leading-6 plb-4 pis-6 pli-2'>ภาษาที่รองรับ</th>
                <th className='leading-6 plb-4 pie-6 pli-2 text-right'>ปิด / เปิด</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row: any, index: number) => (
                <tr key={index} className={`border-b `}>
                  <td className='pis-6 pli-2 plb-3'>
                    <div className='flex items-center gap-4'>
                      <img width={30} alt={row.name} src={`/images/setting-website/currency/${row.image}Icon.png`} />
                      <div className='flex flex-col'>
                        <Typography color='text.primary'>{row.name}</Typography>
                      </div>
                    </div>
                  </td>

                  <td className='pli-2 plb-3 pie-6 text-right'>
                    <FormControlLabel
                      control={<Switch checked={row.isUse} onChange={() => handleToggle(index)} />}
                      label=''
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

export default SettingLangAvaliable
