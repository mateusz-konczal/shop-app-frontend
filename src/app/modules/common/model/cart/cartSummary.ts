import { CartItemSummary } from "./cartItemSummary";
import { Summary } from "./summary";

export interface CartSummary {
    id: number,
    items: Array<CartItemSummary>,
    summary: Summary
}