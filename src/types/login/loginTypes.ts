export type UserPermission = {
  permission_id: string
  permission_group: string
  permission_type: 'view' | 'create' | 'edit' | 'delete' | 'export' | string
  menu_index: number
}

export type UserRole = {
  role_id: string
  role_name: string
}

export type UserProfile = {
  owner_id: string
  username: string
  role: UserRole
  permission: UserPermission[]
  is_enable: boolean
  is_first_login: boolean | null
}
