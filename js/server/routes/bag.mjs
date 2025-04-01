import { Router } from "express";
import BagController from "../controller/bag.mjs";

const routerBag = Router();

routerBag.get('/test', BagController.test);
routerBag.get('/', BagController.getBags);
routerBag.get('/available', BagController.getAvailableBags);
routerBag.get('/:bagID', BagController.getBagById);
routerBag.get('/byEstablishment/:establishmentID', BagController.getBagsByEstablishment);
routerBag.get('/available/byEstablishment/:establishmentID', BagController.getAvailableBagsByEstablishment);
routerBag.get('/available/fromDateTime/:datetime', BagController.getAvailableBagsFromDateTime);
routerBag.put('/insert', BagController.insertBag);
routerBag.put('/update', BagController.updateBag);
routerBag.delete('/:bagID', BagController.deleteBagWithId);

export default routerBag;