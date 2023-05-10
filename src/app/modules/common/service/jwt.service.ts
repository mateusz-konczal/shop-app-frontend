import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  adminAccess = false;

  constructor() { }

  getAdminAccess(): boolean {
    return this.adminAccess;
  }

  setAdminAccess(adminAccess: boolean) {
    this.adminAccess = adminAccess;
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  setToken(token: string) {
    localStorage.setItem("token", token);
  }

  removeToken() {
    return localStorage.removeItem("token");
  }

  isTokenValid(): boolean {
    let token = localStorage.getItem("token");
    return token != null && this.notExpired(token);
  }

  private notExpired(token: string): boolean {
    let decodedToken = jwt_decode<any>(token);
    return (decodedToken.exp * 1000) > new Date().getTime();
  }
}
