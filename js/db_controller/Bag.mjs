import dayjs from 'dayjs';
import { Bag } from '../types/Bag.mjs';
import { closeDb, deleteItem, insertItem, openDb, selectItems, updateItem } from '../async_db_handler.mjs';

const columns = ["type", "price", "startTime", "endTime", "status", "establishmentID"];

// Mappa una riga del database a un oggetto Bag
function mapToBag(row) {
    return new Bag(
        row.bagID,
        row.type,
        row.price,
        dayjs(row.startTime),
        dayjs(row.endTime),
        row.status,
        row.establishmentID
    );
}

// Fetch all bags from the database
export async function getBags(condition = null, columns = ["*"], params = []) {
    let db;
    try {
        db = await openDb();
        const rows = await selectItems(db, "Bag", condition, columns, params);
        return rows.length > 0 ? rows.map(mapToBag) : []; // Restituisci un array vuoto se non ci sono borse
    } catch (error) {
        console.error("Errore nel recupero delle borse:", error.message);
        return []; // Restituisci un array vuoto in caso di errore
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}

// Fetch a specific bag by its ID
export async function getBagById(bagId) {
    let db;
    try {
        db = await openDb();
        const rows = await selectItems(db, "Bag", "bagID = ?", ["*"], [bagId]);
        return rows.length === 0 ? null : mapToBag(rows[0]); // Restituisci null se non viene trovata la borsa
    } catch (error) {
        console.error("Errore nel recupero della borsa:", error.message);
        return null; // Restituisci null in caso di errore
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}

// Fetch all bags for a specific establishment
export async function getBagsByEstablishment(establishmentId) {
    let db;
    try {
        db = await openDb();
        const rows = await selectItems(db, "Bag", "establishmentID = ?", ["*"], [establishmentId]);
        return rows.length > 0 ? rows.map(mapToBag) : []; // Restituisci un array vuoto se non ci sono borse
    } catch (error) {
        console.error("Errore nel recupero delle borse per l'establishment:", error.message);
        return []; // Restituisci un array vuoto in caso di errore
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}

// Fetch all available bags
export async function getAvailableBags() {
    let db;
    try {
        db = await openDb();
        const rows = await selectItems(db, "Bag", "status = ?", ["*"], ["disponibile"]);
        return rows.length > 0 ? rows.map(mapToBag) : []; // Restituisci un array vuoto se non ci sono borse disponibili
    } catch (error) {
        console.error("Errore nel recupero delle borse disponibili:", error.message);
        return []; // Restituisci un array vuoto in caso di errore
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}

// Fetch all available bags for a specific establishment
export async function getAvailableBagsByEstablishment(establishmentId) {
    let db;
    try {
        db = await openDb();
        const rows = await selectItems(db, "Bag", "status = ? AND establishmentID = ?", ["*"], ["disponibile", establishmentId]);
        return rows.length > 0 ? rows.map(mapToBag) : []; // Restituisci un array vuoto se non ci sono borse disponibili per l'establishment
    } catch (error) {
        console.error("Errore nel recupero delle borse disponibili per l'establishment:", error.message);
        return []; // Restituisci un array vuoto in caso di errore
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}

// Fetch all reserved bags
export async function getReservedBags() {
    let db;
    try {
        db = await openDb();
        const rows = await selectItems(db, "Bag", "status = ?", ["*"], ["riservato"]);
        return rows.length > 0 ? rows.map(mapToBag) : []; // Restituisci un array vuoto se non ci sono borse riservate
    } catch (error) {
        console.error("Errore nel recupero delle borse riservate:", error.message);
        return []; // Restituisci un array vuoto in caso di errore
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}

// Fetch all available bags starting from a specific datetime
export async function getAvailableBagsFromDateTime(datetime) {
    let db;
    try {
        db = await openDb();
        const rows = await selectItems(db, "Bag", "status = ? AND startTime >= ?", ["*"], ["disponibile", datetime.format("YYYY-MM-DD HH:mm:ss")]);
        return rows.length > 0 ? rows.map(mapToBag) : []; // Restituisci un array vuoto se non ci sono borse disponibili da quella data
    } catch (error) {
        console.error("Errore nel recupero delle borse disponibili dalla data:", error.message);
        return []; // Restituisci un array vuoto in caso di errore
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}

// Delete a bag by its ID
export async function deleteBagWithId(bagId) {
    let db;
    try {
        db = await openDb();
        await deleteItem(db, "Bag", "bagID = ?", [bagId]);
        return { success: true }; // Restituisci un oggetto che indica successo
    } catch (error) {
        console.error("Errore nell'eliminazione della borsa:", error.message);
        return { success: false, error: error.message }; // Restituisci un oggetto che indica errore
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}

// Insert a new bag into the database
export async function insertBag(bag) {
    let db;
    try {
        db = await openDb();
        const values = Object.values(bag);
        await insertItem(db, "Bag", columns, values);
        return { success: true }; // Restituisci un oggetto che indica successo
    } catch (error) {
        console.error("Errore nell'inserimento della borsa:", error.message);
        return { success: false, error: error.message }; // Restituisci un oggetto che indica errore
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}

// Update a bag in the database
export async function updateBag(updateColumns, condition, values) {
    let db;
    try {
        db = await openDb();
        await updateItem(db, "Bag", updateColumns, condition, values);
        return { success: true }; // Restituisci un oggetto che indica successo
    } catch (error) {
        console.error("Errore nell'aggiornamento della borsa:", error.message);
        return { success: false, error: error.message }; // Restituisci un oggetto che indica errore
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}
