import dayjs from "dayjs";
import { openDb } from "../db/async_sqlite";
import { getAvailableBagsFromDateTime } from "../db/controller/Bag";
import { getUser, getUsernames } from "../db/controller/User";

async function testVari(){
    const db = await openDb("db/food.sqlite")
    const usernames = await getUsernames(db)

    const user1 = usernames[1]

    const user = await getUser(db, user1)

    // console.log(user);

    // console.log(user.cart?.cartItems);
    const date = dayjs("2025-02-20 00:00:00")
    
    
    console.log(await getAvailableBagsFromDateTime(db, date))
}


testVari()