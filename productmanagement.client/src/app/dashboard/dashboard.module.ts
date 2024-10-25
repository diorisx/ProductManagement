import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { UsersComponent } from './users/users.component';
import { authGuard } from '../core/guards/auth.guard';
import { AppMaterialModule } from '../shared/app-material/app-material.module';


import { AddProductComponent } from './products/add-product/add-product.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { AddUserComponent } from './users/add-user/add-user.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'edit-product/:id', component: EditProductComponent },
      { path: 'add-product', component: AddProductComponent },
      { path: 'users', component: UsersComponent },
      { path: 'edit-user/:id', component: EditUserComponent },
      { path: 'add-user', component: AddUserComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    ProductsComponent,
    EditProductComponent,
    UsersComponent,
    AddProductComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AppMaterialModule
  ]
})
export class DashboardModule { }
