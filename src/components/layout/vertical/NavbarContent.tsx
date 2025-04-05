'use client'
// Third-party Imports
import classnames from 'classnames'
import Marquee from 'react-fast-marquee'

// Type Imports
import type { ShortcutsType } from '@components/layout/shared/ShortcutsDropdown'
import type { NotificationsType } from '@components/layout/shared/NotificationsDropdown'

// Component Imports
import NavToggle from './NavToggle'
import NavSearch from '@components/layout/shared/search'
import LanguageDropdown from '@components/layout/shared/LanguageDropdown'
import ModeDropdown from '@components/layout/shared/ModeDropdown'
import ShortcutsDropdown from '@components/layout/shared/ShortcutsDropdown'
import NotificationsDropdown from '@components/layout/shared/NotificationsDropdown'
import UserDropdown from '@components/layout/shared/UserDropdown'

// Util Imports
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'
import { Typography } from '@mui/material'

// Vars
const shortcuts: ShortcutsType[] = [
  {
    url: '/apps/calendar',
    icon: 'tabler-calendar',
    title: 'Calendar',
    subtitle: 'Appointments'
  },
  {
    url: '/apps/invoice/list',
    icon: 'tabler-file-dollar',
    title: 'Invoice App',
    subtitle: 'Manage Accounts'
  },
  {
    url: '/apps/user/list',
    icon: 'tabler-user',
    title: 'Users',
    subtitle: 'Manage Users'
  },
  {
    url: '/apps/roles',
    icon: 'tabler-users-group',
    title: 'Role Management',
    subtitle: 'Permissions'
  },
  {
    url: '/',
    icon: 'tabler-device-desktop-analytics',
    title: 'Dashboard',
    subtitle: 'User Dashboard'
  },
  {
    url: '/pages/account-settings',
    icon: 'tabler-settings',
    title: 'Settings',
    subtitle: 'Account Settings'
  }
]

const notifications: NotificationsType[] = [
  {
    avatarImage: '/images/setting-website/provider/provider2.png',
    title: '098877877',
    subtitle: 'ฝากเงิน 100 บาท',
    time: '1h ago',
    read: false
  },
  {
    avatarImage: '/images/setting-website/provider/provider7.png',
    title: '0915548745',
    subtitle: 'ฝากเงิน 355 บาท',
    time: '12h ago',
    read: false
  },
  {
    avatarImage: '/images/setting-website/provider/provider4.png',
    title: '0887454754',
    subtitle: 'ฝากเงิน 555 บาท',
    time: 'May 18, 8:26 AM',
    read: true
  },
  {
    avatarIcon: 'tabler-chart-bar',
    title: '099999999',
    subtitle: 'ถอนเงิน 777 บาท',
    avatarColor: 'info',
    time: 'Apr 24, 10:30 AM',
    read: true
  },
  {
    avatarText: 'MG',
    title: 'user oneplaybet123',
    subtitle: 'เข้าสู่ระบบล่าสุด 01/12/2567',
    avatarColor: 'success',
    time: 'Feb 17, 12:17 PM',
    read: true
  }
]

const NavbarContent = () => {
  return (
    <div className={classnames(verticalLayoutClasses.navbarContent, 'flex items-center justify-between gap-4 is-full')}>
      <div className='flex items-center '>
        <NavToggle />

        {/* {process.env.NEXT_PUBLIC_ENVIRONMENT !== 'prod' && <NavSearch />} */}
      </div>
      <div className='flex'>
        <LanguageDropdown />
        {/* <div className='flex-1 overflow-hidden'>
        <Marquee gradient={false} speed={40} pauseOnHover={true} delay={0}>
          <div style={{ width: '48px' }}></div>
          <div className='flex gap-3'>
            <Typography variant='h6' className='text'>
              Annouce:
            </Typography>
            <Typography color={'success.main'} className='whitespace-nowrap'>
              Welcome to Backoffice Super API Owner Oneplaybet!
            </Typography>
          </div>
          <div style={{ width: '120px' }}></div>
        </Marquee>
      </div> */}
        {/* <div className='flex gap-1 items-center'>
        <img alt='timezone' src='/images/icons/timezoneIcon.png' className='w-[24px] h-[24px]' />
        <Typography variant='h6'>GMT+7</Typography>
      </div> */}
        <div className='flex items-center'>
          {/* <LanguageDropdown /> */}
          {/* <ModeDropdown /> */}
          {/* {process.env.NEXT_PUBLIC_ENVIRONMENT !== 'prod' && <ShortcutsDropdown shortcuts={shortcuts} />} */}

          {/* <NotificationsDropdown notifications={notifications} /> */}
          <UserDropdown />
        </div>
      </div>
    </div>
  )
}

export default NavbarContent
