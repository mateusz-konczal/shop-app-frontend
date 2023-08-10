import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Page } from 'src/app/modules/common/model/page';
import { Product } from 'src/app/modules/common/model/product';
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
  filterForm!: FormGroup;
  page!: Page<Product>;

  constructor(
    private formBuilder: FormBuilder,
    private headerService: HeaderService,
    private cookieService: CookieService,
    private cartIconService: CartIconService,
    private jwtService: JwtService
  ) { }

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      phrase: ['']
    });

    this.getNumberOfProductsInCart();
    this.cartIconService.subject
      .subscribe(counter => this.cartProductCounter = String(counter > 0 ? counter : ""));
    this.isLoggedIn = this.jwtService.isTokenValid();
  }

  getNumberOfProductsInCart() {
    let cartUuid = this.cookieService.get("cartUuid");
    if (cartUuid != "") {
      this.headerService.getNumberOfProductsInCart(cartUuid)
        .subscribe(counter => this.cartProductCounter = String(counter > 0 ? counter : ""));
    }
  }

  getFilteredProducts() {
    this.headerService.getFilteredProducts(this.filterForm.get('phrase')?.value)
      .subscribe(page => this.page = page);
  }

  logout() {
    this.jwtService.removeToken();
    window.location.reload();
  }
}
