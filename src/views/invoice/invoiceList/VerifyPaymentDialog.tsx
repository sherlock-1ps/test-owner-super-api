/* eslint-disable react-hooks/exhaustive-deps */
import { useDialog } from '@/hooks/useDialog'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import CustomTextField from '@/@core/components/mui/TextField'
import Button from '@mui/material/Button'
import { Chip, Divider, Grid, Typography } from '@mui/material'
import { useGetInvoiceMutationOption, useVerifyInvoiceMutationOption } from '@/queryOptions/invoice/invoiceQueryOptions'

interface confirmProps {
  id: string
  data?: any
  invoiceId: any
  onSearch?: any
}

const VerifyPaymentDialog = ({ id, data, invoiceId, onSearch }: confirmProps) => {
  const { closeDialog } = useDialog()
  const [fileImg, setFileImg] = useState<any>(null)
  const [urlLink, setUrlLink] = useState('')
  const [urlList, setUrlList] = useState<any[]>([])
  const { mutateAsync: callGetInvoice, data: invoiceDetail } = useGetInvoiceMutationOption()
  const { mutateAsync: callVerifyInvoice, isPending: pendingVerify } = useVerifyInvoiceMutationOption()

  const handleCallVerifyInvoice = async (id: any) => {
    try {
      const request = {
        invoice_id: id
      }
      const response = await callVerifyInvoice(request)

      if (response?.code == 'SUCCESS') {
        toast.success('Verify Invoice success!', { autoClose: 3000 })
        closeDialog(id)
        onSearch()
      }
    } catch (error) {
      console.log('error', error)
      toast.error('Verify Invoice failed!', { autoClose: 3000 })
    }
  }

  const handleCallGetInvoice = async () => {
    try {
      const response = await callGetInvoice({ invoice_id: Number(invoiceId) })

      if (response?.code == 'SUCCESS') {
        if (response?.data?.invoice_image_slip.length > 0) {
          setFileImg(
            response?.data?.invoice_image_slip?.map((item: any) => ({
              id: item.id,
              image_slip: item.image_slip
            })) || []
          )
        }
        if (response?.data?.invoice_link_slip.length > 0) {
          setUrlList(
            response?.data?.invoice_link_slip?.map((item: any) => ({
              id: item.id,
              link_slip: item.link_slip
            })) || []
          )
        }
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    handleCallGetInvoice()
  }, [])

  return (
    <Grid container className='flex flex-col gap-2' spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h5'>Verify Invoice Payment</Typography>
      </Grid>
      <Divider />
      <Grid container className='flex gap-4 py-4'>
        <Grid item xs={12}>
          <Typography variant='h6'>Please review the payment details provided by the user.</Typography>
        </Grid>

        {fileImg?.length > 0 && fileImg.length > 0 && (
          <Grid item xs={12} sm className='flex flex-wrap gap-2 overflow-auto'>
            {fileImg.map((img: any, index: any) => {
              return (
                <img
                  key={index}
                  src={img.image_slip}
                  alt={`uploaded-${index}`}
                  className='w-40 h-40 object-contain rounded'
                />
              )
            })}
          </Grid>
        )}

        <Grid item xs={12}>
          <Typography variant='h6' className='text-center'>
            OR
          </Typography>
        </Grid>

        {urlList?.length > 0 && (
          <Grid item xs={12} className='flex flex-wrap gap-2'>
            {urlList.map((url, index) => (
              <Typography variant='body2' key={index} className='bg-slate-100 rounded-md px-2'>
                {url?.link_slip}
              </Typography>
            ))}
          </Grid>
        )}
      </Grid>

      <Grid item xs={12} className='flex items-center justify-end gap-4'>
        <Button variant='outlined' onClick={() => closeDialog(id)}>
          Cancel
        </Button>
        <Button
          disabled={!fileImg && urlList.length == 0}
          variant='contained'
          onClick={() => {
            handleCallVerifyInvoice(invoiceId)
          }}
        >
          Confirm
        </Button>
      </Grid>
    </Grid>
  )
}

export default VerifyPaymentDialog
