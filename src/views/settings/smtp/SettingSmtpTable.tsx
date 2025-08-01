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
import { useDictionary } from '@/contexts/DictionaryContext'
import {
  useDeleteSmtpMutationOption,
  useUpdateStatusSmtpMutationOption
} from '@/queryOptions/smtp/settingSmtpQueryOptions'
import { useHasPermission } from '@/hooks/useHasPermission'
import { OptionType } from '@/@core/components/option-menu/types'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type SmtpConfigType = {
  smtp_id: string
  host: string
  port: string // If port should be a number, change this to `number`
  smtp_username: string
  password: string
  sender_name: string
  sender_email: string
  is_enable: boolean
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
const columnHelper = createColumnHelper<SmtpConfigType>()

const SettingSmtpTable = ({ data, page, pageSize, setPage, setPageSize }: any) => {
  const { showDialog } = useDialog()
  const { dictionary } = useDictionary()
  const { hasPermission } = useHasPermission()
  // States
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')

  // Hooks
  const { lang: locale } = useParams()

  const { mutate, isPending } = useUpdateStatusSmtpMutationOption()
  const { mutate: callDeleteSmtp } = useDeleteSmtpMutationOption()

  const columns = useMemo<ColumnDef<SmtpConfigType, any>[]>(
    () => [
      columnHelper.display({
        id: 'id',
        header: 'ID',
        cell: ({ row }) => <Typography variant='h6'>{row.index + 1}</Typography>
      }),

      columnHelper.accessor('host', {
        header: 'Host',

        cell: ({ row }) => (
          <div className='flex flex-col'>
            <Typography variant='h6'>{row.original.host}</Typography>
          </div>
        )
      }),
      columnHelper.accessor('port', {
        header: 'Port',
        cell: ({ row }) => <Typography variant='h6'>{row.original.port}</Typography>
      }),
      columnHelper.accessor('smtp_username', {
        header: 'SMTP Username',
        cell: ({ row }) => <Typography variant='h6'>{row.original.smtp_username}</Typography>
      }),
      columnHelper.accessor('password', {
        header: dictionary?.password ?? 'Password',
        cell: ({ row }) => <Typography variant='h6'>{row.original.password}</Typography>
      }),
      columnHelper.accessor('sender_name', {
        header: dictionary['smtp']?.sender,
        cell: ({ row }) => <Typography variant='h6'>{row.original.sender_name}</Typography>
      }),
      columnHelper.accessor('sender_email', {
        header: dictionary['smtp']?.formEmail,

        cell: ({ row }) => (
          <div className='flex flex-col'>
            <Typography variant='h6'>{row.original.sender_email}</Typography>
          </div>
        )
      }),

      columnHelper.accessor('is_enable', {
        header: dictionary?.status,
        cell: ({ row }) => {
          return (
            <div className='flex gap-1 items-center'>
              <Switch
                checked={row.original.is_enable}
                onChange={
                  hasPermission('edit-owner-14')
                    ? () => {
                        showDialog({
                          id: 'alertDialogConfirmResetPasswordCreateOperator',
                          component: (
                            <ConfirmAlert
                              id='alertDialogConfirmResetPasswordCreateOperator'
                              title={dictionary?.changeStatus}
                              // content1={`Change this ${row.original.smtp_username} status?`}
                              content1={
                                dictionary?.changeStatusWithName
                                  ?.replace('{{name}}', row.original.smtp_username)
                                  .replace('{{key}}', 'smtp') ?? `Change this ${row.original.smtp_username} status?`
                              }
                              onClick={() => {
                                mutate({ smtp_id: row.original.smtp_id, is_enable: !row.original.is_enable })
                              }}
                            />
                          ),
                          size: 'sm'
                        })
                      }
                    : () => {}
                }
                disabled={isPending}
              />
              <Typography>{row.original.is_enable ? dictionary?.enable : dictionary?.disabled}</Typography>
            </div>
          )
        }
      }),
      columnHelper.display({
        id: 'action',
        header: '',
        cell: ({ row }) => {
          const encodedSmtpData = encodeURIComponent(JSON.stringify(row.original))
          const options: OptionType[] = []

          if (hasPermission('edit-owner-14')) {
            options.push({
              text: (
                <Link
                  href={{
                    pathname: `/${locale}/settings/smtp/create`,
                    query: { data: encodedSmtpData }
                  }}
                  className='no-underline text-textSecondary'
                  onClick={e => e.stopPropagation()}
                >
                  {dictionary['smtp']?.editSmtp}
                </Link>
              )
            })
          }

          if (hasPermission('delete-owner-14')) {
            options.push({
              text: dictionary?.delete,
              menuItemProps: {
                className: 'flex items-center gap-2 text-textSecondary',
                onClick: () =>
                  showDialog({
                    id: 'alertDialogConfirmResetPasswordCreateOperator',
                    component: (
                      <ConfirmAlert
                        id='alertDialogConfirmResetPasswordCreateOperator'
                        title={dictionary['smtp']?.deleteSmtp}
                        content1={
                          dictionary?.changeStatusWithName?.replace('{{name}}', row.original.smtp_username) ??
                          `Are you sure you want to delete the SMTP Server: ${row.original.smtp_username} ?`
                        }
                        content2=''
                        onClick={() => {
                          callDeleteSmtp({ smtp_id: row.original.smtp_id })
                        }}
                      />
                    ),
                    size: 'sm'
                  })
              }
            })
          }

          return (
            <div className='flex items-center'>
              {(hasPermission('edit-owner-14') || hasPermission('delete-owner-14')) && (
                <OptionMenu iconButtonProps={{ size: 'medium' }} iconClassName='text-textSecondary' options={options} />
              )}
            </div>
          )
        },
        enableSorting: false
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  )

  const table = useReactTable<SmtpConfigType>({
    data: data.list,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
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

export default SettingSmtpTable
