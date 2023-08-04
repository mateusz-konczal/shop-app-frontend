import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { CategoryService } from './category.service';
import { CategoryProducts } from './model/categoryProducts';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {

  categoryProducts!: CategoryProducts;
  sort = "";
  initialPageIndex = 0;
  initialPageSize = 10;
  event: PageEvent = {
    pageIndex: this.initialPageIndex,
    pageSize: this.initialPageSize,
    length: this.initialPageSize
  }
  private subscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.subscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.getCategoryWithProducts(this.initialPageIndex, this.initialPageSize, this.sort));

    this.getCategoryWithProducts(this.initialPageIndex, this.initialPageSize, "");
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getCategoryWithSortedProducts(sort: string) {
    this.sort = sort;
    this.getCategoryWithProducts(this.event.pageIndex, this.event.pageSize, sort);
  }

  onPageEvent(event: PageEvent) {
    this.event = event;
    this.getCategoryWithProducts(event.pageIndex, event.pageSize, this.sort);
  }

  private getCategoryWithProducts(page: number, size: number, sort: string) {
    let slug = this.route.snapshot.params['slug'];
    this.categoryService.getCategoryWithProducts(slug, page, size, sort)
      .subscribe(categoryProducts => this.categoryProducts = categoryProducts);
  }
}
