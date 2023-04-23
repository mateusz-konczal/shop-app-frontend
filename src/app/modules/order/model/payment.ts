import { PaymentType } from "./paymentType";

export interface Payment {
    id: number,
    name: string,
    type: PaymentType,
    defaultPayment: boolean,
    note: string
}