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
import { ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from 'src/app/modules/cart/cart.component';
import { OrderComponent } from 'src/app/modules/order/order.component';
import { OrderNotificationComponent } from 'src/app/modules/order/order-notification/order-notification.component';
import { ReplacePipe } from 'src/app/modules/common/pipe/replacePipe';
import { UserOrdersComponent } from 'src/app/modules/user-orders/user-orders.component';
import { AccountComponent } from 'src/app/modules/account/account.component';
import { ConfirmDialogComponent } from 'src/app/modules/common/component/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    DefaultComponent,
    HomeComponent,
    ProductComponent,
    ProductDetailsComponent,
    CategoryComponent,
    CartComponent,
    OrderComponent,
    OrderNotificationComponent,
    ReplacePipe,
    UserOrdersComponent,
    AccountComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class DefaultModule { }
