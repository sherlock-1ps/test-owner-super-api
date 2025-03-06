'use client'
import React from 'react'

import { useForm } from 'react-hook-form'

function TestHookform() {
  // Initialize the form and register the fields with react-hook-form, adding defaultValues
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: 'defaultName', // Default value for the name field
      email: 'example@example.com' // Default value for the email field
    }
  })

  // Function to handle form submission
  const onSubmit = (data: any) => {
    console.log(data)
    alert('Form Submitted Successfully!')
  }

  console.log('errors', errors)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Name Field */}
      <div>
        <label htmlFor='name'>Name</label>
        <input
          id='name'
          {...register('name', {
            required: 'Name is required',
            validate: {
              notAdmin: fieldValue => {
                return fieldValue == 'test001' || 'Enter different'
              }
            }
          })}
          placeholder='Enter your name'
        />
        {/* Validation Error Message for Name */}
        {errors.name && <span style={{ color: 'red' }}>{errors.name.message?.toString()}</span>}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          type='email'
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Invalid email address'
            }
          })}
          placeholder='Enter your email'
        />
        {/* Validation Error Message for Email */}
        {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
      </div>

      {/* Submit Button */}
      <button type='submit'>Submit</button>
    </form>
  )
}

export default TestHookform
