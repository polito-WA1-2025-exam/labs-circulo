import { Router } from "express";
import BagController from "../controller/bag.mjs";

const routerBag = Router();

routerBag.get('/test', BagController.test);
routerBag.get('/getAllItems', BagController.getAllItems);
routerBag.get('/getItemsByCriteria', BagController.getItemsByCriteria);


routerBag.delete('/deleteItem/:bagID',BagController.deleteItem);

export default routerBag;