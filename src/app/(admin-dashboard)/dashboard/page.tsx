import React from 'react'
import DashboardOverviewHeader from './_components/dashboard-overview-header'
import { DashboardSummery } from './_components/dashboard-summery'

const HomePage = () => {
  return (
    <div>
      <DashboardOverviewHeader/>
      <DashboardSummery/>
    </div>
  )
}

export default HomePage
