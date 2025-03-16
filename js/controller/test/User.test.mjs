import { getUser, getUsernames} from "../User";

describe("User", () => {
    test("getUser", async () => {
        const user = await getUser("mario_rossi");        
        
        expect(user).toHaveProperty("username", "mario_rossi");
    });

    test("getUsernames", async () => {
        const usernames = await getUsernames();

        
        expect(Array.isArray(usernames)).toBe(true);
        expect(usernames.length).toBeGreaterThan(0);
    });
})