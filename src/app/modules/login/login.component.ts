import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { RegisterCredentials } from './model/registerCredentials';
import { JwtService } from '../common/service/jwt.service';
import { Router } from '@angular/router';
import { LoginCredentials } from '../common/model/security/loginCredentials';
import { NavigationService } from '../common/service/navigation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private readonly PROFILE_URL = "/profile";
  loginForm!: FormGroup;
  isLoginError = false
  registerForm!: FormGroup;
  registerErrorMessage = "";

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private jwtService: JwtService,
    private navigationService: NavigationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.jwtService.isTokenValid()) {
      this.router.navigate([this.PROFILE_URL]);
    }

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeatedPassword: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value as LoginCredentials)
        .subscribe({
          next: token => {
            this.isLoginError = false;
            this.jwtService.setToken(token.token);
            this.navigationService.back();
          },
          error: () => this.isLoginError = true
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
            this.router.navigate([this.PROFILE_URL]);
          },
          error: err => {
            if (err.error.message) {
              this.registerErrorMessage = err.error.message;
            } else {
              this.registerErrorMessage = "Coś poszło nie tak, spróbuj ponownie później";
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
