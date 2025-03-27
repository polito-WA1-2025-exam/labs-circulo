import { selectItems, insertItem, updateItem, deleteItem } from "../async_db_handler.mjs";
import { openDb, closeDb } from "../async_db_handler.mjs";
import { Establishment } from "../types/Establishment.mjs";

const columns = ["name", "type", "address", "phone", "toc"];

//da sistemare
function mapToEstablishment(row) {
    return new Establishment(
        row.establishmentID,
        row.name,
        row.type,
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

export async function getEstablishmentById(establishmentId) {
    let db;
    try {
        db = await openDb();
        return selectItems(db, "Establishment", "establishmentID = ?", ["*"], [establishmentId])
            .then(rows => {
                if (rows.length === 0) {
                    Promise.reject(new Error(`Establishment with ID ${establishmentId} not found`));
                }

                return rows[0];
            })
            .then(row => mapToEstablishment(row));
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

        return rows.map(row => mapToEstablishment(row));
        
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}


export async function deleteEstablishmentWithId(establishmentID) {
    let db;
    try {
        db = await openDb();
        return deleteItem(db, "Establishment", "establishmentID = ?", [establishmentID]);
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}

export async function insertEstablishment(establishment) {
    let db;
    try {
        db = await openDb();
        const values = Object.values(establishment);

        return await insertItem(db, "Establishment", columns, values);
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}

export async function updateEstablishment(updateColumns, condition, values) {
    let db;
    try{
        db = await openDb();
        return await updateItem(db, "Establishment", updateColumns, condition, values);
    }finally {
        if (db) {
            await closeDb(db);
        }
    }
}