import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './admin/admin.component';
import {ValidateComponent} from './admin/validate/validate.component';
import {ProductsComponent} from './admin/products/products.component';
import {ApproveComponent} from './admin/approve/approve.component';
import {ProductsAddComponent} from './admin/products-add/products-add.component';
import {ProductsDisplayComponent} from './admin/products-display/products-display.component';
import {ProductsEditComponent} from './admin/products-edit/products-edit.component';
import {UserListComponent} from './admin/user-list/user-list.component';
import {FinanceComponent} from './admin/finance/finance.component';
import {LoginComponent} from './login/login.component';
import {AdminloginComponent} from './adminlogin/adminlogin.component';
import {RegisterComponent} from './register/register.component';
import {ForgotpassComponent} from './forgotpass/forgotpass.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DisplayCardComponent } from "./dashboard/display-card/display-card.component";
import { ListOfFinanceComponent } from "./dashboard/list-of-finance/list-of-finance.component";
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductComponent } from './product/product.component';
import {HomeComponent} from './home/home.component';
import {TncComponent} from './tnc/tnc.component';
const routes: Routes = [
  {path:'admin',component:AdminComponent},
  {path:'admin/validate',component:ValidateComponent},
  {path:'admin/products',component:ProductsComponent},
  {path:'admin/approve/:Email',component:ApproveComponent},
  {path:'admin/products/add',component:ProductsAddComponent},
  {path:'admin/products/display/:id',component:ProductsDisplayComponent},
  {path:'admin/products/edit/:id',component:ProductsEditComponent},
  {path:'admin/finance',component:UserListComponent},
  {path:'admin/finance/financedetails/:Email',component:FinanceComponent},
  {path:'login', component:LoginComponent},
  {path: 'adminlogin', component:AdminloginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'forgotpassword', component:ForgotpassComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'dashboard/displaycard',component:DisplayCardComponent},
  {path:'dashboard/listoffinance',component:ListOfFinanceComponent},
  {path:'product', component:ProductComponent},
  {path:'productdetails/:id', component:ProductDetailsComponent},
  {path:'home',component:HomeComponent},
  {path:'tnc',component:TncComponent},
  {path:'',redirectTo:'/home',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
