import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CurrencyCommonService {

    constructor(private http: HttpClient) { }

    getProductCurrencies(): Observable<Array<string>> {
        return this.http.get<Array<string>>("/api/products/currencies");
    }
}
