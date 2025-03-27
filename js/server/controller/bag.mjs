import dayjs from "dayjs";
import * as BagController from "../../db_controller/Bag.mjs";

async function test(req, res) {
    res.json({ message: 'Bag API works just fine' });
}

async function getBags(req, res) {
    try {
        const bags = await BagController.getBags();
        res.json(bags);

    } catch (error) {
        res.status(500).json({ error: "Errore nel recupero delle borse: " + error.message });
    }
}

async function getBagById(req, res) {
    try {
        const bags = await BagController.getBagById(req.params.bagID);
        res.json(bags);
    } catch (error) {
        res.status(500).json({ error: "Errore nel recupero della borsa: " + error.message });
    }
}

async function getBagsByEstablishment(req, res) {
    try {
        const bags = await BagController.getBagsByEstablishment(req.params.establishmentID);
        res.json(bags);

    } catch (error) {
        res.status(500).json({ error: "Errore nel recupero delle borse: " + error.message });
    }
}

async function getAvailableBags(req, res) {
    try {
        const bags = await BagController.getAvailableBags();
        res.json(bags);
    } catch (error) {
        res.status(500).json({ error: "Errore nel recupero delle borse: " + error.message });
    }
}

async function getAvailableBagsByEstablishment(req, res) {
    try {
        const bags = await BagController.getAvailableBagsByEstablishment(req.params.establishmentID);
        res.json(bags);
    } catch (error) {
        res.status(500).json({ error: "Errore nel recupero delle borse: " + error.message });
    }
}


async function getReservedBags(req, res) {
    try {
        const bags = await BagController.getReservedBags();
        res.json(bags)
    } catch (error) {
        res.status(500).json({ error: "Errore nel recupero delle borse: " + error.message });
    }
}

async function getAvailableBagsFromDateTime(req, res) {
    try {
        const dateTime = req.params.datetime.split("T").join(" ");
        const bags = await BagController.getAvailableBagsFromDateTime(dayjs(dateTime));
        res.json(bags);
    } catch (error) {
        res.status(500).json({ error: "Errore nel recupero delle borse: " + error.message });
    }
}

//:)
async function deleteBagWithId(req, res) {
    try {
        const result = await BagController.deleteBagWithId(req.params.bagID);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Errore nell'eliminazione della borsa " + error.message });
    }
}

async function insertBag(req, res) {

    try {
        const result = await BagController.insertBag(req.body);
        res.json({ message: "Borsa inserita con successo!", result });
    } catch (error) {
        res.status(500).json({ error: "Errore nell'inserimento della borsa " + error.message });
    }
}

async function updateBag(req, res) {
    try {
        console.log(req.body.columns, req.body.conditions, req.body.values);
        const result = await BagController.updateBag(req.body.columns, req.body.conditions, req.body.values);
        res.json({ message: "Borsa aggiornata con successo!", result });

    } catch (error) {
        res.status(500).json({ error: "Errore nell'aggiornamento della borsa " + error.message });
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