import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { startWith, switchMap } from 'rxjs';
import { AdminOrderService } from './admin-order.service';
import { AdminOrder } from './model/adminOrder';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.scss']
})
export class AdminOrderComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ["id", "placeDate", "orderStatus", "totalValue", "actions"];
  dataSource: Array<AdminOrder> = [];
  totalElements: number = 0;
  statuses!: Map<string, string>;

  constructor(private adminOrderService: AdminOrderService) { }

  ngAfterViewInit(): void {
    this.getOrderStatuses();
    this.paginator.page.pipe(
      startWith({}),
      switchMap(() => {
        return this.adminOrderService.getOrders(this.paginator.pageIndex, this.paginator.pageSize);
      })
    ).subscribe(data => {
      this.dataSource = data.content;
      this.totalElements = data.totalElements;
    });
  }

  getOrderStatuses() {
    this.adminOrderService
      .getOrderStatuses()
      .subscribe(data => this.statuses = new Map(Object.entries(data.orderStatuses)));
  }

  getStatus(status: string) {
    return this.statuses.get(status);
  }
}
