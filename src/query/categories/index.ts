import * as SQLite from 'expo-sqlite/legacy'

import { Category } from '@/types/categories'

export const getCategories = (db: SQLite.SQLiteDatabase) => {
  const query = 'SELECT * FROM categories'

  return new Promise<Category[]>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(query, [], (_, result) => {
          const items: Category[] = result.rows._array
          resolve(items)
        })
      },
      (error) => {
        reject(error)
      }
    )
  })
}

export const insertCategory = (db: SQLite.SQLiteDatabase, values: { name: string }) => {
  const query = 'INSERT INTO categories (name) VALUES (?)'

  return new Promise<Category>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(query, [values.name], (_, result) => {
          if (result.insertId) {
            const insertedItem: Category = { ...values, id: result.insertId }
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

export const updateCategory = (db: SQLite.SQLiteDatabase, id: number, values: { name: string }) => {
  const query = 'UPDATE categories SET name = ? WHERE id = ?'

  return new Promise<Category>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(query, [values.name, id], () => {
          const insertedItem: Category = { ...values, id }
          resolve(insertedItem)
        })
      },
      (error) => {
        reject(error)
      }
    )
  })
}

export const deleteCategory = (db: SQLite.SQLiteDatabase, id: number) => {
  const query = 'DELETE FROM categories WHERE id = ?'

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
