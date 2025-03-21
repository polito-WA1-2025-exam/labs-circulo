import { getAllergies } from "../Allergy"

describe("Allergy", () => {
    test("getAllergies", async () => {
        const allergies = await getAllergies("mario_rossi");
        //Expect allergies to include "glutine"
        expect(allergies).toContain("glutine");

    });
})

