import { User } from '../../types/User';
import sqlite from 'sqlite3';
import { dbAllAsync } from '../async_sqlite';
import { getCart } from './Cart';
import { Bag } from '../../types/Bag';

export async function getUsernames(db: sqlite.Database): Promise<User[]> {
    const sql = `
        SELECT username FROM User
    `
    return dbAllAsync(db, sql, []).then((rows) => {
        return rows
    }
    )
}

export async function getUser(db: sqlite.Database, username: string): Promise<User> {
    const cart = await getCart(db, username)
    const reserved = await getReservations(db, username)
    const allergies = await getAllergies(db, username)

    return new User(username, true, cart, reserved, allergies)
}

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