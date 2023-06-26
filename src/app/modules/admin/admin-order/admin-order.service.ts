import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../../common/model/page';
import { CurrencyCommonService } from '../../common/service/currency-common.service';
import { AdminOrderStats } from './admin-order-stats/model/adminOrderStats';
import { AdminOrder } from './model/adminOrder';
import { AdminOrderUpdate } from './model/adminOrderUpdate';

@Injectable({
  providedIn: 'root'
})
export class AdminOrderService {

  constructor(
    private http: HttpClient,
    private currencyCommonService: CurrencyCommonService
  ) { }

  getOrders(page: number, size: number): Observable<Page<AdminOrder>> {
    return this.http.get<Page<AdminOrder>>(`/api/admin/orders?page=${page}&size=${size}`);
  }

  getOrder(id: number): Observable<AdminOrderUpdate> {
    return this.http.get<AdminOrderUpdate>("/api/admin/orders/" + id);
  }

  getOrderStatuses(): Observable<any> {
    return this.http.get<any>("/api/admin/orders/initStatuses");
  }

  saveOrderStatus(id: number, status: string): Observable<void> {
    return this.http.patch<void>("/api/admin/orders/" + id, status);
  }

  exportOrders(from: string, to: string, orderStatus: string): Observable<any> {
    return this.http.get(`/api/admin/orders/export?from=${from}&to=${to}&orderStatus=${orderStatus}`,
      { responseType: 'blob', observe: 'response' });
  }

  getSalesStatistics(): Observable<AdminOrderStats> {
    return this.http.get<AdminOrderStats>("/api/admin/orders/stats");
  }

  getProductCurrencies(): Observable<Array<string>> {
    return this.currencyCommonService.getProductCurrencies();
  }
}
