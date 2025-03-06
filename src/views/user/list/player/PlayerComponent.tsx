// MUI Imports
'use client'

import CustomerStats from '@/components/card-statistics/CustomerStats'
import SalesOverview from '@/views/pages/widget-examples/statistics/SalesOverview'
import { Button, Card, CardContent, Chip, Divider } from '@mui/material'
import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'

import BalanceChart from './chart/BalanceChart'
import ProfitChart from './chart/ProfitChart'
import BonusChart from './chart/BonusChart'
import ActivityPlayer from './chart/ActivityPlayer'
import { useParams, useSearchParams } from 'next/navigation'
import CustomTextField from '@/@core/components/mui/TextField'
import { getGroupLabelPlayer, getGroupPlayerGradient } from '@/utils/getGroupPlayer'
import { getTagLabelPlayer, getTagPlayerGradient } from '@/utils/getTagPlayer'
import ConfirmAlert from '@/components/dialogs/alerts/ConfirmAlert'
import { useDialog } from '@/hooks/useDialog'
import Link from 'next/link'

const PlayerComponent = () => {
  const { showDialog } = useDialog()
  const searchParams = useSearchParams()
  const user = searchParams.get('user')
  const params = useParams()

  // Vars
  const { lang: locale } = params

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex gap-6 items-center w-full'>
        <Link href={`/${locale}/user/list`}>
          <Typography variant='h4'>Player Management</Typography>
        </Link>
        <i className='tabler-chevron-right text-[30px]' />
        <Typography variant='h4' color={'secondary'}>
          {user}
        </Typography>
      </div>

      <Grid container spacing={6} className='flex sm:flex-col md:flex-row'>
        <Grid item xs={12} sm={12} md={8} className='order-2 md:order-1'>
          <div className='flex flex-col gap-6'>
            <Card>
              <CardContent>
                <div className='flex flex-col gap-4'>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={5} md={12}>
                      <BalanceChart />
                    </Grid>
                    <Grid item xs>
                      <ProfitChart />
                    </Grid>
                  </Grid>
                  <Grid container spacing={4}>
                    <Grid item xs={4}>
                      <BonusChart title='Bonus' value='$0.00' icon='tabler-device-ipad-dollar' />
                    </Grid>
                    <Grid item xs={4}>
                      <BonusChart title='Rewards' value='$500.00' icon='tabler-gift' />
                    </Grid>
                    <Grid item xs={4}>
                      <BonusChart title='Cashback' value='$120.50' icon='tabler-cash' />
                    </Grid>
                  </Grid>
                </div>
              </CardContent>
            </Card>
            <ActivityPlayer />
          </div>
        </Grid>

        <Grid item xs={12} sm={12} md={4} className='order-1 md:order-2'>
          <Card>
            <CardContent>
              <Typography variant='h4' className='mb-2'>
                Profile
              </Typography>
              <Card>
                <CardContent className='flex flex-col gap-4'>
                  <div className=''>
                    <Typography color='text.primary' variant='h5' className='font-medium'>
                      โรเบิร์ต ไอสไตลน์
                    </Typography>
                    <Typography color='text.secondary'>{user}</Typography>
                  </div>
                </CardContent>
                <Divider />
                <CardContent className='flex gap-4 flex-col'>
                  <div className='flex flex-col gap-2'>
                    <div className='flex items-center flex-wrap justify-between'>
                      <Typography color='text.primary'>Phone number:</Typography>
                      <Typography color='text.secondary'>081-234-4567</Typography>
                    </div>
                    <div className='flex items-center flex-wrap justify-between'>
                      <Typography color='text.primary'>Created at:</Typography>
                      <Typography color='text.secondary'>28 May 2024</Typography>
                    </div>
                  </div>
                </CardContent>
                <Divider />
                <CardContent className='flex gap-4 flex-col'>
                  <div className='flex flex-col gap-2'>
                    <div className='flex items-center flex-wrap justify-between'>
                      <Typography color='text.primary'>Status</Typography>
                      <Chip variant='tonal' size='small' color='success' label='Active' />
                    </div>

                    <div className='flex items-center flex-wrap justify-between'>
                      <Typography color='text.primary'>Group</Typography>
                      <Chip
                        variant='tonal'
                        label={getGroupLabelPlayer(1)}
                        size='small'
                        sx={{
                          background: getGroupPlayerGradient(1)
                        }}
                        className='rounded-lg text-black'
                      />
                    </div>
                    <div className='flex items-center flex-wrap justify-between'>
                      <Typography color='text.primary'>Tags</Typography>
                      <div className='flex items-center gap-2'>
                        <Chip
                          variant='tonal'
                          label={
                            <div className='flex gap-1 items-center justify-center w-full'>
                              <i className='tabler-cash text-textSecondary text-[18px] text-black' />
                              <Typography variant='subtitle2' className='text-black'>
                                {getTagLabelPlayer(1)}
                              </Typography>
                            </div>
                          }
                          size='small'
                          sx={{
                            background: getTagPlayerGradient(1)
                          }}
                          className='flex flex-1 justify-center rounded-lg'
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <Divider />
                <CardContent>
                  <div className='flex items-center justify-end gap-2'>
                    <Button className='' variant='contained' startIcon={<i className='tabler-edit' />}>
                      Edit
                    </Button>

                    <Button
                      className=''
                      variant='contained'
                      color='error'
                      startIcon={<i className='tabler-player-pause' />}
                      onClick={() => {
                        showDialog({
                          id: 'alertDialogConfirmDeletePlayerSuspend',
                          component: (
                            <ConfirmAlert
                              id='alertDialogConfirmDeletePlayerSuspend'
                              title={'Are you sure to Suspend'}
                              content={`delete this user ${user} ?`}
                              onClick={() => {}}
                            />
                          ),
                          size: 'sm'
                        })
                      }}
                    >
                      Suspend
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default PlayerComponent
