'use client'
import { Card, CardContent, Grid, Typography, Avatar, AvatarGroup, Tooltip, Button } from '@mui/material'

import CustomAvatar from '@core/components/mui/Avatar'
import type { TeamsTabType } from '@/types/pages/profileTypes'
import MenuOptions from '../options/MenuOptions'
import { useDialog } from '@/hooks/useDialog'
import RoleDialog from '../dialogs/role'
import PermissionDialog from '../dialogs/permission'
import ConfirmAlert from '../dialogs/alerts/ConfirmAlert'
import ManageAssistantDialog from '../dialogs/permission/ManageAssistant'
import { deleteRole, getRoleUserManagement } from '@/app/server/pages/role/roleActions'

const dataAssistant = [
  { key: '1', name: 'Jordan Stevenson', profession: '095-555-4445', totalCourses: 33, avatar: '/images/avatars/1.png' },
  {
    key: '2',
    name: 'Bentlee Emblin',
    profession: 'Digital Marketing',
    totalCourses: 52,
    avatar: '/images/avatars/2.png'
  },
  {
    key: '3',
    name: 'Benedetto Rossiter',
    profession: 'UI/UX Design',
    totalCourses: 12,
    avatar: '/images/avatars/3.png'
  },
  { key: '4', name: 'Beverlie Krabbe', profession: 'Vue', totalCourses: 8, avatar: '/images/avatars/4.png' },
  { key: '5', name: 'Emma Bowen', profession: 'React Native', totalCourses: 9, avatar: '/images/avatars/3.png' },
  { key: '6', name: 'Amy Patterson', profession: 'Java Developer', totalCourses: 10, avatar: '/images/avatars/6.png' }
]

const CardRoleList = ({ data }: { data?: any }) => {
  const { showDialog } = useDialog()
  const mockUpUser = data && data.length > 0 ? data[0] : null

  const handleGetUserManagement = async (id: string | number) => {
    // const data = await getRoleUserManagement({ role_id: id })
    const data = {
      data: {
        users_in_role: [],
        users_out_of_role: [
          {
            id: 1,
            username: 'admin',
            phone_number: '191',
            profile_image: ''
          }
        ]
      }
    }

    showDialog({
      id: 'permissionDialog',
      component: <ManageAssistantDialog id='permissionDialog' data={data?.data} role_id={id} />
    })
  }

  return (
    <Card className='h-full'>
      <CardContent className='flex flex-col gap-4 h-full'>
        <Grid container alignItems={'center'}>
          <Grid item xs={'auto'}>
            <CustomAvatar color={'primary'} variant='rounded' size={60} skin='light'>
              <i className='tabler-search' />
            </CustomAvatar>
          </Grid>

          <Grid item xs>
            <Typography variant='h6' textAlign={'center'}>
              {data?.name || 'Administrator'}
            </Typography>
          </Grid>

          <Grid item xs={'auto'}>
            <MenuOptions
              options={[
                {
                  text: 'Edit Role Profile',
                  onClick: () => {
                    showDialog({
                      id: 'editRoleDialog',
                      component: <RoleDialog id={'editRoleDialog'} data={data} />
                    })
                  }
                },
                {
                  text: 'Manage Assistant',
                  onClick: () => {
                    handleGetUserManagement(data?.id)
                  }
                },
                {
                  text: 'Delete',
                  onClick: () => {
                    showDialog({
                      id: 'alertDialogConfirmDeleteRole',
                      component: (
                        <ConfirmAlert
                          id='alertDialogConfirmDeleteRole'
                          title={'Are you sure to delete'}
                          content1='delete this role ?'
                          onClick={async () => {
                            // await deleteRole(data.id)
                          }}
                        />
                      ),
                      size: 'sm'
                    })
                  }
                }
              ]}
            />
          </Grid>
        </Grid>
        {/* Additional Typography content within Grid */}
        <Grid container spacing={4} xs>
          <Grid item xs={12}>
            <Typography variant='body2'>
              {data?.description ||
                'Managing and maintaining the underlying infrastructure and operations of the website.'}
            </Typography>
          </Grid>
        </Grid>
        {mockUpUser && (
          <div className='flex items-center justify-between flex-wrap gap-4'>
            <AvatarGroup
              total={mockUpUser.extraMembers ? mockUpUser.extraMembers + 3 : 3}
              max={6}
              sx={{ '& .MuiAvatar-root': { width: '2rem', height: '2rem', fontSize: '1rem' } }}
              className='items-center pull-up'
            >
              {mockUpUser.avatarGroup.map((person: any, index: number) => {
                return (
                  <Tooltip key={index} title={person.name}>
                    <Avatar src={person.avatar} alt={person.name} />
                  </Tooltip>
                )
              })}
            </AvatarGroup>
          </div>
        )}
        <Button
          variant='outlined'
          color='secondary'
          onClick={() => {
            showDialog({ id: 'permissionDialog', component: <PermissionDialog data={data} /> })
          }}
        >
          Set Permissions
        </Button>
      </CardContent>
    </Card>
  )
}

export default CardRoleList
