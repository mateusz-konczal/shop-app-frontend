import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminCategoryName } from './model/adminCategoryName';

@Injectable({
  providedIn: 'root'
})
export class AdminFormCategoryService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Array<AdminCategoryName>> {
    return this.http.get<Array<AdminCategoryName>>("/api/admin/categories");
  }
}
