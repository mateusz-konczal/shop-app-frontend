import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryProducts } from './model/categoryProducts';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategoryWithProducts(slug: string, page: number, size: number, sort: string): Observable<CategoryProducts> {
    return this.http.get<CategoryProducts>(`/api/categories/${slug}/products?page=${page}&size=${size}&sort=${sort}`);
  }
}
