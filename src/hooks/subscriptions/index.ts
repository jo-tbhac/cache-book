import { useCallback } from 'react'

import { useDb } from '@/db'
import {
  deleteSubscription,
  getSubscription,
  getSubscriptions,
  insertSubscription,
  updateSubscription
} from '@/query/subscriptions'
import { Subscription } from '@/types/subscriptions'

export const useGetSubscriptions = () => {
  const db = useDb()

  return useCallback(() => {
    if (db == null) {
      return Promise.reject()
    }
    return getSubscriptions(db)
  }, [db])
}

export const useGetSubscription = () => {
  const db = useDb()

  return useCallback(
    (id: number) => {
      if (db == null) {
        return Promise.reject()
      }
      return getSubscription(db, id)
    },
    [db]
  )
}

export const useInsertSubscription = () => {
  const db = useDb()

  return useCallback(
    (values: Omit<Subscription, 'id'>) => {
      if (db == null) {
        return Promise.reject()
      }
      return insertSubscription(db, values)
    },
    [db]
  )
}

export const useUpdateSubscription = () => {
  const db = useDb()

  return useCallback(
    (id: number, values: Omit<Subscription, 'id'>) => {
      if (db == null) {
        return Promise.reject()
      }
      return updateSubscription(db, id, values)
    },
    [db]
  )
}

export const useDeleteSubscription = () => {
  const db = useDb()

  return useCallback(
    (id: number) => {
      if (db == null) {
        return Promise.reject()
      }
      return deleteSubscription(db, id)
    },
    [db]
  )
}
