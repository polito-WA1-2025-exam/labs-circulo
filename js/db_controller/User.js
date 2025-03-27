import { openDb, closeDb, selectItems, deleteItem, insertItem, updateItem } from '../async_db_handler.mjs';
import { User } from '../types/User.js';
import { getReservations } from './Reservation';
import { getCart } from './Cart';
import { getAllergies } from './Allergy';

const columns = ["username", "name", "password"]
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
    } finally {
        await closeDb(db);
    }
}


export async function deleteUser(username) {
    let db;
    try {
        db = await openDb();
        return deleteItem(db, "User", "username = ?", [username]);
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
        return insertItem(db, "User", columns, values);
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}

export async function updateUser(updateColumns, condition, values) {
    let db;
    try{
        db = await openDb();
        return await updateItem(db, "User", updateColumns, condition, values);
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}

