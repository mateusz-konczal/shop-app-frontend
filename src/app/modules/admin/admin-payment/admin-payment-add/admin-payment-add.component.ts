import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminPaymentService } from '../admin-payment.service';
import { AdminMessageService } from '../../common/service/admin-message.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminPayment } from '../../common/model/adminPayment';

@Component({
  selector: 'app-admin-payment-add',
  templateUrl: './admin-payment-add.component.html',
  styleUrls: ['./admin-payment-add.component.scss']
})
export class AdminPaymentAddComponent implements OnInit {

  paymentForm!: FormGroup;

  constructor(
    private router: Router,
    private adminPaymentService: AdminPaymentService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private adminMessageService: AdminMessageService
  ) { }

  ngOnInit(): void {
    this.paymentForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      type: ['', Validators.required],
      defaultPayment: ['false'],
      note: ['']
    });
  }

  submit() {
    this.adminPaymentService
      .saveNewPayment(this.paymentForm.value as AdminPayment)
      .subscribe({
        next: payment => {
          this.router.navigate(["/admin/payments"])
            .then(() => this.snackBar.open("Płatność została dodana", '', { duration: 3000 }));
        },
        error: err => this.adminMessageService.addSpringErrors(err.error)
      });
  }
}
