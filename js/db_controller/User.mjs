import { openDb, closeDb, selectItems, deleteItem, insertItem, updateItem } from '../async_db_handler.mjs';
import { User } from '../types/User.mjs';
import { getReservations } from './Reservation.mjs';
import { getCart } from "./Cart.mjs";
import { getAllergies } from './Allergy.mjs';

const columns = ["username", "name", "password"];

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
    } catch (error) {
        console.error("Error in getUsernames:", error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

export async function getUser(username) {
    let db;
    try {
        db = await openDb();

        const users = await selectItems(db, "User", "username = ?", ["username", "name"], [username]);
        console.log("Risultato della query:", users);

        if (users.length === 0) {
            console.log(`Nessun utente trovato con username: ${username}`);
            return null;
        }

        const user = users[0]; // Seleziona il primo risultato
        const cart = await getCart(db, username);
        const reserved = await getReservations(db, username);
        const allergies = await getAllergies(db, username);

        return new User(username, user.name, true, cart, reserved, allergies);
    } catch (error) {
        console.error("Error in getUser:", error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

export async function deleteUser(username) {
    let db;
    try {
        db = await openDb();
        return await deleteItem(db, "User", "username = ?", [username]);
    } catch (error) {
        console.error("Error in deleteUser:", error);
        throw error;
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}

export async function insertUser(user) {
    let db;
    try {
        db = await openDb();
        const values = [user.username, user.name, user.password];
        return await insertItem(db, "User", columns, values);
    } catch (error) {
        console.error("Error in insertUser:", error);
        throw new Error(`Errore nell'inserimento dell'utente: ${error.message}`);
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}

export async function updateUser(updateColumns, condition, values) {
    let db;
    try {
        db = await openDb();
        return await updateItem(db, "User", updateColumns, condition, values);
    } catch (error) {
        console.error("Error in updateUser:", error);
        throw error;
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}
