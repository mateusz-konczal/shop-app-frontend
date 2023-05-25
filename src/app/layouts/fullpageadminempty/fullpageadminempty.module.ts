import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FullpageadminemptyComponent } from './fullpageadminempty.component';
import { AdminLoginComponent } from 'src/app/modules/admin/admin-login/admin-login.component';

@NgModule({
  declarations: [
    FullpageadminemptyComponent,
    AdminLoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class FullpageadminemptyModule { }
