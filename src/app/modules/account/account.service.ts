import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewPassword } from './model/newPassword';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  changePassword(newPassword: NewPassword): Observable<void> {
    return this.http.post<void>("/api/newPassword", newPassword);
  }

  deleteAccount(): Observable<void> {
    return this.http.delete<void>("/api/deleteAccount");
  }
}
