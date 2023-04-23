import { AdminPaymentType } from "./adminPaymentType";

export interface AdminPayment {
    id: number,
    name: string,
    type: AdminPaymentType,
    defaultPayment: boolean,
    note: string
}