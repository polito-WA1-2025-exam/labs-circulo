import { closeDb, openDb, selectItems } from "../async_db_handler.mjs"

function mapToAllergy(row) {
    return row.allergy
}
    

export async function getAllergies(username) {
    let db;
    try {
        db = await openDb();
        const allergies = await selectItems(db, "Allergy", "username = ?", ["*"], [username]);
        return allergies.map(mapToAllergy);
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}