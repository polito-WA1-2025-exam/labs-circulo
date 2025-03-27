import { Router } from "express";
import BagController from "../controller/bag.mjs";

const routerBag = Router();

routerBag.get('/test', BagController.test);
routerBag.get('/getBags', BagController.getBags);
routerBag.get('/getBagById/:bagID', BagController.getBagById);
routerBag.get('/getBagsByEstablishment/:establishmentID', BagController.getBagsByEstablishment);
routerBag.get('/getAvailableBags', BagController.getAvailableBags);
routerBag.get('/getAvailableBagsByEstablishment/:establishmentID', BagController.getAvailableBagsByEstablishment);
routerBag.get('/getAvailableBagsFromDateTime/:datetime', BagController.getAvailableBagsFromDateTime);
routerBag.put('/insertBag', BagController.insertBag);
routerBag.put('/updateBag', BagController.updateBag);
routerBag.delete('/deleteBagWithId/:bagID', BagController.deleteBagWithId);

export default routerBag;