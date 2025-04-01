import { openDb, closeDb, selectItems, insertItem, deleteItem, updateItem } from "../async_db_handler.mjs";
import { Bag } from "../types/Bag.mjs";
import dayjs from "dayjs";
import { Reservation } from "../types/Reservation.mjs";

const columns = ["username", "bagID"];

// Mappa una riga del database a un oggetto Bag
function mapToReservation(row) {
    return new Reservation(
        row.username,
        row.bagID,
    );
}

// Recupera tutte le prenotazioni
export async function getReservations(condition = null, selectedColumns = ["*"], params = []) {
    let db;
    try {
        db = await openDb();
        const reservations = await selectItems(db, "Reservation", condition, selectedColumns, params);
        console.log("Prenotazioni trovate:", reservations);
        return reservations.length > 0 ? reservations.map(mapToReservation) : [];
    } catch (error) {
        console.error("Errore nel recupero delle prenotazioni:", error.message);
        return [];
    } finally {
        await closeDb(db);
    }
}

// Recupera le prenotazioni di un utente specifico
export async function getReservationsByUsername(username) {
    let db;
    try {
        db = await openDb();
        const rows = await selectItems(db, "Reservation", "username = ?", ["bagID"], [username]);
        console.log(`Prenotazioni trovate per username ${username}:`, rows);
        if (rows.length === 0) {
            console.log(`Nessuna prenotazione trovata per username: ${username}`);
            return [];
        }

        return rows.map(row => row.bagID);

    } catch (error) {
        console.error("Errore nel recupero delle prenotazioni per l'utente:", error.message);
        return [];
    } finally {
        await closeDb(db);
    }
}

// Inserisce una prenotazione
export async function insertReservation(username, bagID) {
    let db;
    try {
        db = await openDb();
        await insertItem(db, "Reservation", columns, [username, bagID]);
        return {success: true};
    } catch (error) {
        console.error("Errore nell'inserimento della prenotazione:", error.message);
        return {success: false, error: error.message};
    } finally {
        await closeDb(db);
    }
}

// Elimina una prenotazione
export async function deleteReservationByBagID(username, bagID) {
    let db;
    try {
        db = await openDb();
        await deleteItem(db, "Reservation", "username = ? AND bagID = ?", [username, bagID]);
        return { success: true };
    } catch (error) {
        console.error("Errore nella cancellazione della prenotazione:", error.message);
        return { success: false, error: error.message };
    } finally {
        await closeDb(db);
    }
}

// Aggiorna una prenotazione
export async function updateReservation(updateColumns, condition, values) {
    let db;
    try {
        db = await openDb();
        await updateItem(db, "Reservation", updateColumns, condition, values);
        return { success: true };
    } catch (error) {
        console.error("Errore nell'aggiornamento della prenotazione:", error.message);
        return { success: false, error: error.message };
    } finally {
        await closeDb(db);
    }
}

// Funzione per verificare se l'utente esiste
export async function checkUserExists(username) {
    let db;
    try {
        db = await openDb();
        const rows = await selectItems(db, "User", "username = ?", ["username"], [username]);
        return rows.length > 0;  // Ritorna true se l'utente esiste
    } catch (error) {
        console.error("Errore nella verifica dell'utente:", error.message);
        return false;  // In caso di errore, restituisci false
    } finally {
        await closeDb(db);
    }
}

// Funzione per verificare se la borsa (bag) esiste
export async function checkBagExists(bagID) {
    let db;
    try {
        db = await openDb();
        const rows = await selectItems(db, "Bag", "bagID = ?", ["bagID"], [bagID]);
        return rows.length > 0;  // Ritorna true se la borsa esiste
    } catch (error) {
        console.error("Errore nella verifica della borsa:", error.message);
        return false;  // In caso di errore, restituisci false
    } finally {
        await closeDb(db);
    }
}

