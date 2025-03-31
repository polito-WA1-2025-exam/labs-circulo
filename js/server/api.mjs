import { Router } from "express";
import routerBag from "./routes/bag.mjs";
import routerUser from "./routes/user.mjs";
import routerEstablishment from "./routes/establishment.mjs";
import routerAllergy from "./routes/allergy.mjs";
import routerReservation from "./routes/reservation.mjs";
import routerCart from "./routes/cart.mjs";

//Will catch all calls to /api
const routerApi = Router();

routerApi.get('/test', (req, res) => {
    res.json({ message: 'API works just fine' });
});

routerApi.use("/bag", routerBag);   //Will catch /api/bag
routerApi.use("/user", routerUser); //Will catch /api/user
routerApi.use("/establishment", routerEstablishment); //Will catch /api/establishment
routerApi.use("/allergy", routerAllergy); //Will catch /api/allergy
routerApi.use("/reservation",routerReservation); //Will catch /api/reservation
routerApi.use("/cart",routerCart); //Will catch /api/cart


routerApi.all('*', (req, res) => {
    res.status(404).json({ message: 'API endpoint not found' });
});


export default routerApi;