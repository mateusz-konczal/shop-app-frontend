import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderReadDto } from './model/orderReadDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserOrdersService {

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Array<OrderReadDto>> {
    return this.http.get<Array<OrderReadDto>>("/api/orders");
  }
}
