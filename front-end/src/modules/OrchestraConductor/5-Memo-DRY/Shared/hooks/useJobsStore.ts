import { getJobs } from '@/modules/Shared'
import { create } from 'zustand'

interface JobsStore {
  jobs: string[]
  fetchJobs: () => Promise<void>
}

export const useJobsStore = create<JobsStore>((set) => ({
  jobs: [],
  fetchJobs: async () => {
    const jobs = await getJobs()
    set({ jobs })
  },
}))
