'use client'
import { Card, CardContent, Grid, Typography, Chip } from '@mui/material'

import classNames from 'classnames'

import CustomAvatar from '@core/components/mui/Avatar'
import type { TeamsTabType } from '@/types/pages/profileTypes'
import { useDialog } from '@/hooks/useDialog'
import MenuOptions from '@/components/options/MenuOptions'
import ConfirmAlert from '@/components/dialogs/alerts/ConfirmAlert'
import AssistantDialog from '@/components/dialogs/assistant'
import ChangePasswordAssistant from '@/components/dialogs/assistant/ChangePasswordAssistant'
import type { AssistantType } from '@/types/pages/assistant/assistantTypes'
import { deleteAssistantData } from '@/app/server/pages/assistant/assistantAction'

const dataList = [
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

const CardAssistantList = ({ data }: { data: AssistantType }) => {
  const { showDialog } = useDialog()

  const handleDeleteUser = async (id: number) => {
    const data = { user_id: id }

    // await deleteAssistantData(data)
  }

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Grid container alignItems={'center'}>
          <Grid item xs>
            <div className={classNames('flex items-center gap-4 p-1 rounded-sm')}>
              <CustomAvatar size={34} src={dataList[0].avatar} />
              <div className='flex justify-between items-center w-full gap-4'>
                <div>
                  <Typography className='font-medium' color='text.primary'>
                    {data?.username}
                  </Typography>
                  <Typography variant='body2'> {data?.phone_number}</Typography>
                </div>
              </div>
            </div>
          </Grid>

          <Grid item xs={'auto'}>
            <MenuOptions
              options={[
                {
                  text: 'Edit Profile',
                  onClick: () => {
                    showDialog({
                      id: 'assistantEditDialog',
                      component: <AssistantDialog data={data} id='assistantEditDialog' />
                    })
                  }
                },
                {
                  text: 'Change Password',
                  onClick: () => {
                    {
                      showDialog({
                        id: 'changePasswordAssistantDialog',
                        component: <ChangePasswordAssistant id='changePasswordAssistantDialog' user_id={data?.id} />
                      })
                    }
                  }
                },
                {
                  text: 'Assistant Logs',
                  onClick: () => {}
                },
                {
                  text: 'Delete',
                  onClick: () => {
                    showDialog({
                      id: 'alertDialogConfirmDeleteAssistant',
                      component: (
                        <ConfirmAlert
                          id='alertDialogConfirmDeleteAssistant'
                          title={'Are you sure to delete'}
                          content1={`delete this ${data?.username} assistant ?`}
                          onClick={() => {
                            // handleDeleteUser(data?.id)
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

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant='body2'>{data?.description || 'empty'}</Typography>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ maxHeight: '120px', overflowY: 'auto' }}>
          <Grid item xs={12} className='flex items-center justify-between'>
            <Typography variant='body1' color={'primary'}>
              Casino Manager
            </Typography>
            <Chip variant='tonal' size='small' label={'Available'} color={'success'} />
          </Grid>
          <Grid item xs={12} className='flex items-center justify-between'>
            <Typography variant='body1' color={'primary'}>
              Casino Manager
            </Typography>
            <Chip variant='tonal' size='small' label={'Available'} color={'success'} />
          </Grid>
          <Grid item xs={12} className='flex items-center justify-between'>
            <Typography variant='body1' color={'primary'}>
              Casino Manager
            </Typography>
            <Chip variant='tonal' size='small' label={'Available'} color={'success'} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CardAssistantList
