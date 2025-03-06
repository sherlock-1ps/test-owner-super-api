// MUI Imports
'use client'

import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'

import CardUserList from './CardUserList'

const dataMockup = [
  {
    id: 1,
    username: 'BOFXKL1234589',
    tel: '098-123-4564',
    balance: 200,
    bankImage: 'scb',
    bankNumber: '123-3-31212-3',
    bankName: 'โรเบิร์ต ดาวนี้ไม่อยู่',
    tier: 4,
    tags: [1, 2, 3],
    lastLogin: '11/12/2024'
  },
  {
    id: 2,
    username: 'BOFXK89897744',
    tel: '065-055-4564',
    balance: 154000,
    bankImage: 'scb',
    bankNumber: '444-3-31212-3',
    bankName: 'มะพร้าว หอมสนชื่น',
    tier: 2,
    tags: [2, 1, 3, 4],
    lastLogin: '14/02/2025'
  },
  {
    id: 3,
    username: 'BOFXKL1888777',
    tel: '015-000-4564',
    balance: 2000,
    bankImage: 'kbank',
    bankNumber: '555-3-31212-5',
    bankName: 'กินเตี๊ยวไรดี เย็นนี้',
    tier: 1,
    tags: [3, 2, 3, 4, 5],
    lastLogin: '31/12/2024'
  },
  {
    id: 4,
    username: 'BOFXKL01500004',
    tel: '052-977-4564',
    balance: 35000,
    bankImage: 'bbl',
    bankNumber: '666-3-31212-3',
    bankName: 'พรุ่้งนี้กินอะไรดี',
    tier: 3,
    tags: [4, 2, 3],
    lastLogin: '05/07/2024'
  },
  {
    id: 5,
    username: 'BOFXKL18899999',
    tel: '098-777-4564',
    balance: 55555,
    bankImage: 'kbank',
    bankNumber: '000-3-31212-3',
    bankName: 'อีลอนนนน ดาวนี้ไม่อยู่',
    tier: 1,
    tags: [5, 2],
    lastLogin: '25/01/2025'
  },
  {
    id: 6,
    username: 'BOFXKL01500004',
    tel: '052-977-4564',
    balance: 35000,
    bankImage: 'bbl',
    bankNumber: '666-3-31212-3',
    bankName: 'พรุ่้งนี้กินอะไรดี',
    tier: 3,
    tags: [4, 2, 3],
    lastLogin: '05/07/2024'
  },
  {
    id: 7,
    username: 'BOFXKL18899999',
    tel: '098-777-4564',
    balance: 55555,
    bankImage: 'kbank',
    bankNumber: '000-3-31212-3',
    bankName: 'อีลอนนนน ดาวนี้ไม่อยู่',
    tier: 1,
    tags: [5, 2],
    lastLogin: '25/01/2025'
  },
  {
    id: 8,
    username: 'BOFXKL01500004',
    tel: '052-977-4564',
    balance: 35000,
    bankImage: 'bbl',
    bankNumber: '666-3-31212-3',
    bankName: 'พรุ่้งนี้กินอะไรดี',
    tier: 3,
    tags: [4, 2, 3],
    lastLogin: '05/07/2024'
  },
  {
    id: 9,
    username: 'BOFXKL18899999',
    tel: '098-777-4564',
    balance: 55555,
    bankImage: 'kbank',
    bankNumber: '000-3-31212-3',
    bankName: 'อีลอนนนน ดาวนี้ไม่อยู่',
    tier: 1,
    tags: [5, 2],
    lastLogin: '25/01/2025'
  },
  {
    id: 10,
    username: 'BOFXKL01500004',
    tel: '052-977-4564',
    balance: 35000,
    bankImage: 'bbl',
    bankNumber: '666-3-31212-3',
    bankName: 'พรุ่้งนี้กินอะไรดี',
    tier: 3,
    tags: [4, 2, 3],
    lastLogin: '05/07/2024'
  },
  {
    id: 1,
    username: 'XBPSWEWE@#',
    tel: '098-123-4564',
    balance: 200,
    bankImage: 'kbank',
    bankNumber: '123-3-31212-3',
    bankName: 'โรเบิร์ต ดาวนี้ไม่อยู่',
    tier: 1,
    tags: [4, 2, 3],
    lastLogin: '11/12/2024'
  },
  {
    id: 2,
    username: 'BOFXererwerwer',
    tel: '065-055-4564',
    balance: 154000,
    bankImage: 'kbank',
    bankNumber: '444-3-31212-3',
    bankName: 'มะพร้าว หอมสนชื่น',
    tier: 1,
    tags: [4, 1, 3, 4],
    lastLogin: '14/02/2025'
  },
  {
    id: 3,
    username: 'BOFwewewewe77',
    tel: '015-000-4564',
    balance: 2000,
    bankImage: 'kbank',
    bankNumber: '555-3-31212-5',
    bankName: 'กินเตี๊ยวไรดี เย็นนี้',
    tier: 1,
    tags: [4, 2, 3, 4, 5],
    lastLogin: '31/12/2024'
  },
  {
    id: 4,
    username: 'BOFXKLererer04',
    tel: '052-977-4564',
    balance: 35000,
    bankImage: 'kbank',
    bankNumber: '666-3-31212-3',
    bankName: 'พรุ่้งนี้กินอะไรดี',
    tier: 1,
    tags: [4, 2, 3],
    lastLogin: '05/07/2024'
  },
  {
    id: 5,
    username: 'BOFXKEEEWW99',
    tel: '098-777-4564',
    balance: 55555,
    bankImage: 'kbank',
    bankNumber: '000-3-31212-3',
    bankName: 'อีลอนนนน ดาวนี้ไม่อยู่',
    tier: 1,
    tags: [4, 2],
    lastLogin: '25/01/2025'
  },
  {
    id: 6,
    username: 'BOFKKPKYPK',
    tel: '052-977-4564',
    balance: 35000,
    bankImage: 'kbank',
    bankNumber: '666-3-31212-3',
    bankName: 'พรุ่้งนี้กินอะไรดี',
    tier: 1,
    tags: [4, 2, 3],
    lastLogin: '05/07/2024'
  },
  {
    id: 7,
    username: 'BOFXKEEREREEe',
    tel: '098-777-4564',
    balance: 55555,
    bankImage: 'kbank',
    bankNumber: '000-3-31212-3',
    bankName: 'อีลอนนนน ดาวนี้ไม่อยู่',
    tier: 1,
    tags: [4, 2],
    lastLogin: '25/01/2025'
  },
  {
    id: 8,
    username: 'BOFXKLPEOREROER04',
    tel: '052-977-4564',
    balance: 35000,
    bankImage: 'kbank',
    bankNumber: '666-3-31212-3',
    bankName: 'พรุ่้งนี้กินอะไรดี',
    tier: 1,
    tags: [4, 2, 3],
    lastLogin: '05/07/2024'
  },
  {
    id: 9,
    username: 'BOFWEWEWE9',
    tel: '098-777-4564',
    balance: 55555,
    bankImage: 'kbank',
    bankNumber: '000-3-31212-3',
    bankName: 'อีลอนนนน ดาวนี้ไม่อยู่',
    tier: 1,
    tags: [4, 2],
    lastLogin: '25/01/2025'
  },
  {
    id: 10,
    username: 'BOFXKL01500004',
    tel: '052-977-4564',
    balance: 35000,
    bankImage: 'kbank',
    bankNumber: '666-3-31212-3',
    bankName: 'พรุ่้งนี้กินอะไรดี',
    tier: 1,
    tags: [4, 2, 3],
    lastLogin: '05/07/2024'
  },
  {
    id: 1,
    username: 'BOFXKL1234589',
    tel: '098-123-4564',
    balance: 200,
    bankImage: 'bbl',
    bankNumber: '123-3-31212-3',
    bankName: 'โรเบิร์ต ดาวนี้ไม่อยู่',
    tier: 2,
    tags: [1, 2, 3],
    lastLogin: '11/12/2024'
  },
  {
    id: 2,
    username: 'BOFXK89897744',
    tel: '065-055-4564',
    balance: 154000,
    bankImage: 'bbl',
    bankNumber: '444-3-31212-3',
    bankName: 'มะพร้าว หอมสนชื่น',
    tier: 2,
    tags: [2, 1, 3, 4],
    lastLogin: '14/02/2025'
  },
  {
    id: 3,
    username: 'BOFXKL18999',
    tel: '015-000-4564',
    balance: 2000,
    bankImage: 'bbl',
    bankNumber: '555-3-31212-5',
    bankName: 'กินเตี๊ยวไรดี เย็นนี้',
    tier: 4,
    tags: [3, 2, 3, 4, 5],
    lastLogin: '31/12/2024'
  },
  {
    id: 4,
    username: 'BOFXKL01500004',
    tel: '052-977-4564',
    balance: 35000,
    bankImage: 'bbl',
    bankNumber: '666-3-31212-3',
    bankName: 'พรุ่้งนี้กินอะไรดี',
    tier: 4,
    tags: [3, 2, 3],
    lastLogin: '05/07/2024'
  },
  {
    id: 5,
    username: 'BOFXKL18899999',
    tel: '098-777-4564',
    balance: 55555,
    bankImage: 'bbl',
    bankNumber: '000-3-31212-3',
    bankName: 'อีลอนนนน ดาวนี้ไม่อยู่',
    tier: 4,
    tags: [3, 2],
    lastLogin: '25/01/2025'
  },
  {
    id: 6,
    username: 'BOFXKL01500004',
    tel: '052-977-4564',
    balance: 35000,
    bankImage: 'bbl',
    bankNumber: '666-3-31212-3',
    bankName: 'พรุ่้งนี้กินอะไรดี',
    tier: 4,
    tags: [3, 2, 3],
    lastLogin: '05/07/2024'
  },
  {
    id: 7,
    username: 'BOFXKL18899999',
    tel: '098-777-4564',
    balance: 55555,
    bankImage: 'bbl',
    bankNumber: '000-3-31212-3',
    bankName: 'อีลอนนนน ดาวนี้ไม่อยู่',
    tier: 4,
    tags: [5, 2],
    lastLogin: '25/01/2025'
  },
  {
    id: 8,
    username: 'BOFXKL01500004',
    tel: '052-977-4564',
    balance: 35000,
    bankImage: 'bbl',
    bankNumber: '666-3-31212-3',
    bankName: 'พรุ่้งนี้กินอะไรดี',
    tier: 4,
    tags: [4, 2, 3],
    lastLogin: '05/07/2024'
  },
  {
    id: 9,
    username: 'BOFXKL18899999',
    tel: '098-777-4564',
    balance: 55555,
    bankImage: 'bbl',
    bankNumber: '000-3-31212-3',
    bankName: 'อีลอนนนน ดาวนี้ไม่อยู่',
    tier: 4,
    tags: [3, 2],
    lastLogin: '25/01/2025'
  },
  {
    id: 10,
    username: 'BOFXKL01500004',
    tel: '052-977-4564',
    balance: 35000,
    bankImage: 'bbl',
    bankNumber: '666-3-31212-3',
    bankName: 'พรุ่้งนี้กินอะไรดี',
    tier: 3,
    tags: [3, 2, 3],
    lastLogin: '05/07/2024'
  }
]

const UserListComponent = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4'>Player Management</Typography>
      </Grid>
      <Grid item xs={12} sm className='flex flex-col gap-4'>
        <CardUserList data={dataMockup} />
      </Grid>
    </Grid>
  )
}

export default UserListComponent
