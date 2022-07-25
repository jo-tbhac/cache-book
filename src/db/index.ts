import * as SQLite from 'expo-sqlite';

const openDatabase = () => {
  const db = SQLite.openDatabase('cache-book');
  return db;
};

const db = openDatabase();

export const getDB = () => db;
