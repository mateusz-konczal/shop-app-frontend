import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Homepage } from './model/homepage';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getHomepage(sort: string): Observable<Homepage> {
    return this.http.get<Homepage>(`/api/homepage?sort=${sort}`);
  }
}
