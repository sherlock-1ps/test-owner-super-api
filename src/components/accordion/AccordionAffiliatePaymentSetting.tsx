// React Imports
import { useState } from 'react'
import type { SyntheticEvent } from 'react'

// MUI Imports
import Accordion from '@mui/material/Accordion'
import Typography from '@mui/material/Typography'
import AccordionSummary from '@mui/material/AccordionSummary'
import FormControlLabel from '@mui/material/FormControlLabel'
import AccordionDetails from '@mui/material/AccordionDetails'
import { useTheme, alpha } from '@mui/material/styles'
import { Box, Checkbox, Chip, Grid } from '@mui/material'

import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'
import CustomTextField from '@/@core/components/mui/TextField'
import TimeRangeSetting from '../tabs/TimeRangeSetting'

const AccordionAffiliatePaymentSetting = () => {
  const theme = useTheme()

  // States
  const [date, setDate] = useState<Date | null | undefined>(new Date())
  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
        sx={{
          backgroundColor: expanded === 'panel1' ? alpha(theme.palette.primary.light, 0.2) : 'transparent',
          border: '1px solid',
          borderColor: expanded === 'panel1' ? theme.palette.primary.main : 'rgba(0, 0, 0, 0.12)',
          transition: '0.3s'
        }}
      >
        <AccordionSummary id='actions-panel-header-1' aria-controls='actions-panel-content-1'>
          <FormControlLabel
            label='รายวัน'
            control={<Checkbox disableRipple />}
            onClick={event => event.stopPropagation()}
            onFocus={event => event.stopPropagation()}
          />
        </AccordionSummary>
        <AccordionDetails>
          <Grid container className='flex flex-col gap-4'>
            <Grid item xs={12} sm className='flex flex-col gap-1'>
              <Typography>เวลาจ่ายคำแนะนำ</Typography>
              <div className='flex gap-2 flex-wrap'>
                <Chip label='08:00' variant='outlined' color='primary' icon={<i className='tabler-clock-hour-4' />} />
                <Chip label='12:00' variant='outlined' color='primary' icon={<i className='tabler-clock-hour-4' />} />
                <Chip label='15:00' variant='outlined' color='primary' icon={<i className='tabler-clock-hour-4' />} />
                <Chip label='20:00' variant='outlined' color='primary' icon={<i className='tabler-clock-hour-4' />} />
              </div>
            </Grid>
            <Grid item xs={12} sm className='flex flex-col gap-1'>
              <Typography>วันที่ลูกค้าถอนค่าแนะนำ</Typography>
              <Box>
                <AppReactDatepicker
                  selected={date}
                  onChange={(date: Date | null) => setDate(date)}
                  placeholderText='Click to select a date'
                  customInput={<CustomTextField label='' />}
                  dateFormat='dd/MM/yyyy'
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm className='flex flex-col gap-1'>
              <Typography>ช่วงเวลาที่ให้ลูกค้าถอนค่าแนะนำ</Typography>
              <TimeRangeSetting />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
        sx={{
          backgroundColor: expanded === 'panel2' ? alpha(theme.palette.primary.light, 0.2) : 'transparent',
          border: '1px solid',
          borderColor: expanded === 'panel2' ? theme.palette.primary.main : 'rgba(0, 0, 0, 0.12)',
          transition: '0.3s'
        }}
      >
        <AccordionSummary id='actions-panel-header-2' aria-controls='actions-panel-content-2'>
          <FormControlLabel
            label='รายสัปดาห์'
            control={<Checkbox disableRipple />}
            onClick={event => event.stopPropagation()}
            onFocus={event => event.stopPropagation()}
          />
        </AccordionSummary>
        <AccordionDetails>
          <Grid container className='flex flex-col gap-4'>
            <Grid item xs={12} sm className='flex flex-col gap-1'>
              <Typography>เวลาจ่ายคำแนะนำ</Typography>
              <div className='flex gap-2 flex-wrap'>
                <Chip label='08:00' variant='outlined' color='primary' icon={<i className='tabler-clock-hour-4' />} />
                <Chip label='12:00' variant='outlined' color='primary' icon={<i className='tabler-clock-hour-4' />} />
                <Chip label='15:00' variant='outlined' color='primary' icon={<i className='tabler-clock-hour-4' />} />
                <Chip label='20:00' variant='outlined' color='primary' icon={<i className='tabler-clock-hour-4' />} />
              </div>
            </Grid>
            <Grid item xs={12} sm className='flex flex-col gap-1'>
              <Typography>วันที่ลูกค้าถอนค่าแนะนำ</Typography>
              <Box>
                <AppReactDatepicker
                  selected={date}
                  onChange={(date: Date | null) => setDate(date)}
                  placeholderText='Click to select a date'
                  customInput={<CustomTextField label='' />}
                  dateFormat='dd/MM/yyyy'
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm className='flex flex-col gap-1'>
              <Typography>ช่วงเวลาที่ให้ลูกค้าถอนค่าแนะนำ</Typography>
              <TimeRangeSetting />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
        sx={{
          backgroundColor: expanded === 'panel3' ? alpha(theme.palette.primary.light, 0.2) : 'transparent',
          border: '1px solid',
          borderColor: expanded === 'panel3' ? theme.palette.primary.main : 'rgba(0, 0, 0, 0.12)',
          transition: '0.3s'
        }}
      >
        <AccordionSummary id='actions-panel-header-3' aria-controls='actions-panel-content-3'>
          <FormControlLabel
            label='รายเดือน'
            control={<Checkbox disableRipple />}
            onClick={event => event.stopPropagation()}
            onFocus={event => event.stopPropagation()}
          />
        </AccordionSummary>
        <AccordionDetails>
          <Grid container className='flex flex-col gap-4'>
            <Grid item xs={12} sm className='flex flex-col gap-1'>
              <Typography>เวลาจ่ายคำแนะนำ</Typography>
              <div className='flex gap-2 flex-wrap'>
                <Chip label='08:00' variant='outlined' color='primary' icon={<i className='tabler-clock-hour-4' />} />
                <Chip label='12:00' variant='outlined' color='primary' icon={<i className='tabler-clock-hour-4' />} />
                <Chip label='15:00' variant='outlined' color='primary' icon={<i className='tabler-clock-hour-4' />} />
                <Chip label='20:00' variant='outlined' color='primary' icon={<i className='tabler-clock-hour-4' />} />
              </div>
            </Grid>
            <Grid item xs={12} sm className='flex flex-col gap-1'>
              <Typography>วันที่ลูกค้าถอนค่าแนะนำ</Typography>
              <Box>
                <AppReactDatepicker
                  selected={date}
                  onChange={(date: Date | null) => setDate(date)}
                  placeholderText='Click to select a date'
                  customInput={<CustomTextField label='' />}
                  dateFormat='dd/MM/yyyy'
                />
              </Box>
            </Grid>
            <div className='flex flex-col gap-1'>
              <Typography>ช่วงเวลาที่ให้ลูกค้าถอนค่าแนะนำ</Typography>
              <TimeRangeSetting />
            </div>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export default AccordionAffiliatePaymentSetting
