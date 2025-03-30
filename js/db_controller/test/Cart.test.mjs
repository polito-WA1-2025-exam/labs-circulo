import { Cart } from "../../types/Cart";
import { CartItem } from "../../types/CartItem";
import { getCart, insertCart, deleteCart, updateCart } from "../Cart";

describe("Cart", () => {
    // Test per recuperare il carrello di un utente
    test("getCart", async () => {
        const cart = await getCart("mario_rossi");

        expect(cart).toBeInstanceOf(Cart);
        expect(cart.cartItems.length).toBeGreaterThan(0);
        expect(cart.cartItems[0]).toBeInstanceOf(CartItem);
    });

    // Test per inserire un elemento nel carrello
    test("insertCart", async () => {
        const newCart = {
            username: "test_user",
            bagID: 106, // Assicurati che questo ID esista nel database
            removedFood1: "gluten",
            removedFood2: null,
            specialRequest: "none",
        };
    
        const result = await insertCart(newCart);
        expect(result).toBeTruthy();
    
        const insertedCart = await getCart("test_user");
        expect(insertedCart).toBeInstanceOf(Cart);
        expect(insertedCart.cartItems.length).toBeGreaterThan(0);
    
        const specificCartItem = insertedCart.cartItems.find(item => item.bag.bagID === 106);
        expect(specificCartItem).toBeDefined();
        expect(specificCartItem.removedFood).toContain("gluten");
        expect(specificCartItem.specialRequests).toBe("none");
    });
    
    
    

    // Test per eliminare un elemento dal carrello
    test("deleteCart", async () => {
        // Assumiamo che nel database ci sia già un carrello per test_user con bagID 101
        const bagID = 106; // Usa un ID valido esistente
    
        // Eliminiamo il carrello per test_user e il bagID specifico
        const result = await deleteCart("test_user", bagID);
        expect(result).toBeTruthy();
    
        // Controlliamo che il carrello sia stato effettivamente rimosso
        const cartAfterDelete = await getCart("test_user");
        
        // Verifichiamo che nessun cartItem abbia ancora il bagID eliminato
        const specificCartItem = cartAfterDelete.cartItems.find(item => item.bag.bagID === bagID);
        expect(specificCartItem).toBeUndefined();
    });
    

    // Test per aggiornare un elemento nel carrello
    test("updateCart", async () => {
        const bagID = 106; // Assicurati che questo ID esista
        
        // 1. Verifica se il carrello esiste prima di aggiornarlo
        const existingCart = await getCart("test_user");
        const existingItem = existingCart.cartItems.find(
            (item) => item.bag.bagID === bagID
        );
    
        if (!existingItem) {
            // Se non esiste, lo inseriamo prima di aggiornarlo
            const newCart = {
                username: "test_user",
                bagID: bagID,
                removedFood1: "gluten",
                removedFood2: null,
                specialRequest: "none",
            };
            await insertCart(newCart);
        }
    
        // 2. Ora possiamo aggiornare il carrello
        const updateColumns = ["removedFood1", "removedFood2", "specialRequest"];
        const condition = "username = ? AND bagID = ?";
        const values = ["peanuts", null, "extra request", "test_user", bagID];
    
        const result = await updateCart(updateColumns, condition, values);
        expect(result).toBeTruthy();
    
        // 3. Verifica che i dati siano stati aggiornati correttamente
        const updatedCart = await getCart("test_user");
        const updatedItem = updatedCart.cartItems.find(
            (item) => item.bag.bagID === bagID
        );
    
        expect(updatedItem).toBeDefined();
        expect(updatedItem.removedFood).toContain("peanuts");
        expect(updatedItem.specialRequests).toBe("extra request");
    });
    
    
});