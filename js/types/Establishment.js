import { Bag } from "./Bag";

function Establishment(establishmentId, name, type, address, phone, toc, bags = []) {
    this.establishmentId = establishmentId;
    this.name = name;
    this.type = type;
    this.address = address;
    this.phone = phone;
    this.toc = toc;
    this.bags = bags;

    /**
     * Adds a bag to the establishment.
     * @param {Bag} bag - The bag to add.
     */
    this.addBag = function(bag) {
        this.bags.push(bag);
    };

    /**
     * Removes a bag from the establishment by its ID.
     * @param {string} bagId - The ID of the bag to remove.
     */
    this.removeBag = function(bagId) {
        this.bags = this.bags.filter(b => b.bagId !== bagId);
    };

    /**
     * Retrieves a bag from the establishment by its ID.
     * @param {string} bagId - The ID of the bag to retrieve.
     * @returns {Bag|undefined} - The bag with the specified ID, or undefined if not found.
     */
    this.getBag = function(bagId) {
        return this.bags.find(b => b.bagId === bagId);
    };
};

export { Establishment };
