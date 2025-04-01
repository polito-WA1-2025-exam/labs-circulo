import { dbAllAsync, openDb, closeDb, selectItems, updateItem, deleteItem, insertItem} from "../async_db_handler.mjs";
import { Bag } from "../types/Bag.mjs";
import { Cart } from "../types/Cart.mjs";
import { CartItem } from "../types/CartItem.mjs";
import dayjs from "dayjs";

// Mappa una riga del database in un oggetto CartItem
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
        row.specialRequest
    );
}

// Recupera tutti i carrelli
export async function getCarts() {
    const sql = `
        SELECT * 
        FROM Cart c, Bag b
        WHERE c.bagId = b.bagId
    `;

    let db;
    try {
        db = await openDb();
        const rows = await dbAllAsync(db, sql, []);

        if (rows.length === 0) {
            console.log("Nessun cart trovato nel database.");
            return []; // Restituisce un array vuoto se non ci sono risultati
        }

        // Mappa le righe in oggetti CartItem
        const cartItems = rows.map(mapToCartItem);
        return new Cart(cartItems);
    }catch (error) {
        console.error("Errore in getCarts:", error);
        return [];
    }
    finally {
        if (db) {
            await closeDb(db);
        }
    }
}

// Recupera il carrello di un utente specifico
export async function getCart(username) {
    const sql = `
        SELECT * 
        FROM Cart c, Bag b
        WHERE c.bagId = b.bagId
        AND username = ?
    `;

    let db;
    try {
        db = await openDb();
        const rows = await dbAllAsync(db, sql, [username]);

        if (rows.length === 0) {
            console.log(`Nessun cart trovato per l'utente: ${username}`);
            return []; // Restituisce un array vuoto se non ci sono carrelli per l'utente
        }

        const cartItems = rows.map(mapToCartItem);
        return new Cart(cartItems);
    }catch (error) {
        console.error("Errore in getCart:", error);
        return [];
    } 
    finally {
        if (db) {
            await closeDb(db);
        }
    }
}

// Elimina un cart di un utente specifico
export async function deleteCart(username, bagID) {
    let db;
    try {
        db = await openDb();

        // Verifica se il carrello esiste prima di procedere con la cancellazione
        const existingCart = await selectItems(db, "Cart", "username = ? AND bagID = ?", ["*"], [username, bagID]);
        if (existingCart.length === 0) {
            console.log(`Nessun cart trovato per l'utente: ${username} con bagID: ${bagID}`);
            return { success: false, error: "Cart non trovato" }; // Restituisce un messaggio d'errore se il carrello non esiste
        }

        await deleteItem(db, "Cart", "username = ? AND bagID = ?", [username, bagID]);
        return { success: true };
    }catch (error) {
        console.error("Errore in deleteCart:", error);
        return { success: false, error: "Errore durante la cancellazione del cart" };
    }        
     finally {
        if (db) {
            await closeDb(db);
        }
    }
}

// Inserisce un nuovo cart
export async function insertCart(cart) {
    let db;
    try {
        db = await openDb();
        const values = Object.values(cart);
        const columns = ['username', 'bagID', 'removedFood1', 'removedFood2', 'specialRequest'];

        await insertItem(db, "Cart", columns, values);
        return { success: true };
    }catch (error) {
        console.error("Errore in insertCart:", error);
        return { success: false, error: "Errore durante l'inserimento del cart" };
    } 
    finally {
        if (db) {
            await closeDb(db);
        }
    }
}

// Aggiorna un carrello esistente
export async function updateCart(updateColumns, condition, values) {
    let db;
    try {
        db = await openDb();
        await updateItem(db, "Cart", updateColumns, condition, values);
        return { success: true };
    }catch (error) {
        console.error("Errore in updateCart:", error);
        return { success: false, error: "Errore durante l'aggiornamento del cart" };
    } 
    finally {
        if (db) {
            await closeDb(db);
        }
    }
}
