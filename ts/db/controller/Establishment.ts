import sqlite from 'sqlite3'
import { Establishment } from '../../types/Establishment'
import { dbAllAsync } from '../async_sqlite'


export async function getEstablishments(db: sqlite.Database): Promise<Establishment[]> {
    const sql = `
        SELECT * FROM Establishment
    `
    return dbAllAsync(db, sql, [])
        .then((rows) => {
            return rows.map((row) => {
                return new Establishment(
                    row.establishmentID,
                    row.name,
                    row.address,
                    row.phone,
                    row.email,
                    row.openTime,
                    row.closeTime
                )
            })
        })
}