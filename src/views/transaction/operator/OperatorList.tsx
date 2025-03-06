// MUI Imports
'use client'

import Grid from '@mui/material/Grid'

import { Card, CardContent, Typography } from '@mui/material'

import OperatorCard from './OperatorCard'
import BankAccountOperatorList from './BankAccountOperatorList'

const dataMockupDeposit = [
  {
    id: 1,
    userId: '17',
    data: '22/05/2025',
    username: 'BOFXKL1234',
    status: 'waiting',
    value: 1000,
    rate: 33.2,
    source: {
      bank: 'bbl',
      bankNumber: '987-1-23456-89',
      bankName: 'Lucas Martinez'
    },
    destination: {
      bank: 'kbank',
      bankNumber: '987-1-23456-89',
      bankName: 'Tony Martinez'
    }
  },
  {
    id: 2,
    userId: '445',
    data: '22/05/2025',
    username: 'BOFXKL1234',
    status: 'inprocess',
    value: 5000,
    rate: 33.2,
    source: {
      bank: 'scb',
      bankNumber: '987-1-23456-89',
      bankName: 'Lucas Martinez'
    },
    destination: {
      bank: 'kbank',
      bankNumber: '987-1-23456-89',
      bankName: 'Tony Martinez'
    }
  },
  {
    id: 3,
    userId: '1078',
    data: '22/05/2025',
    username: 'BOFXKL1234',
    status: 'inprocess',
    value: 3250,
    rate: 33.2,
    source: {
      bank: 'kbank',
      bankNumber: '987-1-23456-89',
      bankName: 'Lucas Martinez'
    },
    destination: {
      bank: 'kbank',
      bankNumber: '987-1-23456-89',
      bankName: 'Tony Martinez'
    }
  },
  {
    id: 4,
    userId: '1078',
    data: '22/05/2025',
    username: 'BOFXKL1234',
    status: 'inprocess',
    value: 1000,
    rate: 33.2,
    source: {
      bank: 'scb',
      bankNumber: '987-1-23456-89',
      bankName: 'Lucas Martinez'
    },
    destination: {
      bank: 'kbank',
      bankNumber: '987-1-23456-89',
      bankName: 'Tony Martinez'
    }
  },
  {
    id: 5,
    userId: '1078',
    data: '22/05/2025',
    username: 'BOFXKL1234',
    status: 'waiting',
    value: 1000,
    rate: 33.2,
    source: {
      bank: 'scb',
      bankNumber: '987-1-23456-89',
      bankName: 'Lucas Martinez'
    },
    destination: {
      bank: 'kbank',
      bankNumber: '987-1-23456-89',
      bankName: 'Tony Martinez'
    }
  }
]

const dataMockupWithdraw = [
  {
    id: 1,
    userId: '787',
    data: '22/05/2025',
    username: 'BOFXKL087',
    status: 'waiting',
    value: 340,
    rate: 33.2,
    source: {
      bank: 'scb',
      bankNumber: '987-1-23456-89',
      bankName: 'Lucas Martinez'
    },
    destination: {
      bank: 'kbank',
      bankNumber: '987-1-23456-89',
      bankName: 'Tony Martinez'
    }
  },
  {
    id: 2,
    userId: '554',
    data: '22/05/2025',
    username: 'BOFXKL554',
    status: 'waiting',
    value: 2500,
    rate: 33.2,
    source: {
      bank: 'scb',
      bankNumber: '987-1-23456-89',
      bankName: 'Lucas Martinez'
    },
    destination: {
      bank: 'kbank',
      bankNumber: '987-1-23456-89',
      bankName: 'Tony Martinez'
    }
  },
  {
    id: 3,
    userId: '668',
    data: '22/05/2025',
    username: 'BOFXKL787',
    status: 'waiting',
    value: 500,
    rate: 33.2,
    source: {
      bank: 'scb',
      bankNumber: '987-1-23456-89',
      bankName: 'Lucas Martinez'
    },
    destination: {
      bank: 'kbank',
      bankNumber: '987-1-23456-89',
      bankName: 'Tony Martinez'
    }
  }
]

const dataMockupAccountDeposit = [
  {
    id: 1,
    bank: 'kbank',
    bankNumber: '664-5-85475-0',
    bankName: 'Back Office',
    amount: 100
  },
  {
    id: 2,
    bank: 'true',
    bankNumber: '567-9-11175-0',
    bankName: 'Back Office',
    amount: 80
  },
  {
    id: 3,
    bank: 'true',
    bankNumber: '300-5-85475-0',
    bankName: 'Back Office',
    amount: 60
  }
]

const dataMockupAccountWithdraw = [
  {
    id: 1,
    bank: 'scb',
    bankNumber: '004-5-85475-0',
    bankName: 'Back Office',
    amount: 12
  },
  {
    id: 2,
    bank: 'kbank',
    bankNumber: '702-9-11175-0',
    bankName: 'Back Office',
    amount: 8
  },
  {
    id: 3,
    bank: 'true',
    bankNumber: '887-5-85475-0',
    bankName: 'Back Office',
    amount: 5
  }
]

const OperatorList = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={12} xl={4.5} lg={6} md={6}>
        <Card>
          <CardContent sx={{ maxHeight: '800px', overflowY: 'auto' }}>
            <Grid container spacing={4}>
              <Grid item xs={12} className='flex flex-col gap-3'>
                <div className='flex gap-2'>
                  <Typography variant='h4' color={'success.main'}>
                    Deposit
                  </Typography>
                  <Typography variant='h4'>- Notify 5 New</Typography>
                </div>

                <OperatorCard title='deposit' data={dataMockupDeposit} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} xl={4.5} lg={6} md={6}>
        <Card>
          <CardContent sx={{ maxHeight: '800px', overflowY: 'auto' }}>
            <Grid container spacing={4}>
              <Grid item xs={12} className='flex flex-col gap-3'>
                <div className='flex gap-2'>
                  <Typography variant='h4' color={'error.main'}>
                    Withdraw
                  </Typography>
                  <Typography variant='h4'>- Request 3 New</Typography>
                </div>
                <OperatorCard title='withdraw' data={dataMockupWithdraw} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} xl={3} lg={12} md={12}>
        <Card>
          <CardContent sx={{ maxHeight: '800px', overflowY: 'auto' }}>
            <Grid container spacing={4}>
              <Grid item xs={12} className='flex flex-col gap-3'>
                <Typography variant='h4'>Bank account</Typography>
                <BankAccountOperatorList title={'Account for Deposit'} data={dataMockupAccountDeposit} />
              </Grid>
              <Grid item xs={12}>
                <BankAccountOperatorList title={'Account for Withdraw'} data={dataMockupAccountWithdraw} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default OperatorList
