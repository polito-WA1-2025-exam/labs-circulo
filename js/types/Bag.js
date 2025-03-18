import dayjs from 'dayjs'

/**
 * Represents a Bag.
 * 
 * @constructor
 * @param {number} bagId - The unique identifier for the bag.
 * @param {string} type - The type of the bag.
 * @param {number} price - The price of the bag.
 * @param {dayjs.Dayjs} startTime - The start time of the bag's availability.
 * @param {dayjs.Dayjs} endTime - The end time of the bag's availability.
 * @param {string} status - The status of the bag (e.g., 'available', 'unavailable').
 * @param {number} establishmentId - The unique identifier of the establishment associated with the bag.
 */
function Bag(bagId, type, price, startTime, endTime, status, establishmentId) {
    this.bagID = bagId;
    this.type = type;
    this.price = price;
    this.startTime = startTime;
    this.endTime = endTime;
    this.status = status;
    this.establishmentId = establishmentId;

    /**
     * Checks if the time range is valid.
     * 
     * @returns {boolean} True if the start time is before the end time, otherwise false.
     */
    this.isValidRange = function() {
        return this.startTime.isBefore(this.endTime);
    };

    /**
     * Checks if the bag is available.
     * 
     * @returns {boolean} True if the bag's status is 'available', otherwise false.
     */
    this.isAvailable = function() {
        return this.status === 'available';
    };
}

export { Bag };
