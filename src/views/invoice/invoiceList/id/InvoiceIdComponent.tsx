/* eslint-disable react-hooks/exhaustive-deps */
// MUI Imports
'use client'

import CustomTextField from '@/@core/components/mui/TextField'
import { Button, Card, CardContent, Chip, Divider, Grid, IconButton, InputAdornment, MenuItem } from '@mui/material'
import type { TextFieldProps } from '@mui/material/TextField'
import { format, addDays } from 'date-fns'

import Typography from '@mui/material/Typography'
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'
import { forwardRef, useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import InvoiceProviderTable from './InvoiceProviderTable'
import InvoiceProviderByOneTable from './InvoiceProviderByOneTable'
import { useDictionary } from '@/contexts/DictionaryContext'
import Link from 'next/link'
import {
  useDownloadInvoiceMutationOption,
  useGetInvoiceMutationOption
} from '@/queryOptions/invoice/invoiceQueryOptions'
import { FormatShowDate } from '@/utils/formatShowDate'

const InvoiceIdComponent = () => {
  const searchParams = useSearchParams()
  const { lang: locale } = useParams()
  const invoiceId = searchParams.get('invoiceId')
  const { dictionary } = useDictionary()
  const { mutateAsync: callGetInvoice, data: invoiceDetail } = useGetInvoiceMutationOption()
  const { mutateAsync: callDownloadPdf, isPending } = useDownloadInvoiceMutationOption()

  useEffect(() => {
    handleCallGetInvoice()
  }, [])

  const handleCallGetInvoice = async () => {
    try {
      const response = await callGetInvoice({ invoice_id: Number(invoiceId) })
    } catch (error) {
      console.log('error', error)
    }
  }

  console.log('invoiceDetail', invoiceDetail)

  const handleDownloadInvoice = async (id: any) => {
    try {
      const request = {
        invoice_id: [id]
      }
      const response = await callDownloadPdf(request)
      if (response?.code == 'SUCCESS') {
        const link = document.createElement('a')
        link.href = response?.data?.url_download
        link.setAttribute('download', '')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  if (!invoiceDetail) return <Typography>Loading...</Typography>

  return (
    <div className='flex flex-col gap-6'>
      <Card>
        <CardContent>
          <div className='flex flex-col gap-6'>
            <div className='flex gap-2 '>
              <div className='flex gap-2'>
                <svg xmlns='http://www.w3.org/2000/svg' width='16' height='18' viewBox='0 0 16 18' fill='none'>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M16.0002 1.96714C16.0002 1.01878 15.2315 0.25 14.2831 0.25C13.3347 0.25 12.566 1.01878 12.566 1.96714V8.21738C12.9869 8.21738 13.3498 8.21738 13.6911 8.21738C14.4372 8.21738 15.08 8.21738 16.0002 8.21738V1.96714ZM14.2831 1.68443C14.4393 1.68443 14.5658 1.81099 14.5658 1.96714V6.78295H14.0004V1.96714C14.0004 1.81099 14.1269 1.68443 14.2831 1.68443Z'
                    fill='#FF5F00'
                  />
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M1.5 2.96708C1.5 1.46648 2.71648 0.25 4.21708 0.25H14.2831V1.68443H4.21708C3.50869 1.68443 2.93443 2.25869 2.93443 2.96708V13.9331H1.5V2.96708Z'
                    fill='#FF5F00'
                  />
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M12.5658 16.0319V7.5H14.0003V16.0319C14.0003 16.9807 13.2311 17.7498 12.2823 17.7498L3.2169 17.7491C1.71639 17.749 0.5 16.5326 0.5 15.0321V13.2157H11.9988V16.0319C11.9988 16.1884 12.1257 16.3154 12.2822 16.3154C12.4388 16.3154 12.5658 16.1885 12.5658 16.0319ZM10.5876 16.3153C10.5723 16.2231 10.5644 16.1284 10.5644 16.0319V14.6502H1.93443V15.0321C1.93443 15.7404 2.50865 16.3147 3.217 16.3147L10.5876 16.3153Z'
                    fill='#FF5F00'
                  />
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M11.7816 9.95452C11.7816 10.3506 11.4605 10.6717 11.0643 10.6717H4.43962C4.04352 10.6717 3.72241 10.3506 3.72241 9.95452V9.95452C3.72241 9.55841 4.04352 9.2373 4.43962 9.2373H11.0643C11.4605 9.2373 11.7816 9.55841 11.7816 9.95452V9.95452Z'
                    fill='#FF5F00'
                  />
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M11.7816 11.9545C11.7816 12.3506 11.4605 12.6717 11.0643 12.6717H4.43962C4.04352 12.6717 3.72241 12.3506 3.72241 11.9545V11.9545C3.72241 11.5584 4.04352 11.2373 4.43962 11.2373H11.0643C11.4605 11.2373 11.7816 11.5584 11.7816 11.9545V11.9545Z'
                    fill='#FF5F00'
                  />
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M7.09824 2.48703C7.09824 2.58396 7.02828 2.66573 6.93494 2.69187C6.20163 2.89721 5.66382 3.57047 5.66382 4.36933C5.66382 5.3313 6.44365 6.11114 7.40562 6.11114H8.22529C8.39505 6.11114 8.53267 6.24876 8.53267 6.41851C8.53267 6.58827 8.39505 6.72589 8.22529 6.72589H7.40562C7.30585 6.72589 7.21719 6.67835 7.16103 6.6047C7.09406 6.51685 7.0087 6.41851 6.89824 6.41851H5.86382C5.75336 6.41851 5.66261 6.50844 5.67514 6.61818C5.75613 7.32785 6.26361 7.90799 6.93494 8.09597C7.02828 8.12211 7.09824 8.20388 7.09824 8.30081V8.47261C7.09824 8.58307 7.18779 8.67261 7.29824 8.67261H8.33267C8.44313 8.67261 8.53267 8.58307 8.53267 8.47261V8.30081C8.53267 8.20388 8.60263 8.12211 8.69598 8.09597C9.42928 7.89064 9.9671 7.21738 9.9671 6.41851C9.9671 5.45655 9.18726 4.67671 8.22529 4.67671H7.40562C7.23587 4.67671 7.09824 4.53909 7.09824 4.36933C7.09824 4.19958 7.23587 4.06196 7.40562 4.06196H8.22529C8.32506 4.06196 8.41373 4.10949 8.46988 4.18315C8.53685 4.27099 8.62221 4.36933 8.73267 4.36933H9.7671C9.87755 4.36933 9.9683 4.27941 9.95578 4.16966C9.87478 3.46 9.3673 2.87985 8.69598 2.69187C8.60263 2.66573 8.53267 2.58396 8.53267 2.48703V2.31523C8.53267 2.20478 8.44313 2.11523 8.33267 2.11523H7.29824C7.18779 2.11523 7.09824 2.20478 7.09824 2.31523V2.48703Z'
                    fill='#FF5F00'
                  />
                </svg>
                <Link href={`/${locale}/invoice/invoicelist`} className=' text-nowrap text-primary'>
                  {dictionary['invoice']?.invoice}
                </Link>
              </div>
              /
              <Typography variant='h6' className=' text-nowrap'>
                {dictionary['invoice']?.invoice} : {invoiceId}
              </Typography>
            </div>
            <Grid item xs={12} sm className='flex flex-col sm:flex-row gap-1 items-center justify-between'>
              <div className='flex gap-2 items-center'>
                <Typography variant='h5'>{invoiceDetail?.data?.invoice?.invoice_name}</Typography>
                <Typography variant='h5' className=' text-primary'>
                  ({invoiceDetail?.data?.invoice?.operator_prefix}-{invoiceDetail?.data?.invoice?.credential_prefix})
                </Typography>
                <Chip
                  label={invoiceDetail?.data?.invoice?.invoice_status}
                  color={
                    invoiceDetail?.data?.invoice?.invoice_status === 'draft'
                      ? 'default'
                      : invoiceDetail?.data?.invoice?.invoice_status === 'public'
                        ? 'success'
                        : invoiceDetail?.data?.invoice?.invoice_status === 'void'
                          ? 'error'
                          : invoiceDetail?.data?.invoice?.invoice_status === 'reject'
                            ? 'secondary'
                            : 'primary'
                  }
                />
              </div>
              <div className='flex gap-2'>
                <Button
                  variant='contained'
                  className='flex gap-2 items-center'
                  onClick={() => {
                    handleDownloadInvoice(invoiceDetail?.data?.invoice?.invoice_id)
                  }}
                >
                  Download PDF{' '}
                  <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none'>
                    <path
                      d='M21.375 13.5V19.5C21.375 19.7984 21.2565 20.0845 21.0455 20.2955C20.8345 20.5065 20.5484 20.625 20.25 20.625H3.75C3.45163 20.625 3.16548 20.5065 2.9545 20.2955C2.74353 20.0845 2.625 19.7984 2.625 19.5V13.5C2.625 13.2016 2.74353 12.9155 2.9545 12.7045C3.16548 12.4935 3.45163 12.375 3.75 12.375C4.04837 12.375 4.33452 12.4935 4.5455 12.7045C4.75647 12.9155 4.875 13.2016 4.875 13.5V18.375H19.125V13.5C19.125 13.2016 19.2435 12.9155 19.4545 12.7045C19.6655 12.4935 19.9516 12.375 20.25 12.375C20.5484 12.375 20.8345 12.4935 21.0455 12.7045C21.2565 12.9155 21.375 13.2016 21.375 13.5ZM11.2041 14.2959C11.3086 14.4008 11.4328 14.484 11.5695 14.5408C11.7063 14.5976 11.8529 14.6268 12.0009 14.6268C12.149 14.6268 12.2956 14.5976 12.4324 14.5408C12.5691 14.484 12.6933 14.4008 12.7978 14.2959L16.5478 10.5459C16.7592 10.3346 16.8779 10.0479 16.8779 9.74906C16.8779 9.45018 16.7592 9.16353 16.5478 8.95219C16.3365 8.74084 16.0498 8.62211 15.7509 8.62211C15.4521 8.62211 15.1654 8.74084 14.9541 8.95219L13.125 10.7812V3C13.125 2.70163 13.0065 2.41548 12.7955 2.2045C12.5845 1.99353 12.2984 1.875 12 1.875C11.7016 1.875 11.4155 1.99353 11.2045 2.2045C10.9935 2.41548 10.875 2.70163 10.875 3V10.7812L9.04594 8.95406C8.94129 8.84942 8.81706 8.7664 8.68033 8.70977C8.5436 8.65314 8.39706 8.62399 8.24906 8.62399C7.95018 8.62399 7.66353 8.74272 7.45219 8.95406C7.34754 9.05871 7.26453 9.18294 7.2079 9.31967C7.15126 9.4564 7.12211 9.60294 7.12211 9.75094C7.12211 10.0498 7.24084 10.3365 7.45219 10.5478L11.2041 14.2959Z'
                      fill='white'
                    />
                  </svg>
                </Button>

                {/*
                <Button variant='contained' color='success' className='flex gap-2 items-center'>
                  {dictionary['invoice']?.publicInvoice}{' '}
                  <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none'>
                    <path
                      d='M21.5755 2.42438C21.3399 2.18867 21.0457 2.02003 20.7232 1.93583C20.4007 1.85162 20.0617 1.8549 19.7409 1.94531L19.7202 1.95188L1.72867 7.40625C1.36378 7.51209 1.03965 7.72627 0.799216 8.02044C0.558778 8.31461 0.413378 8.67487 0.382272 9.05353C0.351167 9.43218 0.435825 9.81134 0.625033 10.1408C0.81424 10.4703 1.09907 10.7345 1.4418 10.8984L9.28117 14.7188L13.0977 22.5609C13.2482 22.881 13.487 23.1514 13.7859 23.3404C14.0849 23.5294 14.4316 23.6291 14.7852 23.6278C14.8387 23.6278 14.893 23.6278 14.9474 23.6213C15.3271 23.592 15.6886 23.4469 15.9831 23.2054C16.2775 22.9639 16.4907 22.6378 16.5937 22.2713L22.048 4.27969C22.0508 4.273 22.053 4.26611 22.0546 4.25906C22.145 3.93827 22.1483 3.59918 22.0641 3.2767C21.9799 2.95422 21.8113 2.66001 21.5755 2.42438ZM14.7102 20.7253L11.488 14.1028L15.8005 9.795C15.9052 9.69036 15.9882 9.56612 16.0448 9.42939C16.1015 9.29267 16.1306 9.14612 16.1306 8.99813C16.1306 8.85013 16.1015 8.70359 16.0448 8.56686C15.9882 8.43013 15.9052 8.3059 15.8005 8.20125C15.6959 8.09661 15.5717 8.01359 15.4349 7.95696C15.2982 7.90033 15.1517 7.87118 15.0037 7.87118C14.8557 7.87118 14.7091 7.90033 14.5724 7.95696C14.4357 8.01359 14.3114 8.09661 14.2068 8.20125L9.8943 12.5138L3.27461 9.28969L19.6874 4.3125L14.7102 20.7253Z'
                      fill='white'
                    />
                  </svg>
                </Button> */}
              </div>
            </Grid>
            <Divider />
          </div>
        </CardContent>
      </Card>

      <Card className='min-w-[1136px] overflow-auto relative'>
        <CardContent>
          <div className='flex flex-col gap-6'>
            <div
              className='w-full rounded-md  flex justify-between h-[132px] p-6'
              style={{ backgroundColor: '#E5F3FF' }}
            >
              <div className='flex flex-col justify-between'>
                <div className='flex gap-2 items-center'>
                  <img src='/images/superApiInvoice.png' alt='superApi' className='w-[106px]' />
                </div>
                <Typography variant='h5'>{invoiceDetail?.data?.invoice?.invoice_name}</Typography>
              </div>
              <div className='flex flex-col justify-center items-end gap-2'>
                <div>
                  <Typography variant='h5'>
                    {dictionary['invoice']?.invoice}: #{invoiceDetail?.data?.invoice?.invoice_no}
                  </Typography>
                </div>
                <div className='flex flex-col items-end'>
                  <Typography>
                    {dictionary['invoice']?.invoiceDate}: {FormatShowDate(invoiceDetail?.data?.invoice?.created_at)}
                  </Typography>
                  <Typography>
                    {dictionary['dateDue']}: {FormatShowDate(invoiceDetail?.data?.invoice?.due_date)}
                  </Typography>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <div>
                <Typography variant='h5'>{dictionary['invoice']?.invoiceTo}:</Typography>
              </div>
              <div>
                <div className='flex gap-2 items-center'>
                  <Typography variant='h6' color={'text.secondary'}>
                    {dictionary['credential']?.credential}:
                  </Typography>
                  <Typography variant='h6'>{invoiceDetail?.data?.invoice?.credential_prefix}</Typography>
                </div>
                <div className='flex gap-2 items-center'>
                  <Typography variant='h6' color={'text.secondary'}>
                    {dictionary['operator']?.operator}:
                  </Typography>
                  <Typography variant='h6'>{invoiceDetail?.data?.invoice?.operator_prefix}</Typography>
                </div>
                <div className='flex gap-2 items-center'>
                  <Typography variant='h6' color={'text.secondary'}>
                    {dictionary['totalDue']} :
                  </Typography>
                  <Typography variant='h6'>
                    {invoiceDetail?.data?.invoice?.total_payment.toLocaleString()}{' '}
                    {invoiceDetail?.data?.invoice?.currency_code}
                  </Typography>
                </div>
              </div>
            </div>
            <div className='w-full'>
              <InvoiceProviderTable list={invoiceDetail?.data?.invoice_provider} />
            </div>
            <div className='flex justify-end'>
              <div className='w-[288px] flex flex-col gap-2'>
                <div className='flex gap-2 items-center justify-between w-full'>
                  <Typography variant='h6' color={'text.secondary'}>
                    Total
                  </Typography>
                  <Typography variant='h6'>700,000.00 (THB)</Typography>
                </div>
                <div className='flex gap-2 items-center justify-between w-full'>
                  <Typography variant='h6' color={'text.secondary'}>
                    FxRate(2%)
                  </Typography>
                  <Typography variant='h6'>0 (THB)</Typography>
                </div>
                <div className='flex gap-2 items-center justify-between w-full'>
                  <Typography variant='h6' color={'text.secondary'}>
                    Add-on Discount:
                  </Typography>
                  <Typography variant='h6'>--</Typography>
                </div>
                <Divider />
                <div className='flex gap-2 items-center justify-between w-full'>
                  <Typography variant='h6' color={'text.secondary'}>
                    Grand Total
                  </Typography>
                  <Typography variant='h6'>700,000.00 (THB)</Typography>
                </div>
                <div className='flex gap-2 items-center justify-between w-full'>
                  <Typography variant='h6' color={'text.secondary'}>
                    ExRate(x32.49)
                  </Typography>
                  <Typography variant='h6'>20,600.00 (USDT)</Typography>
                </div>
              </div>
            </div>
            <Divider />
            <div className='flex flex-col gap-6'>
              <Typography variant='h5'>{dictionary['invoice']?.paymentInstructions}</Typography>
              <Typography>{dictionary['invoice']?.step1}</Typography>
              {invoiceDetail?.data?.invoice_bank?.map((item: any, index: number) => {
                return (
                  <div className='flex items-center justify-between' key={index}>
                    <div className='flex gap-6'>
                      <img src={item.image} alt='bank' className='w-[68px]' />
                      <div className='flex flex-col gap-1'>
                        <Typography variant='h6' color={'text.secondary'}>
                          {dictionary['invoice']?.networkChain}
                        </Typography>
                        <Typography variant='h6'>{item.bank_name}</Typography>
                      </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                      <Typography variant='h6' color={'text.secondary'}>
                        {dictionary['invoice']?.receivingWallet}
                      </Typography>
                      <div className='flex gap-2 items-center'>
                        <Typography variant='h6'>{item.bank_account}</Typography>
                        <Button
                          className='flex item-center justify-center rounded-full'
                          onClick={() => navigator.clipboard.writeText(item.bank_account)}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                          >
                            <path
                              d='M20.25 2.625H8.25C7.95163 2.625 7.66548 2.74353 7.4545 2.9545C7.24353 3.16548 7.125 3.45163 7.125 3.75V7.125H3.75C3.45163 7.125 3.16548 7.24353 2.9545 7.4545C2.74353 7.66548 2.625 7.95163 2.625 8.25V20.25C2.625 20.5484 2.74353 20.8345 2.9545 21.0455C3.16548 21.2565 3.45163 21.375 3.75 21.375H15.75C16.0484 21.375 16.3345 21.2565 16.5455 21.0455C16.7565 20.8345 16.875 20.5484 16.875 20.25V16.875H20.25C20.5484 16.875 20.8345 16.7565 21.0455 16.5455C21.2565 16.3345 21.375 16.0484 21.375 15.75V3.75C21.375 3.45163 21.2565 3.16548 21.0455 2.9545C20.8345 2.74353 20.5484 2.625 20.25 2.625ZM14.625 19.125H4.875V9.375H14.625V19.125ZM19.125 14.625H16.875V8.25C16.875 7.95163 16.7565 7.66548 16.5455 7.4545C16.3345 7.24353 16.0484 7.125 15.75 7.125H9.375V4.875H19.125V14.625Z'
                              fill='#404550'
                            />
                          </svg>
                        </Button>
                      </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                      <Typography variant='h6' color={'text.secondary'}>
                        {dictionary['invoice']?.totalSummary}
                      </Typography>
                      <div className='flex gap-2 items-center'>
                        <Typography variant='h6'>
                          {item?.total_summary?.toLocaleString()} {item?.currency_code}
                        </Typography>
                      </div>
                    </div>
                  </div>
                )
              })}

              <Typography>{dictionary['invoice']?.step2}</Typography>
            </div>

            <div
              className=' rounded-lg w-full h-[160px] border border-dashed flex items-center justify-center'
              style={{ backgroundColor: '#FAFAFA' }}
            >
              <div className='flex gap-2 items-center'>
                <img alt='imgPhoto' src='/images/icons/upPhotoImg.png' className='w-[80px]' />
                <div className='flex flex-col gap-1 items-center opacity-70'>
                  <Typography color={'text.secondary'} variant='h6'>
                    {dictionary['invoice']?.uploadPaymentSlip}
                  </Typography>
                  <Typography>PNG, JPG format, Up to 1MB</Typography>
                </div>
              </div>
            </div>

            <Typography className='text-center'>{dictionary['or']}</Typography>

            <CustomTextField
              disabled
              fullWidth
              label='URL Link'
              placeholder='ex. http://URLImage.com'
              // InputProps={{
              //   startAdornment: <InputAdornment position='start'>ex.</InputAdornment>
              // }}
            />
          </div>
          {invoiceDetail?.data?.invoice?.invoice_status !== 'public' && (
            <div
              className=' absolute   top-[48%] right-[50%] '
              style={{
                transform: 'rotate(-45.263deg) translate(50%, 50%)',
                transformOrigin: 'center',
                opacity: 0.1
              }}
            >
              <Typography className='font-bold text-[290px] text-success'>
                {invoiceDetail?.data?.invoice?.invoice_status}
              </Typography>
            </div>
          )}

          <Divider className='mt-4' />
          {invoiceDetail?.data?.invoice_image_slip?.length > 0 && (
            <>
              <Typography variant='h6' className='my-2'>
                Uploaded Payment Image
              </Typography>
              <div className='flex gap-4 flex-wrap'>
                {invoiceDetail?.data?.invoice_image_slip?.map((image: any, index: any) => {
                  return <img key={index} src={image?.image_slip} />
                })}
              </div>
            </>
          )}

          {invoiceDetail?.data?.invoice_link_slip?.length > 0 && (
            <>
              <Typography variant='h6' className='my-2'>
                Uploaded Payment Link
              </Typography>
              <div className='flex flex-col gap-4 flex-wrap mt-4'>
                {invoiceDetail?.data?.invoice_link_slip?.map((image: any, index: any) => {
                  return <Typography key={index}>{image.link_slip}</Typography>
                })}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {invoiceDetail?.data?.invoice_provider?.map((item: any, index: number) => {
        return (
          <Card className='min-w-[1136px]  relative' key={index}>
            <CardContent>
              <div className='flex flex-col gap-6'>
                <div className='flex gap-6'>
                  <img alt='providerImg' />
                  <div className='flex flex-col'>
                    <Typography variant='h4'>{item.provider_name}</Typography>
                    <Typography variant='h6' color={'text.secondary'}>
                      {item.provider}
                    </Typography>
                  </div>
                </div>
                <Divider />
                <div className='w-full'>
                  <InvoiceProviderByOneTable list={item} />
                </div>
              </div>
              {invoiceDetail?.data?.invoice?.invoice_status !== 'public' && (
                <div
                  className=' absolute   top-[27%] right-[50%] '
                  style={{
                    transform: 'rotate(-21.263deg) translate(50%, 50%)',
                    transformOrigin: 'center',
                    opacity: 0.1
                  }}
                >
                  <Typography className='font-bold text-[130px] text-success'>
                    {invoiceDetail?.data?.invoice?.invoice_status}
                  </Typography>
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default InvoiceIdComponent
