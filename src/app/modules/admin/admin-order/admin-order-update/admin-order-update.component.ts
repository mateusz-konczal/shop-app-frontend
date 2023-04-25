import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminOrderService } from '../admin-order.service';
import { AdminOrderUpdate } from '../model/adminOrderUpdate';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminMessageService } from '../../common/service/admin-message.service';

@Component({
  selector: 'app-admin-order-update',
  templateUrl: './admin-order-update.component.html',
  styleUrls: ['./admin-order-update.component.scss']
})
export class AdminOrderUpdateComponent implements OnInit {

  order!: AdminOrderUpdate;
  orderStatusForm!: FormGroup;
  statuses!: Map<string, string>;

  constructor(
    private router: ActivatedRoute,
    private adminOrderService: AdminOrderService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private adminMessageService: AdminMessageService
  ) { }

  ngOnInit(): void {
    this.getOrderStatuses();
    this.getOrder();
    this.orderStatusForm = this.formBuilder.group({
      orderStatus: ['', Validators.required]
    });
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
      });
  }

  getOrderStatuses() {
    this.adminOrderService
      .getOrderStatuses()
      .subscribe(data => this.statuses = data.orderStatuses);
  }

  changeOrderStatus() {
    this.adminOrderService
      .saveOrderStatus(this.order.id, this.orderStatusForm.value)
      .subscribe({
        next: () => this.snackBar.open("Status zamówienia został zaktualizowany", '', { duration: 3000 }),
        error: err => this.adminMessageService.addSpringErrors(err.error)
      });
  }
}
