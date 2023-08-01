import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartSummary } from '../common/model/cart/cartSummary';
import { CartCommonService } from '../common/service/cart-common.service';
import { CurrencyCommonService } from '../common/service/currency-common.service';
import { InitOrder } from './model/initOrder';
import { Order } from './model/order';
import { OrderSummary } from './model/orderSummary';
import { PaymentNotification } from './model/paymentNotification';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient,
    private cartCommonService: CartCommonService,
    private currencyCommonService: CurrencyCommonService
  ) { }

  getCart(uuid: string): Observable<CartSummary> {
    return this.cartCommonService.getCart(uuid);
  }

  getProductCurrencies(): Observable<Array<string>> {
    return this.currencyCommonService.getProductCurrencies();
  }

  placeOrder(order: Order): Observable<OrderSummary> {
    return this.http.post<OrderSummary>("/api/orders", order);
  }

  getInitOrder(): Observable<InitOrder> {
    return this.http.get<InitOrder>("/api/orders/initOrder");
  }

  getPaymentNotification(orderHash: string): Observable<PaymentNotification> {
    return this.http.get<PaymentNotification>("/api/orders/notification/" + orderHash);
  }
}
