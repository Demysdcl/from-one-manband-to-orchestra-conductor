import { Employee } from '@/modules/Shared'
import { create } from 'zustand'
import { INITIAL_EMPLOYEE } from '../../../Shared'

interface FormState {
  title: string
  openFormModal: boolean
  initialEmployeeValues: Employee
  clearForm?: boolean
  onSubmit: (employee: Employee) => Promise<void>
  closeForm: () => void
  updateForm: (formState: FormState) => void
}

export const useEmployeeFormStore = create<FormState>((set) => ({
  title: 'My Store',
  openFormModal: false,
  initialEmployeeValues: INITIAL_EMPLOYEE,
  clearForm: false,
  onSubmit: () => Promise.resolve(),
  closeForm: () => set({ openFormModal: false }),
  updateForm: (formState: FormState) => set(formState),
}))
