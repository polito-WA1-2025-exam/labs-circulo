import sqlite from 'sqlite3'
import { dbAllAsync } from '../async_sqlite'

export async function getAllergies(db: sqlite.Database, username: string): Promise<string[]> {
    const sql = `
        SELECT allergy FROM Allergy
        WHERE username = ?
    `
    return dbAllAsync(db, sql, [username])
        .then((rows) => {
            return rows.map((row) => {
                return row.allergy
            })
        })
}