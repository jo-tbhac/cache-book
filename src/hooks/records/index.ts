import { useCallback } from 'react'

import { useDb } from '@/db'
import { deleteRecord, getRecord, getRecordsBy, insertRecord, updateRecord } from '@/query/records'
import { IORecord } from '@/types/records'

export const useGetRecordsBy = () => {
  const db = useDb()

  return useCallback(
    (params: { from: Date; to: Date; categoryId?: number }) => {
      if (db == null) {
        return
      }
      getRecordsBy(db, params)
    },
    [db]
  )
}

export const useGetRecord = () => {
  const db = useDb()

  return useCallback(
    (id: number) => {
      if (db == null) {
        return
      }
      getRecord(db, id)
    },
    [db]
  )
}

export const useInsertRecord = () => {
  const db = useDb()

  return useCallback(
    (values: Omit<IORecord, 'id'>) => {
      if (db == null) {
        return
      }
      insertRecord(db, values)
    },
    [db]
  )
}

export const useUpdateRecord = () => {
  const db = useDb()

  return useCallback(
    (id: number, values: Omit<IORecord, 'id'>) => {
      if (db == null) {
        return
      }
      updateRecord(db, id, values)
    },
    [db]
  )
}

export const useDeleteRecord = () => {
  const db = useDb()

  return useCallback(
    (id: number) => {
      if (db == null) {
        return
      }
      deleteRecord(db, id)
    },
    [db]
  )
}
