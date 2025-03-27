import { Establishment } from "../../types/Establishment";
import { getEstablishments } from "../Establishment";

describe('Establishment', () => {
    test('getEstablishments', async () => {
        const establishments = await getEstablishments();

        expect(Array.isArray(establishments)).toBe(true);
        expect(establishments.length).toBeGreaterThan(0);
        expect(establishments[0]).toBeInstanceOf(Establishment);
    })
})