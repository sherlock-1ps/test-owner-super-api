'use client'

// MUI Imports
import MuiCard from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import type { CardProps } from '@mui/material/Card'
import { Chip } from '@mui/material'

// Third-party Imports
import classnames from 'classnames'

// Types Imports
import type { ThemeColor } from '@core/types'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

type Props = CardProps & {
  color: ThemeColor
  active?: boolean
}

type CardCashBackReportProps = {
  id?: number
  title: string
  totalCashback: number
  status: string
  start: string
  end: string
  handleSelectedCard: (key: number) => void
  activeCard: number
}

const Card = styled(MuiCard, {
  shouldForwardProp: prop => prop !== 'active'
})<Props>(({ color, active }) => ({
  transition: 'border 0.3s ease-in-out, box-shadow 0.3s ease-in-out, margin 0.3s ease-in-out',
  borderWidth: '1px',
  borderColor: `var(--mui-palette-${color}-darkerOpacity)`,
  cursor: 'pointer',
  ...(active && {
    borderWidth: '3px',
    borderColor: `var(--mui-palette-${color}-main) !important`,
    boxShadow: 'var(--mui-customShadows-lg)'
  }),
  '&:hover': {
    borderWidth: '3px',
    borderColor: `var(--mui-palette-${color}-main) !important`,
    boxShadow: 'var(--mui-customShadows-lg)'
  }
}))

const AffiliateReportCardSummary = (props: CardCashBackReportProps) => {
  const { id, title, start, end, totalCashback, handleSelectedCard, activeCard } = props

  return (
    id && (
      <Card
        color={'primary'}
        active={activeCard == id || false}
        onClick={() => {
          handleSelectedCard(id)
        }}
      >
        <CardContent className='flex flex-col gap-2'>
          <Typography variant='h6'>Affiliate #{title}</Typography>
          <div className='flex gap-2 justify-between'>
            <Typography variant='h6'>Total Commission: </Typography>
            <Typography color={'warning.main'}>${Number(totalCashback).toLocaleString('en-US')}</Typography>
          </div>
          <Chip variant='tonal' label={'Success'} size='small' color='success' />
          <div className='flex flex-1 gap-4'>
            <Typography>Start:</Typography>
            <div className='flex-1 flex items-center'>
              <Typography className='text-center'>{start} 20:00</Typography>
            </div>
          </div>
          <div className='flex flex-1 gap-4'>
            <Typography>End:</Typography>
            <div className='flex-1 flex items-center'>
              <Typography className='text-center'>{end} 20:00</Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  )
}

export default AffiliateReportCardSummary
