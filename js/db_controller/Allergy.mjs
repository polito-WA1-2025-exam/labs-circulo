import { openDb, closeDb, selectItems, deleteItem, updateItem, insertItem } from "../async_db_handler.mjs";
import { Allergy } from "../types/Allergy.mjs";

const columns = ["username", "allergy"];

// Mappa una riga del database a una stringa di allergia
function mapToAllergy(row) {
    return new Allergy({
        username: row.username,
        allergy: row.allergy,
    });
}

// Recupera tutte le allergie
export async function getAllergies(condition = null, selectedColumns = ["*"], params = []) {
    let db;
    try {
        db = await openDb();
        const allergies = await selectItems(db, "Allergy", condition, selectedColumns, params);
        return allergies.length > 0 ? allergies.map(mapToAllergy) : [];
    } catch (error) {
        console.error("Errore nel recupero delle allergie:", error.message);
        return [];
    } finally {
        await closeDb(db);
    }
}

// Recupera le allergie di un utente specifico
export async function getAllergyByUsername(username) {
    let db;
    try {
        db = await openDb();
        const allergies = await selectItems(db, "Allergy", "username = ?", ["allergy"], [username]);
        
        if (allergies.length === 0) {
            console.log(`Nessuna allergia trovata per username: ${username}`);
            return [];
        }

        return allergies.map(mapToAllergy);
    } catch (error) {
        console.error("Errore nel recupero delle allergie per l'utente:", error.message);
        return [];
    } finally {
        await closeDb(db);
    }
}

// Inserisce una nuova allergia
export async function insertAllergy(username, allergy) {
    let db;
    try {
        db = await openDb();
        await insertItem(db, "Allergy", columns, [username, allergy]);
        return { success: true };
    } catch (error) {
        console.error("Errore nell'inserimento dell'allergia:", error.message);
        return { success: false, error: error.message };
    } finally {
        await closeDb(db);
    }
}

// Elimina un'allergia di un utente
export async function deleteAllergyByUsername(username, allergy) {
    let db;
    try {
        db = await openDb();
        await deleteItem(db, "Allergy", "username = ? AND allergy = ?", [username, allergy]);
        return { success: true };
    } catch (error) {
        console.error("Errore nella cancellazione dell'allergia:", error.message);
        return { success: false, error: error.message };
    } finally {
        await closeDb(db);
    }
}

// Aggiorna un'allergia
export async function updateAllergy(updateColumns, condition, values) {
    let db;
    try {
        db = await openDb();
        await updateItem(db, "Allergy", updateColumns, condition, values);
        return { success: true };
    } catch (error) {
        console.error("Errore nell'aggiornamento dell'allergia:", error.message);
        return { success: false, error: error.message };
    } finally {
        await closeDb(db);
    }
}

// Controlla se un utente esiste
export async function checkUserExists(username) {
    let db;
    try {
        db = await openDb();
        const rows = await selectItems(db, "User", "username = ?", ["username"], [username]);
        return rows.length > 0;
    } catch (error) {
        console.error("Errore nella verifica dell'utente:", error.message);
        return false;
    } finally {
        await closeDb(db);
    }
}
