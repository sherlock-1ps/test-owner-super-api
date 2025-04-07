export type AuditLogOwnerFilterPayload = {
  start_date?: string
  end_date?: string
  menu_index?: number
  action?: string[]
  username?: string
  page: number
  limit: number
}

export type AuditLogOperatorFilterPayload = {
  start_date?: string
  end_date?: string
  menu_index?: number
  action?: string[]
  email?: string
  operator_prefix?: string
  page: number
  limit: number
}
