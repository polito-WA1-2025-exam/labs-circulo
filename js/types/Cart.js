import { Bag } from './Bag.js';
import { CartItem } from '../CartItem';

/**
 * Represents a shopping cart.
 */
/**
 * Represents a shopping cart containing items.
 * @constructor
 * @param {CartItem[]} [items=[]] - An array of cart items to initialize the cart with.
 */
function Cart(items = []) {
    /** @type {CartItem[]} */
    this.cartItems = items;

    /**
     * Validates the cart.
     * @returns {boolean} True if the cart is valid, otherwise false.
     */
    this.validCart = function () {
        return this.cartItems.length > 0 &&
            this.cartItems.every(ci => ci.bag.isValidRange()) &&
            this.cartItems.every(ci => ci.bag.isAvailable());
    };

    /**
     * Adds a bag to the cart.
     * @param {Bag} bag - The bag to add.
     * @returns {boolean} True if the bag was added, otherwise false.
     */
    this.addBag = function (bag) {
        const bagExists = this.cartItems.some(ci => ci.bag.bagID === bag.bagID);

        if (bagExists) {
            return false;
        }

        this.cartItems.push(new CartItem(bag));
        return true;
    };

    /**
     * Removes a bag from the cart by its ID.
     * @param {number} bagId - The ID of the bag to remove.
     */
    this.removeBag = function (bagId) {
        this.cartItems = this.cartItems.filter(ci => ci.bag.bagID !== bagId);
    };

    /**
     * Gets a cart item by bag ID.
     * @param {number} bagId - The ID of the bag.
     * @returns {CartItem | undefined} The cart item, or undefined if not found.
     */
    this.getCartItem = function (bagId) {
        return this.cartItems.find(ci => ci.bag.bagID === bagId);
    };

    /**
     * Gets a bag by its ID.
     * @param {number} bagId - The ID of the bag.
     * @returns {Bag | null} The bag, or null if not found.
     */
    this.getBag = function (bagId) {
        const cartItem = this.getCartItem(bagId);
        return cartItem ? cartItem.bag : null;
    };

    /**
     * Clears the cart.
     */
    this.clearCart = function () {
        this.cartItems = [];
    };

    /**
     * Calculates the total price of the cart.
     * @returns {number} The total price.
     */
    this.getCartPrice = function () {
        return this.cartItems.reduce((acc, ci) => acc + ci.bag.price, 0);
    };

    /**
     * Confirms the order if the cart is valid.
     * @returns {boolean} True if the order was confirmed, otherwise false.
     */
    this.confirmOrder = function () {
        if (this.validCart()) {
            this.cartItems.forEach(ci => {
                ci.bag.status = 'reserved';
            });
            return true;
        }
        return false;
    };

    /**
     * Adds a removed food item to a bag.
     * @param {number} bagId - The ID of the bag.
     * @param {string} food - The food item to add.
     */
    this.addRemovedFood = function (bagId, food) {
        const cartItem = this.getCartItem(bagId);
        if (cartItem) {
            cartItem.removedFood.push(food)
        }
    }

    /**
     * Adds a special request to a bag.
     * @param {number} bagId - The ID of the bag.
     * @param {string} request - The special request to add.
     */
    this.addSpecialRequest = function (bagId, request) {
        const cartItem = this.getCartItem(bagId)
        if (cartItem) {
            cartItem.specialRequests = request
        }
    }

    /**
     * Removes a special request from a bag.
     * @param {number} bagId - The ID of the bag.
     */
    this.removeSpecialRequest = function (bagId) {
        const cartItem = this.getCartItem(bagId)
        if (cartItem) {
            cartItem.specialRequests = ''
        }
    }

    /**
     * Removes a removed food item from a bag.
     * @param {number} bagId - The ID of the bag.
     * @param {string} food - The food item to remove.
     */
    this.removeRemovedFood = function (bagId, food) {
        const cartItem = this.getCartItem(bagId)
        if (cartItem) {
            cartItem.removedFood = cartItem.removedFood.filter(f => f !== food)
        }
    }
}

export { Cart }