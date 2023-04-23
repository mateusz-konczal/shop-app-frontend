import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminPaymentService } from '../admin-payment.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminMessageService } from '../../common/service/admin-message.service';
import { AdminPayment } from '../model/adminPayment';

@Component({
  selector: 'app-admin-payment-update',
  templateUrl: './admin-payment-update.component.html',
  styleUrls: ['./admin-payment-update.component.scss']
})
export class AdminPaymentUpdateComponent implements OnInit {

  paymentForm!: FormGroup;

  constructor(
    private router: ActivatedRoute,
    private adminPaymentService: AdminPaymentService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private adminMessageService: AdminMessageService
  ) { }

  ngOnInit(): void {
    this.getPayment();

    this.paymentForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      type: ['', Validators.required],
      defaultPayment: ['false'],
      note: ['']
    });
  }

  getPayment() {
    let id = Number(this.router.snapshot.params['id']);
    this.adminPaymentService
      .getPayment(id)
      .subscribe(payment => this.mapToFormValues(payment));
  }

  submit() {
    let id = Number(this.router.snapshot.params['id']);
    this.adminPaymentService
      .savePayment(id, this.paymentForm.value as AdminPayment)
      .subscribe({
        next: payment => {
          this.mapToFormValues(payment);
          this.snackBar.open("Płatność została zaktualizowana", '', { duration: 3000 });
        },
        error: err => this.adminMessageService.addSpringErrors(err.error)
      });
  }

  private mapToFormValues(payment: AdminPayment): void {
    this.paymentForm.setValue({
      name: payment.name,
      type: payment.type,
      defaultPayment: String(payment.defaultPayment),
      note: payment.note
    });
  }
}
