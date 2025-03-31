import { Router } from "express";
import ReservationController from "../controller/reservation.mjs";

const routerReservation = Router();

routerReservation.get('/test', ReservationController.test);
routerReservation.get('/',ReservationController.getReservations);
routerReservation.get('/:username', ReservationController.getReservationsByUsername);
routerReservation.put('/insertReservation/:username',ReservationController.insertReservation);
routerReservation.put('/updateReservation/:username/:oldBagID',ReservationController.updateReservation); 
routerReservation.delete('/:username/:BagID', ReservationController.deleteReservationByBagID);

export default routerReservation;