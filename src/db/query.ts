import * as SQLite from 'expo-sqlite';
import { CREATE_CATEGORIES_TABLE } from '@db/categories/query';
import { CREATE_METHODS_TABLE } from '@db/methods/query';
import { CREATE_RECORDS_TABLE } from '@db/records/query';
import { getDB } from '@db/index';

export const createTable = () => {
  const db = getDB();
  const promise: Promise<void | SQLite.SQLError> = new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(CREATE_CATEGORIES_TABLE);
        tx.executeSql(CREATE_METHODS_TABLE);
        tx.executeSql(CREATE_RECORDS_TABLE);
      },
      (error: SQLite.SQLError) => {
        reject(error);
      },
      resolve,
    );
  });

  return promise;
};
