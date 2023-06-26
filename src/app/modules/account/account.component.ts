import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ConfirmDialogService } from '../common/service/confirm-dialog.service';
import { JwtService } from '../common/service/jwt.service';
import { AccountService } from './account.service';
import { NewPassword } from './model/newPassword';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  newPasswordForm!: FormGroup;
  newPasswordFormError = "";

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private dialogService: ConfirmDialogService,
    private jwtService: JwtService,
    private router: Router,
    private snackBar: MatSnackBar,
    private app: AppComponent
  ) { }

  ngOnInit(): void {
    this.newPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern(this.app.PASSWORD_REGEX)]],
      repeatedPassword: ['', Validators.required]
    });
  }

  confirmDeleteAccount() {
    this.dialogService.openConfirmDialog("Czy na pewno chcesz usunąć swoje konto?")
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.accountService.deleteAccount()
            .subscribe(() => {
              this.jwtService.removeToken();
              this.router.navigate(["/login"])
                .then(() => this.snackBar.open("Twoje konto zostało usunięte", '', { duration: 5000, panelClass: "snack-bar-bg-color-ok" }));
            });
        }
      });
  }

  sendNewPassword() {
    let newPassword = this.newPasswordForm.value as NewPassword;
    if (this.newPasswordForm.valid && this.isPasswordIdentical(newPassword)) {
      this.accountService.changePassword(newPassword)
        .subscribe({
          next: () => {
            this.newPasswordFormError = "";
            this.newPasswordForm.reset();
            this.snackBar.open("Hasło zostało zaktualizowane", '', { duration: 5000, panelClass: "snack-bar-bg-color-ok" });
          },
          error: err => {
            if (err.error.message) {
              this.newPasswordFormError = err.error.message;
            } else {
              this.newPasswordFormError = "Coś poszło nie tak, spróbuj ponownie później";
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
