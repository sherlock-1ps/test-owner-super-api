'use client'

// MUI Imports
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import MuiLinearProgress from '@mui/material/LinearProgress'
import { styled } from '@mui/material/styles'

// Custom Components Imports
import CustomAvatar from '@core/components/mui/Avatar'

const LinearProgress = styled(MuiLinearProgress)(() => ({
  '&.MuiLinearProgress-colorInfo': { backgroundColor: 'var(--mui-palette-primary-main)' },
  '& .MuiLinearProgress-bar': {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  }
}))

const ProfitChart = () => {
  return (
    <Card>
      <CardContent>
        <div className='flex items-start justify-between gap-3'>
          <div>
            <Typography>Profit</Typography>
            <Typography variant='h4'>$1,200.02</Typography>
          </div>
          {/* <Typography color='success.main' className='font-medium'>
            +18.2%
          </Typography> */}
        </div>
        <div className='flex items-center justify-between gap-2 mlb-2'>
          <div className='flex flex-col plb-2.25'>
            <div className='flex items-center mbe-2.5 gap-x-[6px]'>
              <CustomAvatar skin='light' color='success' variant='rounded' size={24}>
                <i className='tabler-device-ipad-dollar text-lg' />
              </CustomAvatar>
              <Typography>Deposit</Typography>
            </div>
            <Typography variant='h5'>$143,258.02</Typography>
            <Typography variant='body2' color='text.disabled'>
              37.8%
            </Typography>
          </div>
          <Divider flexItem orientation='vertical'>
            <CustomAvatar skin='light' color='secondary' size={24} className='text-xs text-textDisabled bg-actionHover'>
              VS
            </CustomAvatar>
          </Divider>
          <div className='flex items-end flex-col plb-2'>
            <div className='flex items-center mbe-2 gap-x-[6px]'>
              <Typography color='text.secondary' className='m'>
                Withdraw
              </Typography>
              <CustomAvatar skin='light' variant='rounded' size={24} color='error'>
                <i className='tabler-wallet-off text-lg' />
              </CustomAvatar>
            </div>
            <Typography variant='h5'>$100,458.05</Typography>
            <Typography variant='body2' color='text.disabled'>
              62.8%
            </Typography>
          </div>
        </div>
        <LinearProgress value={70} color='info' variant='determinate' className='bs-2.5' />
      </CardContent>
    </Card>
  )
}

export default ProfitChart
