// React Imports

// MUI Imports
import Button from '@mui/material/Button'
import { Grid, Typography } from '@mui/material'

import { useDialog } from '@/hooks/useDialog'
import { useDictionary } from '@/contexts/DictionaryContext'

interface confirmProps {
  title: string
  content?: string
  content1?: string
  content2?: string
  id: string
  onClick: () => void
}

const ConfirmAlert = ({ id, title, content, content1, content2, onClick }: confirmProps) => {
  const { closeDialog } = useDialog()
  const { dictionary } = useDictionary()

  return (
    <Grid container className='flex flex-col' spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h5'>{title}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h6'>{content1}</Typography>
      </Grid>
      {content2 && (
        <Grid item xs={12}>
          <Typography>{content2}</Typography>
        </Grid>
      )}

      <Grid item xs={12} className='flex items-center  justify-end gap-2'>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => {
            closeDialog(id)
          }}
        >
          {dictionary?.cancel ?? 'Cancel'}
        </Button>
        <Button
          variant='contained'
          onClick={() => {
            closeDialog(id), onClick()
          }}
        >
          {dictionary?.confirm ?? 'Confirm'}
        </Button>
      </Grid>
    </Grid>
  )
}

export default ConfirmAlert
