import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterCredentials } from './model/registerCredentials';
import { LoginCredentials } from '../common/model/security/loginCredentials';
import { Token } from '../common/model/security/token';
import { Email } from './model/email';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(credentials: LoginCredentials): Observable<Token> {
    return this.http.post<Token>("/api/login", credentials);
  }

  register(credentials: RegisterCredentials): Observable<Token> {
    return this.http.post<Token>("/api/register", credentials);
  }

  resetPassword(email: Email): Observable<void> {
    return this.http.post<void>("/api/lostPassword", email);
  }
}
