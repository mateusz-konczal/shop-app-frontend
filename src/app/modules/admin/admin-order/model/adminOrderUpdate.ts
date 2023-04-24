import { AdminPayment } from "../../common/model/adminPayment";
import { AdminOrderRow } from "./adminOrderRow";
import { AdminOrderStatus } from "./adminOrderStatus";

export interface AdminOrderUpdate {
    id: number,
    placeDate: Date,
    orderStatus: AdminOrderStatus,
    totalValue: number,
    firstName: string,
    lastName: string,
    street: string,
    houseNumber: string,
    apartmentNumber: string,
    zipCode: string,
    city: string,
    email: string,
    phone: string,
    orderRows: Array<AdminOrderRow>,
    payment: AdminPayment
}