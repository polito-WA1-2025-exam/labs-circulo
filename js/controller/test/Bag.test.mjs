import { Bag } from "../../types/Bag";
import { getBag, getBags, 
    getBagsByEstablishment, getAvailableBags, 
    getAvailableBagsByEstablishment, getReservedBags, getAvailableBagsFromDateTime } from "../Bag";
import dayjs from "dayjs";

describe('Bag', () => {
    test('getBag', async () => { 
        const bag = await getBag(101);
    
        expect(bag).toBeInstanceOf(Bag);
        expect(bag.bagID).toBe(101);
        expect(bag.type).toBe("Pane");
    
     })
    
     test('getBags', async () => {
        const bags = await getBags();
    
        expect(Array.isArray(bags)).toBe(true);
        expect(bags.length).toBeGreaterThan(0);
        expect(bags[0]).toBeInstanceOf(Bag);
     })

     test("getBagsByEstablishment", async () => {
        const bags = await getBagsByEstablishment(1);
    
        expect(Array.isArray(bags)).toBe(true);
        expect(bags.length).toBeGreaterThan(0);
        expect(bags[0]).toBeInstanceOf(Bag);
     })

     test("getAvailableBags", async () => {
        const bags = await getAvailableBags();
    
        expect(Array.isArray(bags)).toBe(true);

        if (bags.length > 0) {
            expect(bags[0]).toBeInstanceOf(Bag);
        }
     })

     test("getAvailableBagsByEstablishment", async () => {
        const bags = await getAvailableBagsByEstablishment(2);

        expect(Array.isArray(bags)).toBe(true);

     })

     test("getReservedBags", async () => {
        const bags = await getReservedBags();
        
    
        expect(Array.isArray(bags)).toBe(true);
        expect(bags.length).toBeGreaterThan(0);
        expect(bags[0]).toBeInstanceOf(Bag);
     })

     test("getAvailableBagsFromDateTime", async () => {
        const bags = await getAvailableBagsFromDateTime(dayjs("2021-08-01 12:00:00"));

        console.log(bags);
        
    
        expect(Array.isArray(bags)).toBe(true);
        expect(bags.length).toBeGreaterThan(0);
        expect(bags[0]).toBeInstanceOf(Bag);
     })
})
