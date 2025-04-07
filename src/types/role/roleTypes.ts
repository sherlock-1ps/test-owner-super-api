export type CreateRolePayload = {
  role_name: string
  description: string
  permissions: string[]
}

export type UpdateRolePayload = {
  role_id: string
  role_name: string
  description: string
  permissions: string[]
}

export type RoleExistPayload = {
  role_id: string
  parent_role_id: string
}
