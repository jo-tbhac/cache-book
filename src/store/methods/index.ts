import { create } from 'zustand'

import { Method } from '@/types/methods'

import { MethodsState } from './types'

export const useMethods = create<MethodsState>((set) => ({
  fulfilled: false,
  methods: [],
  setMethods: (methods: Method[]) => set({ methods, fulfilled: true }),
  addMethod: (newMethod: Method) => set((state) => ({ methods: [...state.methods, newMethod] })),
  updateMethod: (newMethod: Method) =>
    set((state) => ({
      methods: state.methods.map((method) =>
        method.id === newMethod.id ? { ...method, ...newMethod } : method
      )
    })),
  deleteMethod: (methodId: number) =>
    set((state) => ({
      methods: state.methods.filter((method) => method.id !== methodId)
    }))
}))
