import sqlite from 'sqlite3';
import { CartItem } from '../../types/CartItem';
import { dbAllAsync } from '../async_sqlite';
import { Bag } from '../../types/Bag';
import dayjs from 'dayjs';
import { Cart } from '../../types/Cart';

export async function getCart(db: sqlite.Database, username: string): Promise<Cart> {
    const sql = `
        SELECT * 
        FROM Cart c, Bag b
        WHERE c.bagId = b.bagId
        AND username = ?

    `
    return dbAllAsync(db, sql, [username])
        .then((rows) => {
            return rows.map((row) => {
                return new CartItem(
                    new Bag(
                        row.bagID,
                        row.type,
                        row.price,
                        dayjs(row.startTime),
                        dayjs(row.endTime),
                        row.status,
                        row.establishmentID
                    ),
                    [row.removedFood1, row.removedFood2].filter((food) => food !== null),
                    row.specialRequests)
            })
        })
        .then((cartItems) => {
            return new Cart(cartItems)
        })
}