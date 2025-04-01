import * as UserController from "../../db_controller/User.mjs";
import { checkParams } from "../middlewares/checkBodyParams.mjs";

async function test(req, res) {
    res.json({ message: 'User API works just fine' });
}

async function getUsernames(req, res) {
    try {
        const users = await UserController.getUsernames();
        console.log("Users:", users);
        if (!users || users.length === 0) {
            return res.status(404).json({success:false, error: "No users found in the database" });
        }
        res.json(users);
    } catch (error) {
        console.error("Errore nel recupero degli utenti:", error.message);
        res.status(500).json({success:false, error: "Errore nel recupero degli utenti" });
    }
}

async function getUserByUsername(req, res) {
    try {
        checkParams(req.params, res, ["username"]);
        const user = await UserController.getUserByUsername(req.params.username);
        if (!user) {
            return res.status(404).json({success:false, error: `User with username ${req.params.username} not found` });
        }
        res.json(user);
    } catch (error) {
        console.error("Errore nel recupero dell'utente:", error.message);
        res.status(500).json({success:false, error: "Errore nel recupero dell'utente" });
    }
}

async function getUsers(req, res) {
    try {
        const users = await UserController.getUsers();
        console.log("Users:", users);
        if (!users || users.length === 0) {
            return res.status(404).json({success:false, error: "No users found in the database" });
        }
        res.json(users);
    } catch (error) {
        console.error("Errore nel recupero degli utenti:", error.message);
        res.status(500).json({success:false, error: "Errore nel recupero degli utenti" });
    }
}

async function deleteUser(req, res) {
    try {
        checkParams(req.params, res, ["username"]);
        const result = await UserController.deleteUser(req.params.username);
        if (!result.success) {
            return res.status(404).json({success:false, error: result.error || `User with username ${req.params.username} not found` });
        }
        res.json({success:true, message: "User deleted successfully!" });
    } catch (error) {
        console.error("Errore nell'eliminazione dell'utente:", error.message);
        res.status(500).json({success:false, error: "Errore interno del server durante l'eliminazione dell'utente" });
    }
}

async function insertUser(req, res) {
    try {
        checkParams(req.body, res, ["username", "name", "password"]);
        const result = await UserController.insertUser(req.body);
        if (!result.success) {
            return res.status(400).json({success:false, error: result.error || "Errore nell'inserimento dell'utente" });
        }
        res.json({success:true, message: "Utente inserito con successo!" });
    } catch (error) {
        console.error("Errore nell'inserimento dell'utente:", error.message);
        res.status(500).json({success:false, error: "Errore interno del server durante l'inserimento dell'utente" });
    }
}

async function updateUser(req, res) {
    try {
        if (req.query.password) delete req.body.password;
        if (req.query.username) delete req.body.username;

        const result = await UserController.updateUser(req.body.columns, req.body.conditions, req.body.values);
        if (!result.success) {
            return res.status(400).json({success:false, error: result.error || "Errore nell'aggiornamento dell'utente" });
        }
        res.json({success:true, message: "Utente aggiornato con successo!" });
    } catch (error) {
        console.error("Errore nell'aggiornamento dell'utente:", error.message);
        res.status(500).json({success:false, error: "Errore interno del server durante l'aggiornamento dell'utente" });
    }
}

export default {
    test,
    getUsernames,
    getUserByUsername,
    getUsers,
    deleteUser,
    insertUser,
    updateUser,
};