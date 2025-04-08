'use client'

// React Imports
import { useState, useEffect, useMemo } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import TablePagination from '@mui/material/TablePagination'
import type { TextFieldProps } from '@mui/material/TextField'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'
import type { ColumnDef, FilterFn } from '@tanstack/react-table'
import type { RankingInfo } from '@tanstack/match-sorter-utils'

// Type Imports
import type { ThemeColor } from '@core/types'
import type { InvoiceType } from '@/types/apps/invoiceTypes'
import type { Locale } from '@configs/i18n'

// Component Imports
import OptionMenu from '@core/components/option-menu'
import CustomAvatar from '@core/components/mui/Avatar'
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'

// Util Imports
import { getInitials } from '@/utils/getInitials'
import { getLocalizedUrl } from '@/utils/i18n'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import { getGroupLabelPlayer, getGroupPlayerGradient } from '@/utils/getGroupPlayer'
import ConfirmAlert from '@/components/dialogs/alerts/ConfirmAlert'
import { useDialog } from '@/hooks/useDialog'
import { Switch } from '@mui/material'
import ChangeProviderLogoDialog from '@/components/dialogs/provider/ChangeProviderLogoDialog'
import RenameAccountDialog from '@/components/dialogs/account/RenameAccountDialog'
import {
  useResetPasswordAccountOwnerMutationOption,
  useUpdateStatusAccountOwnerMutationOption
} from '@/queryOptions/account/accountQueryOptions'
import { toast } from 'react-toastify'
import { useDictionary } from '@/contexts/DictionaryContext'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type Role = {
  role_id: string
  role_name: string
}

