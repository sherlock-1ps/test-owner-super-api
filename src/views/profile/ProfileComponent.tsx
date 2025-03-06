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

const ProfileComponent = ({ data }: { data?: Data }) => {
  // States

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserProfileHeader data={data?.profileHeader} />
      </Grid>
      <Grid item xs={12} className='flex flex-col gap-6'>
        <ProfileList data={data?.users.profile} />
      </Grid>
    </Grid>
  )
}

export default ProfileComponent
