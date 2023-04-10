import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HeaderService } from './header.service';
import { CartIconService } from 'src/app/modules/common/service/cart-icon.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title = "Shop";
  cartProductCounter = "";

  constructor(
    private headerService: HeaderService,
    private cookieService: CookieService,
    private cartIconService: CartIconService
  ) { }

  ngOnInit(): void {
    this.getNumberOfProductsInCart();
    this.cartIconService.subject
      .subscribe(counter => this.cartProductCounter = String(counter > 0 ? counter : ""));
  }

  getNumberOfProductsInCart() {
    let cartId = Number(this.cookieService.get("cartId"));
    this.headerService.getNumberOfProductsInCart(cartId)
      .subscribe(counter => this.cartProductCounter = String(counter > 0 ? counter : ""));
  }
}
