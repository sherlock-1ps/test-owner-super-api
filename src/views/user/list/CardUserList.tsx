'use client'

// MUI Imports
import { useEffect, useState } from 'react'

import { useParams, useRouter } from 'next/navigation'

import Link from 'next/link'

import MuiCard from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import type { CardProps } from '@mui/material/Card'

// Third-party Imports
import classnames from 'classnames'

// Types Imports

//Component Imports
import type { TextFieldProps } from '@mui/material'
import { Chip, Grid, IconButton, Card as CardNormal, InputAdornment, Button, Pagination } from '@mui/material'

import useMediaQuery from '@mui/material/useMediaQuery'
import type { Theme } from '@mui/material/styles'
import { toast } from 'react-toastify'

import type { ThemeColor } from '@core/types'
import OptionMenu from '@/@core/components/option-menu'
import CustomTextField from '@/@core/components/mui/TextField'
import { useDialog } from '@/hooks/useDialog'
import ManageUserDialog from '@/components/dialogs/user/ManageUserDialog'

import { getTagLabelPlayer, getTagPlayerGradient } from '@/utils/getTagPlayer'
import { getGroupLabelPlayer, getGroupPlayerGradient } from '@/utils/getGroupPlayer'
import ManageUserBalanceDialog from '@/components/dialogs/user/ManageUserBalanceDialog'
import ManageEventUserDialog from '@/components/dialogs/user/ManageEventUserDialog'
import ConfirmAlert from '@/components/dialogs/alerts/ConfirmAlert'
import ChangePasswordPlayerDialog from '@/components/dialogs/user/ChangePasswordPlayerDialog'
import ReportDepositPlayerDialog from '@/components/dialogs/user/ReportDepositPlayerDialog'
import UserListDrawer from './UserListDrawer'

type Props = CardProps & {
  color: ThemeColor
}

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  isIcon,
  ...props
}: {
  value: string | number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  debounce?: number
  isIcon?: boolean
} & Omit<TextFieldProps, 'onChange'>) => {
  const [value, setValue] = useState<string | number>(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fakeEvent = {
        target: { value }
      } as React.ChangeEvent<HTMLInputElement>

      onChange(fakeEvent)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value, debounce, onChange])

  return (
    <CustomTextField
      {...props}
      value={value}
      onChange={e => setValue(e.target.value)}
      InputProps={{
        endAdornment: isIcon ? (
          <InputAdornment position='end'>
            <IconButton onClick={() => {}}>
              <i className='tabler-search' />
            </IconButton>
          </InputAdornment>
        ) : null
      }}
    />
  )
}

const Card = styled(MuiCard)<Props>(({ color }) => ({
  transition: 'border 0.3s ease-in-out, box-shadow 0.3s ease-in-out, margin 0.3s ease-in-out',
  borderLeftWidth: '17px',
  borderLeftColor: `var(--mui-palette-${color}-darkerOpacity)`,
  '[data-skin="bordered"] &:hover': {
    boxShadow: 'none'
  },
  '&:hover': {
    borderLeftWidth: '22px',
    borderLeftColor: `var(--mui-palette-${color}-main) !important`,
    borderRightWidth: '5px',
    borderRightColor: `var(--mui-palette-${color}-main) !important`,
    boxShadow: 'var(--mui-customShadows-lg)',
    marginBlockEnd: '3px'
  }
}))

