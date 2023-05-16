import { Component } from '@angular/core';
import { NavigationService } from './modules/common/service/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Shop';

  constructor(navigationService: NavigationService) { }
}
