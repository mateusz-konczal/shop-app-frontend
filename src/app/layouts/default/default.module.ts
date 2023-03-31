import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { HomeComponent } from 'src/app/modules/home/home.component';
import { ProductComponent } from 'src/app/modules/product/product.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductDetailsComponent } from 'src/app/modules/product-details/product-details.component';
import { CategoryComponent } from 'src/app/modules/category/category.component';

@NgModule({
  declarations: [
    DefaultComponent,
    HomeComponent,
    ProductComponent,
    ProductDetailsComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    SharedModule
  ]
})
export class DefaultModule { }
