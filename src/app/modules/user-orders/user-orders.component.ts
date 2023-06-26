import { Component, OnInit } from '@angular/core';
import { OrderReadDto } from './model/orderReadDto';
import { UserOrdersService } from './user-orders.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {

  displayedColumns: string[] = ["id", "placeDate", "orderStatus", "totalValue"];
  orders: Array<OrderReadDto> = [];
  currencies: Array<string> = [];

  constructor(private userOrdersService: UserOrdersService) { }

  ngOnInit(): void {
    this.getOrders();
    this.getProductCurrencies();
  }

  getOrders() {
    this.userOrdersService.getOrders()
      .subscribe(orders => this.orders = orders);
  }

  getProductCurrencies() {
    this.userOrdersService.getProductCurrencies()
      .subscribe(currencies => this.currencies = currencies);
  }
}
