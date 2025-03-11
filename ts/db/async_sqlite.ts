import sqlite from "sqlite3";

export async function openDb(filename: string): Promise<sqlite.Database> {
  return new Promise((resolve, reject) => {
    const db = new sqlite.Database(filename, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(db);
      }
    });
  });
}

export async function closeDb(db: sqlite.Database): Promise<void> {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export function dbAllAsync(
    db: sqlite.Database,
    sql: string,
    params: any[]
    ): Promise<any[]> {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
        if (err) {
            reject(err);
        } else {
            resolve(rows);
        }
        });
    });
}

export function dbGetAsync(
    db: sqlite.Database,
    sql: string,
    params: any[]
    ): Promise<any> {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
        if (err) {
            reject(err);
        } else {
            resolve(row);
        }
        });
    });
}

export function dbRunAsync(
    db: sqlite.Database,
    sql: string,
    params: any[]
    ): Promise<void> {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function(err) {
        if (err) {
            reject(err);
        } else {
            resolve();
        }
        });
    });
}

export function beginTransactionAsync(db: sqlite.Database): Promise<void> {
  return dbRunAsync(db, "BEGIN TRANSACTION", []);
}

export function commitAsync(db: sqlite.Database): Promise<void> {
  return dbRunAsync(db, "COMMIT", []);
}

export function rollbackAsync(db: sqlite.Database): Promise<void> {
  return dbRunAsync(db, "ROLLBACK", []);
}

