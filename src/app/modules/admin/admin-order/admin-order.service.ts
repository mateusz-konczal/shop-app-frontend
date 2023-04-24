import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../../common/model/page';
import { AdminOrder } from './model/adminOrder';
import { AdminOrderUpdate } from './model/adminOrderUpdate';

@Injectable({
  providedIn: 'root'
})
export class AdminOrderService {

  constructor(private http: HttpClient) { }

  getOrders(page: number, size: number): Observable<Page<AdminOrder>> {
    return this.http.get<Page<AdminOrder>>(`/api/admin/orders?page=${page}&size=${size}`);
  }
  
  getOrder(id: number): Observable<AdminOrderUpdate> {
    return this.http.get<AdminOrderUpdate>("/api/admin/orders/" + id);
  }
}
