import dayjs from "dayjs";
import * as ReservationController from "../../db_controller/Reservation.mjs";

async function test(req, res) {
    res.json({ message: 'Reservation API works just fine' });
}

async function getReservations(req, res) {
    try {
        const reservations = await ReservationController.getReservations();
        if (reservations.length === 0) {
            return res.status(404).json({success:false, error: "Nessuna prenotazione trovata" });
        }
        res.json(reservations);
    } catch (error) {
        res.status(500).json({success:false, error: "Errore nel recupero delle prenotazioni: " + error.message });
    }
}

async function getReservationsByUsername(req, res) {
    try {
        const reservations = await ReservationController.getReservationsByUsername(req.params.username);
        if (reservations.length === 0) {
            return res.status(404).json({success:false, error: `Nessuna prenotazione trovata per l'utente '${req.params.username}'` });
        }
        res.json(reservations);
    } catch (error) {
        res.status(500).json({success:false, error: "Errore nel recupero delle prenotazioni per l'utente: " + error.message });
    }
}

async function insertReservation(req, res) {
    try {
        const { username } = req.params;
        const { bagID } = req.body;

        // Controllo se il parametro bagID è fornito
        if (!bagID) {
            return res.status(400).json({success:false, error: "BagId non fornita" });
        }

        const userExists = await ReservationController.checkUserExists(username);
        if (!userExists) {
            return res.status(404).json({success:false, error: `Lo username '${username}' non esiste nel database` });
        }

        const bagExists = await ReservationController.checkBagExists(bagID);
        if (!bagExists) {
            return res.status(404).json({success:false, error: `La Bag '${bagID}' non esiste nel database` });
        }
        
        const result = await ReservationController.insertReservation(username, bagID);
        if (!result) {
            return res.status(500).json({success:false, error: "Errore nell'inserimento della prenotazione. Nessun risultato restituito." });
        }

        res.json({success:true, message: "Prenotazione inserita con successo!" });
    } catch (error) {
        res.status(500).json({success:false, error: "Errore nell'inserimento della prenotazione: " + error.message });
    }
}

async function deleteReservationByBagID(req, res) {
    try {
        const { username, BagID } = req.params;

        // Controllo che i parametri siano forniti
        if (!username || !BagID) {
            return res.status(400).json({ error: "Username o BagID non forniti" });
        }

        const result = await ReservationController.deleteReservationByBagID(username, BagID);
        if (result.success) {
            return res.json({success:true, message: "Prenotazione eliminata con successo!" });
        } else {
            return res.status(404).json({success:false, error: "Errore nell'eliminazione della prenotazione: "+error.message });
        }
    } catch (error) {
        res.status(500).json({success:false, error: "Errore nell'eliminazione della prenotazione: " + error.message });
    }
}

async function updateReservation(req, res) {
    try {
        console.log("Body ricevuto:", req.body);
        console.log("Params ricevuti:", req.params);

        const { bagID } = req.body;
        const { username, oldBagID } = req.params;

        // Controllo che siano forniti i parametri necessari
        if (!bagID || !oldBagID) {
            return res.status(400).json({ error: "BagID o oldBagID non forniti" });
        }

        const updateColumns = ["bagID"];  // Colonna da aggiornare
        const condition = "username = ? AND bagID = ?";  // Condizione per identificare la prenotazione
        const values = [bagID, username, oldBagID];  // Nuovo valore e parametri per la condizione

        const result = await ReservationController.updateReservation(updateColumns, condition, values);
        if (result.success) {
            return res.json({success:true, message: "Prenotazione aggiornata con successo!", });
        } else {
            return res.status(404).json({success:false, error: "Errore nell'aggiornamento della prenotazione" });
        }

    } catch (error) {
        res.status(500).json({success:false, error: "Errore nell'aggiornamento della prenotazione: " + error.message });
    }
}

export default {
    test,
    getReservations,
    getReservationsByUsername,
    insertReservation,
    deleteReservationByBagID,
    updateReservation
};
