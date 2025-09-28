// Next Imports
import { useParams } from 'next/navigation'

// MUI Imports
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Type Imports
import { Typography } from '@mui/material'

import type { getDictionary } from '@/utils/getDictionary'
import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'

// Component Imports
import { Menu, SubMenu, MenuItem, MenuSection } from '@menu/vertical-menu'
import CustomChip from '@core/components/mui/Chip'

// import { GenerateVerticalMenu } from '@components/GenerateMenu'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'
import { useAuthStore } from '@/store/authStore'
import { useHasPermission } from '@/hooks/useHasPermission'

// Menu Data Imports
// import menuData from '@/data/navigation/verticalMenuData'

type RenderExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

type Props = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>
  scrollMenu: (container: any, isPerfectScrollbar: boolean) => void
}

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ dictionary, scrollMenu }: Props) => {
  // Hooks
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const params = useParams()

  const { hasPermission } = useHasPermission()

  // Vars
  const { isBreakpointReached, transitionDuration } = verticalNavOptions
  const { lang: locale } = params

  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        {hasPermission('view-owner-4') && (
          <MenuItem
            href={`/${locale}/providers`}
            icon={<i className='tabler-crown' />}
            exactMatch={false}
            activeUrl='/providers'
          >
            {dictionary['navigation'].providers}
          </MenuItem>
        )}

        {hasPermission('view-owner-5') && (
          <MenuItem
            href={`/${locale}/operators`}
            icon={<i className='tabler-building-skyscraper' />}
            exactMatch={false}
            activeUrl='/operators'
          >
            {dictionary['navigation'].operators}
          </MenuItem>
        )}

        {hasPermission('view-owner-6') && (
          <MenuItem
            href={`/${locale}/auditlog`}
            icon={<i className='tabler-logs' />}
            exactMatch={false}
            activeUrl='/auditlog'
          >
            {dictionary['navigation'].auditLog}
          </MenuItem>
        )}

        {hasPermission('view-owner-7') && (
          <MenuItem
            href={`/${locale}/invoice/invoicelist`}
            icon={<i className='tabler-file-invoice' />}
            exactMatch={false}
            activeUrl='/invoice'
          >
            {dictionary['navigation'].invoice}
          </MenuItem>
        )}

        {(hasPermission('view-owner-9') || hasPermission('view-owner-10')) && (
          <SubMenu label={dictionary['navigation'].account} icon={<i className='tabler-user-circle' />}>
            {hasPermission('view-owner-9') && (
              <MenuItem href={`/${locale}/account/owner`}>{dictionary['navigation'].accountOwner}</MenuItem>
            )}
            {hasPermission('view-owner-10') && (
              <MenuItem href={`/${locale}/account/operator`}>{dictionary['navigation'].accountOperator}</MenuItem>
            )}
          </SubMenu>
        )}

        {hasPermission('view-owner-11') && (
          <MenuItem
            href={`/${locale}/role`}
            icon={<i className='tabler-shield-chevron' />}
            exactMatch={false}
            activeUrl='/role'
          >
            {dictionary['navigation'].rolesPermissions}
          </MenuItem>
        )}

        <MenuItem
          href={`/${locale}/faq`}
          icon={<i className='tabler-bubble-text' />}
          exactMatch={false}
          activeUrl='/faq'
        >
          {dictionary['navigation'].faq}
        </MenuItem>

        {hasPermission('view-owner-14') && (
          <SubMenu label={dictionary['navigation'].settings} icon={<i className='tabler-settings' />}>
            <MenuItem href={`/${locale}/settings/smtp`}>{dictionary['navigation'].settingSmtp}</MenuItem>
          </SubMenu>
        )}
      </Menu>
      <Typography variant='subtitle2' className='text-center'>
        Version 1.0.0
      </Typography>
    </ScrollWrapper>
  )
}

export default VerticalMenu
