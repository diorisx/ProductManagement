import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { ProductsComponent } from './dashboard/products/products.component';
import { UsersComponent } from './dashboard/users/users.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
import { EditProductComponent } from './dashboard/products/edit-product/edit-product.component';
import { AddProductComponent } from './dashboard/products/add-product/add-product.component';

const routes: Routes = [
  {path:'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule)},
  {path:'dashboard', loadChildren:()=>import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: '', redirectTo: 'login', pathMatch: 'full',  },
  { path: '**', redirectTo: 'login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
