import dayjs from "dayjs";
import * as CartController from "../../db_controller/Cart.mjs";
import { Cart } from "../../types/Cart.mjs";

async function test(req, res) {
    res.json({ message: 'Reservation API works just fine' });
}

async function getCarts(req, res) {
    try {
        const carts = await CartController.getCarts();
        res.json(carts);

    } catch (error) {
        res.status(500).json({ error: "Errore nel recupero del carrello: " + error.message });
    }
}


async function getCartByUsername(req, res) {
    try {
        const cart = await CartController.getCart(req.params.username);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: "Errore nel recupero del carrello  : " + error.message });
    }
}


async function deleteCart(req, res) {
    try {
        const result = await CartController.deleteCart(req.params.username,req.params.BagID);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Errore nell'eliminazione del carrello " + error.message });
    }
}


async function insertCart(req, res) {
    try {
        const result = await CartController.insertCart(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Errore nell'inserimento del carrello " + error.message });
    }
}



async function updateCart(req, res) {
    try {
        const { removedFood1, removedFood2, specialRequest } = req.body;
        const username = req.params.username;
        const bagID = req.params.BagID;

        const cart = await CartController.getCart(username);
        if (!cart) return res.status(404).json({ error: "Carrello non trovato" });

        const updateColumns = ["removedFood1", "removedFood2", "specialRequest"]; // Campi da aggiornare
        const conditions = "username = ? AND bagID = ?"; // Condizione per trovare il carrello
        const values = [removedFood1, removedFood2, specialRequest, username, bagID]; // Nuovi valori

        // Aggiorna il carrello
        const result = await CartController.updateCart(updateColumns, conditions, values);
        res.json({ message: "Carrello aggiornato con successo!", result });

    } catch (error) {
        res.status(500).json({ error: "Errore nell'aggiornamento del carrello " + error.message });
    }
}




export default{
    test,
    getCarts,
    getCartByUsername,
    deleteCart,
    insertCart,
    updateCart
}