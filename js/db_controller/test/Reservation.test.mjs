import { getReservations, 
    insertReservation, 
    checkUserExists, 
    checkBagExists, 
    getReservationsByUsername, 
    deleteReservationByBagID, 
    updateReservation } from "../../db_controller/Reservation.mjs";
import { Bag } from "../../types/Bag.mjs";

describe("Reservation", () => {

test("getReservations", async () => {
   const reservations = await getReservations();

   expect(Array.isArray(reservations)).toBe(true);
   expect(reservations.length).toBeGreaterThan(0);
   expect(reservations[0]).toBeInstanceOf(Bag);
});

test("getReservationsByUsername", async () => {
   const reservations = await getReservationsByUsername("mario_rossi");

   expect(Array.isArray(reservations)).toBe(true);
   expect(reservations.length).toBeGreaterThan(0);
   expect(reservations[0]).toBeInstanceOf(Bag);

});

test("insertReservation", async () => {
   // Verifica se l'utente e la bag esistono prima di inserire
   const username = "test_user";
   const bagID = 106;

   /*const userExists = await checkUserExists(username);
   expect(userExists).toBe(true);

   const bagExists = await checkBagExists(bagID);
   expect(bagExists).toBe(true);*/

   // Inserisci la prenotazione
   const result = await insertReservation(username, bagID);
   expect(result).toBeTruthy();  // Verifica che l'inserimento sia andato a buon fine

   // Verifica che la prenotazione sia stata inserita
   const reservations = await getReservationsByUsername(username);
   expect(reservations.some(res => res.bagID === bagID)).toBe(true);
});


test("updateReservation", async () => {
    const newBagID = 107; // Un altro ID bag valido
    const username = "test_user";
    const bagID = 106;
 
    // Verifica che la prenotazione esista prima di aggiornarla
    let reservations = await getReservationsByUsername(username);
 
    // Se non esiste, inseriamo la prenotazione prima
    if (!reservations) {
        await insertReservation(username, bagID);
        reservations = await getReservationsByUsername(username);
    }
 
    // Esegui l'aggiornamento della prenotazione
    const result = await updateReservation(
        ["bagID"],  // Colonna da aggiornare
        "username = ? AND bagID = ?",  // Condizione
        [newBagID, username, bagID]    // Nuovo valore e parametri
    );
    expect(result).toBeTruthy();  // Verifica che l'aggiornamento sia andato a buon fine
 
    // Verifica che la prenotazione sia stata aggiornata
    reservations = await getReservationsByUsername(username);
    expect(reservations.some(res => res.bagID === newBagID)).toBe(true);
    expect(reservations.some(res => res.bagID === bagID)).toBe(false);
 });
 
 /*
 test("deleteReservationByBagID", async () => {
    const username = "test_user";
    const bagID = 107; // ID della bag che vogliamo eliminare

    // Assicurati che la prenotazione esista prima di eliminarla
    const  reservations = await getReservationsByUsername(username);

    if (!reservations) {
        // Se la prenotazione non esiste, inseriamola prima
        const insertResult = await insertReservation(username, bagID);
        expect(insertResult).toBeTruthy(); // Verifica che l'inserimento abbia successo
    }

    // Elimina la prenotazione
    const deleteResult = await deleteReservationByBagID(username, bagID);
    expect(deleteResult).toBeTruthy(); // Verifica che l'eliminazione abbia successo

    // Recupera le prenotazioni dopo l'eliminazione e verifica che la bagID sia stata rimossa
    reservations = await getReservationsByUsername(username);
    expect(reservations.some(res => res.bagID === bagID)).toBe(false); // Verifica che la prenotazione sia stata eliminata
});*/

});
