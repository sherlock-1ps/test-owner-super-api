'use client'

// React Imports
import { useState, useEffect, useMemo } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'

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

// Component Imports
import OptionMenu from '@core/components/option-menu'
import TablePaginationComponent from '@components/TablePaginationComponent'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import ConfirmAlert from '@/components/dialogs/alerts/ConfirmAlert'
import { useDialog } from '@/hooks/useDialog'
import { Chip, Switch } from '@mui/material'
import { useUpdateOperatorMutationOption } from '@/queryOptions/operator/operatorQueryOptions'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type OperatorType = {
  operator_id: string
  operator_prefix: string
  operator_name: string
  email: string
  currency: string
  country: string
  timezone: string
  is_enable: boolean
  role_name: string
  is_draft: boolean
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
const columnHelper = createColumnHelper<OperatorType>()

const OperatorsListTable = ({ data, page, pageSize, setPage, setPageSize }: any) => {
  const { showDialog } = useDialog()
  // States
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')

  // Hooks
  const { lang: locale } = useParams()

  const { mutate: updateOperator, isPending: pendingUpdate } = useUpdateOperatorMutationOption()
  const { mutate: resetPasswordOperator } = useUpdateOperatorMutationOption()

  const columns = useMemo<ColumnDef<OperatorType, any>[]>(
    () => [
      columnHelper.display({
        id: 'id',
        header: 'ID',
        cell: ({ row }) => <Typography variant='h6'>{row.index + 1}</Typography>
      }),
      columnHelper.accessor('operator_prefix', {
        header: 'Prefix',
        cell: ({ row }) => <Typography variant='h6'>OPB1</Typography>
      }),

      columnHelper.accessor('operator_name', {
        header: 'Operator',

        cell: ({ row }) => (
          <div className='flex flex-col'>
            <Typography variant='h6'>{row.original.operator_name}</Typography>
          </div>
        )
      }),
      columnHelper.accessor('email', {
        header: 'Email',
        cell: ({ row }) => <Typography variant='h6'>{row.original.email}</Typography>
      }),
      columnHelper.accessor('currency', {
        header: 'Currency',
        cell: ({ row }) => <Typography variant='h6'>{row.original.currency}</Typography>
      }),
      columnHelper.accessor('timezone', {
        header: 'Timezone',
        cell: ({ row }) => <Typography variant='h6'>{row.original.timezone}</Typography>
      }),
      columnHelper.accessor('country', {
        header: 'Country',
        cell: ({ row }) => (
          <Typography variant='h6' className='uppercase'>
            {row.original.country}
          </Typography>
        )
      }),
      columnHelper.accessor('is_enable', {
        header: 'Status',
        cell: ({ row }) => {
          return row.original.is_draft ? (
            <Chip color='info' label='Draft' size='small' variant='tonal' />
          ) : (
            <div className='flex gap-1 items-center'>
              <Switch
                checked={row.original.is_enable}
                onChange={() => {
                  showDialog({
                    id: 'alertDialogConfirmResetPasswordCreateOperator',
                    component: (
                      <ConfirmAlert
                        id='alertDialogConfirmResetPasswordCreateOperator'
                        title={'Do you want to change operator status'}
                        content1={`Change this operator status?`}
                        onClick={() => {
                          updateOperator({
                            operator_id: row.original.operator_id,
                            is_enable: !row.original.is_enable
                          })
                        }}
                      />
                    ),
                    size: 'sm'
                  })
                }}
                disabled={pendingUpdate}
              />
              <Typography>{row.original.is_enable ? 'Enable' : 'Disabled'}</Typography>
            </div>
          )
        }
      }),

      columnHelper.display({
        id: 'action',
        header: '',
        cell: ({ row }) => {
          const operatorDraft = encodeURIComponent(JSON.stringify(row.original))
          return (
            <div className='flex items-center'>
              <OptionMenu
                iconButtonProps={{ size: 'medium' }}
                iconClassName='text-textSecondary'
                options={
                  row.original.is_draft
                    ? [
                        {
                          text: (
                            <Link
                              href={{
                                pathname: `/${locale}/operators/createoperator`,
                                query: { operatorDraft: operatorDraft }
                              }}
                              className='no-underline text-textSecondary'
                              onClick={e => e.stopPropagation()}
                            >
                              Continue Setting
                            </Link>
                          )
                        },

                        {
                          text: 'Delete',
                          menuItemProps: {
                            className: 'flex items-center gap-2 text-textSecondary',
                            onClick: () =>
                              showDialog({
                                id: 'alertDialogConfirmDeleteCreateOperator',
                                component: (
                                  <ConfirmAlert
                                    id='alertDialogConfirmDeleteCreateOperator'
                                    title={'Confirm Delete Operator'}
                                    content1={`Are you sure you want to delete Operator OnePlayBet1 ? `}
                                    onClick={() => {
                                      updateOperator({
                                        operator_id: row.original.operator_id,
                                        is_delete: true
                                      })
                                    }}
                                  />
                                ),
                                size: 'sm'
                              })
                          }
                        }
                      ]
                    : [
                        {
                          text: (
                            <Link
                              href={{
                                pathname: `/${locale}/operators/credential`,
                                query: { provider: 'hello world' }
                              }}
                              className='no-underline text-textSecondary'
                              onClick={e => e.stopPropagation()}
                            >
                              Credential List
                            </Link>
                          )
                        },
                        {
                          text: (
                            <Link
                              href={{
                                pathname: `/${locale}/providers/name`,
                                query: { provider: 'hello world' }
                              }}
                              className='no-underline text-textSecondary'
                              onClick={e => e.stopPropagation()}
                            >
                              Profile
                            </Link>
                          )
                        },
                        {
                          text: 'Reset Password',
                          menuItemProps: {
                            className: 'flex items-center gap-2 text-textSecondary',
                            onClick: () =>
                              showDialog({
                                id: 'alertDialogConfirmResetPasswordCreateOperator',
                                component: (
                                  <ConfirmAlert
                                    id='alertDialogConfirmResetPasswordCreateOperator'
                                    title={'Confirm Password Reset'}
                                    content1={`Are you sure you want to reset the password for Operator OnePlayBet1 ?`}
                                    onClick={() => {
                                      // resetPasswordOperator()
                                    }}
                                  />
                                ),
                                size: 'sm'
                              })
                          }
                        },
                        {
                          text: 'Delete',
                          menuItemProps: {
                            className: 'flex items-center gap-2 text-textSecondary',
                            onClick: () =>
                              showDialog({
                                id: 'alertDialogConfirmDeleteCreateOperator',
                                component: (
                                  <ConfirmAlert
                                    id='alertDialogConfirmDeleteCreateOperator'
                                    title={'Confirm Delete Operator'}
                                    content1={`Are you sure you want to delete Operator OnePlayBet1 ? `}
                                    onClick={() => {
                                      updateOperator({
                                        operator_id: row.original.operator_id,
                                        is_delete: true
                                      })
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
                                query: { operator: 'OPB12345' }
                              }}
                              className='no-underline text-textSecondary'
                              onClick={e => e.stopPropagation()}
                            >
                              Check Log
                            </Link>
                          )
                        }
                      ]
                }
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
    data: (data.list as OperatorType[]) || [],
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

export default OperatorsListTable
