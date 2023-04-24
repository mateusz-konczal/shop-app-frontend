import { AdminOrderStatus } from "./adminOrderStatus";

export interface AdminOrder {
    id: number,
    placeDate: Date,
    orderStatus: AdminOrderStatus,
    totalValue: number
}