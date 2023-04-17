import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartCommonService } from '../common/service/cart-common.service';
import { CartSummary } from '../common/model/cart/cartSummary';
import { Observable } from 'rxjs';
import { OrderSummary } from './model/orderSummary';
import { Order } from './model/order';
import { InitOrder } from './model/initOrder';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient,
    private cartCommonService: CartCommonService
  ) { }

  getCart(id: number): Observable<CartSummary> {
    return this.cartCommonService.getCart(id);
  }

  placeOrder(order: Order): Observable<OrderSummary> {
    return this.http.post<OrderSummary>("/api/orders", order);
  }

  getInitOrder(): Observable<InitOrder> {
    return this.http.get<InitOrder>("/api/orders/initOrder");
  }
}
