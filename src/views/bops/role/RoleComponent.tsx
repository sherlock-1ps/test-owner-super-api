// MUI Imports
'use client'
import { useState, useEffect } from 'react'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import CardInputSearch from '@/components/card-statistics/CardInputSearchRole'
import CardRoleList from '@/components/card-statistics/CardRoleList'
import CardNotFoundData from '@/components/card-statistics/CardNotFoundData'

const MOCKUP_CARD_LENGTH = 1

const Roles = ({ data }: any) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredData, setFilteredData] = useState(data || [])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase()

    const filtered = data?.filter(
      (item: any) =>
        item.name.toLowerCase().includes(lowerCaseQuery) || item.description.toLowerCase().includes(lowerCaseQuery)
    )

    setFilteredData(filtered)
  }, [searchQuery, data])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4' className='mbe-1'>
          Roles List
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <CardInputSearch value={searchQuery} onChange={handleSearchChange} />
      </Grid>
      {/* {Array.from({ length: MOCKUP_CARD_LENGTH }).map((_, index) => (
        <Grid item xs={12} md={4} key={index}>
          <CardRoleList data={data?.users?.teams || data} />
        </Grid>
      ))} */}
      {filteredData.map((item: any, index: number) => (
        <Grid item xs={12} md={4} key={index}>
          <CardRoleList data={item} />
        </Grid>
      ))}

      {filteredData.length < 1 && (
        <Grid item xs={12} md={12}>
          <CardNotFoundData name='role list' />
        </Grid>
      )}
    </Grid>
  )
}

export default Roles
