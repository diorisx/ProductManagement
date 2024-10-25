import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';






import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './dashboard/home/home.component';
import { UsersComponent } from './dashboard/users/users.component';
import { ProductsComponent } from './dashboard/products/products.component';
import { TestComponent } from './test/test.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { AppMaterialModule } from './shared/app-material/app-material.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { EditProductComponent } from './dashboard/products/edit-product/edit-product.component';
import { AddProductComponent } from './dashboard/products/add-product/add-product.component';
import { EditUserComponent } from './dashboard/users/edit-user/edit-user.component';
import { AddUserComponent } from './dashboard/users/add-user/add-user.component';

@NgModule({
  declarations: [
    AppComponent,
    //LoginComponent,
    //DashboardComponent,
    //HomeComponent,
    //UsersComponent,
    //ProductsComponent,
    //TestComponent,
    NavbarComponent,
    EditUserComponent,
    AddUserComponent,
    //EditProductComponent,
    //AddProductComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    FormsModule,
    AppMaterialModule,
    AppRoutingModule,
  
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true

    },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
