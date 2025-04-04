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
import { useDictionary } from '@/contexts/DictionaryContext'

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

type InvoiceStatusObj = {
  [key: string]: {
    icon: string
    color: ThemeColor
  }
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

const dataMock = [
  {
    id: 1,
    issuedDate: 837,
    address: '7777 Mendez Plains',
    company: 'Hall-Robbins PLC',
    companyEmail: 'don85@johnson.com',
    country: 'USA',
    contact: '(616) 865-4180',
    name: 'เติมงาน รับเพิ่มทันที',
    service: 'Software Development',
    total: 3428,
    avatar: '',
    avatarColor: 'primary',
    invoiceStatus: 'Paid',
    balance: '$724',
    dueDate: '23 Feb 2025',
    group: 3,
    bonus: 0,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Alice Johnson',
      bankImage: 'kbank'
    }
  },
  {
    id: 2,
    issuedDate: 254,
    address: '04033 Wesley Wall Apt. 961',
    company: 'Mccann LLC and Sons',
    companyEmail: 'brenda49@taylor.info',
    country: 'Haiti',
    contact: '(226) 204-8287',
    name: 'โปรแรง! เติมงาน รับสิทธิพิเศษทันที',
    service: 'UI/UX Design & Development',
    total: 5219,
    avatar: '/images/avatars/1.png',
    invoiceStatus: 'Downloaded',
    balance: 0,
    dueDate: '15 Feb 2025',
    group: 1,
    bonus: 0,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Elijah Nguyen',
      bankImage: 'kbank'
    }
  },
  {
    id: 3,
    issuedDate: 793,
    address: '5345 Robert Squares',
    company: 'Leonard-Garcia and Sons',
    companyEmail: 'smithtiffany@powers.com',
    country: 'Denmark',
    contact: '(955) 676-1076',
    name: 'ดีลพิเศษ เติมงาน รับโบนัสทันที',
    service: 'Unlimited Extended License',
    total: 3719,
    avatar: '/images/avatars/2.png',
    invoiceStatus: 'Paid',
    balance: 0,
    dueDate: '03 Feb 2025',
    group: 4,
    bonus: 10,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Bob Smith',
      bankImage: 'kbank'
    }
  },
  {
    id: 4,
    issuedDate: 316,
    address: '19022 Clark Parks Suite 149',
    company: 'Smith, Miller and Henry LLC',
    companyEmail: 'mejiageorge@lee-perez.com',
    country: 'Cambodia',
    contact: '(832) 323-6914',
    name: 'โปรโมชั่นสุดคุ้ม รับงานฟรีทันที',
    service: 'Software Development',
    total: 4749,
    avatar: '/images/avatars/3.png',
    invoiceStatus: 'Sent',
    balance: 0,
    dueDate: '11 Feb 2025',
    group: 5,
    bonus: 0,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Charlie Brown',
      bankImage: 'kbank'
    }
  },
  {
    id: 5,
    issuedDate: 465,
    address: '8534 Saunders Hill Apt. 583',
    company: 'Garcia-Cameron and Sons',
    companyEmail: 'brandon07@pierce.com',
    country: 'Martinique',
    contact: '(970) 982-3353',
    name: 'ช้อปครบ รับของแถมฟรีทันที',
    service: 'UI/UX Design & Development',
    total: 4056,
    avatar: '/images/avatars/4.png',
    invoiceStatus: 'Draft',
    balance: '$815',
    dueDate: '30 Feb 2025',
    group: 2,
    bonus: 0,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Diana Prince',
      bankImage: 'kbank'
    }
  },
  {
    id: 6,
    issuedDate: 192,
    address: '661 Perez Run Apt. 778',
    company: 'Burnett-Young PLC',
    companyEmail: 'guerrerobrandy@beasley-harper.com',
    country: 'Botswana',
    contact: '(511) 938-9617',
    name: 'เติมงาน รับเพิ่มทันที',
    service: 'UI/UX Design & Development',
    total: 2771,
    avatar: '',
    avatarColor: 'secondary',
    invoiceStatus: 'Paid',
    balance: 0,
    dueDate: '24 Feb 2025',
    group: 1,
    bonus: 0,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Elijah Nguyen',
      bankImage: 'kbank'
    }
  },
  {
    id: 7,
    issuedDate: 879,
    address: '074 Long Union',
    company: 'Wilson-Lee LLC',
    companyEmail: 'williamshenry@moon-smith.com',
    country: 'Montserrat',
    contact: '(504) 859-2893',
    name: 'โปรแรง! เติมงาน รับสิทธิพิเศษทันที',
    service: 'UI/UX Design & Development',
    total: 2713,
    avatar: '',
    avatarColor: 'success',
    invoiceStatus: 'Draft',
    balance: '$407',
    dueDate: '22 Feb 2025',
    group: 5,
    bonus: 10,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Bob Smith',
      bankImage: 'kbank'
    }
  },
  {
    id: 8,
    issuedDate: 540,
    address: '5225 Ford Cape Apt. 840',
    company: 'Schwartz, Henry and Rhodes Group',
    companyEmail: 'margaretharvey@russell-murray.com',
    country: 'Oman',
    contact: '(758) 403-7718',
    name: 'โปรโมชั่นสุดคุ้ม รับงานฟรีทันที',
    service: 'Template Customization',
    total: 4309,
    avatar: '/images/avatars/5.png',
    invoiceStatus: 'Paid',
    balance: '-$205',
    dueDate: '10 Feb 2025',
    group: 3,
    bonus: 0,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Alice Johnson',
      bankImage: 'kbank'
    }
  },
  {
    id: 9,
    issuedDate: 701,
    address: '23717 James Club Suite 277',
    company: 'Henderson-Holder PLC',
    companyEmail: 'dianarodriguez@villegas.com',
    country: 'Cambodia',
    contact: '(292) 873-8254',
    name: 'ดีลพิเศษ เติมงาน รับโบนัสทันที',
    service: 'Software Development',
    total: 3367,
    avatar: '/images/avatars/6.png',
    invoiceStatus: 'Downloaded',
    balance: 0,
    dueDate: '24 Feb 2025',
    group: 4,
    bonus: 0,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Charlie Brown',
      bankImage: 'kbank'
    }
  },
  {
    id: 10,
    issuedDate: 150,
    address: '4528 Myers Gateway',
    company: 'Page-Wise PLC',
    companyEmail: 'bwilson@norris-brock.com',
    country: 'Guam',
    contact: '(956) 803-2008',
    name: 'ช้อปครบ รับของแถมฟรีทันที',
    service: 'Software Development',
    total: 4776,
    avatar: '/images/avatars/7.png',
    invoiceStatus: 'Downloaded',
    balance: '$305',
    dueDate: '02 Feb 2025',
    group: 2,
    bonus: 0,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Diana Prince',
      bankImage: 'kbank'
    }
  }
]

