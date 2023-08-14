import { Location } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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
export class ProductComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  page!: Page<Product>;
  sortingForm!: FormGroup;
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
    private location: Location,
    private formBuilder: FormBuilder,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.subscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.event.pageIndex = this.initialPageIndex;
        this.getProductsPage(this.initialPageIndex, this.event.pageSize, this.sort);
      });

    this.initProductsPage();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.paginator.pageIndex = this.event.pageIndex;
    this.paginator.pageSize = this.event.pageSize;
  }

  getSortedProducts(sort: string) {
    this.sort = sort;
    this.getProductsPage(this.event.pageIndex, this.event.pageSize, this.sort);
  }

  onPageEvent(event: PageEvent) {
    this.event = event;
    this.getProductsPage(this.event.pageIndex, this.event.pageSize, this.sort);
  }

  private initProductsPage() {
    let pageIndex = this.route.snapshot.queryParams['page'];
    let pageSize = this.route.snapshot.queryParams['size'];
    let sort = this.route.snapshot.queryParams['sort'];

    if (pageIndex === undefined || pageSize === undefined || sort === undefined) {
      this.sortingForm = this.formBuilder.group({
        sorting: ['']
      });
      this.getProductsPage(this.initialPageIndex, this.initialPageSize, this.sort);
    } else {
      this.sortingForm = this.formBuilder.group({
        sorting: [sort]
      });
      this.event.pageIndex = pageIndex;
      this.event.pageSize = pageSize;
      this.sort = sort;
      this.getProductsPage(pageIndex, pageSize, sort);
    }
  }

  private getProductsPage(pageIndex: number, pageSize: number, sort: string) {
    let phrase = this.route.snapshot.queryParams['phrase'];
    if (phrase === undefined) {
      phrase = "";
    }
    this.productService.getProducts(phrase, pageIndex, pageSize, sort)
      .subscribe(page => this.page = page);
    this.setQueryParameters(phrase, pageIndex, pageSize, sort);
  }

  private setQueryParameters(phrase: string, pageIndex: number, pageSize: number, sort: string) {
    let url = this.router.createUrlTree([], {
      relativeTo: this.route, queryParams: {
        phrase: phrase, page: pageIndex, size: pageSize, sort: sort
      }
    }).toString();
    this.location.replaceState(url);
  }
}
