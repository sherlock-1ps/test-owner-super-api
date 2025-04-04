'use client'
import { Button, Grid, Switch, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const PermissionList = () => {
  const router = useRouter()
  const [selectedModule, setSelectedModule] = useState<string>('')

  const handleButtonClick = (module: string) => {
    setSelectedModule(module)
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={3} className='flex flex-col gap-2'>
        <Typography>Module</Typography>
        <div className='flex flex-col'>
          <div className='flex flex-col'>
            <Button
              variant={selectedModule === 'Providers' ? 'contained' : 'text'}
              className='flex items-start justify-start'
              onClick={() => handleButtonClick('Providers')}
            >
              Providers
            </Button>

            <Button
              variant={selectedModule === 'Operator' ? 'contained' : 'text'}
              className='flex items-start justify-start'
              onClick={() => handleButtonClick('Operator')}
            >
              Operator
            </Button>

            <Button
              variant={selectedModule === 'Account' ? 'contained' : 'text'}
              className='flex items-start justify-start'
              onClick={() => handleButtonClick('Account')}
            >
              Account
            </Button>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} sm>
        <div className='px-4 py-2 h-[52px] rounded-tl-xl rounded-tr-xl border border-b-0 flex items-center justify-between'>
          <Typography>Provider Permissions</Typography>
          <div className='flex gap-1 items-center'>
            <Switch />
            <Typography>Select All</Typography>
          </div>
        </div>
        <div className='px-4 py-2 min-h-[72px]  border flex gap-2 items-center'>
          <div className=' self-start'>
            <Switch />
          </div>
          <div className='flex flex-col'>
            <Typography variant='h6'>View Provider List</Typography>
            <Typography>Allows users to access and view a list of service providers within the system</Typography>
          </div>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className='flex gap-4 items-center justify-end'>
          <Button
            variant='outlined'
            onClick={() => {
              router.back()
            }}
          >
            Cancel
          </Button>
          <Button variant='contained'>Create Role</Button>
        </div>
      </Grid>
    </Grid>
  )
}

export default PermissionList
