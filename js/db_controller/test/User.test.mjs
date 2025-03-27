import { 
    getUser, 
    getUsernames, 
    deleteUser, 
    insertUser, 
    updateUser 
} from "../User";
import { User } from "../../types/User";

describe("User", () => {
    
    test("getUsernames", async () => {
        const usernames = await getUsernames();

        expect(Array.isArray(usernames)).toBe(true);
        expect(usernames.length).toBeGreaterThan(0);
        expect(typeof usernames[0]).toBe("string");
    });

    test("getUser", async () => {
        const user = await getUser("mario_rossi");

        expect(user).toBeInstanceOf(User);
        expect(user).toHaveProperty("username", "mario_rossi");
        expect(user).toHaveProperty("cart");
        expect(user).toHaveProperty("reservations");
        expect(user).toHaveProperty("allergies");
    });

    test("insertUser", async () => {
        const newUser = {
            username: "test_user",
            name: "Test User",
            password: "test_password",
        };

        const result = await insertUser(newUser);
        expect(result).toBeTruthy();

        const insertedUser = await getUser("test_user");
        expect(insertedUser).toBeInstanceOf(User);
        expect(insertedUser.username).toBe("test_user");
    });

    test("updateUser", async () => {
        const updateColumns = ["name"];
        const condition = "username = ?";
        const values = ["Updated Name", "test_user"];

        const result = await updateUser(updateColumns, condition, values);
        expect(result).toBeTruthy();

        const updatedUser = await getUser("test_user");
        expect(updatedUser.name).toBe("Updated Name");
    });

    test("deleteUser", async () => {
        const result = await deleteUser("test_user");
        expect(result).toBeTruthy();

    });
});
