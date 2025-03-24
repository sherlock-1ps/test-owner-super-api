// React Imports

// MUI Imports
import Button from '@mui/material/Button'
import { Divider, Grid, MenuItem, Typography } from '@mui/material'

import { useDialog } from '@/hooks/useDialog'
import CustomTextField from '@/@core/components/mui/TextField'
import { useChangeRoleAccountOwnerMutationOption } from '@/queryOptions/account/accountQueryOptions'

interface confirmProps {
  id: string
  onClick: () => void
  data: any
}

const RenameAccountDialog = ({ id, onClick, data }: confirmProps) => {
  const { closeDialog } = useDialog()
  const { mutate: changeRoleAccountOwner } = useChangeRoleAccountOwnerMutationOption()

  return (
    <Grid container className='flex flex-col gap-2' spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h5'>Change Role</Typography>
      </Grid>
      <Divider />
      <Grid item xs={12} className='flex gap-4'>
        <CustomTextField fullWidth type='text' label='Old Role' placeholder='' disabled value={data?.role_name} />
        <CustomTextField select fullWidth defaultValue={10} label='New Role'>
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>All</MenuItem>
        </CustomTextField>
      </Grid>

      <Grid item xs={12} className='flex items-center  justify-end gap-2'>
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

export default RenameAccountDialog
