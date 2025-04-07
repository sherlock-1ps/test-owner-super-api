

export type UserRole = {
  role_id: string
  role_name: string
}

export type UserProfile = {
  owner_id: string
  username: string
  role: UserRole
  permission: string[]
  is_enable: boolean
  is_first_login: boolean | null
}
