import { Router } from "express";
import EstablishmentController from "../controller/establishment.mjs";

const routerEstablishment = Router();

routerEstablishment.get('/test', EstablishmentController.test);

export default routerEstablishment;