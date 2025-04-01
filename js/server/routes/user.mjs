import { Router } from "express";
import UserController from "../controller/user.mjs";

const routerUser = Router();

routerUser.get('/test', UserController.test);
routerUser.get('/usernames', UserController.getUsernames);
routerUser.get('/users', UserController.getUsers);
routerUser.get('/byUsername/:username', UserController.getUserByUsername);
routerUser.delete('/:username', UserController.deleteUser);
routerUser.post('/insert', UserController.insertUser);
routerUser.put('/update', UserController.updateUser);

export default routerUser;