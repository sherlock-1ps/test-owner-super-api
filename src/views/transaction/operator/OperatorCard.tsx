// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Chip, Divider } from '@mui/material'

import OptionMenu from '@/@core/components/option-menu'
import ConfirmAlert from '@/components/dialogs/alerts/ConfirmAlert'
import { useDialog } from '@/hooks/useDialog'

const OperatorCard = ({ title, data }: { title: any; data: any }) => {
  const { showDialog } = useDialog()

  return (
    data.length > 0 &&
    data.map((item: any, index: number) => {
      return (
        <Card className={`${title === 'deposit' ? 'bg-deposit' : 'bg-withdraw'}`} key={index}>
          <CardContent className='p-4'>
            <div className='flex gap-2 items-center justify-between w-full'>
              <div className='flex items-center gap-2 mbe-4'>
                <Typography className='text-black'>#{item.userId}</Typography>
                <Typography className='text-black'>{item.date} 15:00</Typography>
              </div>
              {title == 'deposit' ? (
                <OptionMenu
                  iconButtonProps={{ size: 'medium' }}
                  iconClassName='text-black'
                  options={[
                    {
                      text: 'Approve Deposit',
                      icon: 'tabler-check',
                      menuItemProps: {
                        className: 'flex items-center gap-2 text-textSecondary',
                        onClick: () =>
                          showDialog({
                            id: 'alertDialogConfirmApproveDeposit',
                            component: (
                              <ConfirmAlert
                                id='alertDialogConfirmApproveDeposit'
                                title='Are you sure to approve ?'
                                content={`approve this user ${item.username} ?`}
                                onClick={() => {}}
                              />
                            ),
                            size: 'sm'
                          })
                      }
                    },
                    {
                      text: 'Reject',
                      icon: 'tabler-x',
                      menuItemProps: {
                        className: 'flex items-center gap-2 text-error',

                        onClick: () =>
                          showDialog({
                            id: 'alertDialogConfirmApproveReject',
                            component: (
                              <ConfirmAlert
                                id='alertDialogConfirmApproveReject'
                                title='Are you sure to Reject deposit ?'
                                content={`Reject deposit this user  ${item.username}  ?`}
                                onClick={() => {}}
                              />
                            ),
                            size: 'sm'
                          })
                      }
                    }
                  ]}
                />
              ) : (
                <OptionMenu
                  iconButtonProps={{ size: 'medium' }}
                  iconClassName='text-black'
                  options={[
                    {
                      text: 'Withdraw Manual',
                      icon: 'tabler-cash',
                      menuItemProps: {
                        className: 'flex items-center gap-2 text-textSecondary',
                        onClick: () =>
                          showDialog({
                            id: 'alertDialogConfirmApproveWithdraw2',
                            component: (
                              <ConfirmAlert
                                id='alertDialogConfirmApproveWithdraw2'
                                title='Are you sure to Withdraw Manual ?'
                                content={`Withdraw this user  ${item.username} ?`}
                                onClick={() => {}}
                              />
                            ),
                            size: 'sm'
                          })
                      }
                    },
                    {
                      text: 'Withdraw Auto',
                      icon: 'tabler-wallet',
                      menuItemProps: {
                        className: 'flex items-center gap-2 text-textSecondary',
                        onClick: () =>
                          showDialog({
                            id: 'alertDialogConfirmApproveWithdraw',
                            component: (
                              <ConfirmAlert
                                id='alertDialogConfirmApproveWithdraw'
                                title='Are you sure to Withdraw Auto ?'
                                content={`Withdraw Auto this user  ${item.username} ?`}
                                onClick={() => {}}
                              />
                            ),
                            size: 'sm'
                          })
                      }
                    },

                    {
                      text: 'Reject',
                      icon: 'tabler-x',
                      menuItemProps: {
                        className: 'flex items-center gap-2 text-error',

                        onClick: () =>
                          showDialog({
                            id: 'alertDialogConfirmApproveReject',
                            component: (
                              <ConfirmAlert
                                id='alertDialogConfirmApproveReject'
                                title='Are you sure to Reject withdraw ?'
                                content={`Reject this withdraw user XPB ${item.username} ?`}
                                onClick={() => {}}
                              />
                            ),
                            size: 'sm'
                          })
                      }
                    }
                  ]}
                />
              )}
            </div>
            <div className='flex gap-2 items-center justify-between w-full'>
              <div className='flex items-center gap-2 mbe-4'>
                <Typography className='text-black'>{title == 'deposit' ? 'Deposit' : 'Withdraw'} - </Typography>
                <Typography variant='h6' className='text-black'>
                  {item.username}
                </Typography>
              </div>
              <Chip
                variant='tonal'
                size='small'
                label={item.status === 'inprocess' ? 'In Process' : 'Waiting'}
                color={item.status === 'waiting' ? 'warning' : 'secondary'}
                sx={{ width: '90px' }}
                className='self-start'
              />
            </div>

            <div className='flex gap-2 items-center justify-between w-full'>
              <div className='flex items-center gap-2 mbe-4'>
                <Typography variant='h5' className='text-black'>
                  {item.value.toLocaleString()} USD
                </Typography>
              </div>
              <div className='flex flex-col items-end'>
                <Typography className='text-black'>Amount {(item.value * item.rate).toLocaleString()} THB</Typography>
                <Typography className='text-black'>(USD/THB {item.rate})</Typography>
              </div>
            </div>
            <Divider sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} className='my-2' />

            <div className='flex justify-between items-center'>
              <div className='flex align-center justify-between'>
                <div className='flex items-center gap-1'>
                  <img
                    src={`/images/bankAccount/${item.source.bank}Image.png`}
                    width={24}
                    alt='transactionBank'
                    className=' rounded'
                  />
                  <div className='flex flex-col'>
                    <Typography variant='subtitle2' className='text-black'>
                      {item.source.bankNumber}
                    </Typography>
                    <Typography variant='subtitle2' className='text-black'>
                      {item.source.bankName}
                    </Typography>
                  </div>
                </div>
              </div>
              <i className='tabler-arrow-narrow-right text-black' />
              <div className='flex align-center justify-between '>
                <div className='flex items-center gap-1'>
                  <img
                    src={`/images/bankAccount/${item.destination.bank}Image.png`}
                    width={24}
                    alt='transactionBank'
                    className=' rounded'
                  />
                  <div className='flex flex-col'>
                    <Typography variant='subtitle2' className='text-black'>
                      {item.destination.bankNumber}
                    </Typography>
                    <Typography variant='subtitle2' className='text-black'>
                      {item.destination.bankName}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    })
  )
}

export default OperatorCard
