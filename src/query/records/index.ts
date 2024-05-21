import camelcaseKeys from 'camelcase-keys'
import * as SQLite from 'expo-sqlite/legacy'

import { IORecord } from '@/types/records'

export const getRecordsBy = (
  db: SQLite.SQLiteDatabase,
  { from, to, categoryId }: { from: Date; to: Date; categoryId?: number }
) => {
  const { query, args } = (() => {
    const baseQuery = ['SELECT * FROM records WHERE date BETWEEN ? AND ? ORDER BY date ASC']
    const baseArgs: (string | number)[] = [from.toISOString(), to.toISOString()]

    if (categoryId) {
      baseQuery.push('AND category_id = ?')
      baseArgs.push(categoryId)
    }

    return { query: baseQuery.join(' '), args: baseArgs }
  })()

  return new Promise<IORecord[]>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(query, args, (_, result) => {
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

export const getRecord = (db: SQLite.SQLiteDatabase, id: number) => {
  const query = 'SELECT * FROM records WHERE id = ?'

  return new Promise<IORecord | null>((resolve, reject) => {
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

export const insertRecord = (db: SQLite.SQLiteDatabase, values: Omit<IORecord, 'id'>) => {
  const query = `
    INSERT INTO records (name, value, type, date, category_id, method_id)
    VALUES (?, ?, ?, ?, ?, ?)`

  return new Promise<IORecord>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          query,
          [
            values.name,
            values.value,
            values.type,
            values.date,
            values.categoryId || '',
            values.methodId
          ],
          (_, result) => {
            if (result.insertId) {
              const insertedItem: IORecord = { ...values, id: result.insertId }
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

export const insertRecords = (db: SQLite.SQLiteDatabase, values: Array<Omit<IORecord, 'id'>>) => {
  const query = `
    INSERT INTO records (name, value, type, date, category_id, method_id)
    VALUES ${Array.from({ length: values.length }, () => '(?, ?, ?, ?, ?, ?)').join(',')}`

  const args = values
    .flatMap((value) => [
      value.name,
      value.value,
      value.type,
      value.date,
      value.categoryId || '',
      value.methodId
    ])
    .flat()

  return new Promise<{ rowsAffected: number }>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(query, args, (_, result) => {
          resolve({ rowsAffected: result.rowsAffected })
        })
      },
      (error) => {
        reject(error)
      }
    )
  })
}

export const updateRecord = (
  db: SQLite.SQLiteDatabase,
  id: number,
  values: Omit<IORecord, 'id'>
) => {
  const query = `
    UPDATE records
    SET name = ?, value = ?, type = ?, date = ?, category_id = ?, method_id = ?
    WHERE id = ?`

  return new Promise<IORecord>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          query,
          [
            values.name,
            values.value,
            values.type,
            values.date,
            values.categoryId || '',
            values.methodId,
            id
          ],
          () => {
            const insertedItem: IORecord = { ...values, id }
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

export const deleteRecord = (db: SQLite.SQLiteDatabase, id: number) => {
  const query = 'DELETE FROM records WHERE id = ?'

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
