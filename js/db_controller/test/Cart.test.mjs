import { Cart } from "../../types/Cart";
import { CartItem } from "../../types/CartItem";
import { getCart } from "../Cart";


describe('Cart', () => {
    test('getCart', async () => {
        const cart = await getCart("mario_rossi");

        expect(cart).toBeInstanceOf(Cart);
        expect(cart.cartItems.length).toBeGreaterThan(0);
        expect(cart.cartItems[0]).toBeInstanceOf(CartItem);
    })
})