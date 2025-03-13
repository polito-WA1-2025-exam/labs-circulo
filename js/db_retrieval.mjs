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

