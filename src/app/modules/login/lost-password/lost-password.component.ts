import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Email } from '../model/email';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { NewPassword } from '../model/newPassword';

@Component({
  selector: 'app-lost-password',
  templateUrl: './lost-password.component.html',
  styleUrls: ['./lost-password.component.scss']
})
export class LostPasswordComponent implements OnInit {

  private readonly GENERAL_ERROR_MESSAGE = "Coś poszło nie tak, spróbuj ponownie później";
  lostPasswordForm!: FormGroup;
  lostPasswordFormError = "";
  newPasswordForm!: FormGroup;
  newPasswordFormError = "";
  hash = "";

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.lostPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.newPasswordForm = this.formBuilder.group({
      password: ['', Validators.required],
      repeatedPassword: ['', Validators.required]
    });

    this.hash = this.router.snapshot.params['hash'];
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

  sendNewPassword() {
    let newPassword: NewPassword = {
      hash: this.hash,
      password: this.newPasswordForm.get('password')?.value,
      repeatedPassword: this.newPasswordForm.get('repeatedPassword')?.value
    };

    if (this.newPasswordForm.valid && this.isPasswordIdentical(newPassword)) {
      this.loginService.changePassword(newPassword)
        .subscribe({
          next: () => {
            this.newPasswordFormError = "";
            this.newPasswordForm.reset();
            this.snackBar.open("Hasło zostało zmienione", '', { duration: 5000, panelClass: "snack-bar-bg-color-ok" });
          },
          error: err => {
            if (err.error.message) {
              this.newPasswordFormError = err.error.message;
            } else {
              this.newPasswordFormError = this.GENERAL_ERROR_MESSAGE;
            }
          }
        });
    }
  }

  private isPasswordIdentical(newPassword: NewPassword): boolean {
    if (newPassword.password === newPassword.repeatedPassword) {
      this.newPasswordFormError = ""
      return true;
    }
    this.newPasswordFormError = "Hasła nie są identyczne";
    return false;
  }
}
