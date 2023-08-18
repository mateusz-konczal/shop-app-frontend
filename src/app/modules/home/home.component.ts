import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { HomeService } from './home.service';
import { Homepage } from './model/homepage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  homepage!: Homepage;
  sortingForm!: FormGroup;
  sort = "";
  private subscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder,
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.subscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.getHomepage(this.sort));

    this.initHomepage();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getSortedSaleProducts(sort: string) {
    this.sort = sort;
    this.getHomepage(sort);
  }

  private initHomepage() {
    let sort = this.route.snapshot.queryParams['sort'];

    if (sort === undefined) {
      this.sortingForm = this.formBuilder.group({
        sorting: ['']
      });
      this.getHomepage(this.sort);
    } else {
      this.sortingForm = this.formBuilder.group({
        sorting: [sort]
      });
      this.sort = sort;
      this.getHomepage(sort);
    }
  }

  private getHomepage(sort: string) {
    this.homeService.getHomepage(sort)
      .subscribe(homepage => this.homepage = homepage);
    this.setQueryParameters(sort);
  }

  private setQueryParameters(sort: string) {
    let url = this.router.createUrlTree([], { relativeTo: this.route, queryParams: { sort: sort } }).toString();
    this.location.replaceState(url);
  }
}
