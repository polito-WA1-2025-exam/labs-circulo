import { Router } from "express";
import EstablishmentController from "../controller/establishment.mjs";

const routerEstablishment = Router();

routerEstablishment.get('/test', EstablishmentController.test);
routerEstablishment.get('/', EstablishmentController.getEstablishments);
routerEstablishment.get('/:establishmentID', EstablishmentController.getEstablishmentById);
routerEstablishment.get('/byType/:type', EstablishmentController.getEstablishmentsByType);
routerEstablishment.delete('/:establishmentID', EstablishmentController.deleteEstablishmentWithId);
routerEstablishment.post('/insert', EstablishmentController.insertEstablishment);
routerEstablishment.put('/update', EstablishmentController.updateEstablishment);

export default routerEstablishment;