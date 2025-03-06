import { getProfileData } from '@/app/server/actions'
import { getRoleData } from '@/app/server/pages/role/roleActions'
import Roles from '@/views/bops/role/RoleComponent'

const RoleBops = async () => {
  const roleList = await getRoleData()

  const data = await getProfileData()

  return (
    <Roles

      // data={data}
      data={roleList?.data?.list}
    />
  )
}

export default RoleBops
