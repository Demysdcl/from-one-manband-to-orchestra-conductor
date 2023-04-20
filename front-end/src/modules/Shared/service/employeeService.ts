import { api } from '@/api'

export interface Employee {
  id?: string
  name: string
  birthday: string
  city: string
  job: string
}

export const getEmployees = async (): Promise<Employee[]> =>
  (await api.get('')).data

export const addEmployee = async (employee: Employee): Promise<Employee> =>
  (await api.post('', employee)).data

export const updateEmployee = async (
  employeeId: string,
  employee: Partial<Employee>,
) => (await api.put(`/${employeeId}`, employee)).data

export const deleteEmployee = async (employeeId: string) =>
  (await api.delete(`/${employeeId}`)).data

export const getCities = async (): Promise<string[]> =>
  (await api.get('/cities')).data

export const getJobs = async (): Promise<string[]> =>
  (await api.get('/jobs')).data
