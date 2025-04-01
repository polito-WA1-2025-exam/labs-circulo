import * as EstablishmentController from "../../db_controller/Establishment.mjs";

async function test(req, res) {
    res.json({ message: 'Establishment API works just fine' });
}

async function getEstablishments(req, res) {
    try {
        const establishments = await EstablishmentController.getEstablishments();
        if (!establishments || establishments.length === 0) {
            return res.status(404).json({success:false,  error: "No establishments found in the database" });
        }
        res.json(establishments);
    } catch (error) {
        console.error("Errore nel recupero degli stabilimenti:", error.message);
        res.status(500).json({success:false, error: "Errore nel recupero degli stabilimenti" });
    }
}

async function getEstablishmentById(req, res) {
    try {
        const establishment = await EstablishmentController.getEstablishmentById(req.params.establishmentID);
        if (!establishment) {
            return res.status(404).json({success:false,  error: `Establishment with ID ${req.params.establishmentID} not found` });
        }
        res.json(establishment);
    } catch (error) {
        console.error("Errore nel recupero dello stabilimento:", error.message);
        res.status(500).json({success:false, error: "Errore nel recupero dello stabilimento" });
    }
}

async function getEstablishmentsByType(req, res) {
    try {
        const establishments = await EstablishmentController.getEstablishmentsByType(req.params.type);
        if (!establishments || establishments.length === 0) {
            return res.status(404).json({success:false, error: `No establishments found for type ${req.params.type}` });
        }
        res.json(establishments);
    } catch (error) {
        console.error("Errore nel recupero degli stabilimenti per tipo:", error.message);
        res.status(500).json({ success:false, error: "Errore nel recupero degli stabilimenti" });
    }
}

async function deleteEstablishmentWithId(req, res) {
    try {
        const result = await EstablishmentController.deleteEstablishmentWithId(req.params.establishmentID);
        if (!result.success) {
            return res.status(404).json({success:false, error: result.error || `Establishment with ID ${req.params.establishmentID} not found` });
        }
        res.json({success:true, message:"Establishment deleted succesfully!"});
    } catch (error) {
        console.error("Errore nell'eliminazione dello stabilimento:", error.message);
        res.status(500).json({success:false, error: "Errore interno del server durante l'eliminazione dello stabilimento" });
    }
}

async function insertEstablishment(req, res) {
    try {
        const result = await EstablishmentController.insertEstablishment(req.body);
        console.log(result)
        if (!result.success) {
            return res.status(400).json({success:false, error: result.error || "Errore nell'inserimento dello stabilimento" });
        }
        res.json({success:true, message: "Stabilimento inserito con successo!" });
    } catch (error) {
        console.error("Errore nell'inserimento dello stabilimento:", error.message);
        res.status(500).json({success:false, error: "Errore interno del server durante l'inserimento dello stabilimento" });
    }
}

async function updateEstablishment(req, res) {
    try {
        const result = await EstablishmentController.updateEstablishment(req.body.columns, req.body.conditions, req.body.values);
        if (!result.success) {
            return res.status(400).json({success:false, error: result.error || "Errore nell'aggiornamento dello stabilimento" });
        }
        res.json({success:true, message: "Stabilimento aggiornato con successo!" });
    } catch (error) {
        console.error("Errore nell'aggiornamento dello stabilimento:", error.message);
        res.status(500).json({success:false, error: "Errore interno del server durante l'aggiornamento dello stabilimento" });
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