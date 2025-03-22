import * as dbHandler from "../../async_db_handler.mjs"; 


async function test(req, res) {
    res.json({ message: 'Bag API works just fine' });
}

async function getAllItems(req, res) {
    try{
        const db = await dbHandler.openDb();
        const bags = await dbHandler.selectItems(db, 'Bag');
        await dbHandler.closeDb(db);
        res.json(bags);
    }catch(error){
        res.status(500).json({error : "Errore nel recupero delle borse: " + error.message});
    }
}
async function getItemsByCriteria(req, res) {
    try {
    
        const { bagID, type, size, price, establishmentID, startTime, endTime, status } = req.query;

        const db = await dbHandler.openDb();
        let condition = [];
        let params = [];

        if (bagID) {
            condition.push("bagID = ?");
            params.push(bagID);
        }

        if (type) {
            condition.push("LOWER(type) = LOWER(?)");
            params.push(type);
        }

        if (size) {
            condition.push("size = ?");
            params.push(size);
        }

        if (price) {
            condition.push("price = ?");
            params.push(price);
        }

        if (establishmentID) {
            condition.push("establishmentID = ?");
            params.push(establishmentID);
        }

        if (startTime) {
            condition.push("startTime >= ?");
            params.push(startTime);
        }

        if (endTime) {
            condition.push("endTime <= ?");
            params.push(endTime);
        }

        if (status) {
            condition.push("status = ?");
            params.push(status);
        }

        const whereClause = condition.length > 0 ? condition.join(" AND ") : null;

        const bags = await dbHandler.selectItems(db, "Bag", whereClause, ["*"], params);
        await dbHandler.closeDb(db);

        res.json(bags); 
    } catch (error) {
        res.status(500).json({ error: "Errore nel recupero degli articoli: " + error.message });
    }
}

async function deleteItem(req, res){
    try{
        const {bagID} = req.params;

        const db = await dbHandler.openDb();

        await dbHandler.dbRunAsync(db, "DELETE FROM Bag WHERE bagID = ?", [bagID]);

        await dbHandler.closeDb(db);

        res.json({ message: `Borsa con ID ${bagID} eliminata con successo!` });
    }catch(error){
        res.status(500).json({error : "Errore nell'eliminazione della borsa " + error.message});
    }
}


export default {
    test, 
    getAllItems,
    getItemsByCriteria,
    deleteItem,
};