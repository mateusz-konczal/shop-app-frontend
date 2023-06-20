import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { JwtService } from '../../common/service/jwt.service';
import { AdminConfirmDialogService } from '../common/service/admin-confirm-dialog.service';
import { AdminAccountService } from './admin-account.service';
import { AdminNewPassword } from './model/adminNewPassword';

@Component({
  selector: 'app-admin-account',
  templateUrl: './admin-account.component.html',
  styleUrls: ['./admin-account.component.scss']
})
export class AdminAccountComponent implements OnInit {

  newPasswordForm!: FormGroup;
  newPasswordFormError = "";

  constructor(
    private formBuilder: FormBuilder,
    private adminAccountService: AdminAccountService,
    private dialogService: AdminConfirmDialogService,
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
    this.dialogService.openConfirmDialog("Czy na pewno chcesz usunąć swoje konto z uprawnieniami administratora?")
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.adminAccountService.deleteAccount()
            .subscribe(() => {
              this.jwtService.removeToken();
              this.jwtService.setAdminAccess(false);
              this.router.navigate(["/admin/login"])
                .then(() => this.snackBar.open("Twoje konto zostało usunięte", '', { duration: 3000 }));
            });
        }
      });
  }

  sendNewPassword() {
    let newPassword = this.newPasswordForm.value as AdminNewPassword;
    if (this.newPasswordForm.valid && this.isPasswordIdentical(newPassword)) {
      this.adminAccountService.changePassword(newPassword)
        .subscribe({
          next: () => {
            this.newPasswordFormError = "";
            this.newPasswordForm.reset();
            this.snackBar.open("Hasło zostało zaktualizowane", '', { duration: 3000 });
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

  private isPasswordIdentical(newPassword: AdminNewPassword): boolean {
    if (newPassword.password === newPassword.repeatedPassword) {
      this.newPasswordFormError = ""
      return true;
    }
    this.newPasswordFormError = "Hasła nie są identyczne";
    return false;
  }
}
