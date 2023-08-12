import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { Page } from 'src/app/modules/common/model/page';
import { Product } from '../common/model/product';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  page!: Page<Product>;
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
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.subscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.getProductPage(this.initialPageIndex, this.initialPageSize, this.sort));

    this.getProductPage(this.initialPageIndex, this.initialPageSize, "");
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getSortedProducts(sort: string) {
    this.sort = sort;
    this.getProductPage(this.event.pageIndex, this.event.pageSize, sort);
  }

  onPageEvent(event: PageEvent) {
    this.event = event;
    this.getProductPage(event.pageIndex, event.pageSize, this.sort);
  }

  private getProductPage(page: number, size: number, sort: string) {
    let phrase = this.route.snapshot.queryParams['phrase'];
    if (phrase === undefined) {
      phrase = "";
    }
    
    this.productService.getProducts(phrase, page, size, sort)
      .subscribe(page => this.page = page);
  }
}
