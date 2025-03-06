// MUI Imports
import { useState } from 'react'

import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { Grid } from '@mui/material'

const timeOptions = [
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00'
]

const TimeRangeSetting = () => {
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={3} md={2}>
        <FormControl fullWidth>
          <InputLabel id='start-time-label'>เริ่ม</InputLabel>
          <Select labelId='start-time-label' value={startTime} onChange={e => setStartTime(e.target.value)}>
            {timeOptions.map(time => (
              <MenuItem key={time} value={time}>
                {time}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={3} md={2}>
        <FormControl fullWidth>
          <InputLabel id='end-time-label'>ถึง</InputLabel>
          <Select labelId='end-time-label' value={endTime} onChange={e => setEndTime(e.target.value)}>
            {timeOptions.map(time => (
              <MenuItem key={time} value={time}>
                {time}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default TimeRangeSetting
