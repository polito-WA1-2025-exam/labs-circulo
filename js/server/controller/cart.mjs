import dayjs from "dayjs";
import * as CartController from "../../db_controller/Cart.mjs";

async function test(req, res) {
    res.json({ message: 'Reservation API works just fine' });
}


export default{
    test,
}