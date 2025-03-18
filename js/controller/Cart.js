import { dbAllAsync, openDb, closeDb } from "../async_db_handler.mjs";
import { Bag } from "../types/Bag";
import { Cart } from "../types/Cart";
import { CartItem } from "../types/CartItem";
import dayjs from "dayjs";

function mapToCartItem(row) {
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
        row.specialRequests
    )
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
