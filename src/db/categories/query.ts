import { getDB } from '@db/index';
import { Category } from '@store/categories/types';

export const CREATE_CATEGORIES_TABLE = `
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
  )`;

export const getCategories = () => {
  const query = 'SELECT * FROM categories';
  const db = getDB();

  return new Promise<Category[]>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(query, [], (_, result) => {
          // eslint-disable-next-line no-underscore-dangle
          const items: Category[] = result.rows._array;
          resolve(items);
        });
      },
      (error) => {
        reject(error);
      },
    );
  });
};

export const insertCategory = (values: { name: string }) => {
  const query = 'INSERT INTO categories (name) VALUES (?)';
  const db = getDB();

  return new Promise<Category>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          query,
          [values.name],
          (_, result) => {
            if (result.insertId) {
              const insertedItem: Category = { ...values, id: result.insertId };
              resolve(insertedItem);
            } else {
              reject(new Error('fail to get insertId'));
            }
          },
        );
      },
      (error) => {
        reject(error);
      },
    );
  });
};

export const updateCategory = (id: number, values: { name: string }) => {
  const query = 'UPDATE categories SET name = ? WHERE id = ?';
  const db = getDB();

  return new Promise<Category>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          query,
          [values.name, id],
          () => {
            const insertedItem: Category = { ...values, id };
            resolve(insertedItem);
          },
        );
      },
      (error) => {
        reject(error);
      },
    );
  });
};

export const deleteCategory = (id: number) => {
  const query = 'DELETE FROM categories WHERE id = ?';
  const db = getDB();

  return new Promise<number>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          query,
          [id],
          () => {
            resolve(id);
          },
        );
      },
      (error) => {
        reject(error);
      },
    );
  });
};
