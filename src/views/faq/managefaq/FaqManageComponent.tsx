'use client'

import dynamic from 'next/dynamic'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import CustomTextField from '@/@core/components/mui/TextField'
import { Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDialog } from '@/hooks/useDialog'
import ConfirmAlert from '@/components/dialogs/alerts/ConfirmAlert'
import { useCreateFaqMutationOption, useUpdateFaqInfoMutationOption } from '@/queryOptions/faq/faqQueryOptions'
import { toast } from 'react-toastify'
import { useDictionary } from '@/contexts/DictionaryContext'

const HtmlEditor = dynamic(() => import('@/components/lib/htmlEditor'), { ssr: false })

const faqSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  answer: z.string().min(1, 'Answer is required')
})

type FaqFormValues = z.infer<typeof faqSchema>

const FaqManageComponent = () => {
  const { dictionary } = useDictionary()
  const router = useRouter()
  const { showDialog } = useDialog()
  const searchParams = useSearchParams()
  const data = searchParams.get('data')

  const faqData = data ? JSON.parse(decodeURIComponent(data as string)) : null

  console.log(faqData)

  const { mutateAsync: createFaq, isPending: pendingCreateFaq } = useCreateFaqMutationOption()

  const { mutateAsync: updateInfoFaq, isPending: pendingUpdateInfoFaq } = useUpdateFaqInfoMutationOption()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<FaqFormValues>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      question: faqData?.question || '',
      answer: ''
    }
  })

  const handleEditorChange = (value: any) => {
    setValue('answer', value)
  }

  const handleCreateFaqApi = async (data: any) => {
    try {
      const response = await createFaq({
        title: data.question,
        body: data.answer
      })

      if (response?.code) {
        toast.success(dictionary['faq']?.createSuccessFaq, { autoClose: 3000 })
        reset()
        router.back()
      }
    } catch (error) {
      toast.error(dictionary['faq']?.createErrorFaq, { autoClose: 3000 })
      console.error('Error Creating FAQ:', error)
    }
  }

  const handleUpdateFaq = async (data: any) => {
    try {
      const response = await updateInfoFaq({
        faq_id: faqData?.faq_id,
        title: data.question,
        body: data.answer
      })

      if (response?.code) {
        toast.success(dictionary['faq']?.updateSuccessFaq, { autoClose: 3000 })
        reset()
        router.back()
      }
    } catch (error) {
      toast.error(dictionary['faq']?.updateErrorFaq, { autoClose: 3000 })
      console.error('Error update FAQ:', error)
    }
  }

  const onSubmit = (data: FaqFormValues) => {
    console.log('Form Submitted:', data)

    showDialog({
      id: 'alertDialogConfirmManageFaq',
      component: (
        <ConfirmAlert
          id='alertDialogConfirmManageFaq'
          title={faqData ? dictionary['faq']?.updateFaqDialog : dictionary['faq']?.addFaqDialog}
          content1={faqData ? dictionary['faq']?.confirmUpdateFaq : dictionary['faq']?.confirmAddFaq}
          onClick={() => {
            if (faqData) {
              handleUpdateFaq(data)
            } else {
              handleCreateFaqApi(data)
            }
          }}
        />
      ),
      size: 'sm'
    })
  }

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
          <Grid container className='flex flex-col gap-6'>
            <Grid item xs={12} sm className='flex gap-2 justify-between'>
              <Typography variant='h5' className='text-nowrap'>
                {faqData ? dictionary['faq']?.editFaq : dictionary['faq']?.addFaq}
              </Typography>
            </Grid>
            <Divider />
            <Grid container alignItems='end' className='flex gap-6'>
              <Grid item xs={12} sm>
                <CustomTextField
                  fullWidth
                  label={dictionary['faq']?.question}
                  {...register('question')}
                  error={!!errors.question}
                  helperText={errors.question?.message}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {pendingCreateFaq ? (
                <p>{dictionary?.loading}...</p>
              ) : (
                <HtmlEditor handleEditorChange={handleEditorChange} />
              )}

              {errors.answer && <Typography color='error'>{errors.answer.message}</Typography>}
            </Grid>
            <Grid item xs={12}>
              <div className='flex gap-4 justify-end'>
                <Button variant='outlined' onClick={() => router.back()}>
                  {dictionary?.cancel}
                </Button>
                <Button variant='contained' type='submit' disabled={pendingCreateFaq}>
                  {faqData ? dictionary['faq']?.editFaq : dictionary['faq']?.addFaq}
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default FaqManageComponent
