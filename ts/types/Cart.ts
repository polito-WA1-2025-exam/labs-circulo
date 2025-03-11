import { Bag } from './Bag'
import { CartItem } from './CartItem'

class Cart {
    cartItems: CartItem[]
    constructor(items: CartItem[] = []){
        this.cartItems = items
    }

    validCart(){
        return this.cartItems.length > 0 &&
            this.cartItems.every(ci => ci.bag.isValidRange()) &&
            this.cartItems.every(ci => ci.bag.isAvailable())
    }

    addBag(bag: Bag): boolean{
        const bagExists = this.cartItems.some(ci => ci.bag.bagId === bag.bagId)

        if(bagExists){
            return false
        }

        this.cartItems.push(new CartItem(bag))
        return true
    }

    removeBag(bagId: number){
        this.cartItems = this.cartItems.filter(ci => ci.bag.bagId !== bagId)
    }

    getCartItem(bagId: number){
        return this.cartItems.find(ci => ci.bag.bagId === bagId)
    }

    getBag(bagId: number){
        const cartItem = this.getCartItem(bagId)
        return cartItem ? cartItem.bag : null
    }

    clearCart(){

        this.cartItems = []
    }

    getCartPrice(){
        return this.cartItems.reduce((acc, ci) => acc + ci.bag.price, 0)
    }

    confirmOrder(){
        if(this.validCart()){
            this.cartItems.forEach(ci => {
                ci.bag.status = 'reserved'
            })
            return true
        }
        return false
    }

    addRemovedFood(bagId: number, food: string){
        const cartItem = this.getCartItem(bagId)
        if(cartItem){
            cartItem.removedFood.push(food)
        }
    }

    addSpecialRequest(bagId: number, request: string){
        const cartItem = this.getCartItem(bagId)
        if(cartItem){
            cartItem.specialRequests = request
        }
    }

    removeSpecialRequest(bagId: number){
        const cartItem = this.getCartItem(bagId)
        if(cartItem){
            cartItem.specialRequests = ''
        }
    }

    removeRemovedFood(bagId: number, food: string){
        const cartItem = this.getCartItem(bagId)
        if(cartItem){
            cartItem.removedFood = cartItem.removedFood.filter(f => f !== food)
        }
    }

    


}

export { Cart }