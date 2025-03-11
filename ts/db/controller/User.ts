import { User } from '../../types/User';
import sqlite from 'sqlite3';
import { dbAllAsync } from '../async_sqlite';
import { getCart } from './Cart';
import { Bag } from '../../types/Bag';
import { getReservations } from './Reservation';
import { getAllergies } from './Allergy';

export async function getUsernames(db: sqlite.Database): Promise<string[]> {
    const sql = `
        SELECT username FROM User
    `
    return dbAllAsync(db, sql, []).then((rows) => rows.map((row) => row.username)
    )
}

export async function getUser(db: sqlite.Database, username: string): Promise<User> {
    const cart = await getCart(db, username)
    const reserved = await getReservations(db, username)
    const allergies = await getAllergies(db, username)

    return new User(username, true, cart, reserved, allergies)
}

