// React Imports

// MUI Imports
import Button from '@mui/material/Button'
import { Divider, Grid, Typography } from '@mui/material'

import { useDialog } from '@/hooks/useDialog'
import { useDictionary } from '@/contexts/DictionaryContext'
import { useFetchOperatorProfile } from '@/queryOptions/operator/operatorQueryOptions'

interface OperatorInfoDialogProps {
  id: string
  onClick: () => void
  operatorId: string
}

const OperatorInfoDialog = ({ id, onClick, operatorId }: OperatorInfoDialogProps) => {
  const { closeDialog } = useDialog()
  const { dictionary } = useDictionary()

  const { data } = useFetchOperatorProfile(operatorId)

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h5'>Operator Profile</Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      {data ? (
        <>
          <Grid item xs={6}>
            <div className='flex flex-col'>
              <Typography>Opearator Prefix</Typography>
              <Typography variant='h6'>{data?.data?.operator_prefix}</Typography>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className='flex flex-col'>
              <Typography>Opearator Name</Typography>
              <Typography variant='h6'>{data?.data?.operator_name}</Typography>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className='flex flex-col'>
              <Typography>Email Address</Typography>
              <Typography variant='h6'>{data?.data?.email}</Typography>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className='flex flex-col'>
              <Typography>Currency</Typography>
              <Typography variant='h6'>{data?.data?.currency_code}</Typography>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className='flex flex-col'>
              <Typography>Country</Typography>
              <Typography variant='h6'>{data?.data?.country_code}</Typography>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className='flex flex-col'>
              <Typography>Timezone</Typography>
              <Typography variant='h6'>{data?.data?.timezone}</Typography>
            </div>
          </Grid>
          {data?.data?.contract && (
            <Grid item xs={12}>
              <div className='flex flex-col'>
                <Typography>Contract</Typography>
                <Typography variant='h6'>{data?.data?.contract}</Typography>
              </div>
            </Grid>
          )}
        </>
      ) : (
        <p>Loading....</p>
      )}
    </Grid>
  )
}

export default OperatorInfoDialog
