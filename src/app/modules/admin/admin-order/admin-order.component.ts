import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AdminOrder } from './model/adminOrder';
import { AdminOrderService } from './admin-order.service';
import { startWith, switchMap } from 'rxjs';

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

  constructor(private adminOrderService: AdminOrderService) { }

  ngAfterViewInit(): void {
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
}
