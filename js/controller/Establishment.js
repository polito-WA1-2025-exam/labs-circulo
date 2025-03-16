import { selectItems } from "../async_db_handler.mjs";
import { openDb, closeDb } from "../async_db_handler.mjs";
import { Establishment } from "../types/Establishment.js";



function mapToEstablishment(row) {
    return new Establishment(
        row.establishmentID,
        row.name,
        row.address,
        row.phone,
        row.email,
        row.openTime,
        row.closeTime
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
    const db = await openDb();
    try {
        const items = await selectItems(db, "Establishment", null, ["*"], []);
        return items.map(mapToEstablishment);
    } finally {
        await closeDb(db);
    }
}