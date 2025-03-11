import { Cart } from './Cart';
import { Bag } from './Bag';

class User{
    username: string;
    isAuth: boolean;
    cart: Cart | null;
    reservations: Bag[];
    allergies: string[];

    constructor(username: string, isAuth: boolean, cart: Cart | null, reservations: Bag[] = [], allergies: string[] = []){
        this.username = username
        this.isAuth = isAuth
        this.cart = cart //list of all the bags that the user has added to the cart
        this.reservations = reservations //list of all the bags that the user has reserved
        this.allergies = allergies //allergies of the user
    }

    confirmOrder(): boolean{
        return this.cart?.confirmOrder() || false
    }

    addBagToCart(bag: Bag): boolean{
        return this.cart?.addBag(bag) || false
    }


}

export { User }