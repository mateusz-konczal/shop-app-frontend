import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { ActivatedRoute } from '@angular/router';
import { interval, mergeMap, takeUntil, takeWhile, timer } from 'rxjs';
import { JwtService } from '../../common/service/jwt.service';

@Component({
  selector: 'app-order-notification',
  templateUrl: './order-notification.component.html',
  styleUrls: ['./order-notification.component.scss']
})
export class OrderNotificationComponent implements OnInit {

  isPaid = false;
  isLoggedIn = false;

  constructor(
    private router: ActivatedRoute,
    private orderService: OrderService,
    private jwtService: JwtService
  ) { }

  ngOnInit(): void {
    this.getPaymentNotification();
    this.isLoggedIn = this.jwtService.isTokenValid();
  }

  getPaymentNotification() {
    let orderHash = this.router.snapshot.params['orderHash'];
    this.orderService.getPaymentNotification(orderHash)
      .subscribe(paymentNotification => {
        this.isPaid = paymentNotification.paid;
        if (this.isPaid === false) {
          interval(7000).pipe(
            mergeMap(() => this.orderService.getPaymentNotification(orderHash)),
            takeUntil(timer(3 * 60 * 1000)),
            takeWhile(value => value.paid === false, true)
          ).subscribe(paymentNotification => this.isPaid = paymentNotification.paid);
        }
      });
  }
}
