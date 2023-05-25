import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { RegisterCredentials } from './model/registerCredentials';
import { JwtService } from '../common/service/jwt.service';
import { Router } from '@angular/router';
import { LoginCredentials } from '../common/model/security/loginCredentials';
import { NavigationService } from '../common/service/navigation.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private readonly USER_ORDERS_URL = "/my-orders";
  private readonly GENERAL_ERROR_MESSAGE = "Coś poszło nie tak, spróbuj ponownie później";
  loginForm!: FormGroup;
  loginErrorMessage = "";
  registerForm!: FormGroup;
  registerErrorMessage = "";

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private jwtService: JwtService,
    private navigationService: NavigationService,
    private router: Router,
    private app: AppComponent
  ) { }

  ngOnInit(): void {
    if (this.jwtService.isTokenValid()) {
      this.router.navigate([this.USER_ORDERS_URL]);
    }

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(this.app.PASSWORD_REGEX)]],
      repeatedPassword: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value as LoginCredentials)
        .subscribe({
          next: token => {
            this.loginErrorMessage = "";
            this.jwtService.setToken(token.token);
            this.navigationService.back();
          },
          error: err => {
            if (err.error.message) {
              this.loginErrorMessage = err.error.message;
            } else {
              this.loginErrorMessage = this.GENERAL_ERROR_MESSAGE;
            }
          }
        });
    }
  }

  register() {
    let credentials = this.registerForm.value as RegisterCredentials;
    if (this.registerForm.valid && this.isPasswordIdentical(credentials)) {
      this.loginService.register(credentials)
        .subscribe({
          next: token => {
            this.registerErrorMessage = "";
            this.jwtService.setToken(token.token);
            this.router.navigate([this.USER_ORDERS_URL]);
          },
          error: err => {
            if (err.error.message) {
              this.registerErrorMessage = err.error.message;
            } else {
              this.registerErrorMessage = this.GENERAL_ERROR_MESSAGE;
            }
          }
        });
    }
  }

  private isPasswordIdentical(credentials: RegisterCredentials): boolean {
    if (credentials.password === credentials.repeatedPassword) {
      this.registerErrorMessage = "";
      return true;
    }
    this.registerErrorMessage = "Hasła nie są identyczne";
    return false;
  }
}
