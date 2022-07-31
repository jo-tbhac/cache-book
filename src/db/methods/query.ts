import { getDB } from '@db/index';
import { PaymentMethod } from '@store/methods/types';

export const CREATE_METHODS_TABLE = `
  CREATE TABLE IF NOT EXISTS methods (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
  )`;

export const getMethods = () => {
  const query = 'SELECT * FROM methods';
  const db = getDB();

  return new Promise<PaymentMethod[]>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(query, [], (_, result) => {
          // eslint-disable-next-line no-underscore-dangle
          const items: PaymentMethod[] = result.rows._array;
          resolve(items);
        });
      },
      (error) => {
        reject(error);
      },
    );
  });
};

export const insertMethod = (values: { name: string }) => {
  const query = 'INSERT INTO methods (name) VALUES (?)';
  const db = getDB();

  return new Promise<PaymentMethod>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          query,
          [values.name],
          (_, result) => {
            if (result.insertId) {
              const insertedItem: PaymentMethod = { ...values, id: result.insertId };
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

export const updateMethod = (id: number, values: { name: string }) => {
  const query = 'UPDATE methods SET name = ? WHERE id = ?';
  const db = getDB();

  return new Promise<PaymentMethod>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          query,
          [values.name, id],
          () => {
            const insertedItem: PaymentMethod = { ...values, id };
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

export const deleteMethod = (id: number) => {
  const query = 'DELETE FROM methods WHERE id = ?';
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
