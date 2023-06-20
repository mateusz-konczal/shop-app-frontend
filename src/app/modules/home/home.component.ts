import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Homepage } from './model/homepage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  homepage!: Homepage;

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.getHomepage();
  }

  getHomepage() {
    this.homeService.getHomepage()
      .subscribe(homepage => this.homepage = homepage);
  }
}
