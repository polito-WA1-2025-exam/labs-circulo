import { openDb, closeDb, selectItems, deleteItem, insertItem, updateItem } from '../async_db_handler.mjs';
import { User } from '../types/User.mjs';
import { getReservationsByUsername } from './Reservation.mjs';
import { getCart } from "./Cart.mjs";
import { getAllergyByUsername } from './Allergy.mjs';

const columns = ["username", "name", "password"];

/**
 * Mappa una riga del database in un oggetto User
 * @param {Object} row - Dati dell'utente dal database
 * @param {Array} cart - Il carrello dell'utente
 * @param {Array} reservations - Le prenotazioni dell'utente
 * @param {Array} allergies - Le allergie dell'utente
 * @returns {User} Un oggetto User completo
 */
async function mapToUser(row) {
    const cart = await getCart(row.username);
    const reservations = await getReservationsByUsername(row.username);
    const allergies = await getAllergyByUsername(row.username);

    return new User(row.username, row.name, true, cart, reservations, allergies);
}

/**
 * Recupera un utente dal database con il suo carrello, prenotazioni e allergie.
 * @param {string} username - Il nome utente da cercare
 * @returns {Promise<User|null>} L'utente trovato o null se non esiste
 */
export async function getUserByUsername(username) {
    let db;
    try {
        db = await openDb();

        const rows = await selectItems(db, "User", "username = ?", ["username", "name"], [username]);
        return rows.length === 0 ? null : mapToUser(rows[0]);
    } catch (error) {
        console.error("Errore in getUser:", error);
        throw error;
    } finally {
        await closeDb(db);
    }
}

/**
 * Recupera tutti gli username dal database.
 * @returns {Promise<string[]>} Una lista di username
 */
export async function getUsernames() {
    let db;
    try {
        db = await openDb();
        const rows = await selectItems(db, "User", null, ["username"], []);
        return rows.length === 0 ? [] : rows.map(row => row.username);
    } catch (error) {
        console.error("Errore in getUsernames:", error);
        return [];
    } finally {
        await closeDb(db);
    }
}

/**
 * Recupera tutti gli user dal database.
 * @returns {Promise<string[]>} Una lista di username
 */
export async function getUsers() {
    let db;
    try {
        db = await openDb();
        
        const rows = await dbAllAsync(db, "SELECT username, name FROM User");

        if (rows.length === 0) {
            console.log("Nessun utente nel db");
            return [];
        }

        const users = await Promise.all(rows.map(async row => mapToUser(row)));

        return users;
    } catch (error) {
        console.error("Errore in getUsers:", error);
        return [];
    } finally {
        if (db) {
            await closeDb(db); // Assicurati di chiudere la connessione al db
        }
    }
}




/**
 * Elimina un utente dal database.
 * @param {string} username - Il nome utente da eliminare
 * @returns {Promise<boolean>} True se l'operazione ha successo
 */
export async function deleteUser(username) {
    let db;
    try {
        db = await openDb();
        await deleteItem(db, "User", "username = ?", [username]);
        return {success:true};
    } catch (error) {
        console.error("Errore in deleteUser:", error);
        return {success:false, error: error.message};
    } finally {
        await closeDb(db);
    }
}

/**
 * Inserisce un nuovo utente nel database.
 * @param {User} user - L'oggetto utente da inserire
 * @returns {Promise<boolean>} True se l'operazione ha successo
 */
export async function insertUser(user) {
    let db;
    try {
        db = await openDb();
        await insertItem(db, "User", columns, [user.username, user.name, user.password]);
        return { success: true }
    } catch (error) {
        console.error("Errore in insertUser:", error);
        return { success: false, error: error.message }; 
    } finally {
        await closeDb(db);
    }
}

/**
 * Aggiorna i dati di un utente nel database.
 * @param {string[]} updateColumns - Colonne da aggiornare
 * @param {string} condition - Condizione WHERE
 * @param {Array} values - Valori da aggiornare
 * @returns {Promise<boolean>} True se l'operazione ha successo
 */
export async function updateUser(updateColumns, condition, values) {
    let db;
    try {
        db = await openDb();
        await updateItem(db, "User", updateColumns, condition, values);
        return {success:true};
    } catch (error) {
        console.error("Errore in updateUser:", error);
        return {success:false, error: error.message};
    } finally {
        await closeDb(db);
    }
}
