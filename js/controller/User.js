import { User } from '../types/User';
import { openDb, closeDb, selectItems } from '../async_db_handler.mjs';
import { getCart } from './Cart';
import { getReservations } from './Reservation';
import { getAllergies } from './Allergy';

/**
 * Retrieves a list of usernames from the "User" table in the database.
 *
 * @async
 * @function
 * @returns {Promise<string[]>} A promise that resolves to an array of usernames.
 * @throws {Error} Throws an error if there is an issue opening, querying, or closing the database.
 */
export async function getUsernames() {
    let db;
    try {
        db = await openDb();
        const rows = await selectItems(db, "User", null, ["username"], []);
        return rows.map((row) => row.username);
    } finally {
        await closeDb(db);
    }
}

export async function getUser(username) {
    let db;
    try {
        db = await openDb();
        const cart = await getCart(db, username);
        const reserved = await getReservations(db, username);
        const allergies = await getAllergies(db, username);

        return new User(username, true, cart, reserved, allergies);
    } finally {
        await closeDb(db);
    }
}
