// MUI Imports
'use client'
import { useState } from 'react'

import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'

import CardAssistantList from '@/components/card-statistics/assistant/CardAssistantList'
import CardInputSearchAssistant from '@/components/card-statistics/CardInputSearchAssistant'
import type { AssistantType } from '@/types/pages/assistant/assistantTypes'
import CardNotFoundData from '@/components/card-statistics/CardNotFoundData'

const AssistantComponent = ({ data }: { data: AssistantType[] }) => {
  const [assistantData, setAssistantData] = useState(data)

  console.log('data', data)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4' className='mbe-1'>
          Assistant
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <CardInputSearchAssistant data={data} setAssistantData={setAssistantData} />
      </Grid>

      <>
        {assistantData.length > 0 ? (
          assistantData.map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <CardAssistantList data={item} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12} md={12}>
            <CardNotFoundData name='assistant' />
          </Grid>
        )}
      </>
    </Grid>
  )
}

export default AssistantComponent
