import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminUserService } from '../admin-user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminUser } from '../model/adminUser';

@Component({
  selector: 'app-admin-user-add',
  templateUrl: './admin-user-add.component.html',
  styleUrls: ['./admin-user-add.component.scss']
})
export class AdminUserAddComponent implements OnInit {

  userForm!: FormGroup;
  userFormError = "";
  roles!: Map<string, string>;

  constructor(
    private formBuilder: FormBuilder,
    private adminUserService: AdminUserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUserRoles();
    this.userForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
      repeatedPassword: ['', Validators.required],
      userRole: ['', Validators.required]
    });
  }

  getUserRoles() {
    this.adminUserService.getUserRoles()
      .subscribe(data => this.roles = new Map(Object.entries(data.userRoles)));
  }

  submit() {
    let user = this.userForm.value as AdminUser;
    if (this.userForm.valid && this.isPasswordIdentical(user)) {
      this.adminUserService.saveNewUser(user)
        .subscribe({
          next: () => {
            this.router.navigate(["/admin/users"])
              .then(() => this.snackBar.open("Użytkownik został utworzony", '', { duration: 3000 }));
          },
          error: err => {
            if (err.error.message) {
              this.userFormError = err.error.message;
            } else {
              this.userFormError = "Coś poszło nie tak, spróbuj ponownie później";
            }
          }
        });
    }
  }

  private isPasswordIdentical(user: AdminUser): boolean {
    if (user.password === user.repeatedPassword) {
      this.userFormError = ""
      return true;
    }
    this.userFormError = "Hasła nie są identyczne";
    return false;
  }
}
