import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { FullpageComponent } from './layouts/fullpage/fullpage.component';
import { FullpageadminComponent } from './layouts/fullpageadmin/fullpageadmin.component';
import { FullpageadminemptyComponent } from './layouts/fullpageadminempty/fullpageadminempty.component';
import { AccountComponent } from './modules/account/account.component';
import { AdminAccountComponent } from './modules/admin/admin-account/admin-account.component';
import { AdminCategoryAddComponent } from './modules/admin/admin-category/admin-category-add/admin-category-add.component';
import { AdminCategoryUpdateComponent } from './modules/admin/admin-category/admin-category-update/admin-category-update.component';
import { AdminCategoryComponent } from './modules/admin/admin-category/admin-category.component';
import { AdminLoginComponent } from './modules/admin/admin-login/admin-login.component';
import { AdminOrderExportComponent } from './modules/admin/admin-order/admin-order-export/admin-order-export.component';
import { AdminOrderStatsComponent } from './modules/admin/admin-order/admin-order-stats/admin-order-stats.component';
import { AdminOrderUpdateComponent } from './modules/admin/admin-order/admin-order-update/admin-order-update.component';
import { AdminOrderComponent } from './modules/admin/admin-order/admin-order.component';
import { AdminPaymentAddComponent } from './modules/admin/admin-payment/admin-payment-add/admin-payment-add.component';
import { AdminPaymentUpdateComponent } from './modules/admin/admin-payment/admin-payment-update/admin-payment-update.component';
import { AdminPaymentComponent } from './modules/admin/admin-payment/admin-payment.component';
import { AdminProductAddComponent } from './modules/admin/admin-product/admin-product-add/admin-product-add.component';
import { AdminProductUpdateComponent } from './modules/admin/admin-product/admin-product-update/admin-product-update.component';
import { AdminProductComponent } from './modules/admin/admin-product/admin-product.component';
import { AdminReviewComponent } from './modules/admin/admin-review/admin-review.component';
import { AdminShipmentAddComponent } from './modules/admin/admin-shipment/admin-shipment-add/admin-shipment-add.component';
import { AdminShipmentUpdateComponent } from './modules/admin/admin-shipment/admin-shipment-update/admin-shipment-update.component';
import { AdminShipmentComponent } from './modules/admin/admin-shipment/admin-shipment.component';
import { AdminUserAddComponent } from './modules/admin/admin-user/admin-user-add/admin-user-add.component';
import { AdminUserComponent } from './modules/admin/admin-user/admin-user.component';
import { AdminComponent } from './modules/admin/admin.component';
import { adminAuthorizationGuard } from './modules/admin/common/guard/adminAuthorizationGuard';
import { CartComponent } from './modules/cart/cart.component';
import { CategoryComponent } from './modules/category/category.component';
import { profileAuthorizationGuard } from './modules/common/guard/profileAuthorizationGuard';
import { ContactComponent } from './modules/contact/contact.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { LostPasswordComponent } from './modules/login/lost-password/lost-password.component';
import { OrderNotificationComponent } from './modules/order/order-notification/order-notification.component';
import { OrderComponent } from './modules/order/order.component';
import { ProductDetailsComponent } from './modules/product-details/product-details.component';
import { ProductComponent } from './modules/product/product.component';
import { UserOrdersComponent } from './modules/user-orders/user-orders.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '', component: DefaultComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'products', component: ProductComponent },
      { path: 'products/:slug', component: ProductDetailsComponent },
      { path: 'categories/:slug', component: CategoryComponent },
      { path: 'cart', component: CartComponent },
      { path: 'order', component: OrderComponent },
      { path: 'order/notification/:orderHash', component: OrderNotificationComponent },
      { path: 'my-orders', component: UserOrdersComponent, canActivate: [profileAuthorizationGuard] },
      { path: 'account', component: AccountComponent, canActivate: [profileAuthorizationGuard] },
      { path: 'contact', component: ContactComponent }
    ]
  },
  {
    path: '', component: FullpageComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'lostPassword', component: LostPasswordComponent },
      { path: 'lostPassword/:hash', component: LostPasswordComponent }
    ]
  },
  {
    path: '', component: FullpageadminComponent, children: [
      { path: 'admin', component: AdminComponent, canActivate: [adminAuthorizationGuard] },
      { path: 'admin/products', component: AdminProductComponent, canActivate: [adminAuthorizationGuard] },
      { path: 'admin/products/update/:id', component: AdminProductUpdateComponent, canActivate: [adminAuthorizationGuard] },
      { path: 'admin/products/add', component: AdminProductAddComponent, canActivate: [adminAuthorizationGuard] },
      { path: 'admin/categories', component: AdminCategoryComponent, canActivate: [adminAuthorizationGuard] },
      { path: 'admin/categories/add', component: AdminCategoryAddComponent, canActivate: [adminAuthorizationGuard] },
      { path: 'admin/categories/update/:id', component: AdminCategoryUpdateComponent, canActivate: [adminAuthorizationGuard] },
      { path: 'admin/reviews', component: AdminReviewComponent, canActivate: [adminAuthorizationGuard] },
      { path: 'admin/shipments', component: AdminShipmentComponent, canActivate: [adminAuthorizationGuard] },
      { path: 'admin/shipments/add', component: AdminShipmentAddComponent, canActivate: [adminAuthorizationGuard] },
      { path: 'admin/shipments/update/:id', component: AdminShipmentUpdateComponent, canActivate: [adminAuthorizationGuard] },
      { path: 'admin/payments', component: AdminPaymentComponent, canActivate: [adminAuthorizationGuard] },
      { path: 'admin/payments/add', component: AdminPaymentAddComponent, canActivate: [adminAuthorizationGuard] },
      { path: 'admin/payments/update/:id', component: AdminPaymentUpdateComponent, canActivate: [adminAuthorizationGuard] },
      { path: 'admin/orders', component: AdminOrderComponent, canActivate: [adminAuthorizationGuard] },
      { path: 'admin/orders/update/:id', component: AdminOrderUpdateComponent, canActivate: [adminAuthorizationGuard] },
      { path: 'admin/orders/export', component: AdminOrderExportComponent, canActivate: [adminAuthorizationGuard] },
      { path: 'admin/orders/stats', component: AdminOrderStatsComponent, canActivate: [adminAuthorizationGuard] },
      { path: 'admin/users', component: AdminUserComponent, canActivate: [adminAuthorizationGuard] },
      { path: 'admin/users/add', component: AdminUserAddComponent, canActivate: [adminAuthorizationGuard] },
      { path: 'admin/account', component: AdminAccountComponent, canActivate: [adminAuthorizationGuard] }
    ]
  },
  {
    path: '', component: FullpageadminemptyComponent, children: [
      { path: 'admin/login', component: AdminLoginComponent }
    ]
  },
  {
    path: '**', pathMatch: 'full', component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
