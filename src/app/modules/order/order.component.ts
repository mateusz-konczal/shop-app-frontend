import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { OrderService } from './order.service';
import { CartSummary } from '../common/model/cart/cartSummary';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderSummary } from './model/orderSummary';
import { Order } from './model/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orderForm!: FormGroup;
  cartSummary!: CartSummary;
  orderSummary!: OrderSummary;

  constructor(
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.checkIfCartIsEmpty();
    this.orderForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      zipCode: ['', Validators.required],
      city: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  checkIfCartIsEmpty() {
    let cartId = Number(this.cookieService.get("cartId"));
    if (cartId > 0) {
      this.orderService.getCart(cartId)
        .subscribe(cartSummary => this.cartSummary = cartSummary);
    }
  }

  submit() {
    if (this.orderForm.valid) {
      this.orderService.placeOrder({

      } as Order)
        .subscribe(orderSummary => {
          this.orderSummary = orderSummary;
          this.cookieService.delete("cartId");
        });
    }
  }

  get firstName() {
    return this.orderForm.get("firstName");
  }

  get lastName() {
    return this.orderForm.get("lastName");
  }

  get street() {
    return this.orderForm.get("street");
  }

  get zipCode() {
    return this.orderForm.get("zipCode");
  }

  get city() {
    return this.orderForm.get("city");
  }

  get email() {
    return this.orderForm.get("email");
  }

  get phone() {
    return this.orderForm.get("phone");
  }
}
