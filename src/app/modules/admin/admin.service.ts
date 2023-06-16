import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminProduct } from './common/model/adminProduct';
import { Page } from '../common/model/page';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getSaleProducts(page: number, size: number): Observable<Page<AdminProduct>> {
    return this.http.get<Page<AdminProduct>>(`/api/admin/dashboard/saleProducts?page=${page}&size=${size}`);
  }

  deleteSaleProduct(id: number): Observable<void> {
    return this.http.delete<void>("/api/admin/dashboard/saleProducts/" + id);
  }

  clearAllCaches(): Observable<void> {
    return this.http.get<void>("/api/admin/dashboard/caches/clearAll");
  }
}
