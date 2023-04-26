import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminOrderService } from '../admin-order.service';

@Component({
  selector: 'app-admin-order-export',
  templateUrl: './admin-order-export.component.html',
  styleUrls: ['./admin-order-export.component.scss']
})
export class AdminOrderExportComponent implements OnInit {

  exportForm!: FormGroup;
  statuses!: Map<string, string>;

  constructor(
    private adminOrderService: AdminOrderService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getOrderStatuses();

    this.exportForm = this.formBuilder.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      orderStatus: ['', Validators.required]
    });
  }

  getOrderStatuses() {
    this.adminOrderService
      .getOrderStatuses()
      .subscribe(data => this.statuses = data.orderStatuses);
  }

  export() {
    if (this.exportForm.valid) {
      this.adminOrderService.exportOrders(
        this.exportForm.get("from")?.value.toISOString(),
        this.exportForm.get("to")?.value.toISOString(),
        this.exportForm.get("orderStatus")?.value
      ).subscribe(response => {
        let a = document.createElement('a');
        let objectUrl = URL.createObjectURL(response.body);
        a.href = objectUrl;
        a.download = response.headers.get("Content-Disposition");
        a.click();
        URL.revokeObjectURL(objectUrl);
      });
    }
  }
}
