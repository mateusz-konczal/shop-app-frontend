import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from './model/contact';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  getContact(): Observable<Contact> {
    return this.http.get<Contact>("/api/contact");
  }
}
