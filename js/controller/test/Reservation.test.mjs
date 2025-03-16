import { Bag } from "../../types/Bag";
import { getReservations } from "../Reservation";

describe("Reservation", () => {
    test("getReservations", async () => {
        const reservations = await getReservations("mario_rossi");
        
        expect(Array.isArray(reservations)).toBe(true);
        expect(reservations.length).toBeGreaterThan(0);
        expect(reservations[0]).toBeInstanceOf(Bag);
    });
})