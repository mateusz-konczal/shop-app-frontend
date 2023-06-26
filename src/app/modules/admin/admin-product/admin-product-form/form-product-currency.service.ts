import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrencyCommonService } from 'src/app/modules/common/service/currency-common.service';

@Injectable({
  providedIn: 'root'
})
export class FormProductCurrencyService {

  constructor(private currencyCommonService: CurrencyCommonService) { }

  getProductCurrencies(): Observable<Array<string>> {
    return this.currencyCommonService.getProductCurrencies();
  }
}
