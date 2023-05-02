import { AdminProduct } from "../../common/model/adminProduct";
import { AdminShipment } from "../../common/model/adminShipment";

export interface AdminOrderRow {
    id: number,
    orderId: number,
    product: AdminProduct,
    quantity: number,
    price: number,
    shipment: AdminShipment
}