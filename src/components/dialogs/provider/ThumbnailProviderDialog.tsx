// React Imports

// MUI Imports
import Button from '@mui/material/Button'
import { Divider, Grid, Typography } from '@mui/material'

import { useDialog } from '@/hooks/useDialog'
import CustomTextField from '@/@core/components/mui/TextField'
import UploadThumbnailImage from './UploadThumbnailImage'

interface confirmProps {
  id: string
  onClick: () => void
}

const ThumbnailProviderDialog = ({ id, onClick }: confirmProps) => {
  const { closeDialog } = useDialog()

  return (
    <Grid container className='flex flex-col gap-2' spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h5'>Change game thumbnail</Typography>
      </Grid>
      <Divider />
      <Grid item xs={12} className='flex gap-4'>
        <div className='flex flex-col gap-2 w-full items-center justify-center'>
          <img alt='gameImg' />
          <Typography>Treasures of Aztec</Typography>
          <Typography>(Old Thumbnail)</Typography>
        </div>
        <UploadThumbnailImage />
      </Grid>

      <Grid item xs={12} className='flex items-center  justify-end gap-4'>
        <Button
          variant='outlined'
          onClick={() => {
            closeDialog(id)
          }}
        >
          Cancel
        </Button>
        <Button
          variant='contained'
          onClick={() => {
            closeDialog(id), onClick()
          }}
        >
          Confirm
        </Button>
      </Grid>
    </Grid>
  )
}

export default ThumbnailProviderDialog
