import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-notification',
  templateUrl: './order-notification.component.html',
  styleUrls: ['./order-notification.component.scss']
})
export class OrderNotificationComponent implements OnInit {

  isPaid = false;

  constructor(
    private router: ActivatedRoute,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.getPaymentNotification();
  }

  getPaymentNotification() {
    let orderHash = this.router.snapshot.params['orderHash'];
    this.orderService.getPaymentNotification(orderHash)
      .subscribe(paymentNotification => this.isPaid = paymentNotification.paid);
  }
}
