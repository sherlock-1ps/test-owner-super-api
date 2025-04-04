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
import { Chip, Switch, Tooltip } from '@mui/material'
import {
  useResetPasswordOperatorMutationOption,
  useUpdateStatusCredentialMutationOption
} from '@/queryOptions/operator/operatorQueryOptions'
import { toast } from 'react-toastify'
import { useDictionary } from '@/contexts/DictionaryContext'
import CustomAvatar from '@/@core/components/mui/Avatar'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type credentialType = {
  credential_id: string
  credential_prefix: string
  operator_prefix: string
  credential_provider_count: {
    casino: string[]
    lottery: string[]
    slot: string[]
    sport: string[]
  }
  is_enable: boolean
  update_at: string
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
const columnHelper = createColumnHelper<credentialType>()

const CredentialListTable = ({ data, page, pageSize, setPage, setPageSize, handleRefetchSearch }: any) => {
  const { showDialog } = useDialog()
  const { dictionary } = useDictionary()
  const router = useRouter()
  // States
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')

  // Hooks
  const { lang: locale } = useParams()

  const { mutate: updateStateCredential, isPending: pendingStatus } =
    useUpdateStatusCredentialMutationOption(handleRefetchSearch)
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

  const columns = useMemo<ColumnDef<credentialType, any>[]>(
    () => [
      columnHelper.display({
        id: 'id',
        header: 'No',
        cell: ({ row }) => <Typography variant='h6'>{row.index + 1}</Typography>
      }),
      columnHelper.accessor('operator_prefix', {
        header: 'Prefix',
        cell: ({ row }) => (
          <Typography variant='h6'>
            {row.original.operator_prefix}-{row.original.credential_prefix}
          </Typography>
        )
      }),

      columnHelper.accessor('credential_provider_count', {
        header: 'Provider',
        cell: ({ row }) => {
          const filtered = Object.fromEntries(
            Object.entries(row.original.credential_provider_count).filter(
              ([_, value]) => Array.isArray(value) && value.length > 0
            )
          )

          return (
            <div className='flex gap-3'>
              {Object.entries(filtered).map(([key, providers]) => {
                return (
                  <div className='flex gap-1 items-center' key={key}>
                    <Typography variant='h6'>
                      {providers.length} {key}
                    </Typography>
                    <Tooltip
                      title={
                        <div>
                          {providers.map((item, idx) => {
                            return (
                              <div key={idx}>
                                <Typography variant='body2' className='text-inherit'>
                                  {item.charAt(0).toUpperCase() + item.slice(1)}
                                </Typography>
                              </div>
                            )
                          })}
                        </div>
                      }
                    >
                      <i className='tabler-info-circle text-xl' />
                    </Tooltip>
                  </div>
                )
              })}
            </div>
          )
        }
      }),

      columnHelper.accessor('is_enable', {
        header: dictionary?.status,
        cell: ({ row }) => {
          return (
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
                            ?.replace('{{name}}', row.original.credential_prefix)
                            .replace('{{key}}', 'prefix') ??
                          `Change this ${row.original.credential_prefix} prefix status?`
                        }
                        onClick={() => {
                          updateStateCredential({
                            credential_id: row.original.credential_id,
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
      columnHelper.accessor('update_at', {
        header: 'Date Last Update',
        cell: ({ row }) => <Typography variant='h6'>{row.original.update_at}</Typography>
      }),

      columnHelper.display({
        id: 'action',
        header: '',
        cell: ({ row }) => {
          const providerCredential = encodeURIComponent(JSON.stringify(row.original))

          return (
            <div className='flex items-center'>
              <OptionMenu
                iconButtonProps={{ size: 'medium' }}
                iconClassName='text-textSecondary'
                options={[
                  {
                    text: 'Get Tokens & Secret Key',
                    menuItemProps: {
                      className: 'flex items-center gap-2 text-textSecondary',
                      onClick: () => {}
                      // showDialog({
                      //   id: 'alertDialogConfirmResetPasswordCreateOperator',
                      //   component: (

                      //   ),
                      //   size: 'sm'
                      // })
                    }
                  },
                  {
                    text: (
                      <Link
                        href={{
                          pathname: `/${locale}/operators/credential/providerlist`,
                          query: { provider: providerCredential }
                        }}
                        className='no-underline text-textSecondary'
                        onClick={e => e.stopPropagation()}
                      >
                        View Provider
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
    data: (data.list as credentialType[]) || [],
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

export default CredentialListTable
