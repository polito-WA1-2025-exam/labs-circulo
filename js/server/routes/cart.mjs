import { Router } from "express";
import CartController from "../controller/cart.mjs";

const routerCart = Router();

routerCart.get('/test', CartController.test);
/*
routerCart.get('/',CartController.getCarts);
routerCart.get('/:username', CartController.getReservationsByUsername);

routerReservation.put('/insertReservation/:username',ReservationController.insertReservation);

routerReservation.put('/updateReservation/:username/:oldBagID',ReservationController.updateReservation); 

routerReservation.delete('/:username/:BagID', ReservationController.deleteReservationByBagID);
*/



export default routerCart;