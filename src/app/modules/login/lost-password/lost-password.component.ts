import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Email } from '../model/email';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lost-password',
  templateUrl: './lost-password.component.html',
  styleUrls: ['./lost-password.component.scss']
})
export class LostPasswordComponent implements OnInit {

  lostPasswordForm!: FormGroup;
  isFormError = false;
  formError = "";

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.lostPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submit() {
    if (this.lostPasswordForm.valid) {
      this.loginService.resetPassword(this.lostPasswordForm.value as Email)
        .subscribe({
          next: () => {
            this.isFormError = false;
            this.lostPasswordForm.reset();
            this.snackBar.open("Wysłano wiadomość e-mail z linkiem", '', { duration: 5000, panelClass: "snack-bar-bg-color-ok" });
          },
          error: err => {
            this.isFormError = true;
            if (err.error.message) {
              this.formError = err.error.message;
            } else {
              this.formError = "Coś poszło nie tak, spróbuj ponownie później";
            }
          }
        });
    }
  }
}
