import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from './cart.service';
import { CartSummary } from './model/cartSummary';
import { CookieService } from 'ngx-cookie-service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CartItemSummary } from './model/cartItemSummary';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartForm!: FormGroup;
  cartSummary!: CartSummary;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private cookieService: CookieService,
    private formBuilder: FormBuilder
  ) { }

  get items() {
    return (<FormArray>this.cartForm.get("items")).controls;
  }

  ngOnInit(): void {
    let productId = Number(this.route.snapshot.queryParams['productId']);
    if (productId > 0) {
      this.addProductToCart(productId);
    } else {
      this.getCart();
    }

    this.cartForm = this.formBuilder.group({
      items: this.formBuilder.array([])
    });
  }

  getCart() {
    let cartId = Number(this.cookieService.get("cartId"));
    if (cartId > 0) {
      this.cartService.getCart(cartId)
        .subscribe(cartSummary => {
          this.cartSummary = cartSummary;
          this.patchFormItems();
        });
    }
  }

  addProductToCart(productId: number) {
    let cartId = Number(this.cookieService.get("cartId"));
    this.cartService.addProductToCart(cartId, { productId: productId, quantity: 1 })
      .subscribe(cartSummary => {
        this.cartSummary = cartSummary;
        this.patchFormItems();
        this.cookieService.delete("cartId");
        this.cookieService.set("cartId", cartSummary.id.toString(), this.expireCartAfterDays(3));
        this.router.navigate(["/cart"]);
      });
  }

  submit() {
    let cartId = Number(this.cookieService.get("cartId"));
    this.cartService.updateCart(cartId, this.mapToRequestListDto())
      .subscribe(cartSummary => {
        this.cartSummary = cartSummary;
        this.cartForm.get("items")?.setValue(cartSummary.items);
      });
  }

  deleteItem(itemId: number) {
    this.cartService.deleteCartItem(itemId)
      .subscribe(() => this.ngOnInit());
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
