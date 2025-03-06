// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

interface BonusChartProps {
  title: string
  value: string
  icon: string
}

const BonusChart: React.FC<BonusChartProps> = ({ title, value, icon }) => {
  return (
    <Card>
      <CardContent className='flex justify-between gap-1'>
        <div className='flex flex-col gap-1 flex-grow'>
          <div className='flex gap-4 items-center'>
            <CustomAvatar color='primary' skin='light' variant='rounded' size={42}>
              <i className={`${icon} text-[26px]`} />
            </CustomAvatar>
            <Typography color='text.secondary' variant='h5'>
              {title}
            </Typography>
          </div>
          <div className='flex items-center gap-2 flex-wrap'>
            <Typography variant='h4'>{value}</Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default BonusChart
