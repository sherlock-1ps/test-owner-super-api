'use client'

import { useState } from 'react'

import { Button } from '@mui/material'

const ClientComponent = () => {
  console.log('render Client component')

  const [number, setNumber] = useState(0)

  
return (
    <div>
      <Button
        onClick={() => {
          setNumber(number + 1)
        }}
      >
        Test Client {number}
      </Button>
    </div>
  )
}

export default ClientComponent
