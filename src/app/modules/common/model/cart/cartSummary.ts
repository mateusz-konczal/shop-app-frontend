import { CartItemSummary } from "./cartItemSummary";
import { Summary } from "./summary";

export interface CartSummary {
    uuid: string,
    items: Array<CartItemSummary>,
    summary: Summary
}