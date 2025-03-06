// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { ProfileTabType } from '@/types/pages/profileTypes'
import AboutOverview from '../pages/user-profile/profile/AboutOverview'
import ActivityTimeline from '../dashboards/crm/ActivityTimeline'
import ConnectionsTeams from '../pages/user-profile/profile/ConnectionsTeams'
import ProjectsTable from '../dashboards/analytics/ProjectsTable'

// Component Imports

const ProfileList = ({ data }: { data?: ProfileTabType }) => {
  return (
    <Grid container spacing={6}>
      <Grid item lg={4} md={5} xs={12}>
        <AboutOverview data={data} />
      </Grid>
      <Grid item lg={8} md={7} xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <ActivityTimeline />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ProfileList
