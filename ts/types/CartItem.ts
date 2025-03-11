import { Bag } from "./Bag";


class CartItem{
    bag: Bag;
    removedFood: string[];
    specialRequests: string;

    constructor(bag: Bag, removedFood: string[] = [], specialRequests: string = ""){
        this.bag = bag
        this.removedFood = removedFood
        this.specialRequests = specialRequests
    }
}

export { CartItem }