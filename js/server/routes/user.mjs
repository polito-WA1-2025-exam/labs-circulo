import { Router } from "express";
import UserController from "../controller/user.mjs";

const routerUser = Router();

routerUser.get('/test', UserController.test);
routerUser.get('/getUsernames', UserController.getUsernames);
routerUser.get('/getUser/:username', UserController.getUser);
routerUser.delete('/deleteUser/:username', UserController.deleteUser);
routerUser.post('/inserUser', UserController.insertUser);
routerUser.put('/updateUser', UserController.updateUser);

export default routerUser;