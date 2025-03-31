import { Bag } from "./Bag.mjs";

/**
 * Represents an item in the cart.
 * @class
 */
function CartItem(bag, removedFood = [], specialRequests = "") {
    /**
     * @type {Bag} The bag associated with the cart item.
     */
    this.bag = bag;

    /**
     * @type {string[]} List of removed food items.
     */
    this.removedFood = removedFood;

    /**
     * @type {string} Special requests for the cart item.
     */
    this.specialRequests = specialRequests;
}

export { CartItem };