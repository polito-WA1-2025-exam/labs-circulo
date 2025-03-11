import { Bag } from './Bag'

class Cart {
    bags: Bag[]
    constructor(bags: Bag[] = []){
        this.bags = bags
    }

    validCart(){
        return this.bags.length > 0 &&
            this.bags.every(bag => bag.isValidRange())
    }
}

export { Cart }