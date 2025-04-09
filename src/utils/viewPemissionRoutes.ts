export const viewPermissionToRouteMap: Record<string, string> = {
  '4': 'providers',
  '5': 'operators',
  '6': 'auditlog',
  '7': 'invoice',
  '9': 'account/owner',
  '10': 'account/operator',
  '11': 'role',
  "14": "settings/smtp"
}

export const extractViewRoutesFromPermissions = (permissions: string[]): string[] => {

  const permissionRoutes = permissions
    .filter(p => p.startsWith('view-owner-'))
    .map(p => p.split('view-owner-')[1])
    .filter(id => viewPermissionToRouteMap[id])
    .map(id => viewPermissionToRouteMap[id])

  return [...permissionRoutes, "faq"]
}
