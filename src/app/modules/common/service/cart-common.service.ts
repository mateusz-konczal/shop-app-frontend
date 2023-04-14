import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartSummary } from '../model/cart/cartSummary';

@Injectable({
  providedIn: 'root'
})
export class CartCommonService {

  constructor(private http: HttpClient) { }

  getCart(id: number): Observable<CartSummary> {
    return this.http.get<CartSummary>("/api/carts/" + id);
  }
}
