'use client'
import { useEffect } from 'react'

const ErrorPage = ({ error }: { error: Error }) => {
  useEffect(() => {
    console.error(`${error}`)
  }, [error])
  
return (
    <div>
      <div>Error fetching</div>
    </div>
  )
}

export default ErrorPage
