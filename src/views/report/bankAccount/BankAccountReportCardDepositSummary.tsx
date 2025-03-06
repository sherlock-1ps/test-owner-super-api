'use client'

// MUI Imports
import MuiCard from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import type { CardProps } from '@mui/material/Card'

// Third-party Imports
import classnames from 'classnames'

// Types Imports
import type { ThemeColor } from '@core/types'

//Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

type Props = CardProps & {
  color: ThemeColor
}

const Card = styled(MuiCard)<Props>(({ color }) => ({
  transition: 'border 0.3s ease-in-out, box-shadow 0.3s ease-in-out, margin 0.3s ease-in-out',
  borderBottomWidth: '2px',
  borderBottomColor: `var(--mui-palette-${color}-darkerOpacity)`,
  '[data-skin="bordered"] &:hover': {
    boxShadow: 'none'
  },
  '&:hover': {
    borderBottomWidth: '3px',
    borderBottomColor: `var(--mui-palette-${color}-main) !important`,
    boxShadow: 'var(--mui-customShadows-lg)',
    marginBlockEnd: '-1px'
  }
}))

const BankAccountReportCardDepositSummary = () => {
  // Props

  return (
    <Card color={'success'}>
      <CardContent>
        <div className='flex flex-col gap-2 items-start justify-between'>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2'>
              <CustomAvatar color={'success'} skin='light' variant='rounded'>
                <i className={classnames('tabler-device-ipad-horizontal-up', 'text-[28px]')} />
              </CustomAvatar>
              <div className='flex flex-col'>
                <Typography variant='h6'>230K</Typography>
                <Typography variant='subtitle2'>Approve Deposit amount</Typography>
              </div>
            </div>
          </div>
          <div className='flex  gap-2 justify-between w-full'>
            <div className='flex gap-2'>
              <CustomAvatar color={'primary'} skin='light' variant='rounded'>
                <i className={classnames('tabler-settings-automation', 'text-[28px]')} />
              </CustomAvatar>
              <div className='flex flex-col'>
                <Typography variant='h6'>120K</Typography>
                <Typography variant='subtitle2'>SMS</Typography>
              </div>
            </div>
            <div className='flex gap-2'>
              <CustomAvatar color={'warning'} skin='light' variant='rounded'>
                <i className={classnames('tabler-user-circle', 'text-[28px]')} />
              </CustomAvatar>
              <div className='flex flex-col'>
                <Typography variant='h6'>8.754K</Typography>
                <Typography variant='subtitle2'>Assistant</Typography>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default BankAccountReportCardDepositSummary
