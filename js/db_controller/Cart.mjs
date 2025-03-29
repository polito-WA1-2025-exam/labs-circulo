import { dbAllAsync, openDb, closeDb, selectItems, updateItem, deleteItem, insertItem} from "../async_db_handler.mjs";
import { Bag } from "../types/Bag.mjs";
import { Cart } from "../types/Cart.mjs";
import { CartItem } from "../types/CartItem.mjs";
import dayjs from "dayjs";

function mapToCartItem(row) {
    //console.log(row.specialRequests);
    return new CartItem(
        new Bag(
            row.bagID,
            row.type,
            row.price,
            dayjs(row.startTime),
            dayjs(row.endTime),
            row.status,
            row.establishmentID
        ),
        [row.removedFood1, row.removedFood2].filter((food) => food !== null),
        row.specialRequest
    )
}


export async function getCarts() {
    const sql = `
        SELECT * 
        FROM Cart c, Bag b
        WHERE c.bagId = b.bagId
    `;

    let db;
    try {
        // Open the database connection
        db = await openDb();

        // Fetch rows from the database using the provided query and username
        const rows = await dbAllAsync(db, sql, []);

        console.log(rows);


        // Map each row to a CartItem object
        const cartItems = rows.map(mapToCartItem);

        // Return a new Cart object containing the cart items
        return new Cart(cartItems);
    } finally {
        // Ensure the database connection is closed
        if (db) {
            await closeDb(db);
        }
    }

}

/**
 * Retrieves the cart for a specific user from the database.
 * 
 * @param {string} username - The username of the user whose cart is being retrieved.
 * @returns {Promise<Cart>} - A promise that resolves to a Cart object containing the user's cart items.
 */
export async function getCart(username) {
    const sql = `
        SELECT * 
        FROM Cart c, Bag b
        WHERE c.bagId = b.bagId
        AND username = ?
    `;

    let db;
    try {
        // Open the database connection
        db = await openDb();

        // Fetch rows from the database using the provided query and username
        const rows = await dbAllAsync(db, sql, [username]);

        console.log(rows);


        // Map each row to a CartItem object
        const cartItems = rows.map(mapToCartItem);

        // Return a new Cart object containing the cart items
        return new Cart(cartItems);
    } finally {
        // Ensure the database connection is closed
        if (db) {
            await closeDb(db);
        }
    }

}


export async function deleteCart(username,bagID) {
    let db;
    try {
        db = await openDb();
        return deleteItem(db, "Cart", "username = ? AND bagID = ? ", [username,bagID]);
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}


export async function insertCart(cart) {
    let db;
    try {
        db = await openDb();
        const values = Object.values(cart);

        const columns = ['username', 'bagID', 'removedFood1', 'removedFood2', 'specialRequest'];

        return await insertItem(db, "Cart", columns, values);
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}

export async function updateCart(updateColumns, condition, values) {
    let db;
    try {
        db = await openDb();
        return await updateItem(db, "Cart", updateColumns, condition, values);
    } finally {
        if (db) {
            await closeDb(db);
        }
    }
}

