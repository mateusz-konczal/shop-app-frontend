import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccountComponent } from 'src/app/modules/account/account.component';
import { CartComponent } from 'src/app/modules/cart/cart.component';
import { CategoryComponent } from 'src/app/modules/category/category.component';
import { ConfirmDialogComponent } from 'src/app/modules/common/component/confirm-dialog/confirm-dialog.component';
import { ReplacePipe } from 'src/app/modules/common/pipe/replacePipe';
import { ContactComponent } from 'src/app/modules/contact/contact.component';
import { HomeComponent } from 'src/app/modules/home/home.component';
import { OrderNotificationComponent } from 'src/app/modules/order/order-notification/order-notification.component';
import { OrderComponent } from 'src/app/modules/order/order.component';
import { ProductDetailsComponent } from 'src/app/modules/product-details/product-details.component';
import { ProductComponent } from 'src/app/modules/product/product.component';
import { UserOrdersComponent } from 'src/app/modules/user-orders/user-orders.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DefaultComponent } from './default.component';

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
    ContactComponent,
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
