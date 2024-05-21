import camelcaseKeys from 'camelcase-keys'
import * as SQLite from 'expo-sqlite/legacy'

import { Subscription } from '@/types/subscriptions'

export const getSubscriptions = (db: SQLite.SQLiteDatabase) => {
  const query = 'SELECT * FROM subscriptions'

  return new Promise<Subscription[]>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(query, [], (_, result) => {
          const items = camelcaseKeys(result.rows._array, { deep: true })
          resolve(items)
        })
      },
      (error) => {
        reject(error)
      }
    )
  })
}

export const getSubscription = (db: SQLite.SQLiteDatabase, id: number) => {
  const query = 'SELECT * FROM subscriptions WHERE id = ?'

  return new Promise<Subscription | null>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(query, [id], (_, result) => {
          const item = result.rows._array[0]
          if (item) {
            const camelizedItem = camelcaseKeys(item, { deep: true })
            return resolve(camelizedItem)
          }

          return resolve(null)
        })
      },
      (error) => {
        reject(error)
      }
    )
  })
}

export const insertSubscription = (db: SQLite.SQLiteDatabase, values: Omit<Subscription, 'id'>) => {
  const query = `
    INSERT INTO subscriptions (name, value, category_id, method_id)
    VALUES (?, ?, ?, ?)`

  return new Promise<Subscription>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          query,
          [values.name, values.value, values.categoryId || '', values.methodId],
          (_, result) => {
            if (result.insertId) {
              const insertedItem: Subscription = { ...values, id: result.insertId }
              resolve(insertedItem)
            } else {
              reject(new Error('fail to get insertId'))
            }
          }
        )
      },
      (error) => {
        reject(error)
      }
    )
  })
}

export const updateSubscription = (
  db: SQLite.SQLiteDatabase,
  id: number,
  values: Omit<Subscription, 'id'>
) => {
  const query = `
    UPDATE subscriptions
    SET name = ?, value = ?, category_id = ?, method_id = ?
    WHERE id = ?`

  return new Promise<Subscription>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          query,
          [values.name, values.value, values.categoryId || '', values.methodId, id],
          () => {
            const insertedItem: Subscription = { ...values, id }
            resolve(insertedItem)
          }
        )
      },
      (error) => {
        reject(error)
      }
    )
  })
}

export const deleteSubscription = (db: SQLite.SQLiteDatabase, id: number) => {
  const query = 'DELETE FROM subscriptions WHERE id = ?'

  return new Promise<number>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(query, [id], () => {
          resolve(id)
        })
      },
      (error) => {
        reject(error)
      }
    )
  })
}
