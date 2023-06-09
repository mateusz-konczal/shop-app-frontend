import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AdminMessageService } from '../../common/service/admin-message.service';
import { AdminOrderService } from '../admin-order.service';
import { AdminOrderUpdate } from '../model/adminOrderUpdate';

@Component({
  selector: 'app-admin-order-update',
  templateUrl: './admin-order-update.component.html',
  styleUrls: ['./admin-order-update.component.scss']
})
export class AdminOrderUpdateComponent implements OnInit {

  order!: AdminOrderUpdate;
  orderStatusForm!: FormGroup;
  statuses!: Map<string, string>;
  currencies: Array<string> = [];

  constructor(
    private router: ActivatedRoute,
    private adminOrderService: AdminOrderService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private adminMessageService: AdminMessageService
  ) { }

  ngOnInit(): void {
    this.getOrderStatuses();
    this.getProductCurrencies();
    this.getOrder();

    this.orderStatusForm = this.formBuilder.group({
      orderStatus: ['', Validators.required]
    });
  }

  getOrderStatuses() {
    this.adminOrderService
      .getOrderStatuses()
      .subscribe(data => this.statuses = data.orderStatuses);
  }

  getProductCurrencies() {
    this.adminOrderService.getProductCurrencies()
      .subscribe(currencies => this.currencies = currencies);
  }

  getOrder() {
    let id = Number(this.router.snapshot.params['id']);
    this.adminOrderService
      .getOrder(id)
      .subscribe(order => {
        this.order = order;
        this.orderStatusForm.setValue({
          orderStatus: order.orderStatus
        });
        order.orderLogs.sort((el1, el2) => new Date(el2.created).getTime() - new Date(el1.created).getTime());
      });
  }

  changeOrderStatus() {
    this.adminOrderService
      .saveOrderStatus(this.order.id, this.orderStatusForm.value)
      .subscribe({
        next: () => {
          this.snackBar.open("Status zamówienia został zaktualizowany", '', { duration: 3000 });
          this.getOrder();
        },
        error: err => this.adminMessageService.addSpringErrors(err.error)
      });
  }
}
