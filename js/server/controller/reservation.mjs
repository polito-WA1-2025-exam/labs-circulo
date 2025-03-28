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
        const { newBagId } = req.body;

        if(!newBagId){
            return res.status(400).json({error: "BagId non fornita"});
        }

        const userExists = await ReservationController.checkUserExists(username);
        if (!userExists) {
            return res.status(404).json({ error: `Lo username '${username}' non esiste nel database` });
        }

        const bagExists = await ReservationController.checkBagExists(newBagId);
        if (!bagExists) {
            return res.status(404).json({ error: `La Bag '${newBagId}' non esiste nel database` });
        }
        
        const result = await ReservationController.insertReservation(username, newBagId);
        res.json({ message: "Prenotazione inserita con successo!", result });
    } catch (error) {
        res.status(500).json({ error: "Errore nell'inserimento della prenotazione " + error.message });
    }
}


/*
async function deleteAllergyByUsername(req, res) {
    try {
        const result = await AllergyController.deleteAllergyByUsername(req.params.username,req.params.allergy);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Errore nell'eliminazione dell'allergia " + error.message });
    }
}

async function updateAllergy(req, res) {
    try {
        const { newAllergy } = req.body;
        const { username, oldAllergy } = req.params;

        if (!newAllergy) {
            return res.status(400).json({ error: "Nuova allergia non fornita" });
        }

        // I parametri da passare a updateAllergy
        const updateColumns = ["allergy"];  // Colonna da aggiornare
        const condition = "username = ? AND allergy = ?";  // Condizione per identificare l'allergia
        const values = [newAllergy, username, oldAllergy];  // Nuovo valore e parametri per la condizione

        const result = await AllergyController.updateAllergy(updateColumns, condition, values);
        res.json({ message: "Allergia aggiornata con successo!", result });

    } catch (error) {
        res.status(500).json({ error: "Errore nell'aggiornamento dell'allergia " + error.message });
    }
}


*/


export default{
    test,
    getReservations,
    getReservationsByUsername,
    insertReservation,
}