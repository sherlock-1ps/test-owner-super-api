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
import { alpha, useTheme } from '@mui/material/styles'

import { Chip, FormControlLabel, FormGroup } from '@mui/material'

import type { InvoiceType } from '@/types/apps/invoiceTypes'

// Component Imports
import OptionMenu from '@core/components/option-menu'
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'

// Util Imports

// Style Imports
import tableStyles from '@core/styles/table.module.css'

import { useDialog } from '@/hooks/useDialog'
import ConfirmAlert from '@/components/dialogs/alerts/ConfirmAlert'
import ReportDepositPlayerDialog from '@/components/dialogs/user/ReportDepositPlayerDialog'

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

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<TextFieldProps, 'onChange'>) => {
  // States
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

// Vars
const invoiceStatusObj: any = {
  Sent: { color: 'secondary', icon: 'tabler-send-2' },
  Paid: { color: 'success', icon: 'tabler-check' },
  Draft: { color: 'primary', icon: 'tabler-mail' },
  'Partial Payment': { color: 'warning', icon: 'tabler-chart-pie-2' },
  'Past Due': { color: 'error', icon: 'tabler-alert-circle' },
  Downloaded: { color: 'info', icon: 'tabler-arrow-down' },
  Waiting: { color: 'warning', text: 'Wating' },
  InProcess: { color: 'secondary', text: 'In Process' },
  Success: { color: 'success', text: 'Success' },
  Error: { color: 'error', text: 'Error' }
}

const dataMockup: InvoiceType[] = [
  {
    id: '4987',
    userID: 'f3d2a1b7',
    issuedDate: '13 Feb 2025',
    address: '7777 Mendez Plains',
    company: 'Hall-Robbins PLC',
    companyEmail: 'don85@johnson.com',
    country: 'USA',
    contact: '(616) 865-4180',
    name: 'Jordan Stevenson',
    service: 'Software Development',
    total: 3428,
    avatar: '',
    avatarColor: 'primary',
    invoiceStatus: 'Paid',
    balance: '$724',
    dueDate: '23 Feb 2025',
    source: {
      bank: 'bbl',
      bankNumber: '987-1-12134-8',
      bankName: 'ณัฐพล จิตสะอาดจริง'
    },
    destination: {
      bank: 'kbank',
      bankNumber: '547-1-12134-8',
      bankName: 'วันนี้วันจันทร์ กินอะไรดีครับ'
    },
    status: 'Waiting'
  },
  {
    id: '4988',
    userID: '9c8b7a6d',
    issuedDate: '17 Feb 2025',
    address: '04033 Wesley Wall Apt. 961',
    company: 'Mccann LLC and Sons',
    companyEmail: 'brenda49@taylor.info',
    country: 'Haiti',
    contact: '(226) 204-8287',
    name: 'Stephanie Burns',
    service: 'UI/UX Design & Development',
    total: 5219,
    avatar: '/images/avatars/1.png',
    invoiceStatus: 'Downloaded',
    balance: 0,
    dueDate: '15 Feb 2025',
    source: {
      bank: 'bbl',
      bankNumber: '031-1-12134-8',
      bankName: 'ณัฐพล จิตสะอาดจริง'
    },
    destination: {
      bank: 'kbank',
      bankNumber: '547-1-12134-8',
      bankName: 'วันนี้วันจันทร์ กินอะไรดีครับ'
    },
    status: 'InProcess'
  },
  {
    id: '4989',
    userID: '3e5f1a2c',
    issuedDate: '19 Feb 2025',
    address: '5345 Robert Squares',
    company: 'Leonard-Garcia and Sons',
    companyEmail: 'smithtiffany@powers.com',
    country: 'Denmark',
    contact: '(955) 676-1076',
    name: 'Tony Herrera',
    service: 'Unlimited Extended License',
    total: 3719,
    avatar: '/images/avatars/2.png',
    invoiceStatus: 'Paid',
    balance: 0,
    dueDate: '03 Feb 2025',
    source: {
      bank: 'bbl',
      bankNumber: '244-1-12134-8',
      bankName: 'ณัฐพล จิตสะอาดจริง'
    },
    destination: {
      bank: 'kbank',
      bankNumber: '547-1-12134-8',
      bankName: 'วันนี้วันจันทร์ กินอะไรดีครับ'
    },
    status: 'Success'
  },
  {
    id: '4990',
    userID: '8b7c6d5e',
    issuedDate: '06 Feb 2025',
    address: '19022 Clark Parks Suite 149',
    company: 'Smith, Miller and Henry LLC',
    companyEmail: 'mejiageorge@lee-perez.com',
    country: 'Cambodia',
    contact: '(832) 323-6914',
    name: 'Kevin Patton',
    service: 'Software Development',
    total: 4749,
    avatar: '/images/avatars/3.png',
    invoiceStatus: 'Sent',
    balance: 0,
    dueDate: '11 Feb 2025',
    source: {
      bank: 'scb',
      bankNumber: '987-1-12134-8',
      bankName: 'ณัฐพล จิตสะอาดจริง'
    },
    destination: {
      bank: 'kbank',
      bankNumber: '547-1-12134-8',
      bankName: 'วันนี้วันจันทร์ กินอะไรดีครับ'
    },
    status: 'Error'
  },
  {
    id: '4991',
    userID: '1a2b3c4d',
    issuedDate: '08 Feb 2025',
    address: '8534 Saunders Hill Apt. 583',
    company: 'Garcia-Cameron and Sons',
    companyEmail: 'brandon07@pierce.com',
    country: 'Martinique',
    contact: '(970) 982-3353',
    name: 'Mrs. Julie Donovan MD',
    service: 'UI/UX Design & Development',
    total: 4056,
    avatar: '/images/avatars/4.png',
    invoiceStatus: 'Draft',
    balance: '$815',
    dueDate: '30 Feb 2025',
    source: {
      bank: 'scb',
      bankNumber: '987-1-12134-8',
      bankName: 'ณัฐพล จิตสะอาดจริง'
    },
    destination: {
      bank: 'bbl',
      bankNumber: '547-1-12134-8',
      bankName: 'วันนี้วันจันทร์ กินอะไรดีครับ'
    },
    status: 'Waiting'
  },
  {
    id: '4992',
    userID: '7e8f9a0b',
    issuedDate: '26 Feb 2025',
    address: '661 Perez Run Apt. 778',
    company: 'Burnett-Young PLC',
    companyEmail: 'guerrerobrandy@beasley-harper.com',
    country: 'Botswana',
    contact: '(511) 938-9617',
    name: 'Amanda Phillips',
    service: 'UI/UX Design & Development',
    total: 2771,
    avatar: '',
    avatarColor: 'secondary',
    invoiceStatus: 'Paid',
    balance: 0,
    dueDate: '24 Feb 2025',
    source: {
      bank: 'scb',
      bankNumber: '447-1-54787-8',
      bankName: 'ณัฐพล จิตสะอาดจริง'
    },
    destination: {
      bank: 'kbank',
      bankNumber: '547-1-12134-8',
      bankName: 'วันนี้วันจันทร์ กินอะไรดีครับ'
    },
    status: 'InProcess'
  },
  {
    id: '4993',
    userID: '5c4d3e2f',
    issuedDate: '17 Feb 2025',
    address: '074 Long Union',
    company: 'Wilson-Lee LLC',
    companyEmail: 'williamshenry@moon-smith.com',
    country: 'Montserrat',
    contact: '(504) 859-2893',
    name: 'Christina Collier',
    service: 'UI/UX Design & Development',
    total: 2713,
    avatar: '',
    avatarColor: 'success',
    invoiceStatus: 'Draft',
    balance: '$407',
    dueDate: '22 Feb 2025',
    source: {
      bank: 'scb',
      bankNumber: '000-1-12134-8',
      bankName: 'ณัฐพล จิตสะอาดจริง'
    },
    destination: {
      bank: 'kbank',
      bankNumber: '404-1-12134-8',
      bankName: 'วันนี้วันจันทร์ กินอะไรดีครับ'
    },
    status: 'Success'
  },
  {
    id: '4994',
    userID: '0a9b8c7d',
    issuedDate: '11 Feb 2025',
    address: '5225 Ford Cape Apt. 840',
    company: 'Schwartz, Henry and Rhodes Group',
    companyEmail: 'margaretharvey@russell-murray.com',
    country: 'Oman',
    contact: '(758) 403-7718',
    name: 'David Flores',
    service: 'Template Customization',
    total: 4309,
    avatar: '/images/avatars/5.png',
    invoiceStatus: 'Paid',
    balance: '-$205',
    dueDate: '10 Feb 2025',
    source: {
      bank: 'scb',
      bankNumber: '988-1-12134-8',
      bankName: 'ณัฐพล จิตสะอาดจริง'
    },
    destination: {
      bank: 'kbank',
      bankNumber: '114-1-12134-8',
      bankName: 'วันนี้วันจันทร์ กินอะไรดีครับ'
    },
    status: 'Error'
  },
  {
    id: '4995',
    userID: '2d3e4f5a',
    issuedDate: '26 Feb 2025',
    address: '23717 James Club Suite 277',
    company: 'Henderson-Holder PLC',
    companyEmail: 'dianarodriguez@villegas.com',
    country: 'Cambodia',
    contact: '(292) 873-8254',
    name: 'Valerie Perez',
    service: 'Software Development',
    total: 3367,
    avatar: '/images/avatars/6.png',
    invoiceStatus: 'Downloaded',
    balance: 0,
    dueDate: '24 Feb 2025',
    source: {
      bank: 'scb',
      bankNumber: '987-1-12134-8',
      bankName: 'ณัฐพล จิตสะอาดจริง'
    },
    destination: {
      bank: 'kbank',
      bankNumber: '547-1-12134-8',
      bankName: 'วันนี้วันจันทร์ กินอะไรดีครับ'
    },
    status: 'Waiting'
  },
  {
    id: '4996',
    userID: '6b7c8d9e',
    issuedDate: '15 Feb 2025',
    address: '4528 Myers Gateway',
    company: 'Page-Wise PLC',
    companyEmail: 'bwilson@norris-brock.com',
    country: 'Guam',
    contact: '(956) 803-2008',
    name: 'Susan Dickerson',
    service: 'Software Development',
    total: 4776,
    avatar: '/images/avatars/7.png',
    invoiceStatus: 'Downloaded',
    balance: '$305',
    dueDate: '02 Feb 2025',
    source: {
      bank: 'scb',
      bankNumber: '987-1-12134-8',
      bankName: 'ณัฐพล จิตสะอาดจริง'
    },
    destination: {
      bank: 'kbank',
      bankNumber: '547-1-12134-8',
      bankName: 'วันนี้วันจันทร์ กินอะไรดีครับ'
    },
    status: 'InProcess'
  },
  {
    id: '4997',
    userID: 'a8b7c6d5',
    issuedDate: '27 Feb 2025',
    address: '4234 Mills Club Suite 107',
    company: 'Turner PLC Inc',
    companyEmail: 'markcampbell@bell.info',
    country: 'United States Virgin Islands',
    contact: '(716) 962-8635',
    name: 'Kelly Smith',
    service: 'Unlimited Extended License',
    total: 3789,
    avatar: '/images/avatars/8.png',
    invoiceStatus: 'Partial Payment',
    balance: '$666',
    dueDate: '18 Feb 2025',
    source: {
      bank: 'scb',
      bankNumber: '987-1-12134-8',
      bankName: 'ณัฐพล จิตสะอาดจริง'
    },
    destination: {
      bank: 'kbank',
      bankNumber: '547-1-12134-8',
      bankName: 'วันนี้วันจันทร์ กินอะไรดีครับ'
    },
    status: 'Success'
  },
  {
    id: '4998',
    userID: '3d4c5b6a',
    issuedDate: '31 Feb 2025',
    address: '476 Keith Meadow',
    company: 'Levine-Dorsey PLC',
    companyEmail: 'mary61@rosario.com',
    country: 'Syrian Arab Republic',
    contact: '(523) 449-0782',
    name: 'Jamie Jones',
    service: 'Unlimited Extended License',
    total: 5200,
    avatar: '/images/avatars/1.png',
    invoiceStatus: 'Partial Payment',
    balance: 0,
    dueDate: '17 Feb 2025',
    source: {
      bank: 'bbl',
      bankNumber: '987-1-12134-8',
      bankName: 'ณัฐพล จิตสะอาดจริง'
    },
    destination: {
      bank: 'bbl',
      bankNumber: '547-1-12134-8',
      bankName: 'วันนี้วันจันทร์ กินอะไรดีครับ'
    },
    status: 'Error'
  },
  {
    id: '4999',
    userID: '9f8e7d6c',
    issuedDate: '14 Feb 2025',
    address: '56381 Ashley Village Apt. 332',
    company: 'Hall, Thompson and Ramirez LLC',
    companyEmail: 'sean22@cook.com',
    country: 'Ukraine',
    contact: '(583) 470-8356',
    name: 'Ruben Garcia',
    service: 'Software Development',
    total: 4558,
    avatar: '/images/avatars/2.png',
    invoiceStatus: 'Paid',
    balance: 0,
    dueDate: '01 Feb 2025',
    source: {
      bank: 'bbl',
      bankNumber: '987-1-12134-8',
      bankName: 'ณัฐพล จิตสะอาดจริง'
    },
    destination: {
      bank: 'bbl',
      bankNumber: '547-1-12134-8',
      bankName: 'วันนี้วันจันทร์ กินอะไรดีครับ'
    },
    status: 'Waiting'
  },
  {
    id: '5000',
    userID: '1c2d3e4f',
    issuedDate: '21 Feb 2025',
    address: '6946 Gregory Plaza Apt. 310',
    company: 'Lambert-Thomas Group',
    companyEmail: 'mccoymatthew@lopez-jenkins.net',
    country: 'Vanuatu',
    contact: '(366) 906-6467',
    name: 'Ryan Meyer',
    service: 'Template Customization',
    total: 3503,
    avatar: '/images/avatars/3.png',
    invoiceStatus: 'Paid',
    balance: 0,
    dueDate: '22 Feb 2025',
    source: {
      bank: 'scb',
      bankNumber: '987-1-12134-8',
      bankName: 'ณัฐพล จิตสะอาดจริง'
    },
    destination: {
      bank: 'kbank',
      bankNumber: '547-1-12134-8',
      bankName: 'วันนี้วันจันทร์ กินอะไรดีครับ'
    },
    status: 'InProcess'
  },
  {
    id: '5001',
    userID: '5a6b7c8d',
    issuedDate: '30 Feb 2025',
    address: '64351 Andrew Lights',
    company: 'Gregory-Haynes PLC',
    companyEmail: 'novakshannon@mccarty-murillo.com',
    country: 'Romania',
    contact: '(320) 616-3915',
    name: 'Valerie Valdez',
    service: 'Unlimited Extended License',
    total: 5285,
    avatar: '/images/avatars/4.png',
    invoiceStatus: 'Partial Payment',
    balance: '-$202',
    dueDate: '02 Feb 2025',
    source: {
      bank: 'scb',
      bankNumber: '987-1-12134-8',
      bankName: 'ณัฐพล จิตสะอาดจริง'
    },
    destination: {
      bank: 'kbank',
      bankNumber: '547-1-12134-8',
      bankName: 'วันนี้วันจันทร์ กินอะไรดีครับ'
    },
    status: 'Success'
  },
  {
    id: '5002',
    userID: '2e3f4a5b',
    issuedDate: '21 Feb 2025',
    address: '5702 Sarah Heights',
    company: 'Wright-Schmidt LLC',
    companyEmail: 'smithrachel@davis-rose.net',
    country: 'Costa Rica',
    contact: '(435) 899-1963',
    name: 'Melissa Wheeler',
    service: 'UI/UX Design & Development',
    total: 3668,
    avatar: '/images/avatars/5.png',
    invoiceStatus: 'Downloaded',
    balance: '$731',
    dueDate: '15 Feb 2025',
    source: {
      bank: 'scb',
      bankNumber: '987-1-12134-8',
      bankName: 'ณัฐพล จิตสะอาดจริง'
    },
    destination: {
      bank: 'bbl',
      bankNumber: '547-1-12134-8',
      bankName: 'วันนี้วันจันทร์ กินอะไรดีครับ'
    },
    status: 'Error'
  },
  {
    id: '5003',
    userID: '8d7c6b5a',
    issuedDate: '30 Feb 2025',
    address: '668 Robert Flats',
    company: 'Russell-Abbott Ltd',
    companyEmail: 'scott96@mejia.net',
    country: 'Congo',
    contact: '(254) 399-4728',
    name: 'Alan Jimenez',
    service: 'Unlimited Extended License',
    total: 4372,
    avatar: '',
    avatarColor: 'warning',
    invoiceStatus: 'Sent',
    balance: '-$344',
    dueDate: '17 Feb 2025',
    source: {
      bank: 'scb',
      bankNumber: '987-1-12134-8',
      bankName: 'ณัฐพล จิตสะอาดจริง'
    },
    destination: {
      bank: 'bbl',
      bankNumber: '547-1-12134-8',
      bankName: 'วันนี้วันจันทร์ กินอะไรดีครับ'
    },
    status: 'Waiting'
  },
  {
    id: '5004',
    userID: '9a8b7c6d',
    issuedDate: '27 Feb 2025',
    address: '55642 Chang Extensions Suite 373',
    company: 'Williams LLC Inc',
    companyEmail: 'cramirez@ross-bass.biz',
    country: 'Saint Pierre and Miquelon',
    contact: '(648) 500-4338',
    name: 'Jennifer Morris',
    service: 'Template Customization',
    total: 3198,
    avatar: '/images/avatars/6.png',
    invoiceStatus: 'Partial Payment',
    balance: '-$253',
    dueDate: '16 Feb 2025',
    source: {
      bank: 'scb',
      bankNumber: '987-1-12134-8',
      bankName: 'ณัฐพล จิตสะอาดจริง'
    },
    destination: {
      bank: 'kbank',
      bankNumber: '547-1-12134-8',
      bankName: 'วันนี้วันจันทร์ กินอะไรดีครับ'
    },
    status: 'InProcess'
  },
  {
    id: '5005',
    userID: '4e5f6a7b',
    issuedDate: '30 Feb 2025',
    address: '56694 Eric Orchard',
    company: 'Hudson, Bell and Phillips PLC',
    companyEmail: 'arielberg@wolfe-smith.com',
    country: 'Uruguay',
    contact: '(896) 544-3796',
    name: 'Timothy Stevenson',
    service: 'Unlimited Extended License',
    total: 5293,
    avatar: '',
    avatarColor: 'error',
    invoiceStatus: 'Past Due',
    balance: 0,
    dueDate: '01 Feb 2025',
    source: {
      bank: 'scb',
      bankNumber: '987-1-12134-8',
      bankName: 'ณัฐพล จิตสะอาดจริง'
    },
    destination: {
      bank: 'kbank',
      bankNumber: '547-1-12134-8',
      bankName: 'วันนี้วันจันทร์ กินอะไรดีครับ'
    },
    status: 'Success'
  },
  {
    id: '5006',
    userID: '0b1c2d3e',
    issuedDate: '10 Feb 2025',
    address: '3727 Emma Island Suite 879',
    company: 'Berry, Gonzalez and Heath Inc',
    companyEmail: 'yrobinson@nichols.com',
    country: 'Israel',
    contact: '(236) 784-5142',
    name: 'Erik Hayden',
    service: 'Template Customization',
    total: 5612,
    avatar: '/images/avatars/7.png',
    invoiceStatus: 'Downloaded',
    balance: '$883',
    dueDate: '12 Feb 2025',
    source: {
      bank: 'scb',
      bankNumber: '987-1-12134-8',
      bankName: 'ณัฐพล จิตสะอาดจริง'
    },
    destination: {
      bank: 'kbank',
      bankNumber: '547-1-12134-8',
      bankName: 'วันนี้วันจันทร์ กินอะไรดีครับ'
    },
    status: 'Error'
  },
  {
    id: '5007',
    userID: '7f8e9d0c',
    issuedDate: '01 Feb 2025',
    address: '953 Miller Common Suite 580',
    company: 'Martinez, Fuller and Chavez and Sons',
    companyEmail: 'tatejennifer@allen.net',
    country: 'Cook Islands',
    contact: '(436) 717-2419',
    name: 'Katherine Kennedy',
    service: 'Software Development',
    total: 2230,
    avatar: '/images/avatars/8.png',
    invoiceStatus: 'Sent',
    balance: 0,
    dueDate: '19 Feb 2025',
    source: {
      bank: 'scb',
      bankNumber: '987-1-12134-8',
      bankName: 'ณัฐพล จิตสะอาดจริง'
    },
    destination: {
      bank: 'kbank',
      bankNumber: '547-1-12134-8',
      bankName: 'วันนี้วันจันทร์ กินอะไรดีครับ'
    },
    status: 'Waiting'
  }
]

// Column Definitions
const columnHelper = createColumnHelper<InvoiceTypeWithAction>()

const TransactionManagementTable = ({ title }: { title: string }) => {
  const theme = useTheme()
  const { showDialog } = useDialog()

  // States
  const [status, setStatus] = useState<InvoiceType['invoiceStatus']>('')
  const [rowSelection, setRowSelection] = useState({})
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState(...[dataMockup])
  const [globalFilter, setGlobalFilter] = useState('')

  // Hooks
  const { lang: locale } = useParams()

  const columns = useMemo<ColumnDef<InvoiceTypeWithAction, any>[]>(
    () => [
      columnHelper.accessor('id', {
        header: 'ID',
        cell: ({ row }) => (
          <Typography

          // component={Link}
          // href={getLocalizedUrl(`apps/invoice/preview/${row.original.id}`, locale as Locale)}
          // color='primary'
          >{`#${row.original.id}`}</Typography>
        )
      }),
      columnHelper.accessor('issuedDate', {
        header: 'Date',
        cell: ({ row }) => <Typography>{row.original.issuedDate} 15:00</Typography>
      }),
      columnHelper.accessor('userID', {
        header: 'UserID',
        cell: ({ row }) => (
          <Link
            href={{
              pathname: `/${locale}/user/list/player`,
              query: { user: `XPB${row.original.userID}` }
            }}
            color='primary'
            className='text-primary no-underline transition-transform duration-300 ease-in-out hover:scale-105 '
          >
            XPB{row.original.userID}
          </Link>
        )
      }),
      columnHelper.accessor('total', {
        header: 'Amount(THB)',
        cell: ({ row }) => (
          <div className='flex items-center gap-2 '>
            <Typography className='min-w-[80px] text-right'>{row.original.total.toLocaleString()}</Typography>

            <Tooltip
              title={
                <div>
                  <Typography variant='body2' component='span' className='text-inherit'>
                    Deposit:
                  </Typography>{' '}
                  {row.original.total.toLocaleString()} THB
                  <br />
                  <div className='flex gap-2 justify-between'>
                    <Typography variant='body2' component='span' className='text-inherit'>
                      Exchange Rate:
                    </Typography>
                    <Typography variant='body2' component='span' className='text-inherit'>
                      1 USD = 33.21 THB
                    </Typography>
                  </div>
                  <Typography variant='body2' component='span' className='text-inherit'>
                    Due Date:
                  </Typography>{' '}
                  {row.original.issuedDate} 15:00
                </div>
              }
            >
              <i className='tabler-info-circle' />
            </Tooltip>
          </div>
        )
      }),
      columnHelper.accessor('source', {
        header: 'Source',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <img
              src={`/images/bankAccount/${row.original.source.bank}Image.png`}
              width={32}
              alt='transactionBank'
              className=' rounded'
            />
            <div className='flex flex-col'>
              <Typography variant='h6'>{row.original.source.bankNumber}</Typography>
              <Typography variant='subtitle2'>{row.original.source.bankName}</Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('destination', {
        header: 'Destination',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <img
              src={`/images/bankAccount/${row.original.destination.bank}Image.png`}
              width={32}
              alt='transactionBank'
              className=' rounded'
            />
            <div className='flex flex-col'>
              <Typography variant='h6'>{row.original.destination.bankNumber}</Typography>
              <Typography variant='subtitle2'>{row.original.destination.bankName}</Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('invoiceStatus', {
        header: 'Status',
        cell: ({ row }) => (
          <Chip
            variant='tonal'
            size='small'
            label={invoiceStatusObj[row.original.status!].text ?? row.original.status}
            color={invoiceStatusObj[row.original.status!].color}
            sx={{ width: '90px' }}
          />
        )
      }),

      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
            {/* <IconButton>
              <i className='tabler-trash text-textSecondary' />
            </IconButton>
            <IconButton>
              <Link
                href={getLocalizedUrl(`apps/invoice/preview/${row.original.id}`, locale as Locale)}
                className='flex'
              >
                <i className='tabler-eye text-textSecondary' />
              </Link>
            </IconButton> */}
            {row.original.status == 'Waiting' &&
              (title == 'deposit' ? (
                <OptionMenu
                  iconButtonProps={{ size: 'medium' }}
                  iconClassName='text-textSecondary'
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
                                content={`approve this user ${row.original.userID} ?`}
                                onClick={() => {}}
                              />
                            ),
                            size: 'sm'
                          })
                      }
                    },

                    // {
                    //   text: 'Reject',
                    //   icon: 'tabler-pencil',
                    //   href: getLocalizedUrl(`apps/invoice/edit/${row.original.id}`, locale as Locale),
                    //   linkProps: {
                    //     className: 'flex items-center is-full plb-2 pli-4 gap-2 text-textSecondary'
                    //   }
                    // },
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
                                content={`Reject deposit this user XPB${row.original.userID} ?`}
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
                  iconClassName='text-textSecondary'
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
                                content={`Withdraw this user ${row.original.userID} ?`}
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
                                content={`Withdraw Auto this user ${row.original.userID} ?`}
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
                                content={`Reject this withdraw user XPB${row.original.userID} ?`}
                                onClick={() => {}}
                              />
                            ),
                            size: 'sm'
                          })
                      }
                    }
                  ]}
                />
              ))}
          </div>
        ),
        enableSorting: false
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const table = useReactTable({
    data: data as InvoiceType[],
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
    globalFilterFn: fuzzyFilter,
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
    const filteredData = dataMockup
      .filter(invoice => {
        if (status && invoice.status) {
          return invoice.status.toLowerCase().replace(/\s+/g, '-') === status
        }

        return true
      })
      .sort(() => Math.random() - 0.5)

    setData(filteredData)
  }, [status])

  return (
    <Card>
      <CardContent className='flex justify-between flex-wrap items-start gap-4'>
        <div className='w-full'>
          <Typography variant='h5'>Transaction {title == 'deposit' ? 'Deposit' : 'Withdraw'}</Typography>
        </div>
        <div className='flex flex-col sm:flex-row max-sm:is-full items-start sm:items-center gap-4'>
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={value => setGlobalFilter(String(value))}
            placeholder='Search UserId'
            className='max-sm:is-full sm:is-[250px]'
          />
          <CustomTextField
            select
            id='select-status'
            value={status}
            onChange={e => setStatus(e.target.value)}
            className='max-sm:is-full sm:is-[160px]'
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>All Status</MenuItem>
            <MenuItem value='success'>Success</MenuItem>
            <MenuItem value='waiting'>Waiting</MenuItem>
            <MenuItem value='InProcess'>In Process</MenuItem>
            <MenuItem value='error'>Error</MenuItem>
          </CustomTextField>
          <FormGroup row>
            <FormControlLabel
              label='Success'
              control={<Checkbox defaultChecked name='color-success' color='success' />}
            />
            <FormControlLabel
              label='Waiting'
              control={<Checkbox defaultChecked name='color-warning' color='warning' />}
            />
            <FormControlLabel
              label='In Process'
              control={<Checkbox defaultChecked name='color-secondary' color='secondary' />}
            />

            <FormControlLabel label='Error' control={<Checkbox defaultChecked name='color-error' color='error' />} />
          </FormGroup>
        </div>
        {title == 'deposit' && (
          <div className='flex items-center justify-between gap-4'>
            <Button
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              className='max-sm:is-full'
              onClick={() => {
                showDialog({
                  id: 'dialogReportDepositPlayerDialog',
                  component: (
                    <ReportDepositPlayerDialog
                      id={'dialogReportDepositPlayerDialog'}
                      title={'Report Player Deposit'}
                      onClick={() => {}}
                    />
                  )
                })
              }}
            >
              Report Deposit
            </Button>
          </div>
        )}
      </CardContent>
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} style={{ backgroundColor: alpha(theme.palette.primary.main, 0.2) }}>
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
      <TablePagination
        component={() => <TablePaginationComponent table={table} />}
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, page) => {
          table.setPageIndex(page)
        }}
        onRowsPerPageChange={e => table.setPageSize(Number(e.target.value))}
      />
    </Card>
  )
}

export default TransactionManagementTable
