import { Suspense } from 'react'

import TestComponent from './TestComponent'
import ClientComponent from './ClientComponent'
import TestHookform from './TestHookForm'

interface User {
  id: number
  name: string
}

async function fetchData(time: number): Promise<User[]> {
  // await new Promise(resolve => setTimeout(resolve, time))

  const response = await fetch('https://jsonplaceholder.typicode.com/users')

  console.log('res', response)

  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }

  return response.json()
}

const Testpage = async () => {
  let data: User[] = []
  let hasError = false

  try {
    data = await fetchData(1000)
  } catch (error) {
    console.error('Error fetching data:', error)
    hasError = true // เกิดข้อผิดพลาด
  }

  return (
    <div>
      {hasError ? (
        <div className='bg-red-600'>
          <p>Failed to load data.</p>
          {/* แสดงรูปภาพเมื่อมีข้อผิดพลาด */}
          <div>Error loding</div>
        </div>
      ) : (
        <div>{data.length > 0 && data.map(item => <p key={item.id}>B: {item.name}</p>)}</div>
      )}

      {/* Suspense blocks for other components */}
      <Suspense fallback={<div>Loading Component A...</div>}>
        <TestComponent time={4000} />
      </Suspense>
      <TestHookform />
      {/* <Suspense fallback={<div>Loading Component B...</div>}>
        <TestComponent time={3000} />
      </Suspense>
      <Suspense fallback={<div>Loading Component C...</div>}>
        <TestComponent time={2000} />
      </Suspense> */}
      {/* <ClientComponent /> */}
    </div>
  )
}

export default Testpage
