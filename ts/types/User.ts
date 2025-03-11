import { Cart } from './Cart';
import { Bag } from './Bag';

class User{
    username: string;
    isAuth: boolean;
    cart: Cart;
    reservations: Bag[];
    allergies: string[];

    constructor(username: string, isAuth: boolean, cart: Cart, reservations = [], allergies = []){
        this.username = username
        this.isAuth = isAuth
        this.cart = cart //list of all the bags that the user has added to the cart
        this.reservations = reservations //list of all the bags that the user has reserved
        this.allergies = allergies //allergies of the user
    }


}