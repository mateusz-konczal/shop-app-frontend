import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Big from 'big.js';
import { CookieService } from 'ngx-cookie-service';
import { CartSummary } from '../common/model/cart/cartSummary';
import { CartIconService } from '../common/service/cart-icon.service';
import { JwtService } from '../common/service/jwt.service';
import { InitOrder } from './model/initOrder';
import { Order } from './model/order';
import { OrderSummary } from './model/orderSummary';
import { OrderService } from './order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orderForm!: FormGroup;
  cartSummary!: CartSummary;
  orderSummary!: OrderSummary;
  initOrder!: InitOrder;
  currencies: Array<string> = [];
  isErrorMessage = false;
  isLoggedIn = false;
  private statuses = new Map<string, string>([
    ["NEW", "Nowe"]
  ]);

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private cookieService: CookieService,
    private cartIconService: CartIconService,
    private jwtService: JwtService
  ) { }

  ngOnInit(): void {
    this.checkIfCartIsEmpty();

    this.orderForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(64)]],
      lastName: ['', [Validators.required, Validators.maxLength(64)]],
      street: ['', [Validators.required, Validators.maxLength(80)]],
      houseNumber: ['', [Validators.required, Validators.maxLength(6)]],
      apartmentNumber: ['', Validators.maxLength(6)],
      zipCode: ['', [Validators.required, Validators.pattern("^[0-9]{2}-[0-9]{3}$")]],
      city: ['', [Validators.required, Validators.maxLength(64)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(64)]],
      phone: ['', [Validators.required, Validators.maxLength(16)]],
      shipment: ['', Validators.required],
      payment: ['', Validators.required]
    });

    this.getProductCurrencies();
    this.getInitOrder();
    this.isLoggedIn = this.jwtService.isTokenValid();
  }

  checkIfCartIsEmpty() {
    let cartId = Number(this.cookieService.get("cartId"));
    if (cartId > 0) {
      this.orderService.getCart(cartId)
        .subscribe(cartSummary => this.cartSummary = cartSummary);
    }
  }

  calculateTotalCost(totalValue: number | undefined, shipmentPrice: number) {
    if (typeof totalValue == "number" && typeof shipmentPrice == "number") {
      return Big(totalValue).add(Big(shipmentPrice));
    }

    return 0;
  }

  submit() {
    if (this.orderForm.valid) {
      this.orderService.placeOrder({
        firstName: this.orderForm.get('firstName')?.value,
        lastName: this.orderForm.get('lastName')?.value,
        street: this.orderForm.get('street')?.value,
        zipCode: this.orderForm.get('zipCode')?.value,
        houseNumber: this.orderForm.get('houseNumber')?.value,
        apartmentNumber: this.orderForm.get('apartmentNumber')?.value,
        city: this.orderForm.get('city')?.value,
        email: this.orderForm.get('email')?.value,
        phone: this.orderForm.get('phone')?.value,
        cartId: Number(this.cookieService.get("cartId")),
        shipmentId: Number(this.orderForm.get('shipment')?.value.id),
        paymentId: Number(this.orderForm.get('payment')?.value.id)
      } as Order).subscribe({
        next: orderSummary => {
          this.cartIconService.cartChanged(0);
          this.cookieService.delete("cartId");
          this.isErrorMessage = false;
          if (orderSummary.redirectUrl) {
            window.location.href = orderSummary.redirectUrl;
          } else {
            this.orderSummary = orderSummary;
          }
        },
        error: () => this.isErrorMessage = true
      });
    }
  }

  getProductCurrencies() {
    this.orderService.getProductCurrencies()
      .subscribe(currencies => this.currencies = currencies);
  }

  getStatus(status: string) {
    return this.statuses.get(status);
  }

  getInitOrder() {
    return this.orderService.getInitOrder()
      .subscribe(initOrder => {
        this.initOrder = initOrder;
        this.setDefaultShipment();
        this.setDefaultPayment();
      });
  }

  private setDefaultShipment() {
    this.orderForm.patchValue({
      "shipment": this.initOrder.shipments
        .filter(shipment => shipment.defaultShipment === true)[0]
    });
  }

  private setDefaultPayment() {
    this.orderForm.patchValue({
      "payment": this.initOrder.payments
        .filter(payment => payment.defaultPayment === true)[0]
    });
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

  get houseNumber() {
    return this.orderForm.get("houseNumber");
  }

  get apartmentNumber() {
    return this.orderForm.get("apartmentNumber");
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

  get shipment() {
    return this.orderForm.get("shipment");
  }

  get payment() {
    return this.orderForm.get("payment");
  }
}
