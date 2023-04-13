import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private http: HttpClient) { }

  getNumberOfProductsInCart(cartId: number): Observable<number> {
    return this.http.get<number>("/api/cartItems/count/" + cartId);
  }
}
