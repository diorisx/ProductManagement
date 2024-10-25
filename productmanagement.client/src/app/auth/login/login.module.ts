import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { loginGuard } from '../../core/guards/login.guard';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [loginGuard] }
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
    
  ]
})
export class LoginModule { }
