import dayjs from 'dayjs';
import { Bag } from '../types/Bag.mjs';
import { closeDb, deleteItem, insertItem, openDb, selectItems, updateItem } from '../async_db_handler.mjs';

const columns = ["type", "price", "startTime", "endTime", "status", "establishmentID"];

// Function to map a database row to a Bag object
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
//da provare anche in caso genearle
export async function getBags(condition = null, columns = ["*"], params = []) {
    let db;
    try {
        db = await openDb();
        return selectItems(db, "Bag", condition, columns, params)
            .then((rows) => rows.map(mapToBag));
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}


// Fetch a specific bag by its ID
/**
 * Retrieves a bag from the database based on the provided bag ID.
 *
 * @param {number} bagId - The unique identifier of the bag to retrieve.
 * @returns {Promise<Bag>} A promise that resolves to the bag object if found, or null if not found.
 * @throws {Error} If there is an issue opening or closing the database.
 */
export async function getBagById(bagId) {
    let db;
    try {
        db = await openDb();
        return selectItems(db, "Bag", "bagID = ?", ["*"], [bagId])
            .then(rows => {
                if (rows.length === 0) {
                    Promise.reject(new Error(`Bag with ID ${bagId} not found`));
                }

                return rows[0];
            })
            .then(row => mapToBag(row));
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
        return selectItems(db, "Bag", "establishmentID = ?", ["*"], [establishmentId])
            .then((rows) => rows.map(mapToBag));
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
        return selectItems(db, "Bag", "status = ?", ["*"], ["disponibile"])
            .then((rows) => rows.map(mapToBag));
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}

// Fetch all available bags for a specific establishment
/**
 * Retrieves the available bags for a specific establishment.
 *
 * @param {number} establishmentId - The ID of the establishment to filter bags by.
 * @returns {Promise<Array>} A promise that resolves to an array of bag objects.
 * @throws {Error} If there is an issue opening or closing the database.
 */
export async function getAvailableBagsByEstablishment(establishmentId) {
    let db;
    try {
        db = await openDb();
        return selectItems(db, "Bag", "status = ? AND establishmentID = ?", ["*"], ["disponibile", establishmentId])
            .then((rows) => rows.map(mapToBag));
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
        return selectItems(db, "Bag", "status = ?", ["*"], ["riservato"])
            .then((rows) => rows.map(mapToBag));
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}

// Fetch all available bags starting from a specific datetime
/**
 * Retrieves available bags from the database starting from a specific date and time.
 *
 * @param {dayjs.Dayjs} datetime - The number of days to calculate the starting date and time.
 *                            This value is used to determine the datetime in the format "YYYY-MM-DD HH:mm:ss".
 * @returns {Promise<Array<Bag>>} A promise that resolves to an array of available bags mapped to their respective objects.
 * @throws {Error} If there is an issue opening or closing the database connection.
 */
export async function getAvailableBagsFromDateTime(datetime) {
    let db;
    try {
        db = await openDb();
        return selectItems(db, "Bag", "status = ? AND startTime >= ?", ["*"], ["disponibile", datetime.format("YYYY-MM-DD HH:mm:ss")])
            .then((rows) => rows.map(mapToBag));
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}

export async function deleteBagWithId(bagId) {
    let db;
    try {
        db = await openDb();
        return deleteItem(db, "Bag", "bagID = ?", [bagId]);
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}

export async function insertBag(bag) {
    let db;
    try {
        db = await openDb();
        const values = Object.values(bag);

        return await insertItem(db, "Bag", columns, values);
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}

export async function updateBag(updateColumns, condition, values) {
    let db;
    try{
        db = await openDb();
        return await updateItem(db, "Bag", updateColumns, condition, values);
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}