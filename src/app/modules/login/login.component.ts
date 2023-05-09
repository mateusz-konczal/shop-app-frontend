import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { RegisterCredentials } from './model/registerCredentials';
import { JwtService } from '../common/service/jwt.service';
import { Router } from '@angular/router';
import { LoginCredentials } from '../common/model/security/loginCredentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isLoginError = false
  registerForm!: FormGroup;
  isRegisterError = false;
  registerErrorMessage = "";

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private jwtService: JwtService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value as LoginCredentials)
        .subscribe({
          next: response => {
            this.isLoginError = false;
            this.jwtService.setToken(response.token);
            this.router.navigate(["/"]);
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
          next: response => {
            this.isRegisterError = false;
            this.jwtService.setToken(response.token);
            this.router.navigate(["/"]);
          },
          error: () => {
            this.isRegisterError = true;
            this.registerErrorMessage = "Coś poszło nie tak. Spróbuj ponownie później.";
          }
        });
    }
  }

  private isPasswordIdentical(credentials: RegisterCredentials): boolean {
    if (credentials.password === credentials.repeatedPassword) {
      this.isRegisterError = false;
      return true;
    }
    this.isRegisterError = true;
    this.registerErrorMessage = "Hasła nie są identyczne";
    return false;
  }
}
