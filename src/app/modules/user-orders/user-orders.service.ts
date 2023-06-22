import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrencyCommonService } from '../common/service/currency-common.service';
import { OrderReadDto } from './model/orderReadDto';

@Injectable({
  providedIn: 'root'
})
export class UserOrdersService {

  constructor(
    private http: HttpClient,
    private currencyCommonService: CurrencyCommonService
  ) { }

  getOrders(): Observable<Array<OrderReadDto>> {
    return this.http.get<Array<OrderReadDto>>("/api/orders");
  }

  getProductCurrencies(): Observable<Array<string>> {
    return this.currencyCommonService.getProductCurrencies();
  }
}
