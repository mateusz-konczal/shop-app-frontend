import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { OrderReadDto } from './model/orderReadDto';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  displayedColumns: string[] = ["id", "placeDate", "orderStatus", "totalValue"];
  orders: Array<OrderReadDto> = [];

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.profileService.getOrders()
      .subscribe(orders => this.orders = orders);
  }
}
