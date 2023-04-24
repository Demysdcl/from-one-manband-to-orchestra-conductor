import { useLoaderStore } from '@/modules/Shared'
import { useEffect } from 'react'
import { useCitiesStore } from './Shared/hooks/useCitiesStore'
import { useEmployeesStore } from './Shared/hooks/useEmployeesStore'
import { useJobsStore } from './Shared/hooks/useJobsStore'
import AddEmployeeAction from './components/AddEmployeeAction'
import EmployeeTable from './components/EmployeeTable'
import { Filter } from './components/Filter'

let counter = 0

export const OrchestraConductorV5 = () => {
  console.log('OrchestraConductorV5 counter', ++counter)

  const { fetchEmployees } = useEmployeesStore()
  const { fetchCities } = useCitiesStore()
  const { fetchJobs } = useJobsStore()
  const { showLoader, hideLoader } = useLoaderStore()

  const fetchRequests = async () => {
    showLoader()
    await Promise.all([fetchEmployees(), fetchCities(), fetchJobs()])
    hideLoader()
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  return (
    <div className="flex flex-col items-center gap-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold">Employees manager</h1>

      <Filter />

      <AddEmployeeAction />

      <EmployeeTable />
    </div>
  )
}
