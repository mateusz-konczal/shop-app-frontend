import { ShipmentType } from "./shipmentType";

export interface Shipment {
    id: number,
    name: string,
    price: number,
    type: ShipmentType,
    defaultShipment: boolean
}