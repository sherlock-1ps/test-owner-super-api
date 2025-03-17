'use client'

// React Imports
import { useState } from 'react'
import type { ReactElement, SyntheticEvent } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'

// Type Imports
import type { Data } from '@/types/pages/profileTypes'

// Component Imports
import CustomTabList from '@core/components/mui/TabList'
import UserProfileHeader from '../pages/user-profile/UserProfileHeader'
import ProfileList from './ProfileList'
import { Button, Card, CardContent, Chip, Divider, Typography } from '@mui/material'
import { useDialog } from '@/hooks/useDialog'
import ChangePasswordDialog from '@/components/dialogs/profile/ChangePasswordDialog'
import ProifileLogTable from './ProifileLogTable'

const ProfileComponent = ({ data }: { data?: Data }) => {
  const { showDialog } = useDialog()
  const [currentTab, setCurrentTab] = useState('profile')
  // States

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}></Grid>
      <Grid item xs={12} className='flex flex-col gap-6'>
        <Card>
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={3} className='flex flex-col gap-2'>
                <Button
                  variant='contained'
                  className='w-full flex items-start justify-start gap-2'
                  onClick={() => {
                    setCurrentTab('profile')
                  }}
                >
                  <svg xmlns='http://www.w3.org/2000/svg' width='18' height='20' viewBox='0 0 18 20' fill='none'>
                    <path
                      d='M8.99999 9.9987C9.90649 9.9987 10.7926 9.72989 11.5464 9.22627C12.3001 8.72264 12.8875 8.00683 13.2344 7.16933C13.5813 6.33184 13.6721 5.41028 13.4953 4.5212C13.3184 3.63212 12.8819 2.81545 12.2409 2.17446C11.5999 1.53347 10.7832 1.09695 9.89415 0.920101C9.00507 0.743252 8.08352 0.834017 7.24602 1.18092C6.40853 1.52782 5.69271 2.11528 5.18909 2.869C4.68546 3.62273 4.41666 4.50887 4.41666 5.41537C4.41809 6.6305 4.90143 7.79546 5.76066 8.65469C6.6199 9.51392 7.78485 9.99727 8.99999 9.9987ZM8.99999 2.66537C9.54389 2.66537 10.0756 2.82665 10.5278 3.12883C10.98 3.431 11.3325 3.86049 11.5407 4.36299C11.7488 4.86548 11.8033 5.41842 11.6972 5.95186C11.591 6.48531 11.3291 6.97532 10.9445 7.35991C10.5599 7.7445 10.0699 8.00642 9.53649 8.11253C9.00304 8.21864 8.45011 8.16418 7.94761 7.95604C7.44511 7.74789 7.01562 7.39542 6.71345 6.94318C6.41127 6.49095 6.24999 5.95927 6.24999 5.41537C6.25079 4.68627 6.54078 3.98726 7.05633 3.47171C7.57188 2.95616 8.27089 2.66617 8.99999 2.66537Z'
                      fill='white'
                    />
                    <path
                      d='M9 10.9141C4.45067 10.9141 0.75 14.2039 0.75 18.2474C0.75 18.4905 0.846577 18.7237 1.01849 18.8956C1.19039 19.0675 1.42355 19.1641 1.66667 19.1641H16.3333C16.5764 19.1641 16.8096 19.0675 16.9815 18.8956C17.1534 18.7237 17.25 18.4905 17.25 18.2474C17.25 14.2039 13.5493 10.9141 9 10.9141ZM2.67289 17.3307C3.18311 14.7329 5.82623 12.7474 9 12.7474C12.1738 12.7474 14.8169 14.7329 15.3271 17.3307H2.67289Z'
                      fill='white'
                    />
                  </svg>
                  My Profile
                </Button>
                <Button
                  variant='contained'
                  className='w-full flex items-start justify-start gap-2'
                  onClick={() => {
                    setCurrentTab('log')
                  }}
                >
                  <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 22 22' fill='none'>
                    <path
                      d='M12.0312 6.87503V10.4165L14.9677 12.1782C15.0865 12.2465 15.1904 12.3378 15.2735 12.4468C15.3566 12.5557 15.4171 12.6801 15.4516 12.8127C15.486 12.9453 15.4937 13.0834 15.4742 13.219C15.4547 13.3546 15.4084 13.4849 15.3379 13.6024C15.2675 13.7199 15.1743 13.8222 15.0639 13.9033C14.9535 13.9844 14.828 14.0427 14.6948 14.0747C14.5616 14.1068 14.4234 14.112 14.2882 14.09C14.153 14.0681 14.0235 14.0194 13.9073 13.9468L10.4698 11.8843C10.317 11.7927 10.1906 11.6632 10.1028 11.5082C10.015 11.3532 9.96878 11.1781 9.96875 11V6.87503C9.96875 6.60152 10.0774 6.33922 10.2708 6.14582C10.4642 5.95243 10.7265 5.84378 11 5.84378C11.2735 5.84378 11.5358 5.95243 11.7292 6.14582C11.9226 6.33922 12.0312 6.60152 12.0312 6.87503ZM11 2.40628C9.87 2.40337 8.75066 2.62473 7.70684 3.05755C6.66301 3.49036 5.71545 4.12602 4.91906 4.92768C4.51602 5.33503 4.14562 5.73292 3.78125 6.13081V5.50003C3.78125 5.22652 3.6726 4.96422 3.4792 4.77082C3.28581 4.57743 3.0235 4.46878 2.75 4.46878C2.4765 4.46878 2.21419 4.57743 2.0208 4.77082C1.8274 4.96422 1.71875 5.22652 1.71875 5.50003V8.93753C1.71875 9.21103 1.8274 9.47334 2.0208 9.66673C2.21419 9.86013 2.4765 9.96878 2.75 9.96878H6.1875C6.461 9.96878 6.72331 9.86013 6.9167 9.66673C7.1101 9.47334 7.21875 9.21103 7.21875 8.93753C7.21875 8.66402 7.1101 8.40172 6.9167 8.20832C6.72331 8.01493 6.461 7.90628 6.1875 7.90628H4.96461C5.41406 7.39065 5.87555 6.89394 6.38172 6.38175C7.28936 5.47385 8.44443 4.85357 9.7026 4.59842C10.9608 4.34327 12.2662 4.46456 13.4558 4.94715C14.6455 5.42974 15.6665 6.25221 16.3913 7.31179C17.1161 8.37137 17.5126 9.62106 17.5312 10.9047C17.5498 12.1884 17.1897 13.449 16.4959 14.5292C15.8021 15.6093 14.8054 16.461 13.6302 16.9779C12.4551 17.4948 11.1537 17.6538 9.88867 17.4353C8.62364 17.2167 7.45107 16.6301 6.5175 15.7489C6.31853 15.5611 6.05309 15.4601 5.7796 15.468C5.5061 15.4759 5.24695 15.5921 5.05914 15.791C4.87133 15.99 4.77026 16.2555 4.77816 16.5289C4.78606 16.8024 4.90228 17.0616 5.10125 17.2494C6.12135 18.2123 7.36166 18.9109 8.71388 19.2841C10.0661 19.6573 11.4891 19.6938 12.8587 19.3904C14.2283 19.087 15.5028 18.453 16.5709 17.5437C17.6391 16.6344 18.4684 15.4774 18.9864 14.1738C19.5045 12.8702 19.6956 11.4596 19.543 10.0651C19.3904 8.67067 18.8987 7.33478 18.111 6.17407C17.3232 5.01337 16.2633 4.06315 15.0238 3.40637C13.7842 2.7496 12.4028 2.40624 11 2.40628Z'
                      fill='#404550'
                    />
                  </svg>
                  Login Log
                </Button>
              </Grid>
              {currentTab == 'profile' ? (
                <Grid item xs={12} sm className='flex flex-col gap-8'>
                  <Typography variant='h4'>My Profile</Typography>
                  <Divider />
                  <Typography variant='h5'>Account Detail</Typography>
                  <div className='flex gap-9 justify-stretch'>
                    <div className='flex flex-col gap-1'>
                      <Typography>Username</Typography>
                      <Typography variant='h6'>AdminSuperAPI</Typography>
                    </div>
                    <div className='flex flex-col gap-1'>
                      <Typography>password</Typography>
                      <Typography variant='h6'>**********</Typography>
                    </div>
                  </div>

                  <div className='flex gap-9 justify-stretch'>
                    <div className='flex flex-col gap-1'>
                      <Typography>Role</Typography>
                      <Typography variant='h6'>Administrator</Typography>
                    </div>
                    <div className='flex flex-col gap-1'>
                      <Typography>Status</Typography>
                      <Chip label='active' color='warning' />
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
                  <ProifileLogTable />
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
