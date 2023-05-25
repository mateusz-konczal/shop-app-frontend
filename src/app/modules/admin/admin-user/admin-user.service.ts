import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../../common/model/page';
import { AdminUserReadDto } from './model/adminUserReadDto';
import { AdminUser } from './model/adminUser';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

  constructor(private http: HttpClient) { }

  getUsers(page: number, size: number): Observable<Page<AdminUserReadDto>> {
    return this.http.get<Page<AdminUserReadDto>>(`/api/admin/users?page=${page}&size=${size}`);
  }

  getUserRoles(): Observable<any> {
    return this.http.get<any>("/api/admin/users/initRoles");
  }

  saveNewUser(user: AdminUser): Observable<void> {
    return this.http.post<void>("/api/admin/users", user);
  }

  enableUser(id: number): Observable<void> {
    return this.http.put<void>(`/api/admin/users/${id}/enable`, '');
  }

  disableUser(id: number): Observable<void> {
    return this.http.put<void>(`/api/admin/users/${id}/disable`, '');
  }
}
