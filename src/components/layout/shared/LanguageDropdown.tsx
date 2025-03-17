'use client'

// React Imports
import { useRef, useState } from 'react'

// Next Imports
import Link from 'next/link'
import { usePathname, useParams } from 'next/navigation'

// MUI Imports
import IconButton from '@mui/material/IconButton'
import Popper from '@mui/material/Popper'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'

// Type Imports
import type { Locale } from '@configs/i18n'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'
import { Typography } from '@mui/material'

type LanguageDataType = {
  langCode: Locale
  langName: string
}

const getLocalePath = (pathName: string, locale: string) => {
  if (!pathName) return '/'
  const segments = pathName.split('/')

  segments[1] = locale

  return segments.join('/')
}

// Vars
const languageData: LanguageDataType[] = [
  {
    langCode: 'th',
    langName: 'Thai'
  },
  {
    langCode: 'en',
    langName: 'English'
  }

  // {
  //   langCode: 'fr',
  //   langName: 'French'
  // },
  // {
  //   langCode: 'ar',
  //   langName: 'Arabic'
  // }
]

const LanguageDropdown = () => {
  // States
  const [open, setOpen] = useState(false)

  // Refs
  const anchorRef = useRef<HTMLButtonElement>(null)

  // Hooks
  const pathName = usePathname()
  const { settings } = useSettings()
  const { lang } = useParams()

  const handleClose = () => {
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  return (
    <>
      <IconButton ref={anchorRef} onClick={handleToggle} className='text-textPrimary flex gap-1'>
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
          <mask id='mask0_1146_21287' maskUnits='userSpaceOnUse' x='0' y='0' width='24' height='24'>
            <path
              d='M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z'
              fill='white'
            />
          </mask>
          <g mask='url(#mask0_1146_21287)'>
            <path d='M-6.13977 -1.5H30.1399V25.4714H-6.13977V-1.5Z' fill='#00247D' />
          </g>
          <mask id='mask1_1146_21287' maskUnits='userSpaceOnUse' x='0' y='0' width='24' height='24'>
            <path
              d='M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z'
              fill='white'
            />
          </mask>
          <g mask='url(#mask1_1146_21287)'>
            <path
              d='M26.0784 25.4713L12 15.0011L-2.08843 25.4713H-6.13977V22.4487L7.94386 11.9857L-6.13977 1.50852V-1.5H-2.08831L12 8.97017L26.0786 -1.5H30.1399V1.50806L16.0562 11.9857L30.1399 22.448V25.4713H26.0784Z'
              fill='white'
            />
          </g>
          <mask id='mask2_1146_21287' maskUnits='userSpaceOnUse' x='0' y='0' width='24' height='24'>
            <path
              d='M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z'
              fill='white'
            />
          </mask>
          <g mask='url(#mask2_1146_21287)'>
            <path
              d='M-3.44044 25.4713H-6.13977L10.658 12.9081L-6.13977 0.51036V-1.5L10.7004 10.9416L27.4357 -1.5H30.1399L13.2957 10.9451L30.1399 23.461V25.4713L13.4038 12.9522L-3.44044 25.4713Z'
              fill='#CF142B'
            />
          </g>
          <mask id='mask3_1146_21287' maskUnits='userSpaceOnUse' x='0' y='0' width='24' height='24'>
            <path
              d='M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z'
              fill='white'
            />
          </mask>
          <g mask='url(#mask3_1146_21287)'>
            <path
              d='M15.293 26.2809H8.7071V15.279H-7.75769V8.69314H8.7071V-2.03906H15.293V8.69314H31.7579V15.279H15.293V26.2809Z'
              fill='white'
            />
          </g>
          <mask id='mask4_1146_21287' maskUnits='userSpaceOnUse' x='0' y='0' width='24' height='24'>
            <path
              d='M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z'
              fill='white'
            />
          </mask>
          <g mask='url(#mask4_1146_21287)'>
            <path
              d='M13.9758 26.2809H10.0242V13.9619H-7.75769V10.0103H10.0242V-2.03906H13.9758V10.0103H31.7579V13.9619H13.9758V26.2809Z'
              fill='#CF142B'
            />
          </g>
        </svg>
        <Typography variant='h6' className='uppercase'>
          {lang}
        </Typography>
        {/* <i className='tabler-language' /> */}
      </IconButton>
      <Popper
        open={open}
        transition
        disablePortal
        placement='bottom-start'
        anchorEl={anchorRef.current}
        className='min-is-[160px] !mbs-3 z-[1]'
      >
        {({ TransitionProps, placement }) => (
          <Fade
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom-start' ? 'left top' : 'right top' }}
          >
            <Paper className={settings.skin === 'bordered' ? 'border shadow-none' : 'shadow-lg'}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList onKeyDown={handleClose}>
                  {languageData.map(locale => (
                    <MenuItem
                      key={locale.langCode}
                      component={Link}
                      href={getLocalePath(pathName, locale.langCode)}
                      onClick={handleClose}
                      selected={lang === locale.langCode}
                    >
                      {locale.langName}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  )
}

export default LanguageDropdown
