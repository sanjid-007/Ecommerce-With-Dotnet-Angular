import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { RegisterComponent } from './register/register.component';
import { RegisterAdminComponent } from './register-admin/register-admin.component';
import { SigninComponent } from './signin/signin.component';
import { SigninAdminComponent } from './signin-admin/signin-admin.component';
import { ProductComponent } from './product/product.component';
import { ProductAdminComponent } from './product-admin/product-admin.component';
import { CategoryComponent } from './category/category.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { OrderComponent } from './order/order.component';
import { PaymentComponent } from './payment/payment.component';
import { CartComponent } from './cart/cart.component';
import { CategoryAdminComponent } from './category-admin/category-admin.component';
import { AdminControlComponent } from './admin-control/admin-control.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path : '', component : HomeComponent},
  {path : 'home', component : HomeComponent},
  {path : 'home-admin', component : HomeAdminComponent},
  {path : 'register', component : RegisterComponent},
  {path : 'register-admin', component : RegisterAdminComponent },
  {path : 'signin', component : SigninComponent },
  {path : 'signin-admin', component : SigninAdminComponent },
  {path : 'product', component : ProductComponent },
  { path: 'product/:name/:userName', component: ProductComponent }, 
  {path : 'product-admin', component : ProductAdminComponent },
  {path : 'category-admin', component : CategoryAdminComponent },
  {path : 'admin-control', component : AdminControlComponent},
  {path : 'category/:name', component : CategoryComponent },
  {path : 'category', component : CategoryComponent },
  {path : 'product-detail/:name/:userName', component : ProductDetailsComponent},
  {path : 'order', component : OrderComponent},
  {path : 'order/:name/:userName', component : OrderComponent},
  {path : 'payment', component : PaymentComponent},
  {path : 'cart/:name/:userName', component : CartComponent},
  {path : 'cart/:userName', component : CartComponent},
  {path : 'profile/:username', component : ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
