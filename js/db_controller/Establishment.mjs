import { selectItems, insertItem, updateItem, deleteItem } from "../async_db_handler.mjs";
import { openDb, closeDb } from "../async_db_handler.mjs";
import { Establishment } from "../types/Establishment.mjs";
import { getBagsByEstablishment } from "./Bag.mjs"; 

const columns = ["name", "type", "address", "phone", "toc"];

// Mappa una riga del database a un oggetto Establishment
async function mapToEstablishment(row) {
    const bags = await getBagsByEstablishment(row.establishmentID);
    return new Establishment(
        row.establishmentID,
        row.name,
        row.type,
        row.address,
        row.phone,
        row.toc,
        bags
    );
}

/**
 * Retrieves a list of establishments from the database.
 *
 * @async
 * @function getEstablishments
 * @returns {Promise<Array<Establishment>>} A promise that resolves to the selected establishments.
 */
export async function getEstablishments() {
    let db;  // Usa `let` invece di `const` per permettere la ri-assegnazione
    try {
        db = await openDb();
        const rows = await selectItems(db, "Establishment", null, ["*"], []);

        if (rows.length === 0) {
            console.log("Nessuno stabilimento nel db");
            return [];
        }

        // Aspetta che tutte le Promise si risolvano
        const res = await Promise.all(rows.map(async row => mapToEstablishment(row)));

        return res;
    } catch (error) {
        console.error("Errore nel recupero degli stabilimenti:", error.message);
        return [];  // Restituisce un array vuoto in caso di errore
    } finally {
        if (db) {
            await closeDb(db);  // Assicurati di chiudere il db
        }
    }
}


export async function getEstablishmentById(establishmentId) {
    let db;
    try {
        db = await openDb();
        const rows = await selectItems(db, "Establishment", "establishmentID = ?", ["*"], [establishmentId]);
        return rows.length === 0 ? null : mapToEstablishment(rows[0]); // Restituisci null se non viene trovata la borsa
    } catch (error) {
        console.error("Errore nel recupero dello stabilimento:", error.message);
        return null; // Restituisci null in caso di errore
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}

export async function getEstablishmentsByType(type) {
    let db;
    try {
        db = await openDb();
        const rows = await selectItems(db, "Establishment", "type = ?", ["*"], [type]);

        if (rows.length === 0) {
            return [];
        }
        const res = await Promise.all(rows.map(async row => mapToEstablishment(row)));
        return res

    } catch (error) {
        console.error("Errore nel recupero dello stabilimento:", error.message);
        return [];
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}


// Delete an establishment by its ID
export async function deleteEstablishmentWithId(establishmentID) {
    let db;
    try {
        db = await openDb();
        await deleteItem(db, "Establishment", "establishmentID = ?", [establishmentID]);
        return { success: true }; // Restituisci un oggetto che indica successo
    } catch (error) {
        console.error("Errore nell'eliminazione dello stabilimento:", error.message);
        return { success: false, error: error.message }; // Restituisci un oggetto che indica errore
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}


// Insert a new establishment into the database
export async function insertEstablishment(establishment) {
    let db;
    try {
        db = await openDb();
        const values = Object.values(establishment);  // Estrai i valori dal corpo dell'oggetto
        await insertItem(db, "Establishment", columns, values);
        return { success: true }; // Restituisci un oggetto che indica successo
    } catch (error) {
        console.error("Errore nell'inserimento dello stabilimento:", error.message);
        return { success: false, error: error.message }; // Restituisci un oggetto che indica errore
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}


// Update an establishment in the database
export async function updateEstablishment(updateColumns, condition, values) {
    let db;
    try {
        db = await openDb();
        await updateItem(db, "Establishment", updateColumns, condition, values);
        return { success: true }; // Restituisci un oggetto che indica successo
    } catch (error) {
        console.error("Errore nell'aggiornamento dello stabilimento:", error.message);
        return { success: false, error: error.message }; // Restituisci un oggetto che indica errore
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}
