import * as SQLite from 'expo-sqlite/legacy'
import { createContext, useContext, useEffect } from 'react'

export const openDatabase = () => {
  const db = SQLite.openDatabase('cache-book')
  return db
}

export const DbContext = createContext<SQLite.SQLiteDatabase | null>(null)
export const useDb = (): SQLite.SQLiteDatabase | null => useContext(DbContext)

export const useCreateTable = (db: SQLite.SQLiteDatabase | null) => {
  useEffect(() => {
    if (db == null) {
      return
    }

    db.transaction((tx) => {
      tx.executeSql(CREATE_CATEGORIES_TABLE)
      tx.executeSql(CREATE_METHODS_TABLE)
      tx.executeSql(CREATE_RECORDS_TABLE)
    })
  }, [db])
}

const CREATE_CATEGORIES_TABLE = `
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
  )`

const CREATE_METHODS_TABLE = `
  CREATE TABLE IF NOT EXISTS methods (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
  )`

const CREATE_RECORDS_TABLE = `
  CREATE TABLE IF NOT EXISTS records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    value INTEGER NOT NULL,
    type TEXT NOT NULL,
    date TEXT NOT NULL,
    category_id INTEGER,
    method_id INTEGER NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE SET NULL,
    FOREIGN KEY (method_id) REFERENCES methods (id) ON DELETE CASCADE
  )`
