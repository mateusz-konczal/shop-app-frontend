import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminLoginService } from './admin-login.service';
import { LoginCredentials } from './model/loginCredentials';

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
    private adminLoginService: AdminLoginService
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
          next: () => this.isLoginError = false,
          error: () => this.isLoginError = true
        });
    }
  }
}
