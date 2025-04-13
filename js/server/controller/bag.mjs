import dayjs from "dayjs";
import * as BagController from "../../db_controller/Bag.mjs";

async function test(req, res) {
    res.json({ message: 'Bag API works just fine' });
}

async function getBags(req, res) {
    try {
        const bags = await BagController.getBags();
        if (!bags || bags.length === 0) {
            return res.status(404).json({success: false, error: "No bags found in the database" });
        }
        res.status(200).json(bags);
    } catch (error) {
        console.error("Errore nel recupero delle borse:", error.message);
        res.status(500).json({success:false,  error: "Errore nel recupero delle borse" });
    }
}

async function getBagById(req, res) {
    try {
        const bag = await BagController.getBagById(req.params.bagID);
        if (!bag) {
            return res.status(404).json({ success:false, error: `Bag with ID ${req.params.bagID} not found` });
        }
        res.json(bag);
    } catch (error) {
        console.error("Errore nel recupero della borsa:", error.message);
        res.status(500).json({success:false, error: "Errore nel recupero della borsa" });
    }
}

async function getBagsByEstablishment(req, res) {
    try {
        const bags = await BagController.getBagsByEstablishment(req.params.establishmentID);
        if (!bags || bags.length === 0) {
            return res.status(404).json({success:false, error: `No bags found for establishment ID ${req.params.establishmentID}` });
        }
        res.json(bags);
    } catch (error) {
        console.error("Errore nel recupero delle borse per l'establishment:", error.message);
        res.status(500).json({success:false, error: "Errore nel recupero delle borse" });
    }
}

async function getAvailableBags(req, res) {
    try {
        const bags = await BagController.getAvailableBags();
        if (!bags || bags.length === 0) {
            return res.status(404).json({success:false, error: "No available bags found" });
        }
        res.json(bags);
    } catch (error) {
        console.error("Errore nel recupero delle borse disponibili:", error.message);
        res.status(500).json({success:false,  error: "Errore nel recupero delle borse" });
    }
}

async function getAvailableBagsByEstablishment(req, res) {
    try {
        const bags = await BagController.getAvailableBagsByEstablishment(req.params.establishmentID);
        if (!bags || bags.length === 0) {
            return res.status(404).json({success:false, error: `No available bags for establishment ID ${req.params.establishmentID}` });
        }
        res.json(bags);
    } catch (error) {
        console.error("Errore nel recupero delle borse disponibili per l'establishment:", error.message);
        res.status(500).json({success:false, error: "Errore nel recupero delle borse" });
    }
}

async function getAvailableBagsFromDateTime(req, res) {
    try {
        const dateTime = dayjs(req.params.datetime.replace("T", " "));
        const bags = await BagController.getAvailableBagsFromDateTime(dateTime);
        if (!bags || bags.length === 0) {
            return res.status(404).json({success:false, error: `No available bags from datetime ${req.params.datetime}` });
        }
        res.json(bags);
    } catch (error) {
        console.error("Errore nel recupero delle borse disponibili dalla data:", error.message);
        res.status(500).json({success:false, error: "Errore nel recupero delle borse" });
    }
}

async function deleteBagWithId(req, res) {
    try {
        const result = await BagController.deleteBagWithId(req.params.bagID);
        if (!result.success) {
            return res.status(404).json({success:false, error: result.error || `Bag with ID ${req.params.bagID} not found` });
        }
        res.json({success:true, message: "Bag deleted successfully!"});
    } catch (error) {
        console.error("Errore nell'eliminazione della borsa:", error.message);
        res.status(500).json({ error: "Errore interno del server durante l'eliminazione della borsa" });
    }
}

async function insertBag(req, res) {
    try {
        const result = await BagController.insertBag(req.body);
        if (!result.success) {
            return res.status(400).json({ success:false, error: result.error || "Errore nell'inserimento della borsa" });
        }
        res.json({success:true,  message: "Borsa inserita con successo!" });
    } catch (error) {
        console.error("Errore nell'inserimento della borsa:", error.message);
        res.status(500).json({ error: "Errore interno del server durante l'inserimento della borsa" });
    }
}

async function updateBag(req, res) {
    try {
        const result = await BagController.updateBag(req.body.columns, req.body.conditions, req.body.values);
        if (!result.success) {
            return res.status(400).json({ error: result.error || "Errore nell'aggiornamento della borsa" });
        }
        res.json({ success:true, message: "Borsa aggiornata con successo!" });
    } catch (error) {
        console.error("Errore nell'aggiornamento della borsa:", error.message);
        res.status(500).json({ error: "Errore interno del server durante l'aggiornamento della borsa" });
    }
}

export default {
    test,
    getBags,
    getBagById,
    getBagsByEstablishment,
    getAvailableBags,
    getAvailableBagsByEstablishment,
    getAvailableBagsFromDateTime,
    insertBag,
    updateBag,
    deleteBagWithId
};
