import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from './cart.service';
import { CartSummary } from './model/cartSummary';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartSummary!: CartSummary;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    let productId = Number(this.route.snapshot.queryParams['productId']);
    if (productId > 0) {
      this.addProductToCart(productId);
    } else {
      this.getCart();
    }
  }

  getCart() {
    let cartId = Number(this.cookieService.get("cartId"));
    if (cartId > 0) {
      this.cartService.getCart(cartId)
        .subscribe(cartSummary => this.cartSummary = cartSummary);
    }
  }

  addProductToCart(productId: number) {
    let cartId = Number(this.cookieService.get("cartId"));
    this.cartService.addProductToCart(cartId, { productId: productId, quantity: 1 })
      .subscribe(cartSummary => {
        this.cartSummary = cartSummary;
        this.cookieService.delete("cartId");
        this.cookieService.set("cartId", cartSummary.id.toString(), this.expireCartAfterDays(3));
        this.router.navigate(["/cart"]);
      });
  }

  expireCartAfterDays(days: number): Date {
    return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  }
}
