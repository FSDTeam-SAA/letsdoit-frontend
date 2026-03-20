import React from 'react'
import ProfessionalVehicleInspectionService from './_components/ProfessionalVehicleInspectionService'
import InspectionPackagesSection from '@/components/home/InspectionPackagesSection'
import InspectionProcessSection from './_components/InspectionProcessSection'
import IncludedInspectionSection from './_components/IncludedInspectionSection'

const page = () => {
  return (
    <div>
      <ProfessionalVehicleInspectionService/>
      <InspectionPackagesSection/>
      <InspectionProcessSection/>
      <IncludedInspectionSection/>
    </div>
  )
}

export default page
