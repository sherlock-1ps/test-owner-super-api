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
  InputAdornment
} from '@mui/material'

import { alpha, useTheme } from '@mui/material/styles'

import CustomTabList from '@/@core/components/mui/TabList'
import CardRewardMinigame from '@/components/card/CardRewardMinigame'
import { useDialog } from '@/hooks/useDialog'
import MinigameDialog from '@/components/dialogs/minigame/MinigameDialog'

const dataMockup = {
  cashGift: [
    {
      id: 1,
      title: 'คอย $10',
      content: 'เปอร์เซ็นต์การออก 20%',
      icon: 'minigameReward1',
      type: 'real',
      value: 20000,
      percent: '20%'
    },
    {
      id: 2,
      title: 'คอย $100',
      content: 'เปอร์เซ็นต์การออก 20%',
      icon: 'minigameReward2',
      type: 'real',
      value: 20000,
      percent: '20%'
    },
    {
      id: 3,
      title: 'คอย $1,000',
      content: 'เปอร์เซ็นต์การออก 20%',
      icon: 'minigameReward3',
      type: 'real',
      value: 20000,
      percent: '20%'
    },
    {
      id: 4,
      title: 'ลูกดอก 5 ลูก',
      content: 'เปอร์เซ็นต์การออก 20%',
      icon: 'minigameReward4',
      type: 'real',
      value: 20000,
      percent: '20%'
    },
    {
      id: 5,
      title: 'กุญแจ 5 ดอก',
      content: 'เปอร์เซ็นต์การออก 20%',
      icon: 'minigameReward5',
      type: 'real',
      value: 20000,
      percent: '20%'
    },
    {
      id: 6,
      title: 'คอย $10,000',
      content: 'เปอร์เซ็นต์การออก 20%',
      icon: 'minigameReward6',
      type: 'fake',
      value: 20000,
      percent: '20%'
    }
  ],
  wheel: [
    {
      id: 1,
      title: 'คอย $999',
      content: 'เปอร์เซ็นต์การออก 20%',
      icon: 'minigameReward1',
      type: 'real',
      value: 20000,
      percent: '20%'
    },
    {
      id: 2,
      title: 'คอย $9',
      content: 'เปอร์เซ็นต์การออก 20%',
      icon: 'minigameReward2',
      type: 'real',
      value: 20000,
      percent: '20%'
    },
    {
      id: 3,
      title: 'คอย $999',
      content: 'เปอร์เซ็นต์การออก 20%',
      icon: 'minigameReward3',
      type: 'real',
      value: 20000,
      percent: '20%'
    },
    {
      id: 4,
      title: 'ลูกดอก 55 ลูก',
      content: 'เปอร์เซ็นต์การออก 20%',
      icon: 'minigameReward4',
      type: 'fake',
      value: 20000,
      percent: '20%'
    },

    {
      id: 5,
      title: 'คอย $10,000',
      content: 'เปอร์เซ็นต์การออก 20%',
      icon: 'minigameReward6',
      type: 'fake',
      value: 20000,
      percent: '20%'
    }
  ],
  treasure: [
    {
      id: 1,
      title: 'คอย $999',
      content: 'เปอร์เซ็นต์การออก 20%',
      icon: 'minigameReward1',
      type: 'real',
      value: 20000,
      percent: '20%'
    },
    {
      id: 2,
      title: 'คอย $9',
      content: 'เปอร์เซ็นต์การออก 20%',
      icon: 'minigameReward2',
      type: 'real',
      value: 20000,
      percent: '20%'
    },
    {
      id: 3,
      title: 'คอย $999',
      content: 'เปอร์เซ็นต์การออก 20%',
      icon: 'minigameReward3',
      type: 'real',
      value: 20000,
      percent: '20%'
    },
    {
      id: 4,
      title: 'ลูกดอก 55 ลูก',
      content: 'เปอร์เซ็นต์การออก 20%',
      icon: 'minigameReward4',
      type: 'fake',
      value: 20000,
      percent: '20%'
    },

    {
      id: 5,
      title: 'คอย $10,000',
      content: 'เปอร์เซ็นต์การออก 20%',
      icon: 'minigameReward6',
      type: 'fake',
      value: 20000,
      percent: '20%'
    },
    {
      id: 1,
      title: 'คอย $999',
      content: 'เปอร์เซ็นต์การออก 20%',
      icon: 'minigameReward1',
      type: 'real',
      value: 20000,
      percent: '20%'
    },
    {
      id: 2,
      title: 'คอย $9',
      content: 'เปอร์เซ็นต์การออก 20%',
      icon: 'minigameReward2',
      type: 'real',
      value: 20000,
      percent: '20%'
    },
    {
      id: 3,
      title: 'คอย $999',
      content: 'เปอร์เซ็นต์การออก 20%',
      icon: 'minigameReward3',
      type: 'real',
      value: 20000,
      percent: '20%'
    },
    {
      id: 4,
      title: 'ลูกดอก 55 ลูก',
      content: 'เปอร์เซ็นต์การออก 20%',
      icon: 'minigameReward4',
      type: 'fake',
      value: 20000,
      percent: '20%'
    },

    {
      id: 5,
      title: 'คอย $10,000',
      content: 'เปอร์เซ็นต์การออก 20%',
      icon: 'minigameReward6',
      type: 'fake',
      value: 20000,
      percent: '20%'
    }
  ]
}

