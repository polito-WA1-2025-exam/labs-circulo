import * as UserController from  "../../db_controller/User.mjs";

async function test(req, res) {
    res.json({ message: 'User API works just fine' });
}

export async function getUsernames() {
       try{
            const  users = await UserController.getUsernames();
            res.json(users);
    
        }catch(error){
            res.status(500).json({error : "Errore nel recupero degli users: " + error.message});
        }
}

export async function getUser(req, res) {
    try{
        const  user = await UserController.getUser(req.params.username);
        res.json(user);
    }catch(error){
        res.status(500).json({error : "Errore nel recupero degli users: " + error.message});
    }
}

export async function deleteUser(req, res){
    try{
        const result = await UserController.deleteUser(req.params.username);
        res.json(result);
    }catch(error){
        res.status(500).json({error : "Errore nell'eliminazione dello user " + error.message});
    }
}

export async function insertUser(req, res){
    try{
        const result = await UserController.insertUser(req.body);
        res.json(result);
    }catch(error){
        res.status(500).json({error : "Errore nell'inserimento dello user " + error.message});
    }
}

export async function updateUser(req, res){
   try{
           const result = await UserController.updateUser(req.body.columns, req.body.conditions, req.body.values);
           res.json({ message: "User aggiornato con successo!", result });

       }catch(error){
           res.status(500).json({error : "Errore nell'aggiornamento dello user " + error.message});
       }
}

export default {
    test,
    getUsernames,
    getUser,
    deleteUser,
    insertUser,
    updateUser,
};  