// Column Definitions
const columnHelper = createColumnHelper<InvoiceTypeWithAction>()

const AuditLogTable = () => {
  const { showDialog } = useDialog()
  const { dictionary } = useDictionary()
  // States
  const [status, setStatus] = useState<InvoiceType['invoiceStatus']>('')
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState(...[dataMock])
  const [filteredData, setFilteredData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState('')
  const [expandedRow, setExpandedRow] = useState<string | null>(null) // Track expanded row

  // Hooks
  const { lang: locale } = useParams()

  const toggleRowExpansion = (rowId: string) => {
    setExpandedRow(prev => (prev === rowId ? null : rowId))
  }

  const columns = useMemo<ColumnDef<InvoiceTypeWithAction, any>[]>(
    () => [
      columnHelper.accessor('id', {
        header: 'Date time',
        cell: ({ row }) => <Typography variant='h6'>OPB1</Typography>
      }),

      columnHelper.accessor('company', {
        header: 'Action',

        cell: ({ row }) => (
          <div className='flex flex-col'>
            <Typography variant='h6'>{row.original.company}</Typography>
          </div>
        )
      }),
      columnHelper.accessor('id', {
        header: 'Prefix',
        cell: ({ row }) => <Typography variant='h6'>OPB1</Typography>
      }),
      columnHelper.accessor('companyEmail', {
        header: dictionary?.username,
        cell: ({ row }) => <Typography variant='h6'>{row.original.companyEmail}</Typography>
      }),
      columnHelper.accessor('total', {
        header: dictionary['audit']?.device,
        cell: ({ row }) => <Typography variant='h6'>Window</Typography>
      }),
      columnHelper.accessor('country', {
        header: dictionary['audit']?.geolocation,
        cell: ({ row }) => <Typography variant='h6'>GMT+7</Typography>
      }),
      columnHelper.accessor('country', {
        header: dictionary?.country,
        cell: ({ row }) => <Typography variant='h6'>Thailand</Typography>
      }),
      columnHelper.accessor('balance', {
        header: dictionary?.status,
        cell: ({ row }) => {
          return (
            <div className='flex gap-1 items-center'>
              <Switch checked={true} onChange={() => {}} />
              <Typography>Enable</Typography>
            </div>
          )
        }
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
    [data, filteredData, expandedRow]
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

  useEffect(() => {
    const filteredData = data?.filter(invoice => {
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
                  {dictionary?.noData}
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {table.getRowModel().rows.map(row => (
                <div key={row.id}>
                  <tr className={classnames({ selected: row.getIsSelected() })}>
                    {row.getVisibleCells().map(cell => (
                      <td className={`${expandedRow == row.id ? ' bg-primaryLight' : ''}`} key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                  {expandedRow === row.id && (
                    <tr>
                      <td colSpan={columns.length} className='p-4 bg-gray-100'>
                        {/* Additional Row Data */}
                        <div className='flex flex-col gap-2'>
                          <Typography variant='h6'>More Details</Typography>
                          <Typography variant='body2'>User: {row.original.companyEmail}</Typography>
                          <Typography variant='body2'>Country: {row.original.country}</Typography>
                          <Typography variant='body2'>Device: Windows</Typography>
                        </div>
                      </td>
                    </tr>
                  )}
                </div>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </Card>
  )
}

export default AuditLogTable
