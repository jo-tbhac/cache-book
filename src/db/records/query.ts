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
