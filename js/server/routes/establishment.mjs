import { Router } from "express";
import EstablishmentController from "../controller/establishment.mjs";

const routerEstablishment = Router();

routerEstablishment.get('/test', EstablishmentController.test);
routerEstablishment.get('/getEstablishments', EstablishmentController.getEstablishments);
routerEstablishment.get('/getEstablishmentById/:establishmentID', EstablishmentController.getEstablishmentById);
routerEstablishment.get('/getEstablishmentsByType/:type', EstablishmentController.getEstablishmentsByType);
routerEstablishment.delete('/deleteEstablishmentWithId/:establishmentID', EstablishmentController.deleteEstablishmentWithId);
routerEstablishment.post('/insertEstablishment', EstablishmentController.insertEstablishment);
routerEstablishment.put('/updateEstablishment', EstablishmentController.updateEstablishment);

export default routerEstablishment;