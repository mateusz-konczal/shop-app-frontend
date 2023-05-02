import { AdminPayment } from "../../common/model/adminPayment";
import { AdminOrderLog } from "./adminOrderLog";
import { AdminOrderRow } from "./adminOrderRow";

export interface AdminOrderUpdate {
    id: number,
    placeDate: Date,
    orderStatus: string,
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
    payment: AdminPayment,
    orderLogs: Array<AdminOrderLog>
}