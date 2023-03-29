import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetails } from './model/productDetails';
import { ProductDetailsService } from './product-details.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product!: ProductDetails;

  constructor(
    private router: ActivatedRoute,
    private productDetailsService: ProductDetailsService
  ) { }

  ngOnInit(): void {
    this.getProductDetails();
  }

  getProductDetails() {
    let slug = this.router.snapshot.params['slug'];
    this.productDetailsService
      .getProductDetails(slug)
      .subscribe(product => this.product = product);
  }
}
