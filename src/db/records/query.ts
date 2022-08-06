import camelcaseKeys from 'camelcase-keys';
import { getDB } from '@db/index';
import { IORecord } from '@store/records/types';

export const CREATE_RECORDS_TABLE = `
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
  )`;

export const getRecordsBy = (
  { from, to, categoryId }: { from: Date; to: Date; categoryId?: number },
) => {
  const { query, args } = (() => {
    const baseQuery = ['SELECT * FROM records WHERE date BETWEEN ? AND ? ORDER BY date ASC'];
    const baseArgs: any[] = [from.toISOString(), to.toISOString()];

    if (categoryId) {
      baseQuery.push('AND category_id = ?');
      baseArgs.push(categoryId);
    }

    return { query: baseQuery.join(' '), args: baseArgs };
  })();

  const db = getDB();

  return new Promise<IORecord[]>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(query, args, (_, result) => {
          // eslint-disable-next-line no-underscore-dangle
          const items: IORecord[] = result.rows._array;
          resolve(camelcaseKeys(items, { deep: true }));
        });
      },
      (error) => {
        reject(error);
      },
    );
  });
};

export const getRecord = (id: number) => {
  const query = 'SELECT * FROM records WHERE id = ?';
  const db = getDB();

  return new Promise<IORecord | null>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(query, [id], (_, result) => {
          // eslint-disable-next-line no-underscore-dangle
          const item: IORecord = result.rows._array[0];
          if (item) {
            return resolve(camelcaseKeys(item, { deep: true }));
          }

          return resolve(null);
        });
      },
      (error) => {
        reject(error);
      },
    );
  });
};

export const insertRecord = (values: Omit<IORecord, 'id'>) => {
  const query = `
    INSERT INTO records (name, value, type, date, category_id, method_id)
    VALUES (?, ?, ?, ?, ?, ?)`;

  const db = getDB();

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
          ],
          (_, result) => {
            if (result.insertId) {
              const insertedItem: IORecord = { ...values, id: result.insertId };
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

export const updateRecord = (id: number, values: Omit<IORecord, 'id'>) => {
  const query = `
    UPDATE records
    SET name = ?, value = ?, type = ?, date = ?, category_id = ?, method_id = ?
    WHERE id = ?`;

  const db = getDB();

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
            id,
          ],
          () => {
            const insertedItem: IORecord = { ...values, id };
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

