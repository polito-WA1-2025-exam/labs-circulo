import { getEstablishments, getEstablishmentById, getEstablishmentsByType, deleteEstablishmentWithId, insertEstablishment, updateEstablishment } from '../Establishment';
import { Establishment } from "../../types/Establishment";

describe('Establishment', () => {

    // Test per ottenere tutti gli establishments
    test('getEstablishments', async () => {
        const establishments = await getEstablishments();

        expect(Array.isArray(establishments)).toBe(true);
        expect(establishments.length).toBeGreaterThan(0);
        expect(establishments[0]).toBeInstanceOf(Establishment);
    });

    // Test per ottenere un establishment tramite ID
    test('getEstablishmentById', async () => {
        const establishment = await getEstablishmentById(2);

        expect(establishment).toBeInstanceOf(Establishment);
        expect(establishment.establishmentId).toBe(2);
    });

    // Test per ottenere un establishment tramite tipo
    test('getEstablishmentByType', async () => {
        const establishments = await getEstablishmentsByType("Bar");

        expect(Array.isArray(establishments)).toBe(true);
        expect(establishments.length).toBeGreaterThan(0);
        expect(establishments[0]).toBeInstanceOf(Establishment);
    });

    // Test per inserire un nuovo establishment
    test('insertEstablishment', async () => {
        const establishment = {
            name: 'New Establishment',
            type: 'New Type',
            address: 'New Address',
            phone: "1234567890",
            toc: "9:00-18:00"
        }

        const result = await insertEstablishment(establishment);

        expect(result).toBeTruthy();
        // Assuming insertItem returns some result we can check, e.g. the number of rows affected.
    });

    // Test per aggiornare un establishment esistente
    test('updateEstablishment', async () => {
        const updatedColumns = ['name', 'address'];
        const condition = 'establishmentID = ?';
        const values = ['Updated Name', 'Updated Address', 5];

        const result = await updateEstablishment(updatedColumns, condition, values);

        expect(result).toBeTruthy();
        // Check if update was successful
    });

    // Test per eliminare un establishment
    test('deleteEstablishmentWithId', async () => {
        const result = await deleteEstablishmentWithId(5); // Assuming establishmentID 1 exists

        expect(result).toBeTruthy();
        // Check if the establishment with ID 1 was deleted
    });
});
