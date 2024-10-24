import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule } from '@angular/material/icon';
import {MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list'; 
import {MatTableModule} from '@angular/material/table'; 
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule, MatTableModule,
    MatButtonModule,MatCardModule,
    MatFormFieldModule,MatInputModule,
    FormsModule,MatSnackBarModule
    
  ], 
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule, MatTableModule,
    MatButtonModule,MatCardModule,
    MatFormFieldModule,MatInputModule,
    FormsModule,MatSnackBarModule
  ]
})
export class AppMaterialModule { }
