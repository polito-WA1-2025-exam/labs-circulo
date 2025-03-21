import { Router } from "express";
import BagController from "../controller/bag.mjs";

const routerBag = Router();

routerBag.get('/test', BagController.test);

export default routerBag;