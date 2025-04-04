// // Third-party Imports
// import { getServerSession } from 'next-auth'

// // Type Imports
// import type { Locale } from '@configs/i18n'
// import type { ChildrenType } from '@core/types'

// // Component Imports
// import AuthRedirect from '@/components/AuthRedirect'

// export default async function AuthGuard({
//   children,
//   locale,
//   session
// }: ChildrenType & { locale: Locale; session: string | null }) {
//   // const session = await getServerSession()

//   // const session = {
//   //   user: { name: 'Admin', email: 'admin@oneplaybet.com', image: undefined }
//   // }

//   return <>{session ? children : <AuthRedirect lang={locale} />}</>
// }

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthRedirect from '@/components/AuthRedirect'
import { useAuthStore } from '@/store/authStore'
import type { Locale } from '@configs/i18n'
import type { PropsWithChildren } from 'react'

interface AuthGuardProps extends PropsWithChildren {
  locale: Locale
  session: string | null
}

const AuthGuard = ({ children, locale, session }: AuthGuardProps) => {
  const router = useRouter()
  const accessToken = useAuthStore(state => state.accessToken)
  const profile = useAuthStore(state => state.profile)

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const isLoggedIn = !!session && !!accessToken && !!profile

  return isLoggedIn ? <>{children}</> : <AuthRedirect lang={locale} />
}

export default AuthGuard
