import { selectItems } from "../db_handler.mjs";

export async function getEstablishments() {
    return selectItems()
}