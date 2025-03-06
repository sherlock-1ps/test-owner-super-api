// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Chip } from '@mui/material'

const BankAccountOperatorList = ({ title, data }: { title: any; data: any }) => {
  return (
    <Card>
      <CardContent className='flex flex-col gap-2 p-3'>
        <Typography>{title}</Typography>
        {data &&
          data.map((item: any, idx: number) => {
            return (
              <div className='flex gap-2 items-center' key={idx}>
                <Chip label={idx + 1} variant='tonal' />
                <div className='flex items-center justify-between w-full border p-1 rounded-lg'>
                  <div className='flex items-center gap-1'>
                    <img
                      src={`/images/bankAccount/${item.bank}Image.png`}
                      width={32}
                      alt='transactionBank'
                      className=' rounded'
                    />
                    <div className='flex flex-col'>
                      <Typography variant='h6'>{item.bankNumber}</Typography>
                      <Typography variant='subtitle2'>{item.bankName}</Typography>
                    </div>
                  </div>
                  <div className='flex flex-col items-center'>
                    <Typography variant='subtitle1' color={'primary.main'}>
                      {item.amount}
                    </Typography>
                    <Typography variant='subtitle2'>times</Typography>
                  </div>
                </div>
              </div>
            )
          })}
      </CardContent>
    </Card>
  )
}

export default BankAccountOperatorList
