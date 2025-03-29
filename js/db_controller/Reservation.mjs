import { dbAllAsync, openDb, closeDb, selectItems, insertItem, deleteItem, updateItem} from "../async_db_handler.mjs";
import { Bag } from "../types/Bag.mjs"
import dayjs from "dayjs";


function mapToBag(row) {
    return new Bag(
        row.bagID,
        row.type,
        row.price,
        dayjs(row.startTime),
        dayjs(row.endTime),
        row.status,
        row.establishmentID
    )
}

/**
 * Retrieves reservations associated with a specific username.
 *
 * @async
 * @function getReservations
 * @param {string} username - The username for which to fetch reservations.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of bag objects.
 * @throws {Error} Throws an error if there is an issue with the database operation.
 */

export async function getReservations(condition = null, columns = ["*"], params = []) {
    let db;
    try {
        db = await openDb();
        const reservations = await selectItems(db, "Reservation",condition,columns,params);
        return reservations.map(mapToBag);
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}

export async function insertReservation(username, bagID) {
    let db;
    try {
        db = await openDb();
        return await insertItem(db, "Reservation", ["username", "bagID"], [username, bagID]);
    } finally {
        if (db) {
            await closeDb(db);
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

export async function checkBagExists(BagId) {
    let db;
    try {
        db = await openDb();
        const rows = await selectItems(db, "Bag", "bagID = ?", ["bagID"], [BagId]);

        return rows.length > 0;
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}

/*
export async function getReservationsByUsername(username) {
    const sql = `
        SELECT Bag.* 
        FROM Reservation, Bag
        WHERE username = ?
    `
    let db;
    try {
        db = await openDb();
        const bags = await dbAllAsync(db, sql, [username]);
        return bags.map(mapToBag);
    } finally {
        if (db) {
            await closeDb(db);
        }
    }

}*/

export async function getReservationsByUsername(username) {
    let db;
    try {
        db = await openDb();
        return selectItems(db, "Reservation", "username = ?", ["*"], [username])
            .then(rows => {
                if (rows.length === 0) {
                    Promise.reject(new Error(`Reservations of username ${username} not found`));
                }
                return rows.map(mapToBag);
                
            })
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}


export async function deleteReservationByBagID(username,bagID) {
    let db;
    try {
        db = await openDb();
        return deleteItem(db, "Reservation", "username = ? AND bagID = ? ", [username,bagID]);
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}


export async function updateReservation(updateColumns, condition, values) {
    let db;
    try {
        db = await openDb();
        return await updateItem(db, "Reservation", updateColumns, condition, values);
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}