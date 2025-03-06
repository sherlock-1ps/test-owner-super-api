// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

// Type Imports
import type { ThemeColor } from '@core/types'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'
import { Chip, Divider } from '@mui/material'

type DataType = {
  icon1: string
  icon2: string
  stats1: string
  stats2: string
  title1: string
  title2: string
  color1: ThemeColor
  color2: ThemeColor
}

const data: DataType[] = [
  {
    stats1: '10',
    stats2: '$140,500',
    title1: 'Number of Top-up',
    title2: 'Total amount',
    color1: 'primary',
    color2: 'success',
    icon1: 'tabler-list',
    icon2: 'tabler-wallet'
  },
  {
    stats1: '10:00-11:00',
    stats2: 'Bank Transfer',
    title1: 'Peak Topup time',
    title2: 'Top Topup Method',
    color1: 'warning',
    color2: 'info',
    icon1: 'tabler-clock',
    icon2: 'tabler-arrows-down-up'
  }
]

const DepositTransactionSummary = () => {
  return (
    <Grid container spacing={6}>
      {data.map((item, idx) => {
        return (
          <Grid item xs={12} sm={6} md={2.5} key={idx}>
            <Card>
              <CardContent className='flex justify-between flex-wrap gap-4'>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={12} className='flex gap-4 items-center'>
                    <CustomAvatar color={item.color1} variant='rounded' size={40} skin='light'>
                      <i className={item.icon1}></i>
                    </CustomAvatar>
                    <div>
                      <Typography variant='body2'>{item.title1}</Typography>
                      <Typography variant='h5'>{item.stats1}</Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} md={12} className='flex gap-4 items-center'>
                    <CustomAvatar color={item.color2} variant='rounded' size={40} skin='light'>
                      <i className={item.icon2}></i>
                    </CustomAvatar>
                    <div>
                      <Typography variant='body2'>{item.title2}</Typography>
                      <Typography variant='h5'>{item.stats2}</Typography>
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )
      })}
      <Grid item xs={12} md sm={12} className=''>
        <Card className='h-full flex items-center justify-center'>
          <CardContent className='flex justify-between flex-wrap gap-4'>
            <Grid container spacing={4}>
              <Grid item xs={12} md={12} className='flex gap-4 items-center'>
                <div className='flex flex-col gap-2'>
                  <Typography variant='h5' className='text-center'>
                    Error Case
                  </Typography>
                  <div className='flex gap-4 items-center'>
                    <CustomAvatar color={'warning'} variant='rounded' size={40} skin='light'>
                      <i className='tabler-info-triangle'></i>
                    </CustomAvatar>
                    <div className='flex flex-col'>
                      <Typography>Number of Error</Typography>
                      <Typography variant='h5'>3</Typography>
                    </div>
                  </div>
                </div>
                <Divider orientation={'vertical'} className='pl-2' />
                <div className='flex flex-1 flex-col gap-1 '>
                  <div className='flex gap-4'>
                    <Chip
                      label='Incorrect Information'
                      color={'error'}
                      variant='tonal'
                      size='small'
                      className='w-full'
                    />
                    <Typography variant='h6' className='whitespace-nowrap w-[180px]'>
                      Check details
                    </Typography>
                  </div>
                  <div className='flex gap-4'>
                    <Chip label='Insufficient Funds' color={'error'} variant='tonal' size='small' className='w-full ' />
                    <Typography variant='h6' className='whitespace-nowrap w-[180px]'>
                      Check details
                    </Typography>
                  </div>
                  <div className='flex gap-4'>
                    <Chip label='Sever down' color={'error'} variant='tonal' size='small' className='w-full' />
                    <Typography variant='h6' className='whitespace-nowrap w-[180px]'>
                      Contact Support
                    </Typography>
                  </div>
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default DepositTransactionSummary
