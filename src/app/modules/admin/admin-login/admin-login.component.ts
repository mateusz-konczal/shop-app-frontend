import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminLoginService } from './admin-login.service';
import { LoginCredentials } from './model/loginCredentials';
import { JwtService } from '../../common/service/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  loginForm!: FormGroup;
  isLoginError = false

  constructor(
    private formBuilder: FormBuilder,
    private adminLoginService: AdminLoginService,
    private jwtService: JwtService,
    private router: Router
  ) { }

  ngOnInit(): void {
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
            this.isLoginError = false;
            this.jwtService.setToken(token.token);
            this.router.navigate(["/admin"]);
          },
          error: () => this.isLoginError = true
        });
    }
  }
}
