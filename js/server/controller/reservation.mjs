import dayjs from "dayjs";
import * as ReservationController from "../../db_controller/Reservation.mjs";

async function test(req, res) {
    res.json({ message: 'Reservation API works just fine' });
}


async function getReservations(req, res) {
    try {
        const reservations = await ReservationController.getReservations();
        res.json(reservations);

    } catch (error) {
        res.status(500).json({ error: "Errore nel recupero delle prenotazioni: " + error.message });
    }
}

async function getReservationsByUsername(req, res) {
    try {
        const reservations = await ReservationController.getReservationsByUsername(req.params.username);
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: "Errore nel recupero della prenotazione : " + error.message });
    }
}


async function insertReservation(req, res) {
    try {
        const { username } = req.params;
        const { bagID } = req.body;

        if(!bagID){
            return res.status(400).json({error: "BagId non fornita"});
        }

        const userExists = await ReservationController.checkUserExists(username);
        if (!userExists) {
            return res.status(404).json({ error: `Lo username '${username}' non esiste nel database` });
        }

        const bagExists = await ReservationController.checkBagExists(bagID);
        if (!bagExists) {
            return res.status(404).json({ error: `La Bag '${bagID}' non esiste nel database` });
        }
        
        const result = await ReservationController.insertReservation(username, bagID);
        res.json({ message: "Prenotazione inserita con successo!", result });
    } catch (error) {
        res.status(500).json({ error: "Errore nell'inserimento della prenotazione " + error.message });
    }
}

async function deleteReservationByBagID(req, res) {
    try {
        const result = await ReservationController.deleteReservationByBagID(req.params.username,req.params.BagID);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Errore nell'eliminazione della prenotazione " + error.message });
    }
}




async function updateReservation(req, res) {
    try {

        console.log("Body ricevuto:", req.body);
        console.log("Params ricevuti:", req.params);
        
        const { bagID } = req.body;
        const { username, oldBagID } = req.params;

        if (!bagID) {
            return res.status(400).json({ error: "Nuova BagID non fornita" });
        }

        const updateColumns = ["bagID"];  // Colonna da aggiornare
        const condition = "username = ? AND bagID = ?";  // Condizione per identificare l'allergia
        const values = [bagID, username, oldBagID];  // Nuovo valore e parametri per la condizione

        const result = await ReservationController.updateReservation(updateColumns, condition, values);
        res.json({ message: "Prenotazione aggiornata con successo!", result });

    } catch (error) {
        res.status(500).json({ error: "Errore nell'aggiornamento della prenotazione " + error.message });
    }
}



export default{
    test,
    getReservations,
    getReservationsByUsername,
    insertReservation,
    deleteReservationByBagID,
    updateReservation
}