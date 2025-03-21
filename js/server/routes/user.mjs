import { Router } from "express";
import UserController from "../controller/user.mjs";

const routerUser = Router();

routerUser.get('/test', UserController.test);

export default routerUser;