type OwnerAccountType = {
  owner_id: string
  username: string
  role: Role
  permission: any[] | null
  is_owner: boolean
  is_enable: boolean
  is_first_login: boolean
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

// Column Definitions
const columnHelper = createColumnHelper<OwnerAccountType>()

const AccountOwnerTable = ({ data, page, pageSize, setPage, setPageSize, onUpdateStatus }: any) => {
  const { showDialog } = useDialog()
  const { dictionary } = useDictionary()
  // States
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')

  // Hooks
  const { lang: locale } = useParams()

  const { mutateAsync: resetPasswordAccountOwner } = useResetPasswordAccountOwnerMutationOption()

  const { mutate, isPending } = useUpdateStatusAccountOwnerMutationOption(onUpdateStatus)

  const handleResetPassword = async () => {
    try {
      const result = await resetPasswordAccountOwner()
      if (result?.code == 'SUCCESS') {
        toast.success(dictionary['account']?.resetSuccess, { autoClose: 3000 })
      }
    } catch (error) {
      console.log('error', error)
      toast.error('reset filed', { autoClose: 3000 })
    }
  }

  const columns = useMemo<ColumnDef<OwnerAccountType, any>[]>(
    () => [
      columnHelper.display({
        id: 'id',
        header: 'ID',
        cell: ({ row }) => <Typography variant='h6'>{row.index + 1}</Typography>
      }),

      columnHelper.accessor('username', {
        header: dictionary?.username,

        cell: ({ row }) => (
          <div className='flex flex-col'>
            <Typography variant='h6'>{row.original.username}</Typography>
          </div>
        )
      }),
      columnHelper.accessor('role.role_name', {
        header: dictionary?.role,
        cell: ({ row }) => <Typography variant='h6'>{row.original.role.role_name}</Typography>
      }),

      columnHelper.accessor('is_enable', {
        header: dictionary?.status,
        cell: ({ row }) => {
          return (
            <div className='flex gap-1 items-center'>
              <Switch
                checked={row.original.is_enable}
                disabled={isPending}
                onChange={() => {
                  showDialog({
                    id: 'alertDialogConfirmResetPasswordCreateOperator',
                    component: (
                      <ConfirmAlert
                        id='alertDialogConfirmResetPasswordCreateOperator'
                        title={dictionary?.changeStatus}
                        content1={
                          dictionary?.changeStatusWithName
                            ?.replace('{{name}}', row.original.username)
                            .replace('{{key}}', 'operator') ?? `Change this ${row.original.username} operator status?`
                        }
                        onClick={() => {
                          mutate({ owner_id: row.original.owner_id, is_enable: !row.original.is_enable })
                        }}
                      />
                    ),
                    size: 'sm'
                  })
                }}
              />
              <Typography>{row.original.is_enable ? dictionary?.enable : dictionary?.disabled}</Typography>
            </div>
          )
        }
      }),
      columnHelper.accessor('is_first_login', {
        header: 'Date Last Login',
        cell: ({ row }) => <Typography variant='h6'>ererer</Typography>
      }),

      columnHelper.display({
        id: 'action',
        cell: ({ row }) => {
          const ownerData = encodeURIComponent(JSON.stringify(row.original))
          return (
            <div className='flex items-center'>
              <OptionMenu
                iconButtonProps={{ size: 'medium' }}
                iconClassName='text-textSecondary'
                options={[
                  {
                    text: dictionary['account']?.changeRole,
                    menuItemProps: {
                      className: 'flex items-center gap-2 text-textSecondary',
                      onClick: () =>
                        showDialog({
                          id: 'RenameAccountDialog',
                          component: (
                            <RenameAccountDialog id='RenameAccountDialog' data={row.original} onClick={() => {}} />
                          ),
                          size: 'sm'
                        })
                    }
                  },
                  {
                    text: dictionary['account']?.forceReset,
                    menuItemProps: {
                      className: 'flex items-center gap-2 text-textSecondary',
                      onClick: () =>
                        showDialog({
                          id: 'alertDialogConfirmResetPasswordCreateOperator',
                          component: (
                            <ConfirmAlert
                              id='alertDialogConfirmResetPasswordCreateOperator'
                              title={dictionary['operator']?.passwordReset}
                              // content1={`Are you sure you want to force reset the password for ${row.original.username} ?`}
                              content1={
                                dictionary['account']?.resetPasswordTitle?.replace('{{name}}', row.original.username) ??
                                `Are you sure you want to force reset the password for ${row.original.username} ?`
                              }
                              content2={dictionary['account']?.resetPasswordDetail}
                              onClick={() => {
                                handleResetPassword()
                              }}
                            />
                          ),
                          size: 'sm'
                        })
                    }
                  },

                  {
                    text: (
                      <Link
                        href={{
                          pathname: `/${locale}/auditlog`,
                          query: { owner: ownerData }
                        }}
                        className='no-underline text-textSecondary'
                        onClick={e => e.stopPropagation()}
                      >
                        {dictionary?.checkLog}
                      </Link>
                    )
                  }
                ]}
              />
            </div>
          )
        },
        enableSorting: false
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  )

  const table = useReactTable({
    data: data.list as OwnerAccountType[],
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {}
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    // globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  return (
    <Card>
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead className='border-0'>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className='bg-primary text-white'>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    style={{
                      width: header.index === 7 ? 50 : 'auto'
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          className={classnames({
                            'flex items-center': header.column.getIsSorted(),
                            'cursor-pointer select-none': header.column.getCanSort()
                          })}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: <i className='tabler-chevron-up text-xl' />,
                            desc: <i className='tabler-chevron-down text-xl' />
                          }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                        </div>
                      </>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {table.getFilteredRowModel().rows.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                  {dictionary?.noData}
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {table
                .getRowModel()
                .rows.slice(0, table.getState().pagination.pageSize)
                .map(row => {
                  return (
                    <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                      ))}
                    </tr>
                  )
                })}
            </tbody>
          )}
        </table>
      </div>

      <TablePaginationComponent
        table={table}
        count={data.max_page}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    </Card>
  )
}

export default AccountOwnerTable
