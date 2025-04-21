'use client'

import { useForm, FormProvider } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import CustomTextField from '@/@core/components/mui/TextField'
import PermissionList from './PermissionList'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import {
  useCreateRoleMutationOption,
  useUpdateRoleMutationOption
} from '@/queryOptions/rolePermission/rolePermissionQueryOptions'
import { toast } from 'react-toastify'
import PermissionListEdit from './PermissionListEdit'
import { useDictionary } from '@/contexts/DictionaryContext'

const RoleManageRoleComponent = () => {
  const router = useRouter()
  const { dictionary } = useDictionary()
  const { lang: locale } = useParams()
  const searchParams = useSearchParams()
  const role = searchParams.get('role')

  const roleResult = role ? JSON.parse(decodeURIComponent(role as string)) : null

  const { mutateAsync: callCreateRole, isPending: pendingCreateRole } = useCreateRoleMutationOption()
  const { mutateAsync: callUpdateRole, isPending: pendingUpdateRole } = useUpdateRoleMutationOption()

  const schema = z.object({
    roleName: z.string().min(1, 'Role Name is required'),
    description: z.string().min(1, 'Description is required'),
    permissions: z.array(z.string()).min(1, 'At least one permission is required'),
    role_id: z.string().optional()
  })
  const formMethods = useForm<RoleFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      roleName: roleResult?.role_name || '',
      description: roleResult?.description || ''
    }
  })

  type RoleFormType = z.infer<typeof schema>

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = formMethods

  const onSubmit = async (data: RoleFormType) => {
    // console.log('🎯 Role Name:', data.roleName)
    // console.log('📝 Description:', data.description)
    // console.log('🔐 Permission IDs:', data.permissions)
    if (roleResult) {
      handleUpdateRole(data)
      return
    }

    try {
      const response = await callCreateRole({
        role_name: data.roleName,
        description: data.description,
        permissions: data.permissions
      })

      if (response?.code == 'SUCCESS') {
        toast.success(dictionary['roleSection']?.createRoleSuccess, { autoClose: 3000 })
        router.push(`/${locale}/role`)
      }
    } catch (error) {
      console.log('error', error)
      toast.error(dictionary['roleSection']?.createRoleFailed, { autoClose: 3000 })
    }
  }

  const handleUpdateRole = async (data: RoleFormType) => {
    try {
      const response = await callUpdateRole({
        role_id: data.role_id ?? '',
        role_name: data.roleName,
        description: data.description,
        permissions: data.permissions
      })

      if (response?.code == 'SUCCESS') {
        toast.success(dictionary['roleSection']?.updateRoleSuccess, { autoClose: 3000 })
        router.push(`/${locale}/role`)
      }
    } catch (error) {
      console.log('error', error)
      toast.error(dictionary['roleSection']?.updateRoleFailed, { autoClose: 3000 })
    }
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardContent>
            <Grid container className='flex flex-col gap-6'>
              <Grid item xs={12} sm className='flex gap-2 justify-between'>
                <Typography variant='h5' className='text-nowrap'>
                  {roleResult ? 'Edit Role' : 'Create Role'}
                </Typography>
              </Grid>

              <Divider />

              <Grid container alignItems='start' className='flex gap-6'>
                <Grid item xs={12} sm={3}>
                  <CustomTextField
                    fullWidth
                    label={dictionary['roleSection']?.roleName}
                    {...register('roleName')}
                    error={!!errors.roleName}
                    helperText={errors.roleName?.message}
                  />
                </Grid>

                <Grid item xs={12} sm>
                  <CustomTextField
                    fullWidth
                    label={dictionary?.description}
                    {...register('description')}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Typography variant='h6'>{dictionary?.permission}</Typography>
              </Grid>

              <Grid item xs={12}>
                {roleResult ? <PermissionListEdit {...roleResult} /> : <PermissionList />}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  )
}

export default RoleManageRoleComponent