const CardUserList = ({ data }: { data: any }) => {
  const router = useRouter()
  const params = useParams()
  const { lang: locale } = params
  const { showDialog } = useDialog()
  const [sendDrawerOpen, setSendDrawerOpen] = useState(false)
  const isBelowMdScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

  const [page, setPage] = useState(1)
  const itemsPerPage = 10

  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const displayedData = data.slice(startIndex, endIndex)

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const handleSelectColor = (tier: number): 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' => {
    if (tier === 1) return 'primary'
    if (tier === 2) return 'primary'
    if (tier === 3) return 'warning'
    if (tier === 4) return 'error'

    return 'primary'
  }

  return (
    <div className='flex flex-col gap-4'>
      <CardNormal>
        <CardContent>
          <Grid container spacing={4} alignItems='end'>
            <Grid item xs={12} sm>
              <Typography>UserID</Typography>
              <DebouncedInput
                value={''}
                placeholder='Search UserID'
                onChange={() => {}}
                className='w-full'
                isIcon={true}
              />
            </Grid>
            <Grid item xs={12} sm>
              <Typography>Phone number</Typography>
              <DebouncedInput
                value={''}
                placeholder='Search Phonenumber'
                onChange={() => {}}
                className='w-full'
                isIcon={true}
              />
            </Grid>
            <Grid item xs={12} sm>
              <Typography>Bank Account</Typography>
              <DebouncedInput
                value={''}
                placeholder='Search Bank acc.'
                onChange={() => {}}
                className='w-full'
                isIcon={true}
              />
            </Grid>

            <Grid item xs='auto' className=''>
              <Button
                color='primary'
                variant='outlined'
                startIcon={<i className='tabler-filter' />}
                className='max-sm:is-full'
                onClick={() => {
                  setSendDrawerOpen(true)
                }}
              >
                Filter
              </Button>
              <UserListDrawer open={sendDrawerOpen} handleClose={() => setSendDrawerOpen(false)} />
            </Grid>

            <Grid item xs='auto' className=''>
              <Button
                variant='contained'
                startIcon={<i className='tabler-plus' />}
                className='max-sm:is-full'
                onClick={() => {
                  showDialog({
                    id: 'dialogManageUser',
                    component: <ManageUserDialog id={'dialogManageUser'} title={'Add User'} onClick={() => {}} />
                  })
                }}
              >
                Add User
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </CardNormal>
      {displayedData.length > 0
        ? displayedData.map((item: any, index: any) => {
            return (
              <Card color={handleSelectColor(item.tier)} key={index}>
                <CardContent className='flex flex-col gap-1 py-4'>
                  <Grid container spacing={6}>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={2.5}
                      className={classnames({
                        '[&:nth-of-type(odd)>div]:pie-6 [&:nth-of-type(odd)>div]:border-ie':
                          isBelowMdScreen && !isSmallScreen,
                        '[&:not(:last-child)>div]:pie-6 [&:not(:last-child)>div]:border-ie': !isBelowMdScreen
                      })}
                    >
                      <div className='flex flex-col gap-1 '>
                        <div className='flex justify-between  w-full'>
                          <div className='flex flex-col gap-1 items-center  w-full'>
                            <div className='flex flex-1 gap-2 items-center justify-between w-full'>
                              <div className='flex gap-1'>
                                <Typography>ID:</Typography>
                                <Link
                                  href={{
                                    pathname: `/${locale}/user/list/player`,
                                    query: { user: item.username }
                                  }}
                                  color='primary'
                                  className='text-primary no-underline transition-transform duration-300 ease-in-out hover:scale-105 '
                                >
                                  {item.username}
                                </Link>
                              </div>
                              <IconButton
                                size='small'
                                onClick={() => toast.success('Success copied!', { autoClose: 2000 })}
                              >
                                <i className='tabler-copy text-textSecondary' />
                              </IconButton>
                            </div>
                            <div className='flex flex-1 gap-2 items-center justify-between w-full'>
                              <div className='flex gap-2 items-center'>
                                <i className='tabler-phone text-textSecondary text-[18px]' />
                                <Typography>{item.tel}</Typography>
                              </div>
                              <IconButton
                                size='small'
                                onClick={() => toast.success('Success copied!', { autoClose: 2000 })}
                              >
                                <i className='tabler-copy text-textSecondary' />
                              </IconButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md
                      className={classnames({
                        '[&:nth-of-type(odd)>div]:pie-6 [&:nth-of-type(odd)>div]:border-ie':
                          isBelowMdScreen && !isSmallScreen,
                        '[&:not(:last-child)>div]:pie-6 [&:not(:last-child)>div]:border-ie': !isBelowMdScreen
                      })}
                      sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                    >
                      <div className='flex flex-col gap-1 '>
                        <div className='flex justify-between    w-full'>
                          <div className='flex flex-col gap-1 items-center  w-full'>
                            <div className='flex flex-1 gap-2 items-center justify-between w-full'>
                              <div className='flex gap-2 items-center'>
                                <i className='tabler-wallet text-textSecondary text-[18px]' />
                                <Typography>Balance:</Typography>
                              </div>
                              <Typography>${Number(item.balance).toLocaleString('en-US')}</Typography>
                            </div>
                            <div className='flex flex-1 gap-2 items-center justify-between w-full'>
                              <div className='flex gap-1 items-center'>
                                <img
                                  src={`/images/bankAccount/${item.bankImage}Image.png`}
                                  alt='bank'
                                  height={20}
                                  width={20}
                                  className=' rounded-md'
                                />
                                <Typography>{item.bankNumber}</Typography>
                                <Typography>({item.bankName})</Typography>
                              </div>
                              <IconButton
                                size='small'
                                onClick={() => toast.success('Success copied!', { autoClose: 2000 })}
                              >
                                <i className='tabler-copy text-textSecondary' />
                              </IconButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={2.5}
                      className={classnames({
                        '[&:nth-of-type(odd)>div]:pie-6 [&:nth-of-type(odd)>div]:border-ie':
                          isBelowMdScreen && !isSmallScreen,
                        '[&:not(:last-child)>div]:pie-6 [&:not(:last-child)>div]:border-ie': !isBelowMdScreen
                      })}
                    >
                      <div className='flex flex-col gap-1 '>
                        <Chip
                          variant='tonal'
                          label={getGroupLabelPlayer(item.tier)}
                          size='small'
                          sx={{
                            background: getGroupPlayerGradient(item.tier)
                          }}
                          className='rounded-lg text-black'
                        />
                        <div className='flex gap-2 w-full'>
                          <Chip
                            variant='tonal'
                            label={
                              <div className='flex gap-1 items-center justify-center w-full'>
                                <i className='tabler-cash text-textSecondary text-[18px] text-black' />
                                <Typography variant='subtitle2' className='text-black'>
                                  {getTagLabelPlayer(item.tags[0])}
                                </Typography>
                                <Chip
                                  variant='filled'
                                  label={`+${item.tags.length}`}
                                  size='small'
                                  color='info'
                                  className='w-9'
                                />
                              </div>
                            }
                            size='small'
                            sx={{
                              background: getTagPlayerGradient(item.tags[0])
                            }}
                            className='flex flex-1 justify-center rounded-lg'
                          />
                        </div>
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={2}
                      className={classnames({
                        '[&:nth-of-type(odd)>div]:pie-6 [&:nth-of-type(odd)>div]:border-ie':
                          isBelowMdScreen && !isSmallScreen,
                        '[&:not(:last-child)>div]:pie-6 [&:not(:last-child)>div]:border-ie': !isBelowMdScreen
                      })}
                    >
                      <div className='flex flex-col gap-1 '>
                        <div className='flex justify-between  w-full'>
                          <div className='flex  gap-1 items-center  w-full'>
                            <div className='flex flex-col  items-center justify-between w-full'>
                              <Typography variant='h6'>Recent Login</Typography>
                              <Typography variant='subtitle2'>{item.lastLogin}</Typography>
                              <Typography variant='subtitle2'>21:03</Typography>
                            </div>
                            <div className='flex flex-1 gap-2 items-center justify-between w-full'>
                              <OptionMenu
                                iconButtonProps={{ size: 'medium' }}
                                iconClassName='text-textSecondary'
                                options={[
                                  {
                                    text: 'Repost Deposit',
                                    icon: 'tabler-speakerphone',
                                    menuItemProps: {
                                      className: 'flex items-center gap-2 text-primary ',
                                      onClick: () => {
                                        showDialog({
                                          id: 'dialogReportDepositPlayerDialog',
                                          component: (
                                            <ReportDepositPlayerDialog
                                              id={'dialogReportDepositPlayerDialog'}
                                              title={'Report Player Deposit'}
                                              user={item.username}
                                              onClick={() => {}}
                                            />
                                          )
                                        })
                                      }
                                    }
                                  },
                                  {
                                    text: 'Top up',
                                    icon: 'tabler-wallet',
                                    menuItemProps: {
                                      className: 'flex items-center gap-2 text-success',
                                      onClick: () => {
                                        showDialog({
                                          id: 'dialogManageUserBalance',
                                          component: (
                                            <ManageUserBalanceDialog
                                              id={'dialogManageUserBalance'}
                                              title={'Topup Balance'}
                                              mode={'topup'}
                                              onClick={() => {}}
                                            />
                                          )
                                        })
                                      }
                                    }
                                  },
                                  {
                                    text: 'Subtract',
                                    icon: 'tabler-cardboards-off',
                                    menuItemProps: {
                                      className: 'flex items-center gap-2 text-error',
                                      onClick: () => {
                                        showDialog({
                                          id: 'dialogManageUserBalance',
                                          component: (
                                            <ManageUserBalanceDialog
                                              id={'dialogManageUserBalance'}
                                              title={'Subtract Balance'}
                                              mode={'subtract'}
                                              onClick={() => {}}
                                            />
                                          )
                                        })
                                      }
                                    }
                                  },
                                  {
                                    text: 'Add agent',
                                    icon: 'tabler-user-plus',
                                    menuItemProps: {
                                      className: 'flex items-center gap-2 ',
                                      onClick: () => {
                                        showDialog({
                                          id: 'dialogManageEventUser',
                                          component: (
                                            <ManageEventUserDialog
                                              id={'dialogManageEventUser'}
                                              title={'Add Agent'}
                                              mode={'addAgent'}
                                              onClick={() => {}}
                                            />
                                          )
                                        })
                                      }
                                    }
                                  },
                                  {
                                    text: 'Send Promotion',
                                    icon: 'tabler-sparkles',
                                    menuItemProps: {
                                      className: 'flex items-center gap-2 ',
                                      onClick: () => {
                                        showDialog({
                                          id: 'dialogManageEventUser',
                                          component: (
                                            <ManageEventUserDialog
                                              id={'dialogManageEventUser'}
                                              title={'Send Promotion'}
                                              mode={'promotion'}
                                              onClick={() => {}}
                                            />
                                          )
                                        })
                                      }
                                    }
                                  },
                                  {
                                    text: 'Profile',
                                    icon: 'tabler-info-circle',
                                    menuItemProps: {
                                      className: 'flex items-center gap-2 ',
                                      onClick: () => {
                                        router.push(`/${locale}/user/list/player/?user=${item.username}`)
                                      }
                                    }
                                  },
                                  {
                                    text: 'Change Password',
                                    icon: 'tabler-key',
                                    menuItemProps: {
                                      className: 'flex items-center gap-2 text-warning',
                                      onClick: () => {
                                        showDialog({
                                          id: 'dialogChangePasswordPlayer',
                                          component: (
                                            <ChangePasswordPlayerDialog
                                              id={'dialogChangePasswordPlayer'}
                                              title={'Change Password'}
                                              onClick={() => {}}
                                            />
                                          )
                                        })
                                      }
                                    }
                                  },
                                  {
                                    text: 'Suspend',
                                    icon: 'tabler-player-pause',
                                    menuItemProps: {
                                      className: 'flex items-center gap-2 text-error',
                                      onClick: () => {
                                        showDialog({
                                          id: `alertDialogSuspendPlayer`,
                                          component: (
                                            <ConfirmAlert
                                              id={`alertDialogSuspendPlayer`}
                                              title={'Are you sure to suspend'}
                                              content={`suspend this user: ${item.username} ?`}
                                              onClick={async () => {}}
                                            />
                                          ),
                                          size: 'sm'
                                        })
                                      }
                                    }
                                  }
                                ]}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            )
          })
        : null}

      <div className='self-end'>
        <Pagination
          count={Math.ceil(data.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          variant='tonal'
          shape='rounded'
          color='primary'
        />
      </div>
    </div>
  )
}

export default CardUserList

// {
//   isBelowMdScreen && !isSmallScreen && index < data.length - 2 && (
//     <Divider
//       className={classnames('mbs-6', {
//         'mie-6': index % 2 === 0
//       })}
//     />
//   )
// }
// {
//   isSmallScreen && index < data.length - 1 && <Divider className='mbs-6' />
// }
