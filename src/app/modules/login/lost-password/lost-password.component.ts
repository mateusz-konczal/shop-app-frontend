import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Email } from '../model/email';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPassword } from '../model/resetPassword';

@Component({
  selector: 'app-lost-password',
  templateUrl: './lost-password.component.html',
  styleUrls: ['./lost-password.component.scss']
})
export class LostPasswordComponent implements OnInit {

  private readonly GENERAL_ERROR_MESSAGE = "Coś poszło nie tak, spróbuj ponownie później";
  lostPasswordForm!: FormGroup;
  lostPasswordFormError = "";
  resetPasswordForm!: FormGroup;
  resetPasswordFormError = "";
  hash = "";

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.lostPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.resetPasswordForm = this.formBuilder.group({
      password: ['', Validators.required],
      repeatedPassword: ['', Validators.required]
    });

    this.hash = this.route.snapshot.params['hash'];
  }

  sendRequest() {
    if (this.lostPasswordForm.valid) {
      this.loginService.sendLostPasswordLink(this.lostPasswordForm.value as Email)
        .subscribe({
          next: () => {
            this.lostPasswordFormError = "";
            this.lostPasswordForm.reset();
            this.snackBar.open("Wysłano wiadomość e-mail z linkiem", '', { duration: 5000, panelClass: "snack-bar-bg-color-ok" });
          },
          error: err => {
            if (err.error.message) {
              this.lostPasswordFormError = err.error.message;
            } else {
              this.lostPasswordFormError = this.GENERAL_ERROR_MESSAGE;
            }
          }
        });
    }
  }

  sendResetPassword() {
    let resetPassword: ResetPassword = {
      hash: this.hash,
      password: this.resetPasswordForm.get('password')?.value,
      repeatedPassword: this.resetPasswordForm.get('repeatedPassword')?.value
    };

    if (this.resetPasswordForm.valid && this.isPasswordIdentical(resetPassword)) {
      this.loginService.changePassword(resetPassword)
        .subscribe({
          next: () => {
            this.router.navigate(["/login"])
              .then(() => this.snackBar.open("Hasło zostało zmienione", '', { duration: 5000, panelClass: "snack-bar-bg-color-ok" }));
          },
          error: err => {
            if (err.error.message) {
              this.resetPasswordFormError = err.error.message;
            } else {
              this.resetPasswordFormError = this.GENERAL_ERROR_MESSAGE;
            }
          }
        });
    }
  }

  private isPasswordIdentical(resetPassword: ResetPassword): boolean {
    if (resetPassword.password === resetPassword.repeatedPassword) {
      this.resetPasswordFormError = ""
      return true;
    }
    this.resetPasswordFormError = "Hasła nie są identyczne";
    return false;
  }
}
