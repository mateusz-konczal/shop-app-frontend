import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { FullpageComponent } from './layouts/fullpage/fullpage.component';
import { FullpageadminComponent } from './layouts/fullpageadmin/fullpageadmin.component';
import { FullpageadminemptyComponent } from './layouts/fullpageadminempty/fullpageadminempty.component';
import { AdminCategoryAddComponent } from './modules/admin/admin-category/admin-category-add/admin-category-add.component';
import { AdminCategoryUpdateComponent } from './modules/admin/admin-category/admin-category-update/admin-category-update.component';
import { AdminCategoryComponent } from './modules/admin/admin-category/admin-category.component';
import { AdminProductAddComponent } from './modules/admin/admin-product/admin-product-add/admin-product-add.component';
import { AdminProductUpdateComponent } from './modules/admin/admin-product/admin-product-update/admin-product-update.component';
import { AdminProductComponent } from './modules/admin/admin-product/admin-product.component';
import { AdminComponent } from './modules/admin/admin.component';
import { CategoryComponent } from './modules/category/category.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { ProductDetailsComponent } from './modules/product-details/product-details.component';
import { ProductComponent } from './modules/product/product.component';
import { AdminReviewComponent } from './modules/admin/admin-review/admin-review.component';
import { CartComponent } from './modules/cart/cart.component';
import { OrderComponent } from './modules/order/order.component';
import { AdminShipmentComponent } from './modules/admin/admin-shipment/admin-shipment.component';
import { AdminShipmentAddComponent } from './modules/admin/admin-shipment/admin-shipment-add/admin-shipment-add.component';
import { AdminShipmentUpdateComponent } from './modules/admin/admin-shipment/admin-shipment-update/admin-shipment-update.component';
import { AdminPaymentComponent } from './modules/admin/admin-payment/admin-payment.component';
import { AdminPaymentAddComponent } from './modules/admin/admin-payment/admin-payment-add/admin-payment-add.component';
import { AdminPaymentUpdateComponent } from './modules/admin/admin-payment/admin-payment-update/admin-payment-update.component';
import { AdminOrderComponent } from './modules/admin/admin-order/admin-order.component';
import { AdminOrderUpdateComponent } from './modules/admin/admin-order/admin-order-update/admin-order-update.component';
import { AdminOrderExportComponent } from './modules/admin/admin-order/admin-order-export/admin-order-export.component';
import { AdminOrderStatsComponent } from './modules/admin/admin-order/admin-order-stats/admin-order-stats.component';
import { AdminLoginComponent } from './modules/admin/admin-login/admin-login.component';

const routes: Routes = [
  {
    path: '', component: DefaultComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'products', component: ProductComponent },
      { path: 'products/:slug', component: ProductDetailsComponent },
      { path: 'categories/:slug', component: CategoryComponent },
      { path: 'cart', component: CartComponent },
      { path: 'order', component: OrderComponent }
    ]
  },
  {
    path: '', component: FullpageComponent, children: [
      { path: 'login', component: LoginComponent }
    ]
  },
  {
    path: '', component: FullpageadminComponent, children: [
      { path: 'admin', component: AdminComponent },
      { path: 'admin/products', component: AdminProductComponent },
      { path: 'admin/products/update/:id', component: AdminProductUpdateComponent },
      { path: 'admin/products/add', component: AdminProductAddComponent },
      { path: 'admin/categories', component: AdminCategoryComponent },
      { path: 'admin/categories/add', component: AdminCategoryAddComponent },
      { path: 'admin/categories/update/:id', component: AdminCategoryUpdateComponent },
      { path: 'admin/reviews', component: AdminReviewComponent },
      { path: 'admin/shipments', component: AdminShipmentComponent },
      { path: 'admin/shipments/add', component: AdminShipmentAddComponent },
      { path: 'admin/shipments/update/:id', component: AdminShipmentUpdateComponent },
      { path: 'admin/payments', component: AdminPaymentComponent },
      { path: 'admin/payments/add', component: AdminPaymentAddComponent },
      { path: 'admin/payments/update/:id', component: AdminPaymentUpdateComponent },
      { path: 'admin/orders', component: AdminOrderComponent },
      { path: 'admin/orders/update/:id', component: AdminOrderUpdateComponent },
      { path: 'admin/orders/export', component: AdminOrderExportComponent },
      { path: 'admin/orders/stats', component: AdminOrderStatsComponent }
    ]
  },
  {
    path: '', component: FullpageadminemptyComponent, children: [
      { path: 'admin/login', component: AdminLoginComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
