import { Payment } from "./payment";
import { Shipment } from "./shipment";

export interface OrderSummary {
    id: number,
    placeDate: Date,
    status: string,
    totalValue: number,
    shipment: Shipment,
    payment: Payment
}