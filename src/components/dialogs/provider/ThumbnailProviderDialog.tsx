// React Imports

// MUI Imports
import Button from '@mui/material/Button'
import { Divider, Grid, Typography } from '@mui/material'

import { useDialog } from '@/hooks/useDialog'
import CustomTextField from '@/@core/components/mui/TextField'
import UploadThumbnailImage from './UploadThumbnailImage'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateGameProvider, updateThumbtailGame } from '@/app/sevices/provider/provider'
import { toast } from 'react-toastify'
import { useDictionary } from '@/contexts/DictionaryContext'

interface confirmProps {
  id: string
  onClick: () => void
  data: any
}

const ThumbnailProviderDialog = ({ id, onClick, data }: confirmProps) => {
  const { closeDialog } = useDialog()
  const [fileImg, setFileImg] = useState(null)
  const queryClient = useQueryClient()
  const { dictionary } = useDictionary()

  const { mutate, isPending } = useMutation({
    mutationFn: updateThumbtailGame,
    onError: error => {
      console.error('Error updating game thumbnail:', error)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['gameProvider'] })
    }
  })

  const handleUpload = async () => {
    if (fileImg) {
      mutate({
        game_id: data.game_id,
        game_code: data.game_code,
        image: fileImg
      })
      closeDialog(id)
    } else {
      toast.error(dictionary?.notHaveFileImg, { autoClose: 3000 })
    }
  }

  return (
    <Grid container className='flex flex-col gap-2' spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h5'>{dictionary['provider']?.changeGameThumbnail}</Typography>
      </Grid>
      <Divider />

      <Grid container className='flex gap-4 py-4'>
        <Grid xs={12} sm={5}>
          <div className='flex flex-col gap-2 w-full items-center justify-center'>
            <img alt='gameImg' src={data.image} className='w-[69px] h-[100px]' />
            <Typography>{data.game_name}</Typography>
            <Typography>(Old Thumbnail)</Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm>
          <UploadThumbnailImage setFileImg={setFileImg} />
        </Grid>
      </Grid>

      <Grid item xs={12} className='flex items-center  justify-end gap-4'>
        <Button
          variant='outlined'
          onClick={() => {
            closeDialog(id)
          }}
        >
          {dictionary?.cancel ?? 'Cancel'}
        </Button>
        <Button
          variant='contained'
          onClick={() => {
            handleUpload()
          }}
          disabled={!fileImg || isPending}
        >
          {dictionary?.confirm ?? 'Confirm'}
        </Button>
      </Grid>
    </Grid>
  )
}

export default ThumbnailProviderDialog
