import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginCredentials } from './model/loginCredentials';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {

  constructor(private http: HttpClient) { }

  login(credentials: LoginCredentials): Observable<any> {
    return this.http.post<any>("/api/login", credentials)
  }
}
