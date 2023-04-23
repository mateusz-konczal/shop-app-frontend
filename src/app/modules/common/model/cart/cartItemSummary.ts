import { CartProduct } from "./cartProduct";

export interface CartItemSummary {
    id: number,
    quantity: number,
    product: CartProduct,
    lineValue: number
}