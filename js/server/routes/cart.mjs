import { Router } from "express";
import CartController from "../controller/cart.mjs";
import { Cart } from "../../types/Cart.mjs";

const routerCart = Router();

routerCart.get('/test', CartController.test);
routerCart.get('/',CartController.getCarts);
routerCart.get('/:username', CartController.getCartByUsername);
routerCart.post('/',CartController.insertCart);
routerCart.put('/:username/:BagID',CartController.updateCart);
routerCart.delete('/:username/:BagID', CartController.deleteCart);





export default routerCart;