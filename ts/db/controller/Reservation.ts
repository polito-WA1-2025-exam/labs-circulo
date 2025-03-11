import sqlite from 'sqlite3'
import { dbAllAsync } from '../async_sqlite'
import { Bag } from '../../types/Bag'

export async function getReservations(db: sqlite.Database, username: string): Promise<Bag[]> {
    const sql = `
        SELECT Bag.* 
        FROM Reservation, Bag
        WHERE username = ?
    `
     
    return dbAllAsync(db, sql, [username])
        .then((rows) => {
            return rows.map((row) => {
                return new Bag(
                    row.bagID,
                    row.type,
                    row.price,
                    row.startTime,
                    row.endTime,
                    row.status,
                    row.establishmentID
                )
            })
        })
}

