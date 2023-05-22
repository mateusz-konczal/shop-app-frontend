import { Component } from '@angular/core';
import { NavigationService } from './modules/common/service/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Shop';
  readonly PASSWORD_REGEX = "^(?=.*[a-ząćęłńóśźż])(?=.*[A-ZĄĆĘŁŃÓŚŹŻ])(?=.*\\d)[a-ząćęłńóśźżA-ZĄĆĘŁŃÓŚŹŻ\\d\\S]{8,}$";

  constructor(navigationService: NavigationService) { }
}
