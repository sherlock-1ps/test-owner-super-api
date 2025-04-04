// React Imports

// MUI Imports
import Button from '@mui/material/Button'
import { Divider, Grid, MenuItem, Typography } from '@mui/material'

import { useDialog } from '@/hooks/useDialog'
import CustomTextField from '@/@core/components/mui/TextField'
import { useChangeRoleAccountOwnerMutationOption } from '@/queryOptions/account/accountQueryOptions'
import { useDictionary } from '@/contexts/DictionaryContext'
import { useFetchConfigRoleQueryOption } from '@/queryOptions/config/configQueryOptions'
import { useState } from 'react'
import { toast } from 'react-toastify'

interface confirmProps {
  id: string
  onClick?: () => void
  data: any
}

const RenameAccountDialog = ({ id, onClick, data }: confirmProps) => {
  console.log('data', data)

  const { closeDialog } = useDialog()
  const { dictionary } = useDictionary()
  const [role, setRole] = useState('')
  const { mutateAsync: changeRoleAccountOwner, isPending: pendingChangeRole } =
    useChangeRoleAccountOwnerMutationOption()
  const { data: roleListData, isPending: pendingRole } = useFetchConfigRoleQueryOption()

  const handleUpdateRole = async () => {
    try {
      const result = await changeRoleAccountOwner({ owner_id: data?.owner_id, role_id: role })

      if (result?.code == 'SUCCESS') {
        toast.success('change role success!', { autoClose: 3000 })
        closeDialog(id)
      }
    } catch (error) {
      console.log('error', error)
      toast.error('change role failed!', { autoClose: 3000 })
    }
  }

  return (
    <Grid container className='flex flex-col gap-2' spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h5'>{dictionary['account']?.changeRole}</Typography>
      </Grid>
      <Divider />
      <Grid item xs={12} className='flex gap-4'>
        <CustomTextField fullWidth type='text' label='Old Role' placeholder='' disabled value={data?.role?.role_name} />

        <CustomTextField
          select
          fullWidth
          value={role}
          defaultValue={''}
          onChange={e => setRole(e.target.value)}
          label={dictionary['account']?.newRole}
          disabled={pendingRole}
        >
          {roleListData?.code === 'SUCCESS'
            ? [
                ...roleListData?.data.map((item: any, idx: number) => (
                  <MenuItem value={item?.role_id} key={idx} className='capitalize'>
                    {item?.role_name}
                  </MenuItem>
                ))
              ]
            : [<MenuItem value='' key='all'></MenuItem>]}
        </CustomTextField>
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
            handleUpdateRole()
          }}
          disabled={pendingChangeRole}
        >
          {dictionary?.confirm}
        </Button>
      </Grid>
    </Grid>
  )
}

export default RenameAccountDialog
