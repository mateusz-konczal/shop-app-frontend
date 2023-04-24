import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminOrderService } from '../admin-order.service';
import { AdminOrderUpdate } from '../model/adminOrderUpdate';

@Component({
  selector: 'app-admin-order-update',
  templateUrl: './admin-order-update.component.html',
  styleUrls: ['./admin-order-update.component.scss']
})
export class AdminOrderUpdateComponent implements OnInit {

  order!: AdminOrderUpdate;

  constructor(
    private router: ActivatedRoute,
    private adminOrderService: AdminOrderService
  ) { }

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder() {
    let id = Number(this.router.snapshot.params['id']);
    this.adminOrderService
      .getOrder(id)
      .subscribe(order => this.order = order);
  }
}
