import { Location } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { CategoryService } from './category.service';
import { CategoryProducts } from './model/categoryProducts';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  categoryProducts!: CategoryProducts;
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
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.subscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.event.pageIndex = this.initialPageIndex;
        this.getCategoryWithProducts(this.initialPageIndex, this.event.pageSize, this.sort);
      });

    this.initCategoryWithProducts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.paginator.pageIndex = this.event.pageIndex;
    this.paginator.pageSize = this.event.pageSize;
  }

  getCategoryWithSortedProducts(sort: string) {
    this.sort = sort;
    this.getCategoryWithProducts(this.event.pageIndex, this.event.pageSize, this.sort);
  }

  onPageEvent(event: PageEvent) {
    this.event = event;
    this.getCategoryWithProducts(this.event.pageIndex, this.event.pageSize, this.sort);
  }

  private initCategoryWithProducts() {
    let pageIndex = this.route.snapshot.queryParams['page'];
    let pageSize = this.route.snapshot.queryParams['size'];
    let sort = this.route.snapshot.queryParams['sort'];

    if (pageIndex === undefined || pageSize === undefined || sort === undefined) {
      this.sortingForm = this.formBuilder.group({
        sorting: ['']
      });
      this.getCategoryWithProducts(this.initialPageIndex, this.initialPageSize, this.sort);
    } else {
      this.sortingForm = this.formBuilder.group({
        sorting: [sort]
      });
      this.event.pageIndex = pageIndex;
      this.event.pageSize = pageSize;
      this.sort = sort;
      this.getCategoryWithProducts(pageIndex, pageSize, sort);
    }
  }

  private getCategoryWithProducts(pageIndex: number, pageSize: number, sort: string) {
    let slug = this.route.snapshot.params['slug'];
    this.categoryService.getCategoryWithProducts(slug, pageIndex, pageSize, sort)
      .subscribe(categoryProducts => this.categoryProducts = categoryProducts);
    this.setQueryParameters(pageIndex, pageSize, sort);
  }

  private setQueryParameters(pageIndex: number, pageSize: number, sort: string) {
    let url = this.router.createUrlTree([], {
      relativeTo: this.route, queryParams: {
        page: pageIndex, size: pageSize, sort: sort
      }
    }).toString();
    this.location.replaceState(url);
  }
}
