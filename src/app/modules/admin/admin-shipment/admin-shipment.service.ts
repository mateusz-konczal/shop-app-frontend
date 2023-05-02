import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminShipment } from '../common/model/adminShipment';

@Injectable({
  providedIn: 'root'
})
export class AdminShipmentService {

  constructor(private http: HttpClient) { }

  getShipments(): Observable<Array<AdminShipment>> {
    return this.http.get<Array<AdminShipment>>("/api/admin/shipments");
  }

  getShipment(id: number): Observable<AdminShipment> {
    return this.http.get<AdminShipment>("/api/admin/shipments/" + id);
  }

  getShipmentTypes(): Observable<Array<string>> {
    return this.http.get<Array<string>>("api/admin/shipments/initTypes");
  }

  saveShipment(id: number, shipment: AdminShipment): Observable<AdminShipment> {
    return this.http.put<AdminShipment>("/api/admin/shipments/" + id, shipment);
  }

  saveNewShipment(shipment: AdminShipment): Observable<AdminShipment> {
    return this.http.post<AdminShipment>("/api/admin/shipments", shipment);
  }

  deleteShipment(id: number): Observable<void> {
    return this.http.delete<void>("/api/admin/shipments/" + id);
  }
}
