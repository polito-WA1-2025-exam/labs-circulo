import { dbAllAsync, openDb, closeDb } from "../async_db_handler.mjs";
import { Bag } from "../types/Bag"
import dayjs from "dayjs";


function mapToBag(row) {
    return new Bag(
        row.bagID,
        row.type,
        row.price,
        dayjs(row.startTime),
        dayjs(row.endTime),
        row.status,
        row.establishmentID
    )
}

/**
 * Retrieves reservations associated with a specific username.
 *
 * @async
 * @function getReservations
 * @param {string} username - The username for which to fetch reservations.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of bag objects.
 * @throws {Error} Throws an error if there is an issue with the database operation.
 */
export async function getReservations(username) {
    const sql = `
        SELECT Bag.* 
        FROM Reservation, Bag
        WHERE username = ?
    `
    let db;
    try{
        db = await openDb();
        const bags = await dbAllAsync(db, sql, []);
        return bags.map(mapToBag);
    } finally {
        if (db) {
            await closeDb(db);
        }
    }

}