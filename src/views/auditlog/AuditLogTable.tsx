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
import ChangeEmailOperatorDialog from '@/components/dialogs/account/ChangeEmailOperatorDialog'
import { useDictionary } from '@/contexts/DictionaryContext'
import {
  useChangeEmailAccountOperatorMutationOption,
  useResetPasswordAccountOperatorMutationOption,
  useUpdateStatusAccountOperatorMutationOption
} from '@/queryOptions/account/accountQueryOptions'
import { toast } from 'react-toastify'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type AuditLogType = {
  log_id: string
  created_at: string
  action: string
  username: string
  ip: string
  device: string
  location: string
  status: string
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
const columnHelper = createColumnHelper<AuditLogType>()

const AuditLogTable = ({ data, page, pageSize, setPage, setPageSize }: any) => {
  const { showDialog } = useDialog()
  const { dictionary } = useDictionary()
  // States
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')

  const [expandedRow, setExpandedRow] = useState<string | null>(null)

  // Hooks
  const { lang: locale } = useParams()

  const toggleRowExpansion = (rowId: string) => {
    setExpandedRow(prev => (prev === rowId ? null : rowId))
  }

  const columns = useMemo<ColumnDef<AuditLogType, any>[]>(
    () => [
      columnHelper.accessor('created_at', {
        header: 'Data time',
        cell: ({ row }) => <Typography variant='h6'>{row.original.created_at}</Typography>
      }),

      columnHelper.accessor('action', {
        header: 'Action',

        cell: ({ row }) => (
          <div className='flex flex-col'>
            <Typography variant='h6'>{row.original.action}</Typography>
          </div>
        )
      }),
      columnHelper.accessor('username', {
        header: 'Username',
        cell: ({ row }) => <Typography variant='h6'>{row.original.username}</Typography>
      }),
      columnHelper.accessor('device', {
        header: 'Device',
        cell: ({ row }) => <Typography variant='h6'>{row.original.device}</Typography>
      }),

      columnHelper.accessor('location', {
        header: 'Geolocation',
        cell: ({ row }) => <Typography variant='h6'>{row.original.location}</Typography>
      }),
      columnHelper.accessor('ip', {
        header: 'IP',
        cell: ({ row }) => <Typography variant='h6'>{row.original.ip}</Typography>
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => (
          <Chip
            color={row.original.status == 'success' ? 'success' : 'primary'}
            label={row.original.status}
            size='small'
            variant='tonal'
          />
        )
      }),

      columnHelper.accessor('action', {
        header: '',
        cell: ({ row }) => (
          <Button
            onClick={() => toggleRowExpansion(row.id)}
            className={`${expandedRow == row.id ? 'rotate-180' : 'rotate-0'}`}
          >
            <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
              <path
                d='M13.5306 6.53025L8.5306 11.5302C8.46092 11.6002 8.37813 11.6556 8.28696 11.6935C8.1958 11.7314 8.09806 11.7508 7.99935 11.7508C7.90064 11.7508 7.8029 11.7314 7.71173 11.6935C7.62057 11.6556 7.53778 11.6002 7.4681 11.5302L2.4681 6.53025C2.3272 6.38935 2.24805 6.19825 2.24805 5.999C2.24805 5.79974 2.3272 5.60864 2.4681 5.46775C2.60899 5.32685 2.80009 5.2477 2.99935 5.2477C3.19861 5.2477 3.3897 5.32685 3.5306 5.46775L7.99997 9.93712L12.4693 5.46712C12.6102 5.32623 12.8013 5.24707 13.0006 5.24707C13.1999 5.24707 13.391 5.32623 13.5318 5.46712C13.6727 5.60802 13.7519 5.79911 13.7519 5.99837C13.7519 6.19763 13.6727 6.38873 13.5318 6.52962L13.5306 6.53025Z'
                fill='#404550'
              />
            </svg>
          </Button>
        ),
        enableSorting: false
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  )

  const table = useReactTable<AuditLogType>({
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
                  No data available
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

export default AuditLogTable
