import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from 'src/app/modules/common/model/page';
import { Product } from 'src/app/modules/common/model/product';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private http: HttpClient) { }

  getNumberOfProductsInCart(cartUuid: string): Observable<number> {
    return this.http.get<number>("/api/cartItems/count/" + cartUuid);
  }

  getFilteredProducts(phrase: string): Observable<Page<Product>> {
    return this.http.get<Page<Product>>(`api/products/by?phrase=${phrase}`);
  }
}
