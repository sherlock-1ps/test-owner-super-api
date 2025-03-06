'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import type { ApexOptions } from 'apexcharts'
import CustomAvatar from '@/@core/components/mui/Avatar'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

const series = [{ data: [20, 17, 30, 40] }]

const BalanceChart = () => {
  // Hook
  const theme = useTheme()

  // Vars
  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
      sparkline: { enabled: true }
    },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    stroke: {
      width: 2,
      curve: 'smooth'
    },
    grid: {
      show: false,
      padding: {
        bottom: 20
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityTo: 0,
        opacityFrom: 1,
        shadeIntensity: 1,
        stops: [0, 100],
        colorStops: [
          [
            {
              offset: 0,
              opacity: 0.4,
              color: theme.palette.primary.main
            },
            {
              opacity: 0,
              offset: 100,
              color: 'var(--mui-palette-background-paper)'
            }
          ]
        ]
      }
    },
    theme: {
      monochrome: {
        enabled: true,
        shadeTo: 'light',
        shadeIntensity: 1,
        color: theme.palette.primary.main
      }
    },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: { show: false }
  }

  return (
    <Card className='pbe-6'>
      <CardContent>
        <div className='flex gap-2'>
          <CustomAvatar skin='light' color='primary' variant='rounded' size={28}>
            <i className='tabler-wallet text-lg' />
          </CustomAvatar>
          <Typography variant='h5' color={'secondary'}>
            Balance
          </Typography>
        </div>
        <Typography variant='h4'>$143,580.05</Typography>
      </CardContent>
      <AppReactApexCharts type='area' height={90} width='100%' series={series} options={options} />
    </Card>
  )
}

export default BalanceChart
