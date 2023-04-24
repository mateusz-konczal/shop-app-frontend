import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminShipmentService } from '../admin-shipment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminMessageService } from '../../common/service/admin-message.service';
import { AdminShipment } from '../../common/model/adminShipment';

@Component({
  selector: 'app-admin-shipment-add',
  templateUrl: './admin-shipment-add.component.html',
  styleUrls: ['./admin-shipment-add.component.scss']
})
export class AdminShipmentAddComponent implements OnInit {

  shipmentForm!: FormGroup;

  constructor(
    private router: Router,
    private adminShipmentService: AdminShipmentService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private adminMessageService: AdminMessageService
  ) { }

  ngOnInit(): void {
    this.shipmentForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      price: ['', [Validators.required, Validators.min(0)]],
      type: ['', Validators.required],
      defaultShipment: ['false']
    });
  }

  submit() {
    this.adminShipmentService
      .saveNewShipment(this.shipmentForm.value as AdminShipment)
      .subscribe({
        next: shipment => {
          this.router.navigate(["/admin/shipments"])
            .then(() => this.snackBar.open("Dostawca został dodany", '', { duration: 3000 }));
        },
        error: err => this.adminMessageService.addSpringErrors(err.error)
      });
  }
}
