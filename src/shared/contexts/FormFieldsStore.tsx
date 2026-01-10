import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { PredictionData } from '../types/PredictionSchema'

interface FormFieldsStoreType {
  fields: Partial<PredictionData>
  addFields: (fields: Partial<PredictionData>) => void
  resetFields: () => void
}

export const FormFieldsStore = create<FormFieldsStoreType>()(
  persist(
    (set, get) => ({
      fields: {},
      addFields: (newFields) => {
        const fields = get().fields
        set({
          fields: { ...fields, ...newFields }
        })
        console.log('Fields Updated: ', get().fields)
      },
      resetFields: () => {
        set({ fields: {} })
      }
    }),
    {
      name: 'form-fields-storage',
    }
  )
)
