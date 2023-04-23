import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { OrderService } from './order.service';
import { CartSummary } from '../common/model/cart/cartSummary';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderSummary } from './model/orderSummary';
import { Order } from './model/order';
import { InitOrder } from './model/initOrder';
import { CartIconService } from '../common/service/cart-icon.service';

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
  isErrorMessage = false;
  private statuses = new Map<string, string>([
    ["NEW", "Nowe"]
  ]);

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private cookieService: CookieService,
    private cartIconService: CartIconService
  ) { }

  ngOnInit(): void {
    this.checkIfCartIsEmpty();

    this.orderForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(64)]],
      lastName: ['', [Validators.required, Validators.maxLength(64)]],
      street: ['', [Validators.required, Validators.maxLength(80)]],
      houseNumber: ['', [Validators.required, Validators.maxLength(6)]],
      apartmentNumber: ['', Validators.maxLength(6)],
      zipCode: ['', [Validators.required, Validators.maxLength(6)]],
      city: ['', [Validators.required, Validators.maxLength(64)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(64)]],
      phone: ['', [Validators.required, Validators.maxLength(16)]],
      shipment: ['', Validators.required],
      payment: ['', Validators.required]
    });

    this.getInitOrder();
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
          this.orderSummary = orderSummary;
          this.cartIconService.cartChanged(0);
          this.cookieService.delete("cartId");
          this.isErrorMessage = false;
        },
        error: err => this.isErrorMessage = true
      });
    }
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
