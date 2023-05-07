import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  setToken(token: string) {
    localStorage.setItem("token", token);
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }
}
