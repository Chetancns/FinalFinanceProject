import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { ValidateComponent } from './admin/validate/validate.component';
import { ProductsComponent } from './admin/products/products.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { ApproveComponent } from './admin/approve/approve.component';
import { ProductsAddComponent } from './admin/products-add/products-add.component';
import { ProductsDisplayComponent } from './admin/products-display/products-display.component';
import { ProductsEditComponent } from './admin/products-edit/products-edit.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { FinanceComponent } from './admin/finance/finance.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DisplayCardComponent } from './dashboard/display-card/display-card.component';
import { ListOfFinanceComponent } from './dashboard/list-of-finance/list-of-finance.component';
import {ProductComponent} from './product/product.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component'
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    ValidateComponent,
    ProductsComponent,
    ApproveComponent,
    ProductsAddComponent,
    ProductsDisplayComponent,
    ProductsEditComponent,
    UserListComponent,
    FinanceComponent,
    AdminloginComponent,
    ForgotpassComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    DisplayCardComponent,
    ListOfFinanceComponent,
    ProductDetailsComponent,
    ProductComponent,
    NavBarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
