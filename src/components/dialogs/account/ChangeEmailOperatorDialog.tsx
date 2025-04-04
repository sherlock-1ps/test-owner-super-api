'use client'
// MUI Imports
import Button from '@mui/material/Button'
import { Divider, Grid, MenuItem, Typography } from '@mui/material'

import { useDialog } from '@/hooks/useDialog'
import CustomTextField from '@/@core/components/mui/TextField'
import { useState } from 'react'
import { useDictionary } from '@/contexts/DictionaryContext'

interface confirmProps {
  id: string
  onClick: () => void
  data: any
}

const ChangeEmailOperatorDialog = ({ id, onClick, data }: confirmProps) => {
  const { closeDialog } = useDialog()
  const { dictionary } = useDictionary()

  const [inputEmail, setInputEmail] = useState('')

  return (
    <Grid container className='flex flex-col gap-2' spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h5'>{dictionary['account']?.operatorEmailChange?.replace('{{name}}', data)}</Typography>
      </Grid>
      <Divider />
      <Grid item xs={12}>
        <Typography>{dictionary['account']?.changeEmailDetail}</Typography>
      </Grid>
      <Grid item xs={12} className='flex gap-4'>
        <CustomTextField
          fullWidth
          type='text'
          label={dictionary['account']?.newEmail}
          placeholder=''
          value={inputEmail}
          onChange={e => {
            setInputEmail(e.target.value)
          }}
        />
      </Grid>

      <Grid item xs={12} className='flex items-center  justify-end gap-2'>
        <Button
          variant='outlined'
          onClick={() => {
            closeDialog(id)
          }}
        >
          {dictionary?.cancel}
        </Button>
        <Button
          variant='contained'
          onClick={() => {
            closeDialog(id), onClick()
          }}
          disabled={!inputEmail}
        >
          {dictionary?.confirm}
        </Button>
      </Grid>
    </Grid>
  )
}

export default ChangeEmailOperatorDialog
