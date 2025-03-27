import { Router } from "express";
import UserController from "../controller/user.mjs";

const routerUser = Router();

routerUser.get('/test', UserController.test);
routerUser.get('/getUsernames', UserController.getUsernames);
routerUser.get('/:username', UserController.getUser);
routerUser.delete('/:username', UserController.deleteUser);
routerUser.post('/insert', UserController.insertUser);
routerUser.put('/:username', UserController.updateUser);

export default routerUser;