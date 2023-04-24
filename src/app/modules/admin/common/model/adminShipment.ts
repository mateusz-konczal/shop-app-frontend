import { AdminShipmentType } from "./adminShipmentType";

export interface AdminShipment {
    id: number,
    name: string,
    price: number,
    type: AdminShipmentType,
    defaultShipment: boolean
}