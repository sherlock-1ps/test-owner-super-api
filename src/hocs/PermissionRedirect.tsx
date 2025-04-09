/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { PropsWithChildren, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import type { Locale } from '@configs/i18n'
import { extractViewRoutesFromPermissions, viewPermissionToRouteMap } from '@/utils/viewPemissionRoutes'

interface PermissionRedirectProps extends PropsWithChildren {
  lang: Locale
  permission: string[]
}

const PermissionRedirect = ({ children, lang, permission }: PermissionRedirectProps) => {
  const pathname = usePathname()
  const router = useRouter()

  const availableRoutes = extractViewRoutesFromPermissions(permission)
  // const firstAllowedRoute = availableRoutes[0]
  // const currentPath = pathname?.split('/')[2]

  console.log('availableRoutes', availableRoutes)
  // console.log('firstAllowedRoute', firstAllowedRoute)
  // console.log('currentPath', currentPath)

  // useEffect(() => {
  //   if (!availableRoutes.includes(currentPath)) {
  //     const redirectTo = firstAllowedRoute ? `/${lang}/${firstAllowedRoute}` : `/${lang}/login?redirectTo=${pathname}`
  //     router.replace(redirectTo)
  //   }
  // }, [])

  useEffect(() => {
    const isPathAllowed = availableRoutes.some(route => pathname.includes(`/${route}`))
    const pathPermission = Object.values(viewPermissionToRouteMap).some(route => pathname.includes(`/${route}`))

    if (isPathAllowed || !pathPermission) {
      return
    } else {
      router.push(`/${lang}/404`)
    }
  }, [pathname])

  return <>{children}</>
}

export default PermissionRedirect
