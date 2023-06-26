import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CartIconService } from 'src/app/modules/common/service/cart-icon.service';
import { JwtService } from 'src/app/modules/common/service/jwt.service';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title = "Shop";
  cartProductCounter = "";
  isLoggedIn = false;

  constructor(
    private headerService: HeaderService,
    private cookieService: CookieService,
    private cartIconService: CartIconService,
    private jwtService: JwtService
  ) { }

  ngOnInit(): void {
    this.getNumberOfProductsInCart();
    this.cartIconService.subject
      .subscribe(counter => this.cartProductCounter = String(counter > 0 ? counter : ""));
    this.isLoggedIn = this.jwtService.isTokenValid();
  }

  getNumberOfProductsInCart() {
    let cartId = Number(this.cookieService.get("cartId"));
    this.headerService.getNumberOfProductsInCart(cartId)
      .subscribe(counter => this.cartProductCounter = String(counter > 0 ? counter : ""));
  }

  logout() {
    this.jwtService.removeToken();
    window.location.reload();
  }
}
