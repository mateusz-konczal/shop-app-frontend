import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule
  ],
  exports: [
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule
  ]
})
export class MaterialModule { }
