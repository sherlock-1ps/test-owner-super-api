// React Imports
import { useState } from 'react'
import type { FormEvent } from 'react'

// MUI Imports
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'

// Component Imports
import { Checkbox, FormControlLabel, FormGroup, MenuItem } from '@mui/material'

import CustomTextField from '@core/components/mui/TextField'

type Props = {
  open: boolean
  handleClose: () => void
}

type FormDataType = {
  from: string
  to: string
  subject: string
  message: string
}

// Vars
const initialData: FormDataType = {
  from: 'shelbyComapny@email.com',
  to: 'qConsolidated@email.com',
  subject: 'Invoice of purchased Admin Templates',
  message: `Dear Queen Consolidated,

Thank you for your business, always a pleasure to work with you!

We have generated a new invoice in the amount of $95.59

We would appreciate payment of this invoice by 05/11/2019`
}

const PromotionReportDrawer = ({ open, handleClose }: Props) => {
  // States
  const [formData, setFormData] = useState<FormDataType>(initialData)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleClose()
    setFormData(initialData)
  }

  const handleReset = () => {
    handleClose()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleReset}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <div className='flex items-center justify-between plb-5 pli-6'>
        <Typography variant='h5'>Filter Promotion Report</Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='tabler-x text-2xl text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div className='p-6'>
        <form onSubmit={handleSubmit} className='flex flex-col items-start gap-6'>
          <CustomTextField select fullWidth defaultValue='' label='Sort By'>
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Sort by Newest Activity</MenuItem>
          </CustomTextField>
          <div>
            <Typography variant='h5'>JUST MOCKUP </Typography>
            <Typography variant='h4' color={'error.main'}>
              FOR REAL COMING SOON
            </Typography>
            <img src={`/images/avatars/dogeImage.webp`} width={'100%'} alt='commingsoon' className=' rounded' />
          </div>

          <div className='flex items-center gap-4 self-end'>
            <Button variant='tonal' color='secondary' type='reset' onClick={handleReset}>
              Cancel
            </Button>
            <Button variant='contained' color='primary' type='submit'>
              Filter
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default PromotionReportDrawer
