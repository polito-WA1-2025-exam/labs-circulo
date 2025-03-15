import sqlite from "sqlite3"

const db = new sqlite.Database("db/food.sqlite", (err) => {
    if(err) throw err  })

export function getItems(tableName){
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM ${tableName}`
        db.all(sql, [], (err, rows) => {
            if(err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}

export function getItemsWithCondition(tableName, condition, params=[]){
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM ${tableName} WHERE ${condition}`
        db.all(sql, params, (err, rows) => {
            if(err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}

function insertItem(table, columns, values) {
    return new Promise((resolve, reject) => {
        
        const placeholders = columns.map(() => '?').join(', ');
        const sql = `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`;

        db.run(sql, values, function(err) {
            if (err) {
                reject(`Errore nell'inserire il record nella tabella ${table}: ${err.message}`);
            } else {
                resolve(`Record aggiunto con successo nella tabella ${table}!`);
            }
        });
    });
}

function deleteItem(tableName, primaryKeyValue) {
    return new Promise((resolve, reject) => {
        let primaryKeyColumn;
        
        switch (tableName) {
            case 'User':
                primaryKeyColumn = ['username'];
                break;
            case 'Allergy':
                primaryKeyColumn = ['username','allergy'];
                break;
            case 'Reservation':
                primaryKeyColumn = ['username','bagID'];  
                break;
            case 'Establishment':
                primaryKeyColumn = 'establishmentID';  
                break;
            case 'Cart':
                primaryKeyColumn = ['username','bagID'];  
                break;
            case 'BagContent':
                primaryKeyColumn = ['bagID','foodName'];  
                break;
            case 'Bag':
                primaryKeyColumn = ['bagID'];
                break;
            default:
                return reject('Tabella non presente');
        }

        const sql = `DELETE FROM ${tableName} WHERE ${primaryKeyColumn.map(column => `${column} = ?`).join(' AND ')}`;

        db.run(sql, [primaryKeyValue], function(err) {
            if (err) {
                reject('Errore nell\'eliminare il record: ' + err.message);
            } else {
                if (this.changes > 0) {
                    resolve(`Record eliminato con successo dalla tabella ${tableName}!`);
                } else {
                    reject('Nessun record trovato con il valore della chiave primaria fornito.');
                }
            }
        });
    });
}

function updateItem(tableName, updates, primaryKeyValues) {
    return new Promise((resolve, reject) => {
        let primaryKeyColumn;
        
        switch (tableName) {
            case 'User':
                primaryKeyColumn = ['username'];
                break;
            case 'Allergy':
                primaryKeyColumn = ['username','allergy'];
                break;
            case 'Reservation':
                primaryKeyColumn = ['username','bagID'];  
                break;
            case 'Establishment':
                primaryKeyColumn = 'establishmentID';  
                break;
            case 'Cart':
                primaryKeyColumn = ['username','bagID'];  
                break;
            case 'BagContent':
                primaryKeyColumn = ['bagID','foodName'];  
                break;
            case 'Bag':
                primaryKeyColumn = ['bagID'];
                break;
            default:
                return reject('Tabella non presente');
        }

        // Creazione della query di aggiornamento dinamica
        const columnsToUpdate = Object.keys(updates);  // Estrai i nomi delle colonne da aggiornare
        const setClause = columnsToUpdate.map(column => `${column} = ?`).join(', ');  // Crea la parte SET della query

        const sql = `UPDATE ${tableName} SET ${setClause} WHERE ${primaryKeyColumn.map(column => `${column} = ?`).join(' AND ')}`;

        // Combina i valori da aggiornare con i valori della chiave primaria
        const params = [...Object.values(updates), ...primaryKeyValues];

        db.run(sql, params, function(err) {
            if (err) {
                reject('Errore nell\'aggiornare il record: ' + err.message);
            } else {
                if (this.changes > 0) {
                    resolve(`Record aggiornato con successo nella tabella ${tableName}!`);
                } else {
                    reject('Nessun record trovato con i valori della chiave primaria forniti.');
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