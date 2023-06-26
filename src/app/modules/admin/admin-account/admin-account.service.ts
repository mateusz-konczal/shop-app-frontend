import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminNewPassword } from './model/adminNewPassword';

@Injectable({
  providedIn: 'root'
})
export class AdminAccountService {

  constructor(private http: HttpClient) { }

  changePassword(newPassword: AdminNewPassword): Observable<void> {
    return this.http.post<void>("/api/admin/newPassword", newPassword);
  }

  deleteAccount(): Observable<void> {
    return this.http.delete<void>("/api/admin/deleteAccount");
  }
}
