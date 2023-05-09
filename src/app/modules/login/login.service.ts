import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterCredentials } from './model/registerCredentials';
import { LoginCredentials } from '../common/model/security/loginCredentials';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(credentials: LoginCredentials): Observable<any> {
    return this.http.post<any>("/api/login", credentials);
  }

  register(credentials: RegisterCredentials): Observable<any> {
    return this.http.post<any>("/api/register", credentials);
  }
}
