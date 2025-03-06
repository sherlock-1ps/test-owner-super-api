'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import MuiTimeline from '@mui/lab/Timeline'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import Typography from '@mui/material/Typography'
import type { TimelineProps } from '@mui/lab/Timeline'

// Components Imports
import OptionMenu from '@core/components/option-menu'
import { Chip } from '@mui/material'

// Styled Timeline component
const Timeline = styled(MuiTimeline)<TimelineProps>({
  paddingLeft: 0,
  paddingRight: 0,
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    }
  }
})

const ActivityPlayer = () => {
  return (
    <Card>
      <CardHeader
        avatar={<i className='tabler-list-details text-xl' />}
        title='Activity Timeline'
        titleTypographyProps={{ variant: 'h5' }}
        // action={<OptionMenu options={['Share timeline', 'Suggest edits', 'Report bug']} />}
        sx={{ '& .MuiCardHeader-avatar': { mr: 3 } }}
      />
      <CardContent className='flex gap-6 w-full'>
        <div className='flex flex-col gap-2'>
          <div className='flex gap-2 items-center'>
            <Chip
              variant='filled'
              label=''
              color='success'
              icon={<i className='tabler-check text-md' />}
              className='text-white'
            />
            <Typography variant='h6'>Deposit</Typography>
          </div>
          <div className='flex gap-2 items-center'>
            <Chip
              variant='filled'
              label=''
              color='error'
              icon={<i className='tabler-check text-md' />}
              className='text-white'
            />
            <Typography variant='h6'>Withdraw</Typography>
          </div>
          <div className='flex gap-2 items-center'>
            <Chip
              variant='filled'
              label=''
              color='primary'
              icon={<i className='tabler-check text-md' />}
              className='text-white'
            />
            <Typography variant='h6'>Bet</Typography>
          </div>
          <div className='flex gap-2 items-center'>
            <Chip
              variant='filled'
              label=''
              color='info'
              icon={<i className='tabler-check text-md' />}
              className='text-white'
            />
            <Typography variant='h6'>Affiliate</Typography>
          </div>
        </div>
        <div className='flex flex-col gap-6 w-full'>
          <Timeline>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color='primary' />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <div className='flex flex-wrap items-center justify-between gap-x-2 mbe-2.5'>
                  <Typography className='font-medium' color='text.primary'>
                    ทำการ bet
                  </Typography>
                  <Typography variant='caption'>12 min ago</Typography>
                </div>
                <Typography className='mbe-2'>เกม spinix</Typography>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color='success' />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <div className='flex flex-wrap items-center justify-between gap-x-2 mbe-2.5'>
                  <Typography className='font-medium' color='text.primary'>
                    ฝากเงินจำนวน 1,000 บาท
                  </Typography>
                  <Typography variant='caption'>45 min ago</Typography>
                </div>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color='info' />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <div className='flex flex-wrap items-center justify-between gap-x-2 mbe-2.5'>
                  <Typography className='font-medium' color='text.primary'>
                    รับเงิน Affiliate
                  </Typography>
                  <Typography variant='caption'>2 Day Ago</Typography>
                </div>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color='error' />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <div className='flex flex-wrap items-center justify-between gap-x-2 mbe-2.5'>
                  <Typography className='font-medium' color='text.primary'>
                    ถอนเงินออกจากระบบ
                  </Typography>
                  <Typography variant='caption'>4 Day Ago</Typography>
                </div>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </div>
      </CardContent>
    </Card>
  )
}

export default ActivityPlayer
