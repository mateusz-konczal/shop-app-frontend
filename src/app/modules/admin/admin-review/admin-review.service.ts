import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminReview } from './model/adminReview';
import { Observable } from 'rxjs';
import { Page } from '../../common/model/page';

@Injectable({
  providedIn: 'root'
})
export class AdminReviewService {

  constructor(private http: HttpClient) { }

  getReviews(page: number, size: number): Observable<Page<AdminReview>> {
    return this.http.get<Page<AdminReview>>(`/api/admin/reviews?page=${page}&size=${size}`);
  }

  moderateReview(id: number): Observable<void> {
    return this.http.put<void>(`/api/admin/reviews/${id}/moderate`, '');
  }

  deleteReview(id: number): Observable<void> {
    return this.http.delete<void>("/api/admin/reviews/" + id);
  }
}
