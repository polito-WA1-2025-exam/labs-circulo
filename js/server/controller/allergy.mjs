import dayjs from "dayjs";
import * as AllergyController from "../../db_controller/Allergy.mjs";

async function test(req, res) {
    res.json({ message: 'Allergy API works just fine' });
}


async function getAllergies(req, res) {
    try {
        const allergies = await AllergyController.getAllergies();
        res.json(allergies);

    } catch (error) {
        res.status(500).json({ error: "Errore nel recupero delle allergie: " + error.message });
    }
}

async function getAllergyByUsername(req, res) {
    try {
        const bags = await AllergyController.getAllergyByUsername(req.params.username);
        res.json(bags);
    } catch (error) {
        res.status(500).json({ error: "Errore nel recupero dell' allergia: " + error.message });
    }
}



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
        const { allergy } = req.body;
        const { username, oldAllergy } = req.params;

        if (!allergy) {
            return res.status(400).json({ error: "Nuova allergia non fornita" });
        }

        // I parametri da passare a updateAllergy
        const updateColumns = ["allergy"];  // Colonna da aggiornare
        const condition = "username = ? AND allergy = ?";  // Condizione per identificare l'allergia
        const values = [allergy, username, oldAllergy];  // Nuovo valore e parametri per la condizione

        const result = await AllergyController.updateAllergy(updateColumns, condition, values);
        res.json({ message: "Allergia aggiornata con successo!", result });

    } catch (error) {
        res.status(500).json({ error: "Errore nell'aggiornamento dell'allergia " + error.message });
    }
}   


async function insertAllergy(req, res) {
    try {
        const { username } = req.params;
        const { allergy } = req.body;

        if(!allergy){
            return res.status(400).json({error: "Allergia non fornita"});
        }

        const userExists = await AllergyController.checkUserExists(username);
        if (!userExists) {
            return res.status(404).json({ error: `Lo username '${username}' non esiste nel database` });
        }

        const result = await AllergyController.insertAllergy(username, allergy);
        res.json({ message: "Allergia inserita con successo!", result });
    } catch (error) {
        res.status(500).json({ error: "Errore nell'inserimento dell'allergia " + error.message });
    }
}



export default{
    test,
    getAllergies,
    getAllergyByUsername,
    deleteAllergyByUsername,
    updateAllergy,
    insertAllergy,
}