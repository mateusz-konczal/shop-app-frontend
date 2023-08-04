import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Page } from 'src/app/modules/common/model/page';
import { Product } from '../common/model/product';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  page!: Page<Product>;
  sort = "";
  initialPageIndex = 0;
  initialPageSize = 10;
  event: PageEvent = {
    pageIndex: this.initialPageIndex,
    pageSize: this.initialPageSize,
    length: this.initialPageSize
  }

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProductPage(this.initialPageIndex, this.initialPageSize, "");
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
    this.productService.getProducts(page, size, sort)
      .subscribe(page => this.page = page);
  }
}
