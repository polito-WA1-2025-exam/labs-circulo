import dayjs from "dayjs";
import * as AllergyController from "../../db_controller/Allergy.mjs";

async function test(req, res) {
    res.json({ message: "Allergy API works just fine" });
}

// Recupera tutte le allergie
async function getAllergies(req, res) {
    try {
        const rows = await AllergyController.getAllergies();

        if (!rows || rows.length === 0) {
            return res.status(404).json({ success: false, error: "Nessuna allergia trovata" });
        }

        res.json(rows);
    } catch (error) {
        console.error("Errore nel recupero delle allergie:", error.message);
        res.status(500).json({ success: false, error: "Errore interno nel recupero delle allergie" });
    }
}

// Recupera le allergie di un utente specifico
async function getAllergyByUsername(req, res) {
    try {
        const rows = await AllergyController.getAllergyByUsername(req.params.username);

        if (!rows || rows.length === 0) {
            return res.status(404).json({ success: false, error: `Nessuna allergia trovata per l'utente ${req.params.username}` });
        }

        res.json(rows);
    } catch (error) {
        console.error("Errore nel recupero delle allergie per utente:", error.message);
        res.status(500).json({ success: false, error: "Errore interno nel recupero dell'allergia" });
    }
}

// Elimina un'allergia di un utente
async function deleteAllergyByUsername(req, res) {
    try {
        const rows = await AllergyController.deleteAllergyByUsername(req.params.username, req.params.allergy);

        if (!rows.success) {
            return res.status(404).json({ success: false, error: `Allergia '${req.params.allergy}' non trovata per l'utente '${req.params.username}'` });
        }

        res.json({ success: true, message: "Allergia eliminata con successo" });
    } catch (error) {
        console.error("Errore nell'eliminazione dell'allergia:", error.message);
        res.status(500).json({ success: false, error: "Errore interno nell'eliminazione dell'allergia" });
    }
}

// Aggiorna un'allergia
async function updateAllergy(req, res) {
    try {
        const { allergy } = req.body;
        const { username, oldAllergy } = req.params;

        if (!allergy) {
            return res.status(400).json({ success: false, error: "Nuova allergia non fornita" });
        }

        const updateColumns = ["allergy"];
        const condition = "username = ? AND allergy = ?";
        const values = [allergy, username, oldAllergy];

        const rows = await AllergyController.updateAllergy(updateColumns, condition, values);

        if (!rows.success) {
            return res.status(400).json({ success: false, error: "Errore nell'aggiornamento dell'allergia" });
        }

        res.json({ success: true, message: "Allergia aggiornata con successo" });
    } catch (error) {
        console.error("Errore nell'aggiornamento dell'allergia:", error.message);
        res.status(500).json({ success: false, error: "Errore interno nell'aggiornamento dell'allergia" });
    }
}

// Inserisce una nuova allergia
async function insertAllergy(req, res) {
    try {
        const { username } = req.params;
        const { allergy } = req.body;

        if (!allergy) {
            return res.status(400).json({ success: false, error: "Allergia non fornita" });
        }

        const userExists = await AllergyController.checkUserExists(username);
        if (!userExists) {
            return res.status(404).json({ success: false, error: `L'utente '${username}' non esiste nel database` });
        }

        const rows = await AllergyController.insertAllergy(username, allergy);

        if (!rows.success) {
            return res.status(400).json({ success: false, error: "Errore nell'inserimento dell'allergia" });
        }

        res.json({ success: true, message: "Allergia inserita con successo" });
    } catch (error) {
        console.error("Errore nell'inserimento dell'allergia:", error.message);
        res.status(500).json({ success: false, error: "Errore interno nell'inserimento dell'allergia" });
    }
}

export default {
    test,
    getAllergies,
    getAllergyByUsername,
    deleteAllergyByUsername,
    updateAllergy,
    insertAllergy,
};
