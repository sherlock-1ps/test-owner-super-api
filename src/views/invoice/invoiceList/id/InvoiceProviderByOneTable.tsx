'use client'

import React from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

// Third-party Imports
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

// Style Imports
import styles from '@core/styles/table.module.css'
import { rankItem } from '@tanstack/match-sorter-utils'
import type { FilterFn } from '@tanstack/react-table'

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta?.({ itemRank })

  return itemRank.passed
}

type ProviderSummary = {
  provider: string
  provider_name: string
  provider_image: string
  currency_code: string
  turnover: number
  winloss: number
  exchange_rate: number
  royalty_fee: number
  total_payment: number
}

const columnHelper = createColumnHelper<ProviderSummary>()

const columns = [
  columnHelper.accessor('provider', {
    header: 'Provider',
    cell: info => {
      const row = info.row.original

      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={row.provider_image} alt='provider' style={{ width: '24px', height: '24px', borderRadius: '8px' }} />
          <span>{row.provider_name}</span>
        </div>
      )
    }
  }),
  columnHelper.accessor('currency_code', {
    header: 'Currency',
    cell: info => <span>{info.getValue()}</span>
  }),
  columnHelper.accessor('turnover', {
    header: 'Turnover (THB)',
    cell: info => <span>{info.getValue().toLocaleString()}</span>
  }),
  columnHelper.accessor('winloss', {
    header: 'Net Win/Loss (THB)',
    cell: info => <span>{info.getValue().toLocaleString()}</span>
  }),
  columnHelper.accessor('royalty_fee', {
    header: 'API Royalty Fee',
    cell: info => <span>{info.getValue().toLocaleString()}%</span>
  }),
  columnHelper.accessor('exchange_rate', {
    header: 'Exchange Rate',
    cell: info => <span>{info.getValue()}%</span>
  }),
  columnHelper.accessor('total_payment', {
    header: 'Total Payment (THB)',
    cell: info => <span>{info.getValue().toLocaleString()}</span>
  })
]

type Props = {
  list: ProviderSummary
}

const InvoiceProviderByOneTable: React.FC<Props> = ({ list }) => {
  const resultList = [list]

  const table = useReactTable({
    data: resultList,
    columns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: {
      fuzzy: fuzzyFilter
    }
  })

  return (
    <Card>
      <CardContent className='p-0'>
        <div className='overflow-x-auto'>
          <table className={styles.table}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className='bg-primary text-white'>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

export default InvoiceProviderByOneTable
