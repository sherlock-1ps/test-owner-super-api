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
}

const VerifyPaymentDialog = ({ id, data, invoiceId }: confirmProps) => {
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
      }
    } catch (error) {
      console.log('error', error)
      toast.error('Verify Invoice failed!', { autoClose: 3000 })
    }
  }

  const handleAddUrl = () => {
    if (urlLink.trim() !== '') {
      setUrlList(prev => [...prev, { link_slip: urlLink.trim() }])
      setUrlLink('')
    }
  }

  const handleAddImage = (image: any) => {
    setFileImg((prev: any) => [...prev, { image_slip: image[0] }])
  }

  const handleRemoveFile = (index: number) => {
    const updated = fileImg.filter((_: any, i: any) => i !== index)
    setFileImg(updated)
  }

  const handleRemoveUrl = (url: string) => {
    setUrlList(prev => prev.filter(item => item.link_slip !== url))
  }

  const handleUpload = async () => {
    if ((fileImg?.length ?? 0) > 0 || urlList.length > 0) {
      const upload_slip: { image_slip?: File; link_slip?: string }[] = []

      fileImg.forEach((img: any) => {
        upload_slip.push(img)
      })

      urlList.forEach((url: any) => {
        upload_slip.push(url)
      })

      const request = {
        invoice_id: invoiceId,
        upload_slip: upload_slip
      }
    } else {
      toast.error('Please upload a file or add at least one URL')
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

        <Grid item xs={12} sm></Grid>

        <Grid item xs={12}>
          <Typography variant='h6' className='text-center'>
            OR
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <div className='flex gap-2'>
            <CustomTextField
              fullWidth
              label='URL Link'
              placeholder='ex. http://URLImage.com'
              value={urlLink}
              onChange={e => setUrlLink(e.target.value)}
            />
          </div>
        </Grid>

        {urlList.length > 0 && (
          <Grid item xs={12} className='flex flex-wrap gap-2'>
            {urlList.map((url, index) => (
              <Chip key={index} label={url?.link_slip} onDelete={() => handleRemoveUrl(url?.link_slip)} />
            ))}
          </Grid>
        )}
      </Grid>

      <Grid item xs={12} className='flex items-center justify-end gap-4'>
        <Button variant='outlined' onClick={() => closeDialog(id)}>
          Cancel
        </Button>
        <Button disabled={!fileImg && urlList.length == 0} variant='contained' onClick={handleUpload}>
          Upload
        </Button>
      </Grid>
    </Grid>
  )
}

export default VerifyPaymentDialog
