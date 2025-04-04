'use client'

// React Imports
import { useState, useEffect, useMemo } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

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
import {
  useDeleteDraftOperatorMutationOption,
  useDeleteOperatorMutationOption,
  useFetchDraftOperatorMutationOption,
  useResetPasswordOperatorMutationOption,
  useUpdateStatusOperatorMutationOption
} from '@/queryOptions/operator/operatorQueryOptions'
import { toast } from 'react-toastify'
import { useDictionary } from '@/contexts/DictionaryContext'
import OperatorInfoDialog from '@/components/dialogs/operators/OperatorInfoDialog'

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
  currency_code: string
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
  const { dictionary } = useDictionary()
  const router = useRouter()
  // States
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')

  // Hooks
  const { lang: locale } = useParams()

  const { mutate: deleteOperator, isPending: pendingDelete } = useDeleteOperatorMutationOption()
  const { mutate: deleteDraftOperator, isPending: pendingDeleteDraft } = useDeleteDraftOperatorMutationOption()
  const { mutateAsync: fetchDraftOperator, isPending: pendingFetchDraftOperator } =
    useFetchDraftOperatorMutationOption()
  const { mutate: updateStateOperator, isPending: pendingStatus } = useUpdateStatusOperatorMutationOption()
  const { mutateAsync: resetOperator } = useResetPasswordOperatorMutationOption()

  const handleResetPasswordOperator = async (email: string) => {
    try {
      const response = await resetOperator({ email })
      if (response?.code == 'SUCCESS') {
        toast.success('reset email success!', { autoClose: 3000 })
      }
    } catch (error) {
      console.log('error', error)
      toast.error('reset password Failed', { autoClose: 3000 })
    }
  }

  const handleCountinueSetting = async (prefix: string) => {
    try {
      const response = await fetchDraftOperator(prefix)
      if (response?.code == 'SUCCESS') {
        const operatorDraft = encodeURIComponent(JSON.stringify(response.data))
        router.push(`/${locale}/operators/createoperator?operatorDraft=${operatorDraft}`)
      }
    } catch (error) {
      console.log('error', error)
      toast.error('Fetching Draft Failed', { autoClose: 3000 })
    }
  }

  const columns = useMemo<ColumnDef<OperatorType, any>[]>(
    () => [
      columnHelper.display({
        id: 'id',
        header: 'ID',
        cell: ({ row }) => <Typography variant='h6'>{row.index + 1}</Typography>
      }),
      columnHelper.accessor('operator_prefix', {
        header: 'Prefix',
        cell: ({ row }) => <Typography variant='h6'>{row.original.operator_prefix}</Typography>
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
        header: dictionary?.email,
        cell: ({ row }) => <Typography variant='h6'>{row.original.email}</Typography>
      }),
      columnHelper.accessor('currency_code', {
        header: dictionary?.currency,
        cell: ({ row }) => <Typography variant='h6'>{row.original.currency_code}</Typography>
      }),
      columnHelper.accessor('timezone', {
        header: dictionary?.timezone,
        cell: ({ row }) => <Typography variant='h6'>{row.original.timezone}</Typography>
      }),
      columnHelper.accessor('country', {
        header: dictionary?.country,
        cell: ({ row }) => (
          <Typography variant='h6' className='uppercase'>
            {row.original.country}
          </Typography>
        )
      }),
      columnHelper.accessor('is_enable', {
        header: dictionary?.status,
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
                        title={dictionary?.changeStatus}
                        // content1={`Change this operator status?`}
                        content1={
                          dictionary?.changeStatusWithName
                            ?.replace('{{name}}', row.original.operator_name)
                            .replace('{{key}}', 'operator') ??
                          `Change this ${row.original.operator_name} operator status?`
                        }
                        onClick={() => {
                          updateStateOperator({
                            operator_id: row.original.operator_id,
                            is_enable: !row.original.is_enable
                          })
                        }}
                      />
                    ),
                    size: 'sm'
                  })
                }}
                disabled={pendingStatus}
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
          return (
            <div className='flex items-center'>
              <OptionMenu
                iconButtonProps={{ size: 'medium' }}
                iconClassName='text-textSecondary'
                options={
                  row.original.is_draft
                    ? [
                        {
                          text: pendingFetchDraftOperator ? 'Loading...' : dictionary['operator']?.countinueSetting,
                          menuItemProps: {
                            className: 'flex items-center gap-2 text-textSecondary',
                            onClick: () => {
                              handleCountinueSetting(row.original.operator_prefix)
                            },
                            disabled: pendingFetchDraftOperator
                          }
                        },

                        {
                          text: dictionary?.delete,
                          menuItemProps: {
                            className: 'flex items-center gap-2 text-textSecondary',
                            onClick: () =>
                              showDialog({
                                id: 'alertDialogConfirmDeleteCreateOperator',
                                component: (
                                  <ConfirmAlert
                                    id='alertDialogConfirmDeleteCreateOperator'
                                    title={dictionary['operator']?.confirmDelete}
                                    // content1={`Are you sure you want to delete Operator OnePlayBet1 ? `}
                                    content1={
                                      dictionary?.changeStatusWithName?.replace(
                                        '{{name}}',
                                        row.original.operator_name
                                      ) ?? `Are you sure you want to delete Operator ${row.original.operator_name} ?`
                                    }
                                    onClick={() => {
                                      deleteDraftOperator({
                                        operator_prefix: row.original.operator_prefix
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
                                query: { credential: row.original.operator_prefix }
                              }}
                              className='no-underline text-textSecondary'
                              onClick={e => e.stopPropagation()}
                            >
                              {dictionary['operator']?.crendentialList}
                            </Link>
                          )
                        },
                        {
                          text: dictionary?.profile,
                          menuItemProps: {
                            className: 'flex items-center gap-2 text-textSecondary',
                            onClick: () =>
                              showDialog({
                                id: 'OperatorInfoDialog',
                                component: (
                                  <OperatorInfoDialog
                                    id='OperatorInfoDialog'
                                    onClick={() => {}}
                                    operatorId={row.original.operator_id}
                                  />
                                ),
                                size: 'sm'
                              })
                          }
                        },
                        // {
                        //   text: (
                        //     <Link
                        //       href={{
                        //         pathname: `/${locale}/providers/name`,
                        //         query: { provider: 'hello world' }
                        //       }}
                        //       className='no-underline text-textSecondary'
                        //       onClick={e => e.stopPropagation()}
                        //     >
                        //       {dictionary?.profile}
                        //     </Link>
                        //   )
                        // },
                        {
                          text: dictionary['operator']?.resetPassword,
                          menuItemProps: {
                            className: 'flex items-center gap-2 text-textSecondary',
                            onClick: () =>
                              showDialog({
                                id: 'alertDialogConfirmResetPasswordCreateOperator',
                                component: (
                                  <ConfirmAlert
                                    id='alertDialogConfirmResetPasswordCreateOperator'
                                    title={dictionary['operator']?.passwordReset}
                                    // content1={`Are you sure you want to reset the password for Operator OnePlayBet1 ?`}
                                    content1={
                                      dictionary['operator']?.confirmPasswordReset
                                        ?.replace('{{name}}', row.original.operator_name)
                                        .replace('{{key}}', 'operator') ??
                                      `Are you sure you want to reset the password for Operator ${row.original.operator_name} ?`
                                    }
                                    onClick={() => {
                                      handleResetPasswordOperator(row.original.email)
                                    }}
                                  />
                                ),
                                size: 'sm'
                              })
                          }
                        },
                        {
                          text: dictionary?.delete,
                          menuItemProps: {
                            className: 'flex items-center gap-2 text-textSecondary',
                            onClick: () =>
                              showDialog({
                                id: 'alertDialogConfirmDeleteCreateOperator',
                                component: (
                                  <ConfirmAlert
                                    id='alertDialogConfirmDeleteCreateOperator'
                                    title={dictionary?.confirmDelete}
                                    // content1={`Are you sure you want to delete Operator OnePlayBet1 ? `}
                                    content1={
                                      dictionary?.changeStatusWithName
                                        ?.replace('{{name}}', row.original.operator_name)
                                        .replace('{{key}}', 'operator') ??
                                      `Are you sure you want to delete Operator ${row.original.operator_name} ?`
                                    }
                                    onClick={() => {
                                      deleteOperator({
                                        operator_id: row.original.operator_id
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
                              {dictionary?.checkLog}
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

export default OperatorsListTable
