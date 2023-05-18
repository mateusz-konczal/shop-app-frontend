import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminLoginService } from './admin-login.service';
import { LoginCredentials } from '../../common/model/security/loginCredentials';
import { JwtService } from '../../common/service/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  loginForm!: FormGroup;
  loginErrorMessage = "";

  constructor(
    private formBuilder: FormBuilder,
    private adminLoginService: AdminLoginService,
    private jwtService: JwtService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.jwtService.removeToken();
    this.jwtService.setAdminAccess(false);

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit() {
    if (this.loginForm.valid) {
      this.adminLoginService.login(this.loginForm.value as LoginCredentials)
        .subscribe({
          next: token => {
            this.loginErrorMessage = "";
            if (token.adminAccess) {
              this.jwtService.setToken(token.token);
              this.jwtService.setAdminAccess(true);
            }
            this.router.navigate(["/admin"]);
          },
          error: err => {
            if (err.error.message) {
              this.loginErrorMessage = err.error.message;
            } else {
              this.loginErrorMessage = "Coś poszło nie tak, spróbuj ponownie później";
            }
          }
        });
    }
  }
}
