'use client'

import { useFormContext } from 'react-hook-form'
import { Button, Grid, Switch, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useFetchPermissionQueryOption } from '@/queryOptions/rolePermission/rolePermissionQueryOptions'

const ICONS: Record<string, string> = {
  Providers: 'tabler-crown',
  Operators: 'tabler-building-skyscraper',
  'Audit Log': 'tabler-logs',
  Invoice: 'tabler-file-invoice',
  Account: 'tabler-user-circle',
  'Role & Permission': 'tabler-shield-chevron',
  FAQ: 'tabler-bubble-text',
  Setting: 'tabler-settings'
}

const PermissionList = () => {
  const router = useRouter()
  const { data: permissionList } = useFetchPermissionQueryOption()
  const { handleSubmit } = useFormContext()
  const [selectedModule, setSelectedModule] = useState<string>('')
  const [selectedPermision, setSelectedPermission] = useState(null)

  const topLevelKeys = Object.keys(permissionList?.data || {})

  if (!selectedModule && topLevelKeys.length > 0) {
    setSelectedModule(topLevelKeys[0])
  }

  const selectedData = permissionList?.data[selectedModule]

  const renderPermissions = () => {
    if (Array.isArray(selectedData)) {
      return (
        <>
          <div className='px-4 py-2 h-[52px] rounded-tl-xl rounded-tr-xl border flex items-center justify-between'>
            <Typography>{selectedModule} Permissions</Typography>
            <div className='flex gap-1 items-center'>
              <Switch />
              <Typography>Select All</Typography>
            </div>
          </div>
          {selectedData.map(permission => (
            <div
              key={permission.permission_id}
              className='px-4 py-2 min-h-[72px] border border-t-0 flex gap-2 items-center'
            >
              <div className='self-start'>
                <Switch />
              </div>
              <div className='flex flex-col'>
                <Typography variant='h6'>{permission.permission_name}</Typography>
                <Typography>{permission.permission_detail}</Typography>
              </div>
            </div>
          ))}
        </>
      )
    }

    if (typeof selectedData === 'object') {
      return Object.entries(selectedData || {})
        .filter(([_key, value]) => Array.isArray(value))
        .map(([groupKey, value]) => {
          const permissions = value as any[]

          return (
            <div key={groupKey} className='mt-4'>
              <div className='px-4 py-2 h-[52px] rounded-tl-xl rounded-tr-xl border flex items-center justify-between'>
                <Typography>{groupKey} Permissions</Typography>
                <div className='flex gap-1 items-center'>
                  <Switch />
                  <Typography>Select All</Typography>
                </div>
              </div>
              {permissions.map(permission => (
                <div
                  key={permission.permission_id}
                  className='px-4 py-2 min-h-[72px] border border-t-0 flex gap-2 items-center'
                >
                  <div className='self-start'>
                    <Switch />
                  </div>
                  <div className='flex flex-col'>
                    <Typography variant='h6'>{permission.permission_name}</Typography>
                    <Typography>{permission.permission_detail}</Typography>
                  </div>
                </div>
              ))}
            </div>
          )
        })
    }

    return null
  }

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={3} className='flex flex-col gap-2'>
          {topLevelKeys.map(key => (
            <Button
              key={key}
              variant={selectedModule === key ? 'contained' : 'text'}
              startIcon={<i className={`${ICONS[key] || 'tabler-circle'} text-xl`} />}
              className='flex items-start justify-start text-nowrap'
              onClick={() => setSelectedModule(key)}
            >
              {key}
            </Button>
          ))}
        </Grid>

        <Grid item xs={12} sm>
          {renderPermissions()}
        </Grid>
      </Grid>

      <Grid item xs={12} className='flex justify-end mt-4'>
        <Button type='submit' variant='contained' onClick={handleSubmit(data => console.log('✅ Final Form:', data))}>
          Create Role
        </Button>
      </Grid>
    </>
  )
}

export default PermissionList
