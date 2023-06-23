import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminPayment } from '../common/model/adminPayment';

@Injectable({
  providedIn: 'root'
})
export class AdminPaymentService {

  constructor(private http: HttpClient) { }

  getPayments(): Observable<Array<AdminPayment>> {
    return this.http.get<Array<AdminPayment>>("/api/admin/payments");
  }

  getPayment(id: number): Observable<AdminPayment> {
    return this.http.get<AdminPayment>("/api/admin/payments/" + id);
  }

  getPaymentTypes(): Observable<Array<string>> {
    return this.http.get<Array<string>>("/api/admin/payments/initTypes");
  }

  savePayment(id: number, payment: AdminPayment): Observable<AdminPayment> {
    return this.http.put<AdminPayment>("/api/admin/payments/" + id, payment);
  }

  enablePayment(id: number): Observable<void> {
    return this.http.put<void>(`/api/admin/payments/${id}/enable`, '');
  }

  disablePayment(id: number): Observable<void> {
    return this.http.put<void>(`/api/admin/payments/${id}/disable`, '');
  }

  saveNewPayment(payment: AdminPayment): Observable<AdminPayment> {
    return this.http.post<AdminPayment>("/api/admin/payments", payment);
  }

  deletePayment(id: number): Observable<void> {
    return this.http.delete<void>("/api/admin/payments/" + id);
  }
}
