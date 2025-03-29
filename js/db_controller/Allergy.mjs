import dayjs from 'dayjs';
//import { Allergy } from '../types/Allergy.mjs';
import { closeDb, openDb, selectItems, deleteItem, updateItem, insertItem} from "../async_db_handler.mjs"

function mapToAllergy(row) {
    return row.allergy
}

export async function getAllergies(condition = null, columns = ["*"], params = []) {
    let db;
    try {
        db = await openDb();
        const allergies = await selectItems(db, "Allergy",condition,columns,params);
        return allergies.map(mapToAllergy);
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}

export async function getAllergyByUsername(username) {
    let db;
    try {
        db = await openDb();
        return selectItems(db, "Allergy", "username = ?", ["*"], [username])
            .then(rows => {
                if (rows.length === 0) {
                    Promise.reject(new Error(`Allergies of username ${username} not found`));
                }
                return rows.map(mapToAllergy);
                
            })
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}

export async function deleteAllergyByUsername(username,allergy) {
    let db;
    try {
        db = await openDb();
        return deleteItem(db, "Allergy", "username = ? AND allergy = ? ", [username,allergy]);
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}

export async function updateAllergy(updateColumns, condition, values) {
    let db;
    try {
        db = await openDb();
        return await updateItem(db, "Allergy", updateColumns, condition, values);
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}

export async function insertAllergy(username, allergy) {
    let db;
    try {
        db = await openDb();
        console.log("Database aperto correttamente"); // DEBUG

        const result = await insertItem(db, "Allergy", ["username", "allergy"], [username, allergy]);

        console.log("Risultato inserimento allergia:", result); // DEBUG
        return result;
    } catch (error) {
        console.error("Errore durante l'inserimento dell'allergia:", error); // LOG ERROR
        throw error; // IMPORTANTE: rethrow per farlo gestire nel controller
    } finally {
        if (db) {
            await closeDb(db);
            console.log("Database chiuso correttamente"); // DEBUG
        }
    }
}

export async function checkUserExists(username) {
    let db;
    try {
        db = await openDb();
        const rows = await selectItems(db, "User", "username = ?", ["username"], [username]);

        return rows.length > 0;
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}

