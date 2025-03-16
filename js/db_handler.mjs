import sqlite from "sqlite3"

const db = new sqlite.Database("db/food_copy.sqlite", (err) => {
    if (err) throw err
})

export function selectItems(tableName, condition = null, params = []) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM ${tableName}`;

        if (condition) {
            sql += ` WHERE ${condition}`;
        }

        db.all(sql, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

export function insertItem(table, columns, params) {
    return new Promise((resolve, reject) => {

        const placeholders = columns.map(() => '?').join(', ');
        const sql = `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`;

        db.run(sql, params, function (err) {
            if (err) {
                reject(`Errore nell'inserire il record nella tabella ${table}: ${err.message}`);
            } else {
                resolve(`Record aggiunto con successo nella tabella ${table}!`);
            }
        });
    });
}

export function deleteItem(tableName, condition, params = []) {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM ${tableName} WHERE ${condition}`;

        db.run(sql, params, function (err) {
            if (err) {
                reject('Errore nell\'eliminare il record: ' + err.message);
            } else {
                if (this.changes > 0) {
                    resolve(`Record eliminato con successo dalla tabella ${tableName}!`);
                } else {
                    reject('Nessun record trovato con la condizione fornita.');
                }
            }
        });
    });
}


export function updateItem(tableName, columns, condition, params = []) {
    return new Promise((resolve, reject) => {

        const sql = `UPDATE ${tableName} SET ${columns.map(col => `${col} = ?`).join(', ')} WHERE ${condition}`;

        // const queryParams = [...values, ...conditionValues];

        db.run(sql, params, function (err) {
            if (err) {
                reject('Errore nell\'aggiornare il record: ' + err.message);
            } else {
                if (this.changes > 0) {
                    resolve(`Record aggiornato con successo nella tabella ${tableName}!`);
                } else {
                    reject('Nessun record trovato con la condizione fornita.');
                }
            }
        });
    });
}





/*insertItem('User', ['username', 'name', 'password'], ['michi', 'michi care', 'password124'])
    .then(message => {
        console.log(message);
    })
    .catch(error => {
        console.error(error); 
    });
*/

/*
deleteItem('User', 'michi') 
    .then(message => {
        console.log(message); 
    })
    .catch(error => {
        console.error(error);  
    });
*/
/*
updateItem('User', { name: 'John Updated', password: 'newPassword123' }, ['john_doe'])  // Passa i nuovi valori e la chiave primaria
    .then(message => {
        console.log(message);  // Messaggio di successo
    })
    .catch(error => {
        console.error(error);  // Messaggio di errore
    });
*/