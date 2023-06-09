import { Component, OnInit } from '@angular/core';
import { Homepage } from './model/homepage';
import { HomeService } from './home.service';

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
