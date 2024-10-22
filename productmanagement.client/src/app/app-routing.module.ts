import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { ProductsComponent } from './dashboard/products/products.component';
import { UsersComponent } from './dashboard/users/users.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:'login', component: LoginComponent, canActivate:[loginGuard]},
  {path:'dashboard', component: DashboardComponent, canActivate:[authGuard] ,children: [
    {path:'home', component: HomeComponent},
    {path:'products', component: ProductsComponent},
    {path:'users', component: UsersComponent},
    {path:'', redirectTo:'home', pathMatch:'full'},
  ]},
  { path: '', redirectTo: 'login', pathMatch: 'full',  },
  { path: '**', redirectTo: 'login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
