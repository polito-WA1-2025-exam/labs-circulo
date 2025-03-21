import { Cart } from './Cart';
import { Bag } from './Bag';


/**
 * Represents a User in the system.
 * 
 * @constructor
 * @param {string} username - The username of the user.
 * @param {boolean} isAuth - Indicates whether the user is authenticated.
 * @param {Cart|null} [cart=null] - The user's shopping cart, containing all the bags the user has added.
 * @param {Array} [reservations=[]] - A list of all the bags that the user has reserved.
 * @param {Array} [allergies=[]] - A list of the user's allergies.
 * 
 * @property {string} username - The username of the user.
 * @property {boolean} isAuth - Indicates whether the user is authenticated.
 * @property {Cart|null} cart - The user's shopping cart.
 * @property {Array} reservations - A list of all the bags that the user has reserved.
 * @property {Array} allergies - A list of the user's allergies.
 * 
 * @method confirmOrder - Confirms the order for the items in the user's cart.
 * @returns {boolean} - Returns true if the order is confirmed, otherwise false.
 * 
 * @method addBagToCart - Adds a bag to the user's cart.
 * @param {Bag} bag - The bag to be added to the cart.
 * @returns {boolean} - Returns true if the bag is successfully added, otherwise false.
 */
function User(username, isAuth, cart = null, reservations = [], allergies = []) {
    /**
     * @type {string}
     */
    this.username = username;

    /**
     * @type {boolean}
     */
    this.isAuth = isAuth;

    /**
     * @type {Cart|null}
     */
    this.cart = cart; // list of all the bags that the user has added to the cart

    /**
     * @type {Bag[]}
     */
    this.reservations = reservations; // list of all the bags that the user has reserved

    /**
     * @type {string[]}
     */
    this.allergies = allergies; // allergies of the user

    this.confirmOrder = function () {
        return this.cart?.confirmOrder() || false;
    };

    this.addBagToCart = function (bag) {
        return this.cart?.addBag(bag) || false;
    };
}

export { User };
