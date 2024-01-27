import { Method } from '@/types/methods'

export interface MethodsState {
  methods: Method[]
  fulfilled: boolean
  setMethods: (methods: Method[]) => void
  addMethod: (method: Method) => void
  updateMethod: (method: Method) => void
  deleteMethod: (methodId: number) => void
}
