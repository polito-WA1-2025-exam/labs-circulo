import sqlite from "sqlite3";
import path from 'path';

/**
 * Opens a SQLite database.
 * @param {string} filename - The name of the database file.
 * @returns {Promise<sqlite.Database>} A promise that resolves to the database instance.
 */
export async function openDb(filename = "db\\food_copy.sqlite") {
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

/**
 * Closes a SQLite database.
 * @param {sqlite.Database} db - The database instance to close.
 * @returns {Promise<void>} A promise that resolves when the database is closed.
 */
export async function closeDb(db) {
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

/**
 * Executes an SQL query and retrieves all rows.
 * @param {sqlite.Database} db - The database instance.
 * @param {string} sql - The SQL query to execute.
 * @param {any[]} params - The parameters for the SQL query.
 * @returns {Promise<any[]>} A promise that resolves to the rows retrieved.
 */
export function dbAllAsync(db, sql, params) {
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

/**
 * Executes an SQL query and retrieves a single row.
 * @param {sqlite.Database} db - The database instance.
 * @param {string} sql - The SQL query to execute.
 * @param {any[]} params - The parameters for the SQL query.
 * @returns {Promise<any>} A promise that resolves to the row retrieved.
 */
export function dbGetAsync(db, sql, params) {
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

/**
 * Executes an SQL query without returning any rows.
 * @param {sqlite.Database} db - The database instance.
 * @param {string} sql - The SQL query to execute.
 * @param {any[]} params - The parameters for the SQL query.
 * @returns {Promise<void>} A promise that resolves when the query is executed.
 */
export function dbRunAsync(db, sql, params) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

/**
 * Begins a transaction.
 * @param {sqlite.Database} db - The database instance.
 * @returns {Promise<void>} A promise that resolves when the transaction begins.
 */
export function beginTransactionAsync(db) {
    return dbRunAsync(db, "BEGIN TRANSACTION", []);
}

/**
 * Commits a transaction.
 * @param {sqlite.Database} db - The database instance.
 * @returns {Promise<void>} A promise that resolves when the transaction is committed.
 */
export function commitAsync(db) {
    return dbRunAsync(db, "COMMIT", []);
}

/**
 * Rolls back a transaction.
 * @param {sqlite.Database} db - The database instance.
 * @returns {Promise<void>} A promise that resolves when the transaction is rolled back.
 */
export function rollbackAsync(db) {
    return dbRunAsync(db, "ROLLBACK", []);
}

/**
 * Esegue una query SQL sulla tabella specificata, basata sull'operazione richiesta (SELECT, INSERT, DELETE, UPDATE).
 *
 * @param {sqlite.Database} db - L'istanza del database SQLite.
 * @param {string} table - Il nome della tabella su cui eseguire l'operazione.
 * @param {string} operation - L'operazione da eseguire.
 * @param {string|null} condition - La condizione da applicare nelle operazioni SELECT, DELETE o UPDATE. 
 *                                  Usato per la clausola WHERE. Se non serve una condizione, può essere passato `null`.
 * @param {array|null} columns - Un array di nomi delle colonne da usare nell'operazione.
 * @param {array} params - I parametri da passare alla query SQL.
 * @returns {Promise} Una Promise che restituisce i risultati dell'operazione (rows) o un messaggio di successo/errore.
 */
export async function executeQuery(db, table, operation, condition = null, columns = [], params = []) {
    switch (operation) {
        case "SELECT":
            return await selectItems(db, table, condition, columns, params);

        case "INSERT":
            return await insertItem(db, table, columns, params);

        case "DELETE":
            return await deleteItem(db, table, condition, params);

        case "UPDATE":
            return await updateItem(db, table, columns, condition, params);

        default:
            return "Operation not supported";
    }
}

/**
 * Selects items from a specified table in the database.
 *
 * @param {sqlite.Database} db - L'istanza del database SQLite.
 * @param {string} tableName - The name of the table to query.
 * @param {string|null} [condition=null] - The optional SQL condition to filter the results.
 * @param {Array} [columns] - The columns to select.
 * @param {Array} [params=[]] - The parameters to bind to the SQL query placeholders.
 * @returns {Promise<Array>} A promise that resolves to an array of rows matching the query.
 */
export function selectItems(db, tableName, condition = null, columns = ["*"], params = []) {
    //console.log(db);console.log(tableName);console.log(condition);console.log(columns);console.log(params);
    return new Promise((resolve, reject) => {
        const sql = `SELECT ${columns.join(", ")} FROM ${tableName}` + (condition ? ` WHERE ${condition}` : "");

        db.all(sql, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

/**
 * Inserts a new record into the specified table in the database.
 *
 * @param {sqlite.Database} db - L'istanza del database SQLite.
 * @param {string} table - The name of the table where the record will be inserted.
 * @param {string[]} columns - An array of column names where the values will be inserted.
 * @param {any[]} params - An array of values corresponding to the columns to be inserted.
 * @returns {Promise<string>} A promise that resolves with a success message if the record is inserted successfully.
 */
export function insertItem(db, table, columns=[], params=[]) {
    return new Promise((resolve, reject) => {
        const placeholders = columns.map(() => "?").join(", ");
        const sql = `INSERT INTO ${table} (${columns.join(", ")}) VALUES (${placeholders})`;

        db.run(sql, params, function (err) {
            if (err) {
                reject(`Errore nell'inserire il record nella tabella ${table}: ${err.message}`);
            } else {
                resolve(`Record aggiunto con successo nella tabella ${table}!`);
            }
        });
    });
}

/**
 * Deletes a record from the specified table in the database based on the given condition.
 *
 * @param {sqlite.Database} db - L'istanza del database SQLite.
 * @param {string} tableName - The name of the table from which the record should be deleted.
 * @param {string} condition - The SQL condition to identify the record(s) to delete.
 * @param {Array} [params=[]] - Optional array of parameters to bind to the SQL query.
 * @returns {Promise<string>} A promise that resolves with a success message if the record is deleted.
 */
export function deleteItem(db, tableName, condition, params = []) {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM ${tableName} WHERE ${condition}`;

        db.run(sql, params, function (err) {
            if (err) {
                reject("Errore nell'eliminare il record: " + err.message);
            } else {
                if (this.changes > 0) {
                    resolve(`Record eliminato con successo dalla tabella ${tableName}!`);
                } else {
                    reject("Nessun record trovato con la condizione fornita.");
                }
            }
        });
    });
}

/**
 * Updates a record in the specified table with the given columns and condition.
 *
 * @param {sqlite.Database} db - L'istanza del database SQLite.
 * @param {string} tableName - The name of the table where the record will be updated.
 * @param {string[]} columns - An array of column names to be updated.
 * @param {string} condition - The SQL condition to identify the record(s) to update.
 * @param {any[]} [params=[]] - An optional array of values to bind to the SQL query placeholders.
 * @returns {Promise<string>} A promise that resolves with a success message if the record is updated.
 */
export function updateItem(db, tableName, columns, condition, params = []) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(columns)) {
            // Se columns non è un array, trasformalo in un array
            columns = [columns];
        }
        
        const sql = `UPDATE ${tableName} SET ${columns.map(col => `${col} = ?`).join(", ")} WHERE ${condition}`;

        db.run(sql, params, function (err) {
            if (err) {
                reject("Errore nell'aggiornare il record: " + err.message);
            } else {
                if (this.changes > 0) {
                    resolve(`Record aggiornato con successo nella tabella ${tableName}!`);
                } else {
                    reject("Nessun record trovato con la condizione fornita.");
                }
            }
        });
    });
}
