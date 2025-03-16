import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { SigninComponent } from './signin/signin.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { RegisterAdminComponent } from './register-admin/register-admin.component';
import { SigninAdminComponent } from './signin-admin/signin-admin.component';
import { ProductComponent } from './product/product.component';
import { ProductAdminComponent } from './product-admin/product-admin.component';
import { AuthInterceptor } from './auth.interceptor';
import { CategoryComponent } from './category/category.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { OrderComponent } from './order/order.component';
import { PaymentComponent } from './payment/payment.component';
import { CartComponent } from './cart/cart.component';
import { CategoryAdminComponent } from './category-admin/category-admin.component';
import { AdminControlComponent } from './admin-control/admin-control.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    SigninComponent,
    HomeAdminComponent,
    RegisterAdminComponent,
    SigninAdminComponent,
    ProductComponent,
    ProductAdminComponent,
    CategoryComponent,
    BreadcrumbComponent,
    ProductDetailsComponent,
    OrderComponent,
    PaymentComponent,
    CartComponent,
    CategoryAdminComponent,
    AdminControlComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
