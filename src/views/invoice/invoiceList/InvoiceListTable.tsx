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
import { FormatShowDate } from '@/utils/formatShowDate'
import {
  useDownloadInvoiceMutationOption,
  usePublicInvoiceMutationOption,
  useRecalculateMutationOption,
  useRejectInvoiceMutationOption,
  useVerifyInvoiceMutationOption,
  useVoidInvoiceMutationOption
} from '@/queryOptions/invoice/invoiceQueryOptions'
import { toast } from 'react-toastify'
import VerifyPaymentDialog from './VerifyPaymentDialog'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type InvoiceTypeWithAction = InvoiceType & {
  action?: string
}

const statusColorMap: Record<string, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
  draft: 'info',
  void: 'error',
  reject: 'default',
  public: 'success'
}
const paymentColorMap: Record<string, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> =
  {
    pending: 'info',
    cancel: 'error',
    paid: 'default',
    unpaid: 'success'
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

type InvoiceType = {
  invoice_id: number
  invoice_no: string
  invoice_name: string
  operator_prefix: string
  credential_prefix: string
  total_payment: number
  invoice_status: 'draft' | 'void' | 'reject' | 'public'
  invoice_payment: 'pending' | 'cancel' | 'paid' | 'unpaid'
  created_at: string // ISO date string
  due_date: string // ISO date string
  exchange_rate: number
  fx_rate: number
  fx_amount: number
  net_amount: number
  convert_amount: number
  discount: number
  currency_code: string
  image_slip: string
  invoice_date: string
}

// Column Definitions
const columnHelper = createColumnHelper<InvoiceType>()

const InvoiceListTable = ({ data, page, pageSize, setPage, setPageSize, onSearch, maxSize }: any) => {
  const { showDialog } = useDialog()
  // States

  const [status, setStatus] = useState('')
  const [rowSelection, setRowSelection] = useState({})
  const [filteredData, setFilteredData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState('')

  const { mutateAsync: callRenewCalculate, isPending: pendingRenew } = useRecalculateMutationOption()
  const { mutateAsync: callRejectInvoice, isPending: pendingReject } = useRejectInvoiceMutationOption()
  const { mutateAsync: callPublicInvoice, isPending: pendingPublic } = usePublicInvoiceMutationOption()
  const { mutateAsync: callVoidInvoice, isPending: pendingVoid } = useVoidInvoiceMutationOption()
  const { mutateAsync: callDownloadInvoice, isPending: pendingDownload } = useDownloadInvoiceMutationOption()
  const { mutateAsync: callVerifyInvoice, isPending: pendingVerify } = useVerifyInvoiceMutationOption()

  // Hooks
  const { lang: locale } = useParams()

  const handleCallReCalculate = async (id: any) => {
    try {
      const request = {
        invoice_id: id
      }
      const response = await callRenewCalculate(request)
      if (response?.code == 'SUCCESS') {
        toast.success('Renew Calculate success!', { autoClose: 3000 })
      }
    } catch (error) {
      console.log('error', error)
      toast.error('Renew Calculate failed!', { autoClose: 3000 })
    }
  }

  const handleCallRejectInvoice = async (id: any) => {
    try {
      const request = {
        invoice_id: id
      }
      const response = await callRejectInvoice(request)

      if (response?.code == 'SUCCESS') {
        toast.success('Reject Invoice success!', { autoClose: 3000 })
        onSearch()
      }
    } catch (error) {
      console.log('error', error)
      toast.error('Reject Invoice failed!', { autoClose: 3000 })
    }
  }

  const handleCallPublicInvoice = async (id: any) => {
    try {
      const request = {
        invoice_id: id
      }
      const response = await callPublicInvoice(request)

      if (response?.code == 'SUCCESS') {
        toast.success('Public Invoice success!', { autoClose: 3000 })
        onSearch()
      }
    } catch (error) {
      console.log('error', error)
      toast.error('public Invoice failed!', { autoClose: 3000 })
    }
  }

  const handleCallVoidInvoice = async (id: any) => {
    try {
      const request = {
        invoice_id: id
      }
      const response = await callVoidInvoice(request)

      if (response?.code == 'SUCCESS') {
        toast.success('Void Invoice success!', { autoClose: 3000 })
        onSearch()
      }
    } catch (error) {
      console.log('error', error)
      toast.error('Void Invoice failed!', { autoClose: 3000 })
    }
  }

  const handleCallDownloadInvoice = async (id: any) => {
    try {
      const request = {
        invoice_id: [id]
      }
      const response = await callDownloadInvoice(request)

      if (response?.code == 'SUCCESS') {
        toast.success('Download Invoice success!', { autoClose: 3000 })
        const link = document.createElement('a')
        link.href = response?.data?.url_download
        link.setAttribute('download', '')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    } catch (error) {
      console.log('error', error)
      toast.error('Download Invoice failed!', { autoClose: 3000 })
    }
  }

  const columns = useMemo<ColumnDef<InvoiceTypeWithAction, any>[]>(
    () => [
      // {
      //   id: 'select',
      //   header: () => null,
      //   cell: ({ row }) =>
      //     row.original.invoice_status !== 'draft' && row.original.invoice_status !== 'reject' ? (
      //       <Checkbox
      //         checked={row.getIsSelected()}
      //         disabled={!row.getCanSelect()}
      //         indeterminate={row.getIsSomeSelected()}
      //         onChange={row.getToggleSelectedHandler()}
      //       />
      //     ) : null
      // },
      columnHelper.accessor('invoice_id', {
        header: 'id',
        cell: ({ row }) => <Typography variant='h6'>{row.original.invoice_id}</Typography>
      }),
      columnHelper.accessor('invoice_no', {
        header: 'No.',
        cell: ({ row }) => <Typography variant='h6'>{row.original.invoice_no}</Typography>
      }),
      columnHelper.accessor('credential_prefix', {
        header: 'Prefix',
        cell: ({ row }) => (
          <Typography variant='h6'>
            {row.original.operator_prefix}-{row.original.credential_prefix}
          </Typography>
        )
      }),
      columnHelper.accessor('invoice_name', {
        header: 'Invoice Name',

        cell: ({ row }) => (
          <div className='flex flex-col'>
            <Typography variant='h6'>{row.original.invoice_name}</Typography>
          </div>
        )
      }),
      columnHelper.accessor('total_payment', {
        header: 'Total Payment',
        cell: ({ row }) => <Typography variant='h6'>{row.original.total_payment}</Typography>
      }),
      columnHelper.accessor('invoice_status', {
        header: 'Status',
        cell: ({ row }) => (
          <Chip
            label={row.original.invoice_status}
            className='capitalize'
            size='small'
            color={statusColorMap[row.original.invoice_status] || 'default'}
          />
        )
      }),

      columnHelper.accessor('invoice_payment', {
        header: 'Payment',
        cell: ({ row }) => (
          <Chip
            label={row.original.invoice_payment}
            className='capitalize'
            size='small'
            variant='outlined'
            color={paymentColorMap[row.original.invoice_payment] || 'default'}
          />
        )
      }),
      columnHelper.accessor('due_date', {
        header: 'Create Date',
        cell: ({ row }) => {
          return (
            <div className='flex gap-1 items-center'>
              <Typography>{FormatShowDate(row.original.due_date)}</Typography>
            </div>
          )
        }
      }),

      columnHelper.display({
        id: 'createTime',
        header: '',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <OptionMenu
              iconButtonProps={{ size: 'medium' }}
              iconClassName='text-textSecondary'
              options={(() => {
                const paymentStatus = row.original.invoice_status
                const paymentType = row.original.invoice_payment

                switch (paymentStatus) {
                  case 'draft':
                    return [
                      {
                        text: (
                          <div
                            className='text-secondary no-underline transition-transform duration-300 ease-in-out hover:scale-105'
                            onClick={() => {
                              showDialog({
                                id: 'alertConfirmRenew',
                                component: (
                                  <ConfirmAlert
                                    id='alertConfirmRenew'
                                    title={'Confirm Renew Invoice Calculation'}
                                    content1={`Are you sure you want to renew the calculation for this invoice?`}
                                    onClick={() => {
                                      handleCallReCalculate(row.original.invoice_id)
                                    }}
                                  />
                                ),
                                size: 'sm'
                              })
                            }}
                          >
                            Renew Calculate
                          </div>
                        )
                      },

                      {
                        text: (
                          <div
                            className='text-secondary no-underline transition-transform duration-300 ease-in-out hover:scale-105'
                            onClick={() => {
                              showDialog({
                                id: 'alertConfirmPublic',
                                component: (
                                  <ConfirmAlert
                                    id='alertConfirmPublic'
                                    title={'Confirm Public Invoice Calculation'}
                                    content1={`Are you sure you want to public this invoice?`}
                                    onClick={() => {
                                      handleCallPublicInvoice(row.original.invoice_id)
                                    }}
                                  />
                                ),
                                size: 'sm'
                              })
                            }}
                          >
                            Public Invoice
                          </div>
                        )
                      },
                      {
                        text: (
                          <Link
                            href={{
                              pathname: `/${locale}/invoice/invoicelist/id`,
                              query: { invoiceId: row.original.invoice_id }
                            }}
                            className='text-secondary no-underline transition-transform duration-300 ease-in-out hover:scale-105'
                            onClick={e => e.stopPropagation()}
                          >
                            View Invoice
                          </Link>
                        )
                      },
                      {
                        text: (
                          <div
                            className='text-secondary no-underline transition-transform duration-300 ease-in-out hover:scale-105'
                            onClick={() => {
                              showDialog({
                                id: 'alertConfirmReject',
                                component: (
                                  <ConfirmAlert
                                    id='alertConfirmReject'
                                    title={'Confirm Reject Invoice'}
                                    content1={`Are you sure you want to Reject this invoice?`}
                                    onClick={() => {
                                      handleCallRejectInvoice(row.original.invoice_id)
                                    }}
                                  />
                                ),
                                size: 'sm'
                              })
                            }}
                          >
                            Reject
                          </div>
                        )
                      }
                    ]
                  case 'reject':
                    return [
                      {
                        text: (
                          <Link
                            href={{
                              pathname: `/${locale}/invoice/invoicelist/id`,
                              query: { invoiceId: row.original.invoice_id }
                            }}
                            className='text-secondary no-underline transition-transform duration-300 ease-in-out hover:scale-105'
                            onClick={e => e.stopPropagation()}
                          >
                            View Invoice
                          </Link>
                        )
                      }
                    ]
                  case 'void':
                    return [
                      {
                        text: (
                          <Link
                            href={{
                              pathname: `/${locale}/invoice/invoicelist/id`,
                              query: { invoiceId: row.original.invoice_id }
                            }}
                            className='text-secondary no-underline transition-transform duration-300 ease-in-out hover:scale-105'
                            onClick={e => e.stopPropagation()}
                          >
                            View Invoice
                          </Link>
                        )
                      }
                    ]
                  case 'public':
                    if (paymentType == 'unpaid') {
                      return [
                        {
                          text: (
                            <div
                              className='text-secondary no-underline transition-transform duration-300 ease-in-out hover:scale-105'
                              onClick={() => {
                                showDialog({
                                  id: 'alertConfirmVerify',
                                  component: (
                                    <VerifyPaymentDialog
                                      id='alertConfirmVerify'
                                      invoiceId={row.original.invoice_id}
                                      onSearch={onSearch}
                                    />
                                  ),
                                  size: 'sm'
                                })
                              }}
                            >
                              Verify Payment
                            </div>
                          )
                        },
                        {
                          text: (
                            <div
                              className='text-secondary no-underline transition-transform duration-300 ease-in-out hover:scale-105'
                              onClick={() => {
                                showDialog({
                                  id: 'alertConfirmVoid',
                                  component: (
                                    <ConfirmAlert
                                      id='alertConfirmVoid'
                                      title={'Confirm Void Invoice'}
                                      content1={`Are you sure you want to void this invoice?`}
                                      onClick={() => {
                                        handleCallVoidInvoice(row.original.invoice_id)
                                      }}
                                    />
                                  ),
                                  size: 'sm'
                                })
                              }}
                            >
                              Void Invoice
                            </div>
                          )
                        },
                        {
                          text: (
                            <Link
                              href={{
                                pathname: `/${locale}/invoice/invoicelist/id`,
                                query: { invoiceId: row.original.invoice_id }
                              }}
                              className='text-secondary no-underline transition-transform duration-300 ease-in-out hover:scale-105'
                              onClick={e => e.stopPropagation()}
                            >
                              View Invoice
                            </Link>
                          )
                        },
                        {
                          text: (
                            <div
                              className='text-secondary no-underline transition-transform duration-300 ease-in-out hover:scale-105'
                              onClick={() => {
                                showDialog({
                                  id: 'alertConfirmDownload',
                                  component: (
                                    <ConfirmAlert
                                      id='alertConfirmDownload'
                                      title={'Confirm Download Invoice Calculation'}
                                      content1={`Are you sure you want to download this invoice?`}
                                      onClick={() => {
                                        handleCallDownloadInvoice(row.original.invoice_id)
                                      }}
                                    />
                                  ),
                                  size: 'sm'
                                })
                              }}
                            >
                              Download PDF
                            </div>
                          )
                        }
                      ]
                    } else {
                      return [
                        {
                          text: (
                            <Link
                              href={{
                                pathname: `/${locale}/invoice/invoicelist/id`,
                                query: { invoiceId: row.original.invoice_id }
                              }}
                              className='text-secondary no-underline transition-transform duration-300 ease-in-out hover:scale-105'
                              onClick={e => e.stopPropagation()}
                            >
                              View Invoice
                            </Link>
                          )
                        },
                        {
                          text: (
                            <div
                              className='text-secondary no-underline transition-transform duration-300 ease-in-out hover:scale-105'
                              onClick={() => {
                                showDialog({
                                  id: 'alertConfirmDownload',
                                  component: (
                                    <ConfirmAlert
                                      id='alertConfirmDownload'
                                      title={'Confirm Download Invoice Calculation'}
                                      content1={`Are you sure you want to download this invoice?`}
                                      onClick={() => {
                                        handleCallDownloadInvoice(row.original.invoice_id)
                                      }}
                                    />
                                  ),
                                  size: 'sm'
                                })
                              }}
                            >
                              Download PDF
                            </div>
                          )
                        }
                      ]
                    }

                  default:
                    return []
                }
              })()}
            />
          </div>
        ),
        enableSorting: false
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, filteredData]
  )

  const table = useReactTable({
    data: filteredData as InvoiceType[],
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
        pageSize: 999
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

  useEffect(() => {
    const filteredData = data?.filter((invoice: any) => {
      if (status && invoice.invoiceStatus.toLowerCase().replace(/\s+/g, '-') !== status) return false

      return true
    })

    setFilteredData(filteredData)
  }, [status, data])

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
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      <TablePaginationComponent
        table={table}
        count={maxSize}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    </Card>
  )
}

export default InvoiceListTable
