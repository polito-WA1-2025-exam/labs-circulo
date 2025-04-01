import dayjs from "dayjs";
import * as CartController from "../../db_controller/Cart.mjs";
import { Cart } from "../../types/Cart.mjs";

async function test(req, res) {
    res.json({ message: 'Reservation API works just fine' });
}

async function getCarts(req, res) {
    try {
        const carts = await CartController.getCarts();
        if (!carts || carts.length === 0) {
            return res.status(404).json({success:false,  error: "Nessun carrello trovato nel database" });
        }
        res.json(carts);

    } catch (error) {
        res.status(500).json({success:false, error: "Errore nel recupero del carrello: " + error.message });
    }
}


async function getCartByUsername(req, res) {
    try {
        const cart = await CartController.getCart(req.params.username);
        if(!cart || cart.length === 0) {
            return res.status(404).json({success:false, error: "Carrello non trovato" });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({success:false,  error: "Errore nel recupero del carrello  : " + error.message });
    }
}


async function deleteCart(req, res) {
    try {
        const result = await CartController.deleteCart(req.params.username,req.params.BagID);
        if (!result.success) {
            return res.status(404).json({success:false,  error: result.error || `Carrello con username ${req.params.username} non trovato` });
        }
        res.json({success:true, message: "Carrello eliminato con successo!" });
    } catch (error) {
        res.status(500).json({success:false, error: "Errore nell'eliminazione del carrello " + error.message });
    }
}


async function insertCart(req, res) {
    try {
        const result = await CartController.insertCart(req.body);
        if (!result.success) {
            return res.status(404).json({success:false, error: result.error || `Carrello con username ${req.params.username} non trovato` });
        }
        res.json({success:true,  message: "Carrello inserito con successo!" });
    } catch (error) {
        res.status(500).json({success:false, error: "Errore nell'inserimento del carrello " + error.message });
    }
}



async function updateCart(req, res) {
    try {
        const { removedFood1, removedFood2, specialRequest } = req.body;
        const username = req.params.username;
        const bagID = req.params.BagID;

        const cart = await CartController.getCart(username);
        if (!cart) return res.status(404).json({success:false,  error: "Carrello non trovato" });

        const updateColumns = ["removedFood1", "removedFood2", "specialRequest"]; // Campi da aggiornare
        const conditions = "username = ? AND bagID = ?"; // Condizione per trovare il carrello
        const values = [removedFood1, removedFood2, specialRequest, username, bagID]; // Nuovi valori

        // Aggiorna il carrello
        const result = await CartController.updateCart(updateColumns, conditions, values);
        if (!result.success) {
            return res.status(404).json({success:false, error: result.error || `Carrello con username ${username} non trovato` });
        }
        res.json({success:true, message: "Carrello aggiornato con successo!" });

    } catch (error) {
        res.status(500).json({success:false,  error: "Errore nell'aggiornamento del carrello " + error.message });
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