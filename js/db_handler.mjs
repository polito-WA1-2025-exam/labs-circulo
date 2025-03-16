import sqlite from "sqlite3";

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
async function executeQuery(db, table, operation, condition = null, columns = [], params = []) {
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
export function insertItem(db, table, columns, params) {
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
