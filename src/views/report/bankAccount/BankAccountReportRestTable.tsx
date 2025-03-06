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

const dataMock = [
  {
    id: '4987',
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
      bankImage: 'bbl'
    }
  },
  {
    id: '4988',
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
      bankImage: 'bbl'
    }
  },
  {
    id: '4989',
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
      bankImage: 'bbl'
    }
  },
  {
    id: '4990',
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
      bankImage: 'bbl'
    }
  },
  {
    id: '4991',
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
      bankImage: 'bbl'
    }
  },
  {
    id: '4992',
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
      bankImage: 'bbl'
    }
  },
  {
    id: '4993',
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
      bankImage: 'bbl'
    }
  },
  {
    id: '4994',
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
      bankImage: 'bbl'
    }
  },
  {
    id: '4995',
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
      bankImage: 'bbl'
    }
  },
  {
    id: '4996',
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
      bankImage: 'scb'
    }
  },
  {
    id: '4997',
    issuedDate: 992,
    address: '4234 Mills Club Suite 107',
    company: 'Turner PLC Inc',
    companyEmail: 'markcampbell@bell.info',
    country: 'United States Virgin Islands',
    contact: '(716) 962-8635',
    name: 'โปรโมชั่นสุดคุ้ม รับงานฟรีทันที',
    service: 'Unlimited Extended License',
    total: 3789,
    avatar: '/images/avatars/8.png',
    invoiceStatus: 'Partial Payment',
    balance: '$666',
    dueDate: '18 Feb 2025',
    group: 3,
    bonus: 10,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Alice Johnson',
      bankImage: 'kbank'
    }
  },
  {
    id: '4998',
    issuedDate: 408,
    address: '476 Keith Meadow',
    company: 'Levine-Dorsey PLC',
    companyEmail: 'mary61@rosario.com',
    country: 'Syrian Arab Republic',
    contact: '(523) 449-0782',
    name: 'โปรแรง! เติมงาน รับสิทธิพิเศษทันที',
    service: 'Unlimited Extended License',
    total: 5200,
    avatar: '/images/avatars/1.png',
    invoiceStatus: 'Partial Payment',
    balance: 0,
    dueDate: '17 Feb 2025',
    group: 1,
    bonus: 0,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Bob Smith',
      bankImage: 'kbank'
    }
  },
  {
    id: '4999',
    issuedDate: 623,
    address: '56381 Ashley Village Apt. 332',
    company: 'Hall, Thompson and Ramirez LLC',
    companyEmail: 'sean22@cook.com',
    country: 'Ukraine',
    contact: '(583) 470-8356',
    name: 'ดีลพิเศษ เติมงาน รับสิทธิพิเศษทันที',
    service: 'Software Development',
    total: 4558,
    avatar: '/images/avatars/2.png',
    invoiceStatus: 'Paid',
    balance: 0,
    dueDate: '01 Feb 2025',
    group: 5,
    bonus: 0,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Charlie Brown',
      bankImage: 'kbank'
    }
  },
  {
    id: '5000',
    issuedDate: 517,
    address: '6946 Gregory Plaza Apt. 310',
    company: 'Lambert-Thomas Group',
    companyEmail: 'mccoymatthew@lopez-jenkins.net',
    country: 'Vanuatu',
    contact: '(366) 906-6467',
    name: 'โปรโมชั่นสุดคุ้ม รับงานฟรีทันที',
    service: 'Template Customization',
    total: 3503,
    avatar: '/images/avatars/3.png',
    invoiceStatus: 'Paid',
    balance: 0,
    dueDate: '22 Feb 2025',
    group: 3,
    bonus: 0,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Diana Prince',
      bankImage: 'kbank'
    }
  },
  {
    id: '5001',
    issuedDate: 365,
    address: '64351 Andrew Lights',
    company: 'Gregory-Haynes PLC',
    companyEmail: 'novakshannon@mccarty-murillo.com',
    country: 'Romania',
    contact: '(320) 616-3915',
    name: 'ช้อปครบ รับของแถมฟรีทันที',
    service: 'Unlimited Extended License',
    total: 5285,
    avatar: '/images/avatars/4.png',
    invoiceStatus: 'Partial Payment',
    balance: '-$202',
    dueDate: '02 Feb 2025',
    group: 4,
    bonus: 0,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Alice Johnson',
      bankImage: 'kbank'
    }
  },
  {
    id: '5002',
    issuedDate: 289,
    address: '5702 Sarah Heights',
    company: 'Wright-Schmidt LLC',
    companyEmail: 'smithrachel@davis-rose.net',
    country: 'Costa Rica',
    contact: '(435) 899-1963',
    name: 'โปรแรง! เติมงาน รับสิทธิพิเศษทันที',
    service: 'UI/UX Design & Development',
    total: 3668,
    avatar: '/images/avatars/5.png',
    invoiceStatus: 'Downloaded',
    balance: '$731',
    dueDate: '15 Feb 2025',
    group: 2,
    bonus: 0,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Bob Smith',
      bankImage: 'kbank'
    }
  },
  {
    id: '5003',
    issuedDate: 944,
    address: '668 Robert Flats',
    company: 'Russell-Abbott Ltd',
    companyEmail: 'scott96@mejia.net',
    country: 'Congo',
    contact: '(254) 399-4728',
    name: 'โปรโมชั่นสุดคุ้ม รับงานฟรีทันที',
    service: 'Unlimited Extended License',
    total: 4372,
    avatar: '',
    avatarColor: 'warning',
    invoiceStatus: 'Sent',
    balance: '-$344',
    dueDate: '17 Feb 2025',
    group: 1,
    bonus: 0,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Charlie Brown',
      bankImage: 'kbank'
    }
  },
  {
    id: '5004',
    issuedDate: 103,
    address: '55642 Chang Extensions Suite 373',
    company: 'Williams LLC Inc',
    companyEmail: 'cramirez@ross-bass.biz',
    country: 'Saint Pierre and Miquelon',
    contact: '(648) 500-4338',
    name: 'ดีลพิเศษ เติมงาน รับสิทธิพิเศษทันที',
    service: 'Template Customization',
    total: 3198,
    avatar: '/images/avatars/6.png',
    invoiceStatus: 'Partial Payment',
    balance: '-$253',
    dueDate: '16 Feb 2025',
    group: 5,
    bonus: 0,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Alice Johnson',
      bankImage: 'kbank'
    }
  },
  {
    id: '5005',
    issuedDate: 576,
    address: '56694 Eric Orchard',
    company: 'Hudson, Bell and Phillips PLC',
    companyEmail: 'arielberg@wolfe-smith.com',
    country: 'Uruguay',
    contact: '(896) 544-3796',
    name: 'โปรโมชั่นสุดคุ้ม รับงานฟรีทันที',
    service: 'Unlimited Extended License',
    total: 5293,
    avatar: '',
    avatarColor: 'error',
    invoiceStatus: 'Past Due',
    balance: 0,
    dueDate: '01 Feb 2025',
    group: 3,
    bonus: 0,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Diana Prince',
      bankImage: 'kbank'
    }
  },
  {
    id: '5006',
    issuedDate: 238,
    address: '3727 Emma Island Suite 879',
    company: 'Berry, Gonzalez and Heath Inc',
    companyEmail: 'yrobinson@nichols.com',
    country: 'Israel',
    contact: '(236) 784-5142',
    name: 'โปรโมชั่นสุดคุ้ม รับงานฟรีทันที',
    service: 'Template Customization',
    total: 5612,
    avatar: '/images/avatars/7.png',
    invoiceStatus: 'Downloaded',
    balance: '$883',
    dueDate: '12 Feb 2025',
    group: 4,
    bonus: 0,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Bob Smith',
      bankImage: 'kbank'
    }
  },
  {
    id: '5007',
    issuedDate: 410,
    address: '953 Miller Common Suite 580',
    company: 'Martinez, Fuller and Chavez and Sons',
    companyEmail: 'tatejennifer@allen.net',
    country: 'Cook Islands',
    contact: '(436) 717-2419',
    name: 'ช้อปครบ รับของแถมฟรีทันที',
    service: 'Software Development',
    total: 2230,
    avatar: '/images/avatars/8.png',
    invoiceStatus: 'Sent',
    balance: 0,
    dueDate: '19 Feb 2025',
    group: 2,
    bonus: 0,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Elijah Nguyen',
      bankImage: 'kbank'
    }
  },
  {
    id: '5008',
    issuedDate: 689,
    address: '808 Sullivan Street Apt. 135',
    company: 'Wilson and Sons LLC',
    companyEmail: 'gdurham@lee.com',
    country: 'Nepal',
    contact: '(489) 946-3041',
    name: 'ดีลพิเศษ เติมงาน รับสิทธิพิเศษทันที',
    service: 'Unlimited Extended License',
    total: 2032,
    avatar: '/images/avatars/1.png',
    invoiceStatus: 'Partial Payment',
    balance: 0,
    dueDate: '30 Feb 2025',
    group: 1,
    bonus: 10,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Charlie Brown',
      bankImage: 'kbank'
    }
  },
  {
    id: '5009',
    issuedDate: 321,
    address: '25135 Christopher Creek',
    company: 'Hawkins, Johnston and Mcguire PLC',
    companyEmail: 'jenny96@lawrence-thompson.com',
    country: 'Kiribati',
    contact: '(274) 246-3725',
    name: 'โปรโมชั่นสุดคุ้ม รับงานฟรีทันที',
    service: 'UI/UX Design & Development',
    total: 3128,
    avatar: '/images/avatars/2.png',
    invoiceStatus: 'Paid',
    balance: 0,
    dueDate: '10 Feb 2025',
    group: 5,
    bonus: 0,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Diana Prince',
      bankImage: 'kbank'
    }
  },
  {
    id: '5010',
    issuedDate: 777,
    address: '81285 Rebecca Estates Suite 046',
    company: 'Huynh-Mills and Sons',
    companyEmail: 'jgutierrez@jackson.com',
    country: 'Swaziland',
    contact: '(258) 211-5970',
    name: 'ดีลพิเศษ เติมงาน รับสิทธิพิเศษทันที',
    service: 'Software Development',
    total: 2060,
    avatar: '/images/avatars/3.png',
    invoiceStatus: 'Downloaded',
    balance: 0,
    dueDate: '08 Feb 2025',
    group: 3,
    bonus: 0,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Alice Johnson',
      bankImage: 'kbank'
    }
  },
  {
    id: '5011',
    issuedDate: 182,
    address: '3102 Briggs Dale Suite 118',
    company: 'Jones-Cooley and Sons',
    companyEmail: 'hunter14@jones.com',
    country: 'Congo',
    contact: '(593) 965-4100',
    name: 'โปรแรง! เติมงาน รับสิทธิพิเศษทันที',
    service: 'UI/UX Design & Development',
    total: 4077,
    avatar: '',
    avatarColor: 'info',
    invoiceStatus: 'Draft',
    balance: 0,
    dueDate: '01 Feb 2025',
    group: 4,
    bonus: 0,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Bob Smith',
      bankImage: 'kbank'
    }
  },
  {
    id: '5012',
    issuedDate: 594,
    address: '811 Jill Skyway',
    company: 'Jones PLC Ltd',
    companyEmail: 'pricetodd@johnson-jenkins.com',
    country: 'Brazil',
    contact: '(585) 829-2603',
    name: 'ช้อปครบ รับของแถมฟรีทันที',
    service: 'Template Customization',
    total: 2872,
    avatar: '/images/avatars/4.png',
    invoiceStatus: 'Partial Payment',
    balance: 0,
    dueDate: '18 Feb 2025',
    group: 2,
    bonus: 0,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Charlie Brown',
      bankImage: 'kbank'
    }
  },
  {
    id: '5013',
    issuedDate: 830,
    address: '2223 Brandon Inlet Suite 597',
    company: 'Jordan, Gomez and Ross Group',
    companyEmail: 'perrydavid@chapman-rogers.com',
    country: 'Congo',
    contact: '(527) 351-5517',
    name: 'โปรโมชั่นสุดคุ้ม รับงานฟรีทันที',
    service: 'Software Development',
    total: 3740,
    avatar: '/images/avatars/5.png',
    invoiceStatus: 'Draft',
    balance: 0,
    dueDate: '01 Feb 2025',
    group: 5,
    bonus: 0,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Diana Prince',
      bankImage: 'kbank'
    }
  },
  {
    id: '5014',
    issuedDate: 257,
    address: '08724 Barry Causeway',
    company: 'Gonzalez, Moody and Glover LLC',
    companyEmail: 'leahgriffin@carpenter.com',
    country: 'Equatorial Guinea',
    contact: '(628) 903-0132',
    name: 'ดีลพิเศษ เติมงาน รับสิทธิพิเศษทันที',
    service: 'Unlimited Extended License',
    total: 3623,
    avatar: '',
    avatarColor: 'primary',
    invoiceStatus: 'Downloaded',
    balance: 0,
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
    id: '5015',
    issuedDate: 391,
    address: '073 Holt Ramp Apt. 755',
    company: 'Ashley-Pacheco Ltd',
    companyEmail: 'esparzadaniel@allen.com',
    country: 'Seychelles',
    contact: '(847) 396-9904',
    name: 'ดีลพิเศษ เติมงาน รับสิทธิพิเศษทันที',
    service: 'Software Development',
    total: 2477,
    avatar: '/images/avatars/6.png',
    invoiceStatus: 'Draft',
    balance: 0,
    dueDate: '01 Feb 2025',
    group: 2,
    bonus: 0,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Bob Smith',
      bankImage: 'kbank'
    }
  },
  {
    id: '5016',
    issuedDate: 108,
    address: '984 Sherry Trail Apt. 953',
    company: 'Berry PLC Group',
    companyEmail: 'todd34@owens-morgan.com',
    country: 'Ireland',
    contact: '(852) 249-4539',
    name: 'ช้อปครบ รับของแถมฟรีทันที',
    service: 'Unlimited Extended License',
    total: 3904,
    avatar: '',
    avatarColor: 'secondary',
    invoiceStatus: 'Paid',
    balance: '$951',
    dueDate: '30 Feb 2025',
    group: 1,
    bonus: 0,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Charlie Brown',
      bankImage: 'kbank'
    }
  },
  {
    id: '5017',
    issuedDate: 966,
    address: '093 Jonathan Camp Suite 953',
    company: 'Allen Group Ltd',
    companyEmail: 'roydavid@bailey.com',
    country: 'Netherlands',
    contact: '(917) 984-2232',
    name: 'โปรแรง! เติมงาน รับสิทธิพิเศษทันที',
    service: 'UI/UX Design & Development',
    total: 3102,
    avatar: '/images/avatars/7.png',
    invoiceStatus: 'Partial Payment',
    balance: '-$153',
    dueDate: '25 Feb 2025',
    group: 4,
    bonus: 0,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Diana Prince',
      bankImage: 'kbank'
    }
  },
  {
    id: '5018',
    issuedDate: 415,
    address: '4735 Kristie Islands Apt. 259',
    company: 'Chapman-Schneider LLC',
    companyEmail: 'baldwinjoel@washington.com',
    country: 'Cocos (Keeling) Islands',
    contact: '(670) 409-3703',
    name: 'ดีลพิเศษ เติมงาน รับสิทธิพิเศษทันที',
    service: 'UI/UX Design & Development',
    total: 2483,
    avatar: '/images/avatars/8.png',
    invoiceStatus: 'Draft',
    balance: 0,
    dueDate: '10 Feb 2025',
    group: 5,
    bonus: 0,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Alice Johnson',
      bankImage: 'kbank'
    }
  },
  {
    id: '5019',
    issuedDate: 134,
    address: '92218 Andrew Radial',
    company: 'Mcclure, Hernandez and Simon Ltd',
    companyEmail: 'psmith@morris.info',
    country: 'Macao',
    contact: '(646) 263-0257',
    name: 'โปรโมชั่นสุดคุ้ม รับงานฟรีทันที',
    service: 'Unlimited Extended License',
    total: 2825,
    avatar: '/images/avatars/1.png',
    invoiceStatus: 'Partial Payment',
    balance: '-$459',
    dueDate: '14 Feb 2025',
    group: 3,
    bonus: 10,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Bob Smith',
      bankImage: 'kbank'
    }
  },
  {
    id: '5020',
    issuedDate: 555,
    address: '2342 Michelle Valley',
    company: 'Hamilton PLC and Sons',
    companyEmail: 'lori06@morse.com',
    country: 'Somalia',
    contact: '(751) 213-4288',
    name: 'โปรแรง! เติมงาน รับสิทธิพิเศษทันที',
    service: 'Unlimited Extended License',
    total: 2029,
    avatar: '/images/avatars/2.png',
    invoiceStatus: 'Past Due',
    balance: 0,
    dueDate: '28 Feb 2025',
    group: 4,
    bonus: 0,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Charlie Brown',
      bankImage: 'kbank'
    }
  },
  {
    id: '5021',
    issuedDate: 687,
    address: '16039 Brittany Terrace Apt. 128',
    company: 'Silva-Reeves LLC',
    companyEmail: 'zpearson@miller.com',
    country: 'Slovakia (Slovak Republic)',
    contact: '(655) 649-7872',
    name: 'ดีลพิเศษ เติมงาน รับสิทธิพิเศษทันที',
    service: 'Software Development',
    total: 3208,
    avatar: '',
    avatarColor: 'success',
    invoiceStatus: 'Sent',
    balance: 0,
    dueDate: '06 Feb 2025',
    group: 2,
    bonus: 0,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Diana Prince',
      bankImage: 'kbank'
    }
  },
  {
    id: '5022',
    issuedDate: 321,
    address: '37856 Olsen Lakes Apt. 852',
    company: 'Solis LLC Ltd',
    companyEmail: 'strongpenny@young.net',
    country: 'Brazil',
    contact: '(402) 935-0735',
    name: 'โปรโมชั่นสุดคุ้ม รับงานฟรีทันที',
    service: 'Software Development',
    total: 3077,
    avatar: '',
    avatarColor: 'error',
    invoiceStatus: 'Sent',
    balance: 0,
    dueDate: '09 Feb 2025',
    group: 1,
    bonus: 0,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Alice Johnson',
      bankImage: 'kbank'
    }
  },
  {
    id: '5023',
    issuedDate: 889,
    address: '11489 Griffin Plaza Apt. 927',
    company: 'Munoz-Peters and Sons',
    companyEmail: 'carrietorres@acosta.com',
    country: 'Argentina',
    contact: '(915) 448-6271',
    name: 'ช้อปครบ รับของแถมฟรีทันที',
    service: 'Software Development',
    total: 5578,
    avatar: '/images/avatars/3.png',
    invoiceStatus: 'Draft',
    balance: 0,
    dueDate: '23 Feb 2025',
    group: 5,
    bonus: 0,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Bob Smith',
      bankImage: 'kbank'
    }
  },
  {
    id: '5024',
    issuedDate: 432,
    address: '276 Michael Gardens Apt. 004',
    company: 'Shea, Velez and Garcia LLC',
    companyEmail: 'zjohnson@nichols-powers.com',
    country: 'Philippines',
    contact: '(817) 700-2984',
    name: 'โปรแรง! เติมงาน รับสิทธิพิเศษทันที',
    service: 'Software Development',
    total: 2787,
    avatar: '/images/avatars/4.png',
    invoiceStatus: 'Partial Payment',
    balance: 0,
    dueDate: '25 Feb 2025',
    group: 3,
    bonus: 0,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Charlie Brown',
      bankImage: 'kbank'
    }
  },
  {
    id: '5025',
    issuedDate: 719,
    address: '633 Bell Well Apt. 057',
    company: 'Adams, Simmons and Brown Group',
    companyEmail: 'kayla09@thomas.com',
    country: 'Martinique',
    contact: '(266) 611-9482',
    name: 'ดีลพิเศษ เติมงาน รับสิทธิพิเศษทันที',
    service: 'UI/UX Design & Development',
    total: 5591,
    avatar: '',
    avatarColor: 'warning',
    invoiceStatus: 'Downloaded',
    balance: 0,
    dueDate: '07 Feb 2025',
    group: 2,
    bonus: 0,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Alice Johnson',
      bankImage: 'kbank'
    }
  },
  {
    id: '5026',
    issuedDate: 222,
    address: '1068 Lopez Fall',
    company: 'Williams-Lawrence and Sons',
    companyEmail: 'melvindavis@allen.info',
    country: 'Mexico',
    contact: '(739) 745-9728',
    name: 'โปรแรง! เติมงาน รับสิทธิพิเศษทันที',
    service: 'Template Customization',
    total: 2783,
    avatar: '/images/avatars/5.png',
    invoiceStatus: 'Draft',
    balance: 0,
    dueDate: '22 Feb 2025',
    group: 4,
    bonus: 0,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Diana Prince',
      bankImage: 'kbank'
    }
  },
  {
    id: '5027',
    issuedDate: 834,
    address: '86691 Mackenzie Light Suite 568',
    company: 'Deleon Inc LLC',
    companyEmail: 'gjordan@fernandez-coleman.com',
    country: 'Costa Rica',
    contact: '(682) 804-6506',
    name: 'ช้อปครบ รับของแถมฟรีทันที',
    service: 'Template Customization',
    total: 2719,
    avatar: '',
    avatarColor: 'info',
    invoiceStatus: 'Sent',
    balance: 0,
    dueDate: '04 Feb 2025',
    group: 1,
    bonus: 0,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Bob Smith',
      bankImage: 'kbank'
    }
  },
  {
    id: '5028',
    issuedDate: 297,
    address: '86580 Sarah Bridge',
    company: 'Farmer, Johnson and Anderson Group',
    companyEmail: 'robertscott@garcia.com',
    country: 'Cameroon',
    contact: '(775) 366-0411',
    name: 'โปรโมชั่นสุดคุ้ม รับงานฟรีทันที',
    service: 'Template Customization',
    total: 3325,
    avatar: '',
    avatarColor: 'primary',
    invoiceStatus: 'Paid',
    balance: '$361',
    dueDate: '02 Feb 2025',
    group: 5,
    bonus: 0,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Charlie Brown',
      bankImage: 'kbank'
    }
  },
  {
    id: '5029',
    issuedDate: 653,
    address: '49709 Edwin Ports Apt. 353',
    company: 'Sherman-Johnson PLC',
    companyEmail: 'desiree61@kelly.com',
    country: 'Macedonia',
    contact: '(510) 536-6029',
    name: 'ดีลพิเศษ เติมงาน รับสิทธิพิเศษทันที',
    service: 'Template Customization',
    total: 3851,
    avatar: '',
    avatarColor: 'secondary',
    invoiceStatus: 'Paid',
    balance: 0,
    dueDate: '25 Feb 2025',
    group: 2,
    bonus: 0,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Alice Johnson',
      bankImage: 'kbank'
    }
  },
  {
    id: '5030',
    issuedDate: 114,
    address: '3856 Mathis Squares Apt. 584',
    company: 'Byrd LLC PLC',
    companyEmail: 'jeffrey25@martinez-hodge.com',
    country: 'Congo',
    contact: '(253) 230-4657',
    name: 'ช้อปครบ รับของแถมฟรีทันที',
    service: 'Template Customization',
    total: 5565,
    avatar: '',
    avatarColor: 'success',
    invoiceStatus: 'Draft',
    balance: 0,
    dueDate: '06 Feb 2025',
    group: 3,
    bonus: 0,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Bob Smith',
      bankImage: 'kbank'
    }
  },
  {
    id: '5031',
    issuedDate: 488,
    address: '141 Adrian Ridge Suite 550',
    company: 'Stone-Zimmerman Group',
    companyEmail: 'john77@anderson.net',
    country: 'Falkland Islands (Malvinas)',
    contact: '(612) 546-3485',
    name: 'โปรโมชั่นสุดคุ้ม รับของแถมฟรีทันที',
    service: 'Template Customization',
    total: 3313,
    avatar: '/images/avatars/6.png',
    invoiceStatus: 'Partial Payment',
    balance: 0,
    dueDate: '09 Feb 2025',
    group: 5,
    bonus: 0,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Charlie Brown',
      bankImage: 'kbank'
    }
  },
  {
    id: '5032',
    issuedDate: 905,
    address: '01871 Kristy Square',
    company: 'Yang, Hansen and Hart PLC',
    companyEmail: 'ywagner@jones.com',
    country: 'Germany',
    contact: '(203) 601-8603',
    name: 'ดีลพิเศษ เติมงาน รับสิทธิพิเศษทันที',
    service: 'Template Customization',
    total: 5181,
    avatar: '',
    avatarColor: 'error',
    invoiceStatus: 'Past Due',
    balance: 0,
    dueDate: '22 Feb 2025',
    group: 2,
    bonus: 0,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Diana Prince',
      bankImage: 'kbank'
    }
  },
  {
    id: '5033',
    issuedDate: 360,
    address: '075 Smith Views',
    company: 'Jenkins-Rosales Inc',
    companyEmail: 'calvin07@joseph-edwards.org',
    country: 'Colombia',
    contact: '(895) 401-4255',
    name: 'ดีลพิเศษ เติมงาน รับสิทธิพิเศษทันที',
    service: 'Template Customization',
    total: 2869,
    avatar: '/images/avatars/7.png',
    invoiceStatus: 'Partial Payment',
    balance: 0,
    dueDate: '22 Feb 2025',
    group: 1,
    bonus: 0,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Alice Johnson',
      bankImage: 'kbank'
    }
  },
  {
    id: '5034',
    issuedDate: 790,
    address: '2577 Pearson Overpass Apt. 314',
    company: 'Mason-Reed PLC',
    companyEmail: 'eric47@george-castillo.com',
    country: 'Paraguay',
    contact: '(602) 336-9806',
    name: 'โปรแรง! เติมงาน รับสิทธิพิเศษทันที',
    service: 'Unlimited Extended License',
    total: 4836,
    avatar: '',
    avatarColor: 'warning',
    invoiceStatus: 'Paid',
    balance: 0,
    dueDate: '22 Feb 2025',
    group: 3,
    bonus: 0,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Bob Smith',
      bankImage: 'kbank'
    }
  },
  {
    id: '5035',
    issuedDate: 217,
    address: '1770 Sandra Mountains Suite 636',
    company: 'Foster-Pham PLC',
    companyEmail: 'jamesjoel@chapman.net',
    country: 'Western Sahara',
    contact: '(936) 550-1638',
    name: 'ช้อปครบ รับของแถมฟรีทันที',
    service: 'UI/UX Design & Development',
    total: 4263,
    avatar: '',
    avatarColor: 'info',
    invoiceStatus: 'Draft',
    balance: '$762',
    dueDate: '12 Feb 2025',
    group: 2,
    bonus: 0,
    bank: {
      bankNumber: '987-2-32454-2',
      bankName: 'Charlie Brown',
      bankImage: 'kbank'
    }
  },
  {
    id: '5036',
    issuedDate: 550,
    address: '78083 Laura Pines',
    company: 'Richardson and Sons LLC',
    companyEmail: 'pwillis@cross.org',
    country: 'Bhutan',
    contact: '(687) 660-2473',
    name: 'ดีลพิเศษ เติมงาน รับสิทธิพิเศษทันที',
    service: 'Unlimited Extended License',
    total: 3171,
    avatar: '/images/avatars/8.png',
    invoiceStatus: 'Paid',
    balance: '-$205',
    dueDate: '25 Feb 2025',
    group: 4,
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

const BankAccountReportRestTable = () => {
  // States
  const [status, setStatus] = useState<InvoiceType['invoiceStatus']>('')
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState(...[dataMock])
  const [filteredData, setFilteredData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState('')

  // Hooks
  const { lang: locale } = useParams()

  const columns = useMemo<ColumnDef<InvoiceTypeWithAction, any>[]>(
    () => [
      columnHelper.accessor('bank', {
        header: 'Bank Account',

        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <img
              src={`/images/bankAccount/${row.original.bank.bankImage}Image.png`}
              width={32}
              alt='transactionBank'
              className=' rounded'
            />
            <div className='flex flex-col'>
              <Typography variant='h6'>{row.original.bank.bankNumber}</Typography>
              <Typography variant='subtitle2'>{row.original.bank.bankName}</Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('total', {
        header: 'Total Balance',
        cell: ({ row }) => <Typography color={'info.main'}>{`$ ${row.original.total} บาท`}</Typography>
      }),

      columnHelper.accessor('issuedDate', {
        header: 'Auto transfer amount',
        cell: ({ row }) => <Typography>$ {row.original.issuedDate}</Typography>
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
                  <th key={header.id}>
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
        component={() => (
          <>
            <TablePaginationComponent table={table} />
          </>
        )}
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

export default BankAccountReportRestTable
