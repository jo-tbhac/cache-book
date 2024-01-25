import * as SQLite from 'expo-sqlite'

import { Method } from '@/types/methods'

export const getMethods = (db: SQLite.SQLiteDatabase) => {
  const query = 'SELECT * FROM methods'

  return new Promise<Method[]>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(query, [], (_, result) => {
          const items: Method[] = result.rows._array
          resolve(items)
        })
      },
      (error) => {
        reject(error)
      }
    )
  })
}

export const insertMethod = (db: SQLite.SQLiteDatabase, values: { name: string }) => {
  const query = 'INSERT INTO methods (name) VALUES (?)'

  return new Promise<Method>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(query, [values.name], (_, result) => {
          if (result.insertId) {
            const insertedItem: Method = { ...values, id: result.insertId }
            resolve(insertedItem)
          } else {
            reject(new Error('fail to get insertId'))
          }
        })
      },
      (error) => {
        reject(error)
      }
    )
  })
}

export const updateMethod = (db: SQLite.SQLiteDatabase, id: number, values: { name: string }) => {
  const query = 'UPDATE methods SET name = ? WHERE id = ?'

  return new Promise<Method>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(query, [values.name, id], () => {
          const insertedItem: Method = { ...values, id }
          resolve(insertedItem)
        })
      },
      (error) => {
        reject(error)
      }
    )
  })
}

export const deleteMethod = (db: SQLite.SQLiteDatabase, id: number) => {
  const query = 'DELETE FROM methods WHERE id = ?'

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
