import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CartItemSummary } from '../common/model/cart/cartItemSummary';
import { CartSummary } from '../common/model/cart/cartSummary';
import { CartIconService } from '../common/service/cart-icon.service';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartForm!: FormGroup;
  cartSummary!: CartSummary;
  currencies: Array<string> = [];
  private isProductAdded = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private cookieService: CookieService,
    private formBuilder: FormBuilder,
    private cartIconService: CartIconService,
    private location: Location
  ) { }

  get items() {
    return (<FormArray>this.cartForm.get("items")).controls;
  }

  ngOnInit(): void {
    let productId = Number(this.route.snapshot.queryParams['productId']);
    if (productId > 0) {
      this.isProductAdded = true;
      this.addProductToCart(productId);
    } else {
      this.isProductAdded = false;
      this.getCart();
    }

    this.cartForm = this.formBuilder.group({
      items: this.formBuilder.array([])
    });

    this.getProductCurrencies();
  }

  getCart() {
    let cartUuid = this.cookieService.get("cartUuid");
    if (cartUuid != "") {
      this.cartService.getCart(cartUuid)
        .subscribe(cartSummary => {
          this.cartSummary = cartSummary;
          this.patchFormItems();
          this.cartIconService.cartChanged(cartSummary.items.length);
        });
    }
  }

  getProductCurrencies() {
    let cartUuid = this.cookieService.get("cartUuid");
    if (cartUuid != "") {
      this.cartService.getProductCurrencies()
        .subscribe(currencies => this.currencies = currencies);
    }
  }

  addProductToCart(productId: number) {
    let cartUuid = this.cookieService.get("cartUuid");
    this.cartService.addProductToCart(cartUuid, { productId: productId, quantity: 1 })
      .subscribe(cartSummary => {
        this.cartSummary = cartSummary;
        this.patchFormItems();
        this.cartIconService.cartChanged(cartSummary.items.length);
        this.cookieService.delete("cartUuid");
        this.cookieService.set("cartUuid", cartSummary.uuid, this.expireCartAfterDays(3));
        this.router.navigate(["/cart"]);
      });
  }

  submit() {
    let cartUuid = this.cookieService.get("cartUuid");
    this.cartService.updateCart(cartUuid, this.mapToRequestListDto())
      .subscribe(cartSummary => {
        this.cartSummary = cartSummary;
        this.cartForm.get("items")?.setValue(cartSummary.items);
      });
  }

  deleteItem(itemId: number) {
    this.cartService.deleteCartItem(itemId)
      .subscribe(() => this.ngOnInit());
  }

  back() {
    this.location.historyGo(this.isProductAdded ? -2 : -1);
  }

  private patchFormItems() {
    let formItems = <FormArray>this.cartForm.get("items");
    this.cartSummary.items.forEach(item => {
      formItems.push(this.formBuilder.group({
        id: [item.id],
        quantity: [item.quantity],
        product: [item.product],
        lineValue: [item.lineValue]
      }));
    });
  }

  private expireCartAfterDays(days: number): Date {
    return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  }

  private mapToRequestListDto(): any[] {
    let items: Array<CartItemSummary> = this.cartForm.get("items")?.value;
    return items.map(item => ({
      productId: item.product.id,
      quantity: item.quantity
    }));
  }
}