const SettingMinigame = () => {
  // States
  const [value, setValue] = useState<string>('1')
  const theme = useTheme()
  const { showDialog } = useDialog()

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Card className=' w-full ' sx={{ overflow: 'visible' }}>
      <CardContent className='w-full flex flex-col'>
        <TabContext value={value}>
          <Grid container spacing={4} className='flex items-end '>
            <Grid
              item
              xs={12}
              sm
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 8
              }}
            >
              <Card sx={{ backgroundColor: alpha(theme.palette.secondary.main, 0.2) }}>
                <CustomTabList pill='true' onChange={handleChange}>
                  <Tab value='1' label='เปิดอั่งเปา' />
                  <Tab value='2' label='วงล้อนำโชค' />
                  <Tab value='3' label='เปิดหีบสมบัติ' />
                </CustomTabList>
              </Card>
              <Grid item xs='auto' textAlign='right'>
                <Button
                  variant='contained'
                  startIcon={<i className='tabler-plus' />}
                  className='max-sm:is-full'
                  onClick={() => {
                    showDialog({
                      id: 'dialogMinigame',
                      component: <MinigameDialog id={'dialogMinigame'} title={'เพิ่มของรางวัล'} onClick={() => {}} />
                    })
                  }}
                >
                  เพิ่มของรางวัล
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <TabPanel value='1'>
            <div className='mt-4 flex flex-col gap-4'>
              <Typography variant='h5'>รายการของรางวัล</Typography>
              <Grid container spacing={4}>
                {dataMockup.cashGift
                  .filter(item => item.type == 'real')
                  .map((item, index) => {
                    return (
                      <Grid item xs={12} md={4} key={index}>
                        <CardRewardMinigame data={item} />
                      </Grid>
                    )
                  })}
              </Grid>
            </div>
            <div className='mt-4 flex flex-col gap-4'>
              <Typography variant='h5'>รายการของรางวัลหลอก</Typography>
              <Grid container spacing={4}>
                {dataMockup.cashGift
                  .filter(item => item.type == 'fake')
                  .map((item, index) => {
                    return (
                      <Grid item xs={12} md={4} key={index}>
                        <CardRewardMinigame data={item} />
                      </Grid>
                    )
                  })}
              </Grid>
            </div>
          </TabPanel>
          <TabPanel value='2'>
            <div className='mt-4 flex flex-col gap-4'>
              <Typography variant='h5'>รายการของรางวัล</Typography>
              <Grid container spacing={4}>
                {dataMockup.wheel
                  .filter(item => item.type == 'real')
                  .map((item, index) => {
                    return (
                      <Grid item xs={12} md={4} key={index}>
                        <CardRewardMinigame data={item} />
                      </Grid>
                    )
                  })}
              </Grid>
            </div>
            <div className='mt-4 flex flex-col gap-4'>
              <Typography variant='h5'>รายการของรางวัลหลอก</Typography>
              <Grid container spacing={4}>
                {dataMockup.wheel
                  .filter(item => item.type == 'fake')
                  .map((item, index) => {
                    return (
                      <Grid item xs={12} md={4} key={index}>
                        <CardRewardMinigame data={item} />
                      </Grid>
                    )
                  })}
              </Grid>
            </div>
          </TabPanel>
          <TabPanel value='3'>
            <div className='mt-4 flex flex-col gap-4'>
              <Typography variant='h5'>รายการของรางวัล</Typography>
              <Grid container spacing={4}>
                {dataMockup.treasure
                  .filter(item => item.type == 'real')
                  .map((item, index) => {
                    return (
                      <Grid item xs={12} md={4} key={index}>
                        <CardRewardMinigame data={item} />
                      </Grid>
                    )
                  })}
              </Grid>
            </div>
            <div className='mt-4 flex flex-col gap-4'>
              <Typography variant='h5'>รายการของรางวัลหลอก</Typography>
              <Grid container spacing={4}>
                {dataMockup.treasure
                  .filter(item => item.type == 'fake')
                  .map((item, index) => {
                    return (
                      <Grid item xs={12} md={4} key={index}>
                        <CardRewardMinigame data={item} />
                      </Grid>
                    )
                  })}
              </Grid>
            </div>
          </TabPanel>
        </TabContext>
      </CardContent>
    </Card>
  )
}

export default SettingMinigame
