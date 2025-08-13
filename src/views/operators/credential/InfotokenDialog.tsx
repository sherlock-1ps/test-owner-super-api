'use client'
// MUI Imports
import Button from '@mui/material/Button'
import { Grid, IconButton, InputAdornment, Typography } from '@mui/material'

import { useDialog } from '@/hooks/useDialog'
import CustomTextField from '@/@core/components/mui/TextField'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useFetchTokenQueryOption } from '@/queryOptions/operator/operatorQueryOptions'

interface CredentialDialogProps {
  id: string
  prefix: any
}

const InfotokenDialog = ({ id, prefix }: CredentialDialogProps) => {
  const { closeDialog } = useDialog()
  const [isTokenShown, setIsTokenShown] = useState(false)
  // const [isSecretKeyShown, setIsSecretKeyShown] = useState(false)

  const payload = {
    operator_prefix: prefix?.operator_prefix,
    credential_prefix: prefix?.credential_prefix
  }

  const { data } = useFetchTokenQueryOption({ payload })

  const handleClickShowToken = () => setIsTokenShown(show => !show)
  // const handleClickShowSecretKey = () => setIsSecretKeyShown(show => !show)

  const handleCopyToken = () => {
    navigator.clipboard.writeText(data?.data?.token)
    toast.success('Token copied to clipboard!', { autoClose: 3000 })
  }

  return (
    <Grid container className='flex flex-col' spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h5'>Token of Credential</Typography>
      </Grid>
      <Grid item xs={12} className='flex gap-2'>
        <CustomTextField
          fullWidth
          label='Token'
          placeholder='············'
          type={isTokenShown ? 'text' : 'password'}
          value={data?.data?.token}
          disabled
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton edge='end' onClick={handleClickShowToken} onMouseDown={e => e.preventDefault()}>
                  <i className={isTokenShown ? 'tabler-eye-off' : 'tabler-eye'} />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <div className=' self-end'>
          <Button variant='outlined' startIcon={<i className='tabler-copy' />} onClick={handleCopyToken}>
            Copy
          </Button>
        </div>
      </Grid>

      {/* <Grid item xs={12} className='flex gap-2'>
        <CustomTextField
          fullWidth
          label='Secret Key'
          value={secretToken}
          disabled
          placeholder='············'
          type={isSecretKeyShown ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton edge='end' onClick={handleClickShowSecretKey} onMouseDown={e => e.preventDefault()}>
                  <i className={isSecretKeyShown ? 'tabler-eye-off' : 'tabler-eye'} />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <div className=' self-end'>
          <Button variant='outlined' startIcon={<i className='tabler-copy' />} onClick={handleCopySecretKey}>
            Copy
          </Button>
        </div>
      </Grid> */}
    </Grid>
  )
}

export default InfotokenDialog
