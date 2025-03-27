import { Router } from "express";
import routerBag from "./routes/bag.mjs";
import routerUser from "./routes/user.mjs";
import routerEstablishment from "./routes/establishment.mjs";

//Will catch all calls to /api
const routerApi = Router();

routerApi.get('/test', (req, res) => {
    res.json({ message: 'API works just fine' });
});

routerApi.use("/bag", routerBag);   //Will catch /api/bag
routerApi.use("/user", routerUser); //Will catch /api/user
routerApi.use("/establishment", routerEstablishment); //Will catch /api/establishment

routerApi.all('*', (req, res) => {
    res.status(404).json({ message: 'API endpoint not found' });
});


export default routerApi;