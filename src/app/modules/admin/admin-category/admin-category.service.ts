import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminCategoryName } from '../common/dto/adminCategoryName';
import { AdminCategory } from './model/adminCategory';

@Injectable({
  providedIn: 'root'
})
export class AdminCategoryService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Array<AdminCategoryName>> {
    return this.http.get<Array<AdminCategoryName>>("/api/admin/categories");
  }

  getCategory(id: number): Observable<AdminCategory> {
    return this.http.get<AdminCategory>("/api/admin/categories/" + id);
  }

  saveCategory(id: number, category: AdminCategory): Observable<AdminCategory> {
    return this.http.put<AdminCategory>("/api/admin/categories/" + id, category);
  }

  saveNewCategory(category: AdminCategory): Observable<AdminCategory> {
    return this.http.post<AdminCategory>("/api/admin/categories", category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>("/api/admin/categories/" + id);
  }
}
