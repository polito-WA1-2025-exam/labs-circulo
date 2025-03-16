import dayjs from 'dayjs';
import { Bag } from '../types/Bag';
import { closeDb, openDb, selectItems } from '../async_db_handler.mjs';

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
export async function getBags() {
    let db;
    try {
        db = await openDb();
        return selectItems(db, "Bag", ["*"], null, [])
            .then((rows) => rows.map(mapToBag));
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}

// Fetch a specific bag by its ID
export async function getBag(bagId) {
    let db;
    try {
        db = await openDb();
        return selectItems(db, "Bag", ["*"], "bagID = ?", [bagId])
            .then((rows) => rows.length > 0 ? mapToBag(rows[0]) : null);
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
        return selectItems(db, "Bag", ["*"], "establishmentID = ?", [establishmentId])
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
        return selectItems(db, "Bag", ["*"], "status = ?", ["available"])
            .then((rows) => rows.map(mapToBag));
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
        return selectItems(db, "Bag", ["*"], "status = ? AND establishmentID = ?", ["available", establishmentId])
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
        return selectItems(db, "Bag", ["*"], "status = ?", ["reserved"])
            .then((rows) => rows.map(mapToBag));
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
        return selectItems(db, "Bag", ["*"], "status = ? AND startTime >= ?", ["disponibile", datetime.format("YYYY-MM-DD HH:mm:ss")])
            .then((rows) => rows.map(mapToBag));
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}
