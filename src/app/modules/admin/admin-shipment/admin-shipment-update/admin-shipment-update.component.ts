import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminShipmentService } from '../admin-shipment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminMessageService } from '../../common/service/admin-message.service';
import { AdminShipment } from '../../common/model/adminShipment';

@Component({
  selector: 'app-admin-shipment-update',
  templateUrl: './admin-shipment-update.component.html',
  styleUrls: ['./admin-shipment-update.component.scss']
})
export class AdminShipmentUpdateComponent implements OnInit {

  shipmentForm!: FormGroup;

  constructor(
    private router: ActivatedRoute,
    private adminShipmentService: AdminShipmentService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private adminMessageService: AdminMessageService
  ) { }

  ngOnInit(): void {
    this.getShipment();

    this.shipmentForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      price: ['', [Validators.required, Validators.min(0)]],
      type: ['', Validators.required],
      defaultShipment: ['false']
    });
  }

  getShipment() {
    let id = Number(this.router.snapshot.params['id']);
    this.adminShipmentService
      .getShipment(id)
      .subscribe(shipment => this.mapToFormValues(shipment));
  }

  submit() {
    let id = Number(this.router.snapshot.params['id']);
    this.adminShipmentService
      .saveShipment(id, this.shipmentForm.value as AdminShipment)
      .subscribe({
        next: shipment => {
          this.mapToFormValues(shipment);
          this.snackBar.open("Dostawca został zaktualizowany", '', { duration: 3000 });
        },
        error: err => this.adminMessageService.addSpringErrors(err.error)
      });
  }

  private mapToFormValues(shipment: AdminShipment): void {
    this.shipmentForm.setValue({
      name: shipment.name,
      price: shipment.price,
      type: shipment.type,
      defaultShipment: String(shipment.defaultShipment)
    });
  }
}
