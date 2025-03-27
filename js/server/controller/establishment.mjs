import * as EstablishmentController from "../../db_controller/Establishment.mjs";

async function test(req, res) {
    res.json({ message: 'Establishment API works just fine' });
}

async function getEstablishments(req, res) {
    try {
        const establishments = await EstablishmentController.getEstablishments();
        res.json(establishments);

    } catch (error) {
        res.status(500).json({ error: "Errore nel recupero degli stabilimenti: " + error.message });
    }
}

async function getEstablishmentById(req, res) {
    try {
        const establishment = await EstablishmentController.getEstablishmentById(req.params.establishmentID);
        res.json(establishment);
    } catch (error) {
        res.status(500).json({ error: "Errore nel recupero degli stabilimenti: " + error.message });
    }
}

async function getEstablishmentsByType(req, res) {
    try {
        const establishment = await EstablishmentController.getEstablishmentsByType(req.params.type);
        res.json(establishment);
    } catch (error) {
        res.status(500).json({ error: "Errore nel recupero degli stabilimenti: " + error.message });
    }
}

async function deleteEstablishmentWithId(req, res) {
    try {
        const result = await EstablishmentController.deleteEstablishmentWithId(req.params.establishmentID);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Errore nell'eliminazione dello stabilimento " + error.message });
    }
}

async function insertEstablishment(req, res) {
    try {
        const result = await EstablishmentController.insertEstablishment(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Errore nell'inserimento dello stabilimento " + error.message });
    }
}

async function updateEstablishment(req, res) {
    try {
        const result = await EstablishmentController.updateEstablishment(req.body.columns, req.body.conditions, req.body.values);
        res.json({ message: "Stabilimento aggiornato con successo!", result });

    } catch (error) {
        res.status(500).json({ error: "Errore nell'aggiornamento dello stabilimento " + error.message });
    }
}

export default {
    test,
    getEstablishments,
    getEstablishmentById,
    getEstablishmentsByType,
    insertEstablishment,
    deleteEstablishmentWithId,
    updateEstablishment
};