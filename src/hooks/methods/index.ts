import { useCallback } from 'react'

import { useDb } from '@/db'
import { deleteMethod, getMethods, insertMethod, updateMethod } from '@/query/methods'

export const useGetMethods = () => {
  const db = useDb()

  return useCallback(() => {
    if (db == null) {
      return Promise.reject()
    }
    return getMethods(db)
  }, [db])
}

export const useInsertMethod = () => {
  const db = useDb()

  return useCallback(
    (values: { name: string }) => {
      if (db == null) {
        return Promise.reject()
      }
      return insertMethod(db, values)
    },
    [db]
  )
}

export const useUpdateMethod = () => {
  const db = useDb()

  return useCallback(
    (id: number, values: { name: string }) => {
      if (db == null) {
        return Promise.reject()
      }
      return updateMethod(db, id, values)
    },
    [db]
  )
}

export const useDeleteMethod = () => {
  const db = useDb()

  return useCallback(
    (id: number) => {
      if (db == null) {
        return Promise.reject()
      }
      return deleteMethod(db, id)
    },
    [db]
  )
}
