import { useCallback } from 'react'

import { useDb } from '@/db'
import { deleteCategory, getCategories, insertCategory, updateCategory } from '@/query/categories'

export const useGetCategories = () => {
  const db = useDb()

  return useCallback(() => {
    if (db == null) {
      return
    }
    getCategories(db)
  }, [db])
}

export const useInsertCategory = () => {
  const db = useDb()

  return useCallback(
    (values: { name: string }) => {
      if (db == null) {
        return
      }
      insertCategory(db, values)
    },
    [db]
  )
}

export const useUpdateCategory = () => {
  const db = useDb()

  return useCallback(
    (id: number, values: { name: string }) => {
      if (db == null) {
        return
      }
      updateCategory(db, id, values)
    },
    [db]
  )
}

export const useDeleteCategory = () => {
  const db = useDb()

  return useCallback(
    (id: number) => {
      if (db == null) {
        return
      }
      deleteCategory(db, id)
    },
    [db]
  )
}
