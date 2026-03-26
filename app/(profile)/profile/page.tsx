import React from 'react'
import JobStatsCards from '../_components/JobStatsCards'
import MyJobsTable from '../_components/MyJobsTable'
import AutoIntelHeader from '../_components/AutoIntelHeader'

const page = () => {
  return (
    <div>
      <AutoIntelHeader/>
      <JobStatsCards/>
      <MyJobsTable/>
    </div>
  )
}

export default page
