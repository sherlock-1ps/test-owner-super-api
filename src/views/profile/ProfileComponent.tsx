/* eslint-disable react-hooks/exhaustive-deps */
'use client'

// React Imports
import { useEffect, useState } from 'react'
import type { SyntheticEvent } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import { Button, Card, CardContent, Chip, Divider, Typography } from '@mui/material'

// Hooks
import { useDialog } from '@/hooks/useDialog'
import { useAuthStore } from '@/store/authStore'

// Components
import CustomTabList from '@core/components/mui/TabList'
import UserProfileHeader from '../pages/user-profile/UserProfileHeader'
import ChangePasswordDialog from '@/components/dialogs/profile/ChangePasswordDialog'
import ProifileLogTable from './ProifileLogTable'

// Types
import type { Data } from '@/types/pages/profileTypes'
import {
  useSearchAuditLogOperatorMutationOption,
  useSearchAuditLogOwnerMutationOption
} from '@/queryOptions/auditlog/auditLogQueryOptions'
import { useHasPermission } from '@/hooks/useHasPermission'

const ProfileComponent = ({ data }: { data?: Data }) => {
  const { showDialog } = useDialog()
  const profileData = useAuthStore(state => state.profile)
  // const { hasPermission } = useHasPermission()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [currentTab, setCurrentTab] = useState('profile')

  const { mutate, data: loginLogData, isPending, reset } = useSearchAuditLogOwnerMutationOption()

  useEffect(() => {
    if (currentTab == 'profile') {
      setPage(1)
      setPageSize(10)
      reset()
    } else {
      mutate({
        action: ['LOGIN'],
        username: profileData?.username,
        page: page,
        limit: pageSize
      })
    }
  }, [page, pageSize, currentTab])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}></Grid>

      <Grid item xs={12} className='flex flex-col gap-6'>
        <Card>
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={3} className='flex flex-col gap-2'>
                <Button
                  variant={currentTab === 'profile' ? 'contained' : 'outlined'}
                  className='w-full flex items-center justify-start'
                  onClick={() => setCurrentTab('profile')}
                  startIcon={<i className='tabler-user' />}
                >
                  My Profile
                </Button>

                <Button
                  variant={currentTab === 'log' ? 'contained' : 'outlined'}
                  className='w-full flex items-center justify-start'
                  onClick={() => setCurrentTab('log')}
                  startIcon={<i className='tabler-history' />}
                >
                  Login Log
                </Button>
              </Grid>

              {currentTab === 'profile' ? (
                <Grid item xs={12} sm className='flex flex-col gap-8'>
                  <Typography variant='h4'>My Profile</Typography>
                  <Divider />
                  <Typography variant='h5'>Account Detail</Typography>

                  <div className='flex gap-9 justify-stretch'>
                    <div className='flex flex-col gap-1'>
                      <Typography>Username</Typography>
                      <Typography variant='h6'>{profileData?.username}</Typography>
                    </div>
                  </div>

                  <div className='flex gap-9 justify-stretch'>
                    <div className='flex flex-col gap-1'>
                      <Typography>Role</Typography>
                      <Typography variant='h6'>{profileData?.role?.role_name}</Typography>
                    </div>
                  </div>

                  <Divider />

                  <Button
                    variant='contained'
                    onClick={() => {
                      showDialog({
                        id: 'ChangePasswordDialog',
                        component: <ChangePasswordDialog id='ChangePasswordDialog' onClick={() => {}} />
                      })
                    }}
                  >
                    Change Password
                  </Button>
                </Grid>
              ) : (
                <Grid item xs={12} sm={9} className='flex flex-col gap-8'>
                  <Typography variant='h4'>Login Log</Typography>
                  <Divider />
                  {isPending && <Typography variant='h6'>Loading...</Typography>}

                  {loginLogData?.code == 'SUCCESS' && (
                    <ProifileLogTable
                      data={loginLogData?.data || { list: [] }}
                      page={page}
                      pageSize={pageSize}
                      setPage={setPage}
                      setPageSize={setPageSize}
                    />
                  )}
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ProfileComponent
