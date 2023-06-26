import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/modules/login/login.component';
import { LostPasswordComponent } from 'src/app/modules/login/lost-password/lost-password.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FullpageComponent } from './fullpage.component';

@NgModule({
  declarations: [
    FullpageComponent,
    LoginComponent,
    LostPasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class FullpageModule { }
