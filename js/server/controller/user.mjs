import * as UserController from "../../db_controller/User.mjs";
import { checkParams } from "../middlewares/checkBodyParams.mjs";

async function test(req, res) {
    res.json({ message: 'User API works just fine' });
}

export async function getUsernames(req, res) {
    try {
        const users = await UserController.getUsernames();
        res.json(users);

    } catch (error) {
        res.status(500).json({ error: "Errore nel recupero degli users: " + error.message });
    }
}

export async function getUser(req, res) {
    try {
        checkParams(req.params, res, ["username"]);
        const user = await UserController.getUser(req.params.username);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Errore nel recupero degli users: " + error.message });
    }
}

export async function deleteUser(req, res) {
    try {
        checkParams(req.params, res, ["username"]);
        const result = await UserController.deleteUser(req.params.username);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Errore nell'eliminazione dello user " + error.message });
    }
}

export async function insertUser(req, res) {
    try {
        checkParams(req.body, res, ["username", "name", "password"]);
        const result = await UserController.insertUser(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Errore nell'inserimento dello user " + error.message });
    }
}

export async function updateUser(req, res) {
    try {
        if (req.body.password) delete req.body.password;

        const result = await UserController.updateUser(Object.keys(req.body), `username = '${req.params.username}'`, Object.values(req.body));
        res.json({ message: "User aggiornato con successo!", result });

    } catch (error) {
        res.status(500).json({ error: "Errore nell'aggiornamento dello user " + error.message });
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