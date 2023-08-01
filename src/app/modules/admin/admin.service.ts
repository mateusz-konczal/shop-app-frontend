import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../common/model/page';
import { AdminProduct } from './common/model/adminProduct';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getSaleProducts(page: number, size: number): Observable<Page<AdminProduct>> {
    return this.http.get<Page<AdminProduct>>(`/api/admin/dashboard/saleProducts?page=${page}&size=${size}`);
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

  clearAllCaches(): Observable<void> {
    return this.http.get<void>("/api/admin/dashboard/caches/clearAll");
  }
}
