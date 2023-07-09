import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartSummary } from '../common/model/cart/cartSummary';
import { CartCommonService } from '../common/service/cart-common.service';
import { CurrencyCommonService } from '../common/service/currency-common.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

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

  addProductToCart(uuid: string, cartItem: any): Observable<CartSummary> {
    return this.http.put<CartSummary>(`/api/carts?uuid=${uuid}`, cartItem);
  }

  updateCart(uuid: string, cartItems: any[]): Observable<CartSummary> {
    return this.http.put<CartSummary>(`/api/carts/${uuid}/update`, cartItems);
  }

  deleteCartItem(itemId: number): Observable<void> {
    return this.http.delete<void>("/api/cartItems/" + itemId);
  }
}
