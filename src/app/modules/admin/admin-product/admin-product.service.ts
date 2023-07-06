import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from 'src/app/modules/common/model/page';
import { AdminProduct } from '../common/model/adminProduct';

@Injectable({
  providedIn: 'root'
})
export class AdminProductService {

  constructor(private http: HttpClient) { }

  getProducts(page: number, size: number): Observable<Page<AdminProduct>> {
    return this.http.get<Page<AdminProduct>>(`/api/admin/products?page=${page}&size=${size}`);
  }

  enableProduct(id: number): Observable<void> {
    return this.http.put<void>(`/api/admin/products/${id}/enable`, '');
  }

  disableProduct(id: number): Observable<void> {
    return this.http.put<void>(`/api/admin/products/${id}/disable`, '');
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>("/api/admin/products/" + id);
  }
}
