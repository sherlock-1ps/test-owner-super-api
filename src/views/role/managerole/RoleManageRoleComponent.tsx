'use client'

import { useForm, FormProvider } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import CustomTextField from '@/@core/components/mui/TextField'
import PermissionList from './PermissionList'
import { useParams, useRouter } from 'next/navigation'

const RoleManageRoleComponent = () => {
  const router = useRouter()
  const { lang: locale } = useParams()

  const schema = z.object({
    roleName: z.string().min(1, 'Role Name is required'),
    description: z.string().min(1, 'Description is required')
  })
  const formMethods = useForm<RoleFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      roleName: '',
      description: ''
    }
  })

  type RoleFormType = z.infer<typeof schema>

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = formMethods

  const onSubmit = (data: RoleFormType) => {
    console.log('✅ Submitted Data:', data)

    // handle create role logic here
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardContent>
            <Grid container className='flex flex-col gap-6'>
              <Grid item xs={12} sm className='flex gap-2 justify-between'>
                <Typography variant='h5' className='text-nowrap'>
                  Create Role
                </Typography>
              </Grid>

              <Divider />

              <Grid container alignItems='end' className='flex gap-6'>
                <Grid item xs={12} sm={3}>
                  <CustomTextField
                    fullWidth
                    label='Role Name'
                    {...register('roleName')}
                    error={!!errors.roleName}
                    helperText={errors.roleName?.message}
                  />
                </Grid>

                <Grid item xs={12} sm>
                  <CustomTextField
                    fullWidth
                    label='Description'
                    {...register('description')}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Typography variant='h6'>Permission</Typography>
              </Grid>

              <Grid item xs={12}>
                <PermissionList />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  )
}

export default RoleManageRoleComponent
