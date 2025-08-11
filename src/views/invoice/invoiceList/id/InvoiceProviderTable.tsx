'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import React from 'react'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'

// Third-party Imports
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

// Style Imports
import { CardContent } from '@mui/material'

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

// Column Definitions
const columnHelper = createColumnHelper<ProviderSummary>()

const columns = [
  columnHelper.accessor('provider_name', {
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
  columnHelper.accessor('winloss', {
    header: 'Net Win/Loss (THB)',
    cell: info => <span>{info.getValue().toLocaleString()}</span>
  }),
  columnHelper.accessor('royalty_fee', {
    header: 'API Fee',
    cell: info => <span>{info.getValue().toLocaleString()}%</span>
  }),
  columnHelper.accessor('exchange_rate', {
    header: 'Exchange Rate',
    cell: info => <span>{info.getValue()}%</span>
  }),
  columnHelper.accessor('turnover', {
    header: 'Gross Subtotal (USDT)',
    cell: info => <span>{info.getValue().toLocaleString()}</span>
  }),
  // columnHelper.accessor('discount', {
  //   header: 'Discount (USDT)',
  //   cell: info => <span>{info.getValue()?.toLocaleString?.() ?? '-'}</span>
  // }),
  columnHelper.accessor('total_payment', {
    header: 'Net SubTotal (USDT)',
    cell: info => <span>{info.getValue().toLocaleString()}</span>
  })
]
type Props = {
  list: any[]
}

const InvoiceProviderTable: React.FC<Props> = ({ list }: any) => {
  // State
  const resultList = list

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
                <React.Fragment key={row.id}>
                  <tr>
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                    ))}
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

export default InvoiceProviderTable
