import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { FullpageComponent } from './layouts/fullpage/fullpage.component';
import { FullpageadminComponent } from './layouts/fullpageadmin/fullpageadmin.component';
import { AdminCategoryAddComponent } from './modules/admin/admin-category/admin-category-add/admin-category-add.component';
import { AdminCategoryUpdateComponent } from './modules/admin/admin-category/admin-category-update/admin-category-update.component';
import { AdminCategoryComponent } from './modules/admin/admin-category/admin-category.component';
import { AdminProductAddComponent } from './modules/admin/admin-product-add/admin-product-add.component';
import { AdminProductUpdateComponent } from './modules/admin/admin-product-update/admin-product-update.component';
import { AdminProductComponent } from './modules/admin/admin-product/admin-product.component';
import { AdminComponent } from './modules/admin/admin.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { ProductDetailsComponent } from './modules/product-details/product-details.component';
import { ProductComponent } from './modules/product/product.component';

const routes: Routes = [
  {
    path: '', component: DefaultComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'products', component: ProductComponent },
      { path: 'products/:slug', component: ProductDetailsComponent }
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
      { path: 'admin/categories/update/:id', component: AdminCategoryUpdateComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
