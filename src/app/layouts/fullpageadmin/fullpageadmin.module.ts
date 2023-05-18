import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullpageadminComponent } from './fullpageadmin.component';
import { AdminComponent } from 'src/app/modules/admin/admin.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { AdminProductComponent } from 'src/app/modules/admin/admin-product/admin-product.component';
import { AdminProductUpdateComponent } from 'src/app/modules/admin/admin-product/admin-product-update/admin-product-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminProductAddComponent } from 'src/app/modules/admin/admin-product/admin-product-add/admin-product-add.component';
import { AdminProductFormComponent } from 'src/app/modules/admin/admin-product/admin-product-form/admin-product-form.component';
import { AdminMessageComponent } from 'src/app/modules/admin/common/component/admin-message/admin-message.component';
import { AdminConfirmDialogComponent } from 'src/app/modules/admin/common/component/admin-confirm-dialog/admin-confirm-dialog.component';
import { AdminCategoryComponent } from 'src/app/modules/admin/admin-category/admin-category.component';
import { AdminCategoryAddComponent } from 'src/app/modules/admin/admin-category/admin-category-add/admin-category-add.component';
import { AdminCategoryUpdateComponent } from 'src/app/modules/admin/admin-category/admin-category-update/admin-category-update.component';
import { AdminCategoryFormComponent } from 'src/app/modules/admin/admin-category/admin-category-form/admin-category-form.component';
import { AdminReviewComponent } from 'src/app/modules/admin/admin-review/admin-review.component';
import { AdminShipmentComponent } from 'src/app/modules/admin/admin-shipment/admin-shipment.component';
import { AdminShipmentAddComponent } from 'src/app/modules/admin/admin-shipment/admin-shipment-add/admin-shipment-add.component';
import { AdminShipmentUpdateComponent } from 'src/app/modules/admin/admin-shipment/admin-shipment-update/admin-shipment-update.component';
import { AdminShipmentFormComponent } from 'src/app/modules/admin/admin-shipment/admin-shipment-form/admin-shipment-form.component';
import { AdminPaymentComponent } from 'src/app/modules/admin/admin-payment/admin-payment.component';
import { AdminPaymentAddComponent } from 'src/app/modules/admin/admin-payment/admin-payment-add/admin-payment-add.component';
import { AdminPaymentUpdateComponent } from 'src/app/modules/admin/admin-payment/admin-payment-update/admin-payment-update.component';
import { AdminPaymentFormComponent } from 'src/app/modules/admin/admin-payment/admin-payment-form/admin-payment-form.component';
import { AdminOrderComponent } from 'src/app/modules/admin/admin-order/admin-order.component';
import { AdminOrderUpdateComponent } from 'src/app/modules/admin/admin-order/admin-order-update/admin-order-update.component';
import { AdminOrderExportComponent } from 'src/app/modules/admin/admin-order/admin-order-export/admin-order-export.component';
import { AdminOrderStatsComponent } from 'src/app/modules/admin/admin-order/admin-order-stats/admin-order-stats.component';
import { AdminUserComponent } from 'src/app/modules/admin/admin-user/admin-user.component';
import { AdminUserAddComponent } from 'src/app/modules/admin/admin-user/admin-user-add/admin-user-add.component';

@NgModule({
  declarations: [
    FullpageadminComponent,
    AdminComponent,
    AdminProductComponent,
    AdminProductUpdateComponent,
    AdminProductAddComponent,
    AdminProductFormComponent,
    AdminMessageComponent,
    AdminConfirmDialogComponent,
    AdminCategoryComponent,
    AdminCategoryAddComponent,
    AdminCategoryUpdateComponent,
    AdminCategoryFormComponent,
    AdminReviewComponent,
    AdminShipmentComponent,
    AdminShipmentAddComponent,
    AdminShipmentUpdateComponent,
    AdminShipmentFormComponent,
    AdminPaymentComponent,
    AdminPaymentAddComponent,
    AdminPaymentUpdateComponent,
    AdminPaymentFormComponent,
    AdminOrderComponent,
    AdminOrderUpdateComponent,
    AdminOrderExportComponent,
    AdminOrderStatsComponent,
    AdminUserComponent,
    AdminUserAddComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class FullpageadminModule { }
