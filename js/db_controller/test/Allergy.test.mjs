import { 
    getAllergies, 
    getAllergyByUsername, 
    deleteAllergyByUsername, 
    updateAllergy, 
    insertAllergy, 
    checkUserExists 
} from "../Allergy";

describe("Allergy", () => {
    
    test("getAllergies", async () => {
        const allergies = await getAllergies();
        expect(Array.isArray(allergies)).toBe(true);
        expect(allergies.length).toBeGreaterThan(0);
        expect(typeof allergies[0]).toBe("string");
    });
    
    test("getAllergyByUsername", async () => {
        const allergies = await getAllergyByUsername("mario_rossi");
        expect(Array.isArray(allergies)).toBe(true);
        expect(allergies).toContain("glutine");
    });
    
    test("insertAllergy", async () => {
        const username = "test_user";
        const allergy = "lattosio"; // Cambia l'allergia in base alle necessità
    
        // Esegui l'inserimento dell'allergia
        const result = await insertAllergy(username, allergy);
        expect(result).toBeTruthy(); // Verifica che l'inserimento abbia successo
    
        // Recupera le allergie dell'utente per verificarne l'inserimento
        const allergies = await getAllergyByUsername(username);
        expect(allergies).toContain(allergy); // Verifica che l'allergia sia stata aggiunta
    });
    
    test("updateAllergy", async () => {
        const oldAllergy = "lattosio";
        const newAllergy = "uova";
        
        // Assicurati che l'allergia esista prima di aggiornarla
        let existingAllergies = await getAllergyByUsername("test_user");
        if (!existingAllergies.includes(oldAllergy)) {
            // Inserisci l'allergia prima se non esiste
            await insertAllergy("test_user", oldAllergy);
            existingAllergies = await getAllergyByUsername("test_user");
        }
        
        // Ora possiamo eseguire l'aggiornamento
        const updateColumns = ["allergy"];
        const condition = "username = ? AND allergy = ?";
        const values = [newAllergy, "test_user", oldAllergy];
        
        const result = await updateAllergy(updateColumns, condition, values);
        expect(result).toBeTruthy();
        
        // Verifica che l'allergia sia stata aggiornata correttamente
        const updatedAllergies = await getAllergyByUsername("test_user");
        expect(updatedAllergies).toContain(newAllergy);
        expect(updatedAllergies).not.toContain(oldAllergy);
    });
    
    test("deleteAllergyByUsername", async () => {
    const username = "test_user";
    const allergy = "lattosio"; // Cambia l'allergia in base alle necessità

    // Assicurati che l'allergia esista prima di eliminarla
    const allergiesBefore = await getAllergyByUsername(username);
    if (!allergiesBefore.includes(allergy)) {
        // Se l'allergia non esiste, inseriamola prima
        const insertResult = await insertAllergy(username, allergy);
        expect(insertResult).toBeTruthy(); // Verifica che l'inserimento abbia successo
    }

    // Elimina l'allergia
    const deleteResult = await deleteAllergyByUsername(username, allergy);
    expect(deleteResult).toBeTruthy(); // Verifica che l'eliminazione abbia successo

    // Recupera le allergie dopo l'eliminazione e verifica che l'allergia sia stata rimossa
    const allergiesAfter = await getAllergyByUsername(username);
    expect(allergiesAfter).not.toContain(allergy); // Verifica che l'allergia sia stata rimossa
});
    
    test("checkUserExists", async () => {
        const exists = await checkUserExists("mario_rossi");
        expect(exists).toBe(true);
        
        const notExists = await checkUserExists("fake_user");
        expect(notExists).toBe(false);
    });
});
