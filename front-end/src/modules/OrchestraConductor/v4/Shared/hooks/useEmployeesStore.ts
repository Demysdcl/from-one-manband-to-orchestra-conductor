import { Employee, getEmployees } from '@/modules/Shared'
import { create } from 'zustand'

interface EmployeeStore {
  employees: Employee[]
  fetchEmployees: () => Promise<void>
  addNewEmployee: (employee: Employee) => void
  removeEmployee: (id: string) => void
  changeEmployee: (updatedEmployee: Employee) => void
}

export const useEmployeesStore = create<EmployeeStore>((set) => ({
  employees: [],
  fetchEmployees: async () => {
    const employees = await getEmployees()
    set({ employees })
  },
  addNewEmployee: (employee) => {
    set((state) => ({ employees: [...state.employees, employee] }))
  },
  removeEmployee: (id) => {
    set((state) => ({
      employees: state.employees.filter((employee) => employee.id !== id),
    }))
  },
  changeEmployee: (updatedEmployee) => {
    set((state) => ({
      employees: state.employees.map((employee) =>
        employee.id === updatedEmployee.id ? updatedEmployee : employee,
      ),
    }))
  },
}))
