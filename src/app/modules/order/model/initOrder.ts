import { Payment } from "./payment";
import { Shipment } from "./shipment";

export interface InitOrder {
    shipments: Array<Shipment>
    payments: Array<Payment>